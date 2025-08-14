const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Build Schema 
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    age: String,
    phoneNumber: String,
    country: String,
}, { timestamps: true });
// Build Model
const MyData = mongoose.model("CustomerData", userSchema);
module.exports = MyData;