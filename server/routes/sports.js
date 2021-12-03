const router = require('express').Router();
const Sports = require('../model/Sport');

router.get('/', async (req, res) => {

    try {
        const sport = await Sports.find({});
        res.send(sport).status(200);
        return console.log("Send");
    }
    catch(err) {

        res.send(err).status(400);
        return ;
    }
});

module.exports = router; 