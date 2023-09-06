import axios from 'axios';
import { CallAPI } from '../API';

describe('CallAPI function', () => {
  it('handles successful GET API call', async () => {
    const mockedResponse = { data: 'Mocked API response' };
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: mockedResponse });

    const result = await CallAPI('GET', 'mockBody', 'mockToken');

    expect(result).toEqual(mockedResponse);
    expect(axiosGetSpy).toHaveBeenCalledWith(
      'https://app.launchdarkly.com/sdk/evalx/mockToken/contexts/mockBody',
    );
  });

  it('handles API error on GET', async () => {
    const errorMessage = 'API error message';
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockRejectedValue({ response: { data: errorMessage } });

    const result = await CallAPI('GET', 'mockBody', 'mockToken');

    expect(result).toBeDefined();
    expect(axiosGetSpy).toHaveBeenCalledWith(
      'https://app.launchdarkly.com/sdk/evalx/mockToken/contexts/mockBody',
    );
  });

  it('handles unexpected error', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Unexpected error'));

    const result = await CallAPI('GET', 'mockBody', 'mockToken');

    expect(result).toEqual({
      type: 'error',
      message: 'An unexpected error occurred',
    });
    expect(axiosGetSpy).toHaveBeenCalledWith(
      'https://app.launchdarkly.com/sdk/evalx/mockToken/contexts/mockBody',
    );
  });

  it('handles unknown method', async () => {
    const tokenId = 'sample-token';
    const body = 'sample-body';
    const method = 'UNKNOWN';
    const response = await CallAPI(method, body, tokenId);
    expect(response).toEqual({});
  });
});

describe('snapshot for API component', () => {
  it('renders snapshot without issues', () => {
    expect(CallAPI).toMatchSnapshot();
  });
});