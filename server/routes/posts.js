const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../model/User');

router.get('/', verify, (req, res) => {

    const id = req.body._id;
    User.findById(id, (err, user) => {

        if(err) return res.status(400).send('Invalid access token');

        console.log(user);
        return res.status(200).send('OK');
    });
});

module.exports = router; 