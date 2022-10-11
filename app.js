const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://shabbir:1234@nodejwt.re9kr4c.mongodb.net/jsonwebtoken?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    console.log("database connected");
    app.listen(8000);
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// set cookie
app.get('/set-cookie', (req, res) => {
  // res.setHeader('Set-Cookie', "newUser=true");
  res.cookie('user', true);
  res.cookie('isEmployee', true);
  res.send("you have got cookies");
})

// read cookie
app.get('/read-cookie', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})