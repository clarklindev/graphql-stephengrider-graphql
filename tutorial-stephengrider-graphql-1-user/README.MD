# DB

[json-server](github.com/typicode/json-server)
npm install: npm i json-server
database: db.json
run: npm run json:server
browser: http://localhost:3000

---

# CODE

Express / GraphQL / Schema
run: nodemon server.js
browser: http://localhost:4000/graphql

---

## ROOT QUERY (ENTRY POINT) - returns user / company

- .id comes from query when query is made at (/graphql)
- axios reponse is an object with "data" property, its value is what is returned from request
- REQUIRED: "name", "fields", "resolve(parentValue, args){}"
- TYPE:
  purpose of the resolve() function is to resolve differences between database and graphql,
  eg. db has "companyId", but graphql we called it 'company', but its the code we put inside resolve() that figures out where to get the info from, we're just giving it a name 'company' but it needs its own implementation
- flow -> a query at /graphql is passed to schema.js

## mutation

- call a mutation from /graphql

```
  mutation {
    addUser(firstName:'Clark', age:26){
      id
      firstName
      age
    }
  }
```
