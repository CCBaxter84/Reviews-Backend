import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');

export let options = {
  stages: [
    { duration: '30s', target: 20},
    { duration: '1m', target: 175},
    { duration: '30s', target: 20}
  ],

  thresholds: {
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95) < 2000']
  }
};

export default function() {
  let productId = Math.floor(Math.random() * 100) + 1;
  let res1 = http.get(`http://3.129.86.154/reviews/${productId}/list`);

  let res2 = http.get(`http://3.129.86.154/reviews/${productId}/meta`);

  myFailRate.add(res1.status !== 200);
  myFailRate.add(res2.status !== 200);
}