const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const app = express();
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wjvri.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
);
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static('images'));
app.use('/profile-images', express.static('profile_pictures'));
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
