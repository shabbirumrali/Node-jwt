const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

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

// set cookies
app.get('/set', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie("newUser", true);
})

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);