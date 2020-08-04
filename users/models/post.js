const mongoose = require("mongoose")

//constructing schema fields-data type
const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	permissionLevel: Number
})

//new model based on our schema
module.exports = mongoose.model("Post", userSchema)


