const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const db = require("../../2_database/db");

//Endpoint for all users
router.get("/", async (req, res) => {
  // 1. return accounts from database instead
  try {
    db.getConnection().then(async () => {
      // if a connection was successfully achieved
      // find and execute are two functions, that called in succession will first describe how to find elements, and then execute the query
      let accounts = await Account.find().exec();
      res.json(accounts);
    });
  } catch (err) {
    console.log(`err: ${err}`);
  }
});

//Endpoint for adding user
router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, balance, branch, accountType } = req.body;
    db.getConnection().then(async () => {
      const user = new Account({
        //enter correct fields
        firstname,
        lastname,
        balance,
        branch,
        accountType,
      });
      user.save();
      res.json(user);
    });
  } catch (err) {
    console.log(`err: ${err}`);
  }
});

// Implement a new endpoint, that will be able to return a specific account by id.
// instead of just printing, return the actual account.
router.get("/:id", async (req, res) => {
  try {
    db.getConnection().then(async () => {
      let account = await Account.findById(req.params.id);
      res.json(account);
    });
  } catch (err) {
    console.log({ message: err });
  }
});

router.get("/mybalance/:id", async (req, res) => {
  try {
    db.getConnection().then(async () => {
      const account = await Account.findById(req.params.id);
      res.send(
        `Hi, ${account.firstname} the balance of your account is: ${account.balance}Dkk `
      );
    });
  } catch (err) {
    console.log({ message: err });
  }
});

// update account request deposit/withdraw

router.post("/:id", async (req, res) => {
    try {
      db.getConnection().then(async () => {
          const {deposit} = req.body;
          const {withdraw} = req.body;
          await Account.findById({ _id: req.params.id }, (err, user) => {
            if (err)
            console.log(err);
        else
          if(deposit) {
            user.balance += Number(deposit);
            user.save();
            return res.send(' Amount deposited  successfully');
          } else if(user.balance >= Number(withdraw) && withdraw) {
              user.balance -= Number(withdraw);
              user.save();
              return res.send('Amount withdraw successfully');
          } else {
              return res.send('No amount found');
          }
          })
      });
    } catch (err) {
      console.log({ message: err });
    }
  });

// Transfer money from one account to another.

router.post('/transaction/:senderId', async(req, res) => {
    try {
db.getConnection().then(async () => {
    const {amount} = req.body;
    const {receiptId} = req.body; 
  await Account.findById({ _id: req.params.senderId }, async (err, user) => {
        if (err)
            console.log(err);
        else
    await  Account.findById({ _id: receiptId }, (err, receipt) => {
                if (err)
                    console.log(err);
                else
                if (user.balance >= Number(amount)) {
                    user.balance -= Number(amount);
                    user.save();
                    receipt.balance += Number(amount);
                    receipt.save();
                    return res.send('transaction completed successfully');
                } else {
                    return res.send('Balance is low')
                }
            })
    })
})
} catch(err) {
    console.log(err)
}
  
})

// Delete account
router.delete("/:id", async (req, res) => {
  try {
    db.getConnection().then(async () => {
      await Account.deleteOne({ _id: req.params.id });
      res.send(`account deleted successfully`);
    });
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
