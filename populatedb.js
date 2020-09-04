#! /usr/bin/env node

console.log('This script populates some test users to your database.');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const async = require('async');
const faker = require('faker');
const mongoose = require('mongoose');
const User = require('./server/models/user');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];

// eslint-disable-next-line camelcase
const userCreate = (first_name, family_name, cb) => {
  const userdetail = { first_name, family_name };

  const user = new User(userdetail);

  user.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New User: ${user.family_name}`);
    users.push(user);
    cb(null, user);
  });
};

async.times(5, (n, next) => {
  userCreate(faker.name.firstName(), faker.name.lastName(), (err, user) => {
    next(err, user);
  });
}, (err, data) => {
  if (err) {
    console.log(`FINAL ERR: ${err}`);
  } else {
    console.log(`UserInstances: ${data}`);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
