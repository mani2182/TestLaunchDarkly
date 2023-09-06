import { renderHook } from '@testing-library/react';
import useLaunchDarkly from '../index';
import * as APIModule from '../API';
import * as CacheModule from 'cachestorage';

describe('useLaunchDarkly Hook', () => {
  const payload = 'testPayload';
  const tokenId = 'testTokenId';
  const expiryTime = 1; // in minutes
  const base64Payload = 'base64EncodedPayload';
  const cacheData = {
    status: 'success',
    data: { /* your cached data object here */ },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data from cache if available', () => {
    jest.spyOn(CacheModule, 'getCacheStorage').mockResolvedValue(cacheData);

    const { result } = renderHook(() =>
      useLaunchDarkly(payload, tokenId, expiryTime)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.apiData).toEqual(cacheData.data);
  });

  it('fetches data from API when cache is unavailable', async () => {
    jest.spyOn(CacheModule, 'getCacheStorage').mockResolvedValue({ status: 'failed', data: {}  });
    jest.spyOn(APIModule, 'CallAPI').mockResolvedValue({ /* your mock API response here */ });
    jest.spyOn(CacheModule, 'setCacheStorage').mockResolvedValue({ status: 'success', data: {} } );

    const { result } = renderHook(() =>
      useLaunchDarkly(payload, tokenId, expiryTime)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(APIModule.CallAPI).toHaveBeenCalledTimes(0);
    // You should also expect the cache storage interaction here
  });

  it('handles API call error', async () => {
    jest.spyOn(CacheModule, 'getCacheStorage').mockResolvedValue({ status: 'failed', data: {}  });
    jest.spyOn(APIModule, 'CallAPI').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() =>
      useLaunchDarkly(payload, tokenId, expiryTime)
    );

    expect(result.current.isLoading).toBe(true);

    expect(result.current.isLoading).toBe(true);
    expect(result.current.apiData).toEqual({});
  });
});