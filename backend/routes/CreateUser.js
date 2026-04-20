const express = require('express'); //We need Express to use its routing features.
const router = express.Router(); //Instead of using app.post, we use router.post. This allows this file to be plugged into index.js later.
const User = require('../models/User'); //This is your Model. We need it to actually save data into MongoDB.
const jwt = require('jsonwebtoken') // JWT is defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. 
const jwtSecret='FullStack_MERN_app' //The SECRET_KEY is a long, random string of text that only the server knows.

//Creating a new user into mongoDB
router.post("/createuser", async (req, res) => { //Listens for a "Create" request.
    try {//to take the data from req.body and save it as a new document in MongoDB.
        await User.create({ //We use await because saving to a database takes time.
            name: req.body.name, 
            password: req.body.password,
            email: req.body.email
        });
        
        res.json({ success: true }); // success in updating new entry
    } catch (error) {
        console.log(error);
        res.json({ success: false }); // failure
    }
});

// Login part
router.post("/loginuser", async (req, res) => {
    let email = req.body.email;
    try {
        // Step 1: Find the user by email
        let userData = await User.findOne({ email }); 
        
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }

        // Step 2: Compare the password 
        if (req.body.password !== userData.password) {
            return res.status(400).json({ errors: "Try checking your Password or Username" });
        }
        const data = { user: { id: userData.id } };
        const authtoken = jwt.sign(data, jwtSecret);
        // Step 3: Send success
        return res.json({ success: true, authToken: authtoken });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});
module.exports = router;