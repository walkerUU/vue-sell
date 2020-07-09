import Axios from 'axios';

const ERR_OK = 0;
export function get(url) {
  return function(params) {
    return Axios.get(url, { params })
      .then(res => {
        const { errno, data } = res.data;
        if (errno === ERR_OK && data) {
          return data;
        }
      })
      .catch(() => {});
  };
}
