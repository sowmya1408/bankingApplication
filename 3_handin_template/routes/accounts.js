const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const db = require("../../2_database/db");


//Endpoint for all users
router.get('/', async (req, res) => {
        // 1. return accounts from database instead
        try {
            db.getConnection().then(async () => {
                // if a connection was successfully achieved
                // find and execute are two functions, that called in succession will first describe how to find elements, and then execute the query
                let accounts = await Account.find().exec();
                console.log(accounts);  
                res.json(accounts);  
        })

        }catch (err) {
            console.log(`err: ${err}`)
        }
       
    
});

//Endpoint for adding user
router.post('/', async (req, res) => {
    try{
        const {firstname, lastname, balance, branch, accountType} = req.body;
        db.getConnection().then(async () => {
    
        const user = new Account({
            //enter correct fields
            firstname, lastname, balance, branch, accountType
        });
        user.save()
        res.json(user);
    })
    } catch(err){
        console.log(`err: ${err}`)
    }

});

// Implement a new endpoint, that will be able to return a specific account by id. 
// instead of just printing, return the actual account. 
router.get('/:id', async (req, res) => {
    try {
        db.getConnection().then(async () => {

           let account = await Account.find({_id: req.params.id})
           res.json(account);
                  
        })
       
    } catch (err) {
        console.log({ message: err })
    };
});


module.exports = router;