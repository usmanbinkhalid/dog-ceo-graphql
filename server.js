const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const app = express();

const schema = require('./gql/schema');

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000);
