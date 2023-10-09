const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./server/config');
const apiRoutes = require('./server/routes');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 100,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(config.database, options);
mongoose.set('useFindAndModify', false);
app.set('superSecret', config.server_secret);

app.use('/api', apiRoutes);

app.listen(port);
console.log(`InFeedo is running on http://localhost:${port}`);