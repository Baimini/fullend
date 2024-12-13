const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {type: String,},
    company: {type: String,},
    username: {type: String,},
    email: {type: String,},
    address: {type: String,},
    zip: {type: String,},
    state: {type: String,},
    country: {type: String,},
    phone: {type: String,},
    photo: {type: String,},
    avatar: {type: String,},
    cloudinary_id: {type: String,},
});

module.exports = mongoose.model("KNU-MongoDB", userSchema);