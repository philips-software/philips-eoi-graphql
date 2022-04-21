# swcoe-demo 
React Appplication - Software Conference Demo Project
Pre-requisite to setup demo application

> ⚠️ This project is no longer supported.

### Step 1
#### Sample GraphQL Server Sandbox setup
- Create an account and login to Heroku
	* [https://id.heroku.com/login](https://id.heroku.com/login)
- Create and deploy Sample GraphQL Server Application ([https://hasura.io/](https://hasura.io/)) on Heroku. 
	* [https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- Access Sample GraphQL Server by accessing below URL.
	* [https://<NAME_OF_YOUR_HEROKU_APP>.herokuapp.com](http://herokuapp.com/)
- Follow the instruction in [GraphQL_SoftwareConference.pptx](GraphQL_SoftwareConference.pptx) for configure the GraphQL server.
	
### Step 2
Install latest available version of node-js.
	[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Step 3
Clone/download the code from below repository (master branch).
	[https://https://github.com/philips-software/philips-eoi-graphql](https://https://github.com/philips-software/philips-eoi-graphql)

### Step 4
#### IDE setup
- Install Visual Code
	[https://code.visualstudio.com/download](https://code.visualstudio.com/download)
- Install apollographql.vscode-apollo on Visual Code for rich editor support on GraphQL queries.
	[https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
	

### Step 5
#### Sample React application setup
- Navigate to `.client/` directory and run below commands to access application [http://localhost:3000/](http://localhost:3000/)
	```bash
	npm install
	npm start
	```
#### Sample Nodejs GraphQL Server
This setup replaces the server setup running on Heroku.
- Navigate to `./server/` directory and run below commands to access application
[http://localhost:4004/graphql](http://localhost:4004/graphql)
	```bash
	npm install
	npm start
	```

#### Additional Instructions following SWCOE session
- Server Reference : https://sub-test-postgres.herokuapp.com (one can use your own heroku hasura server as well)
- GraphQL Server Reference Resolver implementation (code walkthrough done during session) updated. Please access it on http://localhost:4004/graphql after Step 5 Part 2.
	* Below queries can be executed on GraphQL console :
		Normal Query
		```
			{books{
			  name
			  id
			  genre
			  author {
				id
				name
				age
			  }
			}}
		```
		Query with Filter
		```
			{book (id:2){
			  name
			  id
			  genre
			  author {
				id
				name
				age
			  }
			}}
		```
	We can also implement similar resolvers for Mutations.
- GraphQL Client Reference implementation (used / code walkthrough done during session) updated. Please access it on http://localhost:3000/ after Step 5 Part 1.
	* Subscription : Highest priced book is subscribed to be shown just below header. One can insert new book with highest price/modify existing book's price via GraphQL Server 	console (data tab) and can see updates on application without need of doing refresh.
	* Run Query : Refer to app.js "runQuery" method and keep changing methods to play around with different mutation operations, delete(current code - deleteEntryBooksTable @ query.js), insert(insertEntryBooksTableQuery @ query.js), update(updateEntryBooksTable @ query.js), upsert (upsertEntryBooksTable @ query.js) and observe impact on graphs.
	* Graphs : Number of books  per Genre, Number of books per Person with filters queries (query.js) updated, play around with different filter queries. Refer to sample_queries.txt file updated in this repo for different combinations of queries.
	
#### Contact Details
Please contact if any queries, we will be happy to assist you.
prashantharao.nv@philips.com
