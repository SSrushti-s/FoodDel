const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => { //developers use POST even for fetching data because it’s easier to send complex filters in the req.body
    try {
        // We send the global data we fetched in db.js
        // Sending two arrays: Food Items and Food Categories
        res.json([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;