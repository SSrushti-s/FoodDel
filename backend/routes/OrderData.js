const express = require('express'); // to handle web traffic
const router = express.Router(); //A specific function inside Express that creates an isolated "mini-app."
const Order = require('../models/Order'); //Importing the Order Model so we can actually save data to the database.

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data; // Creating a variable data to hold the list of food items the user just sent from their cart.
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            res.send("Server Error", error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                });
        } catch (error) {
            res.send("Server Error", error.message);
        }
    }
});

module.exports = router;