//import express package
const express = require("express")
//import mongoose to connect to db
const mongoose = require("mongoose")
//import routes to get all routes
const routes = require("./routes")
//import body-parser to request body into JSO
const bodyParser = require("body-parser")

//connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017", {useNewUrlParser: true})
	.then(() => {
		//create an express instance
		const app = express()
		//middleware to parse JSON body
		app.use(bodyParser.json())
		//registering the routes
		//app.use("./user", routes)
		app.use(bodyParser.urlencoded({
			extended: true
		}))
		app.post("/users", function(req, res){
			console.log(req.body)
			res.status(200).send(req.body)
		})
		//server at port 5000
		app.listen(5000, () =>{
			console.log("Server has started!")
		})
	})


