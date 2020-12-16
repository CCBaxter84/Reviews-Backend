import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');

export let options = {
  thresholds: {
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95) < 2000']
  }
};

export default function() {
  let res1 = http.get('http://3.129.230.28/reviews/25/list');
  const payload = JSON.stringify({
    rating: 5,
    recommend: true,
    response: "blah blah",
    body: "Because I said so?",
    date: "2019-12-16 02:16:19.242-07",
    reviewer_name: "ccbaxter54",
    helpfulness: 4,
    reported: false
  });
  let res2 = http.post('http://3.129.230.28/reviews/25', payload);
  let res3 = http.put('http://3.129.230.28/reviews/report/25');
  let res4 = http.put('http://3.129.230.28/reviews/helpful/25');
  myFailRate.add(res1.status !== 200);
  myFailRate.add(res2.status !== 201);
  myFailRate.add(res3.status !== 204);
  myFailRate.add(res4.status !== 204);
}