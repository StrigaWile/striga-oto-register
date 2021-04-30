const mongoose = require('mongoose')
const StaffData = new mongoose.Schema({
userID: String,
manRegistry: Number,
womanRegistry: Number,
allRegistry: Number
});
module.exports = mongoose.model("StaffData", StaffData);