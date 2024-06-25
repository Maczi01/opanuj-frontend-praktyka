import axios from 'https://cdn.skypack.dev/axios';

axios.interceptors.request.use(function (config) {
  config.requestStartTime = new Date().getTime();
  return config;
});

axios.interceptors.response.use(function (response) {
  const requestDuration = new Date().getTime() - response.config.requestStartTime;
  console.log(`Request duration: ${requestDuration}ms`);
  return response;
});

const {
  data: { articles },
} = await axios.get('http://localhost:3000/api/data/articles?timeout=3000');

document.querySelector('#data').innerHTML = articles[0].content;
