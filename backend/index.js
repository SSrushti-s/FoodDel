const path = require('path');
// This forces Node to look exactly in your current folder for the .env file
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express')// first we import express framework
const app = express()// then we create an instance "app" which is an object of express
const port = 5000 // we define the port number for the backend
const mongoDB = require("./db") //we import the database connection we created in db.js file
const cors=require('cors');
app.use(cors())
// step 1:We connect to the Database
mongoDB();

// Step 2: Middleware (The Security Guards)
// This allows your Frontend (usually port 3000) to talk to Backend (port 5000)
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});

// Step 3: Parse JSON (The Translator)
// This lets the server read 'req.body'
app.use(express.json())

// Step 4: Define Routes (The Map)
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));
app.use('/api/payment', require("./routes/Payment"));

app.get('/', (req, res) => {
  res.send('Hello World! Kitchen is Open.')
})
// Step 5: Listening to the server for requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})