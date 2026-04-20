const mongoose = require('mongoose') //mongoose is a library that acts as a translator between your code and MongoDB. connect is the command to open the door to the database.

const {Schema}=mongoose;//Instead of typing mongoose.Schema every time, we are just grabbing the Schema tool from the Mongoose toolbox.This is called Destructuring

const UserSchema= new Schema({               //We are creating a new instance of a blueprint.
    name: {type: String , required :true},
    email: {type: String , required :true, unique: true},
    password: {type: String , required :true},
    date: {type: Date, default: Date.now},
})

module.exports= mongoose.model('user', UserSchema)//It "exports" the function so you can "import" it into your index.js file. 
//'user': This is the name of the Collection (table) in MongoDB.