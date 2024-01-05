import axios from 'axios';

const options = {
  method: 'GET',
  url: 'http://sapi.slickapp.co/user/find_one',
  headers: {
    'user-agent': 'Dart/3.1 (dart:io)',
    app: 'slick',
    deviceid: 'bed7c293cc532887',
    appversion: '2.1.49+157',
    'accept-encoding': 'gzip',
    authorization: 'Bearer TOKEN',
    operatingsystem: 'android',
    host: 'sapi.slickapp.co',
    'content-type': 'application/json',
  },
};

try {
  const response = await axios.request({
    ...options,
  });
  console.log(response.data);
} catch (error) {
  console.error('Error fetching data:', error.message);
}
