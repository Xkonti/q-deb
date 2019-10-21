import axios from 'axios';

// @ts-ignore
export default async ({Vue}) => {
  Vue.prototype.$axios = axios;
};
