import { useEffect, useState } from 'react';
import { CallAPI } from './API';
import { Base64 } from './base64';
import {
  setCacheStorage,
  getCacheStorage,
} from 'cachestorage';

const CACHE_KEY = 'launchDarklyData';

const useLaunchDarkly = (
  payload: string | null,
  tokenId: string,
  expiryTime: number
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<object>({});
  const et = expiryTime ? expiryTime : 1;

  const fetchData = async (
    base64Payload: string,
    tokenId: string,
    timeStamp: number
  ) => {
    setIsLoading(true);
    try {
      const cachedData = await getCacheStorage(CACHE_KEY);
      if (cachedData.status === 'success') {
        let response: any;
        if (cachedData.data[0] && cachedData.data[0].response) {
          response = JSON.parse(cachedData.data[0].response);
        } else {
          response = JSON.parse(JSON.parse(cachedData.data.response));
        }
        setIsLoading(false);
        setApiData(response);
      }else {
        try {
          const outputJson: any = await CallAPI('GET', base64Payload, tokenId);
          setIsLoading(false);
          if (
            outputJson &&
            outputJson.code &&
            outputJson.code === 'invalid_request'
          ) {
            setApiData({});
            return {
              status: 'failed',
              message: 'An error occured while fetching data',
              data: '',
            };
          } else {
            const flagData = transformData(outputJson);
            setApiData(flagData);
            await setCacheStorage(
              CACHE_KEY,
              JSON.stringify(flagData),
              timeStamp
            );
          }
        } catch (e) {
          return {
            status: 'failed',
            data: e,
          };
        }
      }
    } catch (error) {
      setIsLoading(false);
      setApiData({ type: 'error', message: error });
    }
  };

  const transformData = (inputJson: any) => {
    const flagData = [];
    for (const key in inputJson) {
      const flagObject = {
        [key]: inputJson[key]?.value?.visible || false,
      };
      flagData.push(flagObject);
    }
    return flagData;
  };

  useEffect(() => {
    if (typeof payload === 'string') {
      const base64Payload = Base64.encode(payload);
      fetchData(base64Payload, tokenId, et);
    }
  }, [payload, tokenId]);

  return { isLoading, apiData };
};

export default useLaunchDarkly;