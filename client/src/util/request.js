import axios from 'axios';
export const request = async (method, url, data) => {
  await axios({
    method: method,
    url: url,
    data: data,
  });
};
