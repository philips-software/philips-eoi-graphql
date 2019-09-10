# scoe-demo 
React Appplication - Software Conference Demo Project
Pre-requisite to setup demo application

### Step 1
#### Sample GraphQL Server Sandbox setup
- Create an account and login to Heroku
	* [https://id.heroku.com/login](https://id.heroku.com/login)
- Create and deploy Sample GraphQL Server Application ([https://hasura.io/](https://hasura.io/)) on Heroku. 
	* [https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- Access Sample GraphQL Server by accessing below URL.
	* [https://<NAME_OF_YOUR_HEROKU_APP>.herokuapp.com](http://herokuapp.com/)
	
### Step 2
Install latest available version of node-js.
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Step 3
Clone/download the code from below repository (master branch).
[https://github.com/philips-graphql/scoe-demo](https://github.com/philips-graphql/scoe-demo)

### Step 4
#### Sample React application setup
- Navigate to `scoe-demo\client\` directory and run below commands to access application [http://localhost:3000/](http://localhost:3000/)
	```bash
	npm install
	npm start
	```
#### Sample Nodejs GraphQL Server
- Navigate to `scoe-demo\server\` directory and run below commands to access application
[http://localhost:4004/graphql](http://localhost:4004/graphql)
	```bash
	npm install
	npm start
	```

