const mongoose = require('mongoose')
const UserData = mongoose.Schema({
userID: String,
userMod: String,
userName: String,
userNick: String,
userSex: String,
userRole: String,
userRegisterDate: String,
penalPoint: String
})
module.exports = mongoose.model("UserData", UserData);