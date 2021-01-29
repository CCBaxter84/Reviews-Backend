###### Summary ######
This API was coded in JavaScript (Node.js) and SQL (PostgreSQL). It utilizes Express.js web servers, a PostgreSQL database, Redis cache, nginx load balancing/reverse proxy, and Docker. It is meant to run on AWS servers without any auto-scaling. 


###### Testing ######
I've tested it utilizing K6 and New Relic. The best results so far are 279.77 requests per second and a 0% error rate.
