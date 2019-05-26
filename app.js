const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const dynamicFormRoutes = require('./routes/dynamic-form');
const postsRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/maarch', { useNewUrlParser: true });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/dynamic-form', dynamicFormRoutes);
app.use('/api/posts', postsRoutes);


module.exports = app;
