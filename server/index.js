const express = require('express');
const mongoose = require('mongoose');
const Users = require("./model/admin");
const postmodel = require("./model/post")
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require('./router/routes');
const MongoStore = require('connect-mongo');
const session = require("express-session");

const app = express();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:1001', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}));


// Session middleware (without MongoStore)
app.use(session({
  secret: "ddklddkldkldkldkl", // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/ref', // MongoDB URL
    collectionName: 'sessions', // Optional: name of the collection to store sessions
  }),
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24,sameSite: 'lax'} // 30 minutes; change to `secure: true` for production
}));


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Use the router for routing
app.use("/", router);

// Start the server
app.listen(4999, () => {
  console.log('Server is running on port 4999');
});
