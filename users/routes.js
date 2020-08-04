//import express
const express = require("express")
//import post to get route
const Post = require("./models/post")
//specifically using router to register routes
const router = express.Router()

//fetching all the posts and sending the result
router.get ("/posts", async(req, res) => {
	const posts = await Post.find()
	res.send(posts)
})

module.exports = router

//creating a post object to populate the db
router.post("/posts", async(req, res) => {
	const post = new Post({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		permissionLevel: reg.body.permissionLevel
	})
	//saving the record
	await post.save()
	res.send(post)
})
