const mongoose=require("mongoose")//Node.js speaks JavaScript, and MongoDB speaks BSON/Documents.
//  Mongoose sits in the middle so you can use simple JavaScript commands to manage your data.

const mongoURI= process.env.mongoURI; // Use the environment variable for the MongoDB URI
const mongoDB= async() => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB!!");

    const fetched_data = mongoose.connection.db.collection("food_item");
    const data = await fetched_data.find({}).toArray();
    
    // Fetch Food Categories
    const foodCategory = mongoose.connection.db.collection("food_category");
    const catData = await foodCategory.find({}).toArray();

    // CRITICAL: Assign to global so other files can see them
    global.food_items = data;
    global.foodCategory = catData;

    console.log("Data loaded into globals:", global.food_items.length, global.foodCategory.length);
}

module.exports = mongoDB