const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const posts = require('./routes/posts');

//Connect to DB
mongoose.connect(process.env.DB, {useNewUrlParser: true}, (err) => {
    if(err) return console.log("Error");
    
    console.log('Connected to DB')
});

//Import routes
const authRoute = require('./routes/auth');

//Middleware
app.use(express.json());
app.use(cors({

    origin: "http://localhost:3000"
}))

//Route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', posts);

app.listen(5000, () => {

    console.log('Running');
})