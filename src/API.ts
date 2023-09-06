// API request Methods for launchDarkly
import axios from 'axios';
import {getBaseURI} from './constants';

export const CallAPI = async (
  method: string,
  body: string | object | null | '',
  tokenId: string,
) => {
  const getURL = getBaseURI + tokenId + '/contexts/' + body; //launckDarkly URL
  let setApiData = {};
  switch (method) {
    case 'GET':
      try {
        let response = await axios
          .get(getURL)
          .then((resp: any) => {
            return resp.data;
          })
          .catch((error: any) => {
            return error.response.data;
          });
        setApiData = response;
      } catch (error: any) {
        setApiData = {type: 'error', message: 'An unexpected error occurred'};
      }
      break;
    default:
  }
  return setApiData;
};
