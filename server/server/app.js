require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;
const mongoDBPass = process.env.MONGODB_PASS;

mongoose.connect(`mongodb://Viktor:${mongoDBPass}@cluster0-shard-00-00-z75lf.mongodb.net:27017,cluster0-shard-00-01-z75lf.mongodb.net:27017,cluster0-shard-00-02-z75lf.mongodb.net:27017/graphql-tutorial?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
