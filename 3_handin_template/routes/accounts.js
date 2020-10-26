const express = require('express');
const router = express.Router();
const Account = require('../models/account');

//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        // 1. return accounts from database instead
        res.end("This is the GET endpoint on accounts")
    } catch (err) {
        console.log({message: err})
    };
});

//Endpoint for adding user
router.post('/', async (req, res) => {
    const user = new Account({
        //enter correct fields
    });

    res.json(user);
});

// Implement a new endpoint, that will be able to return a specific account by id. 
// instead of just printing, return the actual account. 


module.exports = router;