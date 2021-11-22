const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user) {

    return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: '1m'});
}

function generateRefreshToken(user) {

    return jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET, {expiresIn: '60m'});
}

//req contains email password and username
router.post('/register', async (req, res) => {

    //Check if email/username exists in database
    const checkEmail = await User.findOne({email: req.body.email});
    if(checkEmail)
        return res.status(400).send('Email exists');
    
    const checkUsername = await User.findOne({username: req.body.username});
    if(checkUsername)
        return res.status(400).send('Username exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({

        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        refreshToken: ''
    });

    try {

        const savedUser = await user.save();
        console.log("User created");
        res.send(savedUser);
    }
    catch(err) {

        res.status(400).send(err);
    }
});

//req contains email and password
router.post('/login', async (req, res) => {

    //Check if the email already exists
    const logedUser = await User.findOne({email: req.body.email});
    if(!logedUser)
        return res.status(500).send('Invalid email address');

    //Check if the passwords match
    const validPass = await bcrypt.compare(req.body.password, logedUser.password);
    if(!validPass) 
        return res.status(501).send('Invalid password');
    
    //Create jwt token and refresh token
    const token = generateAccessToken(logedUser);
    const refreshToken = generateRefreshToken(logedUser);

    //update refresh token in the database
    await User.updateOne({ _id: logedUser._id }, {refreshToken: refreshToken});

    //send the refresh token to the user
    res.send({refreshToken: refreshToken, username: logedUser.username, _id: logedUser._id, accessToken: token});
});

//req contains only the refresh token
router.post('/token', async (req, res) => {

    //get the refresh token from the body
    const refreshToken = req.body.token;

    //if there is not refresh token in the DB then send 400
    const checkUser = await User.findOne({refreshToken: refreshToken});
    if(!checkUser) return res.status(400).send('Invalid refresh token');

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {

        if(err) return res.sendStatus(400);
        const accessToken = generateAccessToken(user);
        //create and send the new access token back to the user
        res.send(accessToken);
    })
});

//req contains only the id of the user
router.delete('/logout', async (req, res) => {

    //delete refresh token from the DB
    try {

        await User.updateOne({ _id: req.body._id }, {refreshToken: ''});
        res.status(200).send('Logout successful');
    }
    catch(err) {

        res.status(400).send('Invalid logout operation')
    }
});

module.exports = router;