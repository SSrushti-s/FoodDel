const mongoose= require('mongoose') //mongoose: The name we give to the tool we are importing. require('mongoose'): This is the "Import Command." It tells Node.js to go into your node_modules folder, find the Mongoose library, and bring its power into this file so we can talk to MongoDB.

const {Schema}= mongoose; //{ Schema }: This is Destructuring. Mongoose has many tools (like a giant toolbox). We are saying: "I only need the 'Schema' tool right now." It's a shorthand so you don't have to type mongoose.Schema later.

const OrderSchema= new Schema({    //new Schema: This is a "Constructor." We are creating a brand new structure. Think of this as drawing the empty boxes on a form that a user will eventually fill out.
    email:{type:String , required:true , unique:true},
    order_data: {type:Array , required:true}
});

module.exports=mongoose.model('orders', OrderSchema)