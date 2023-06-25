const express = require('express');
// import { graphqlHTTP } from 'express-graphql'; // ES6
const { graphqlHTTP } = require('express-graphql'); // CommonJS

const schema = require('./schema/schema');

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('listening on port 4000');
});
