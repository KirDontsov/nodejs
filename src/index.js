import mongoose from "mongoose";
import PostModel from "./models/Post";
import express from "express";
import bodyParser from "body-parser";

import Post from "./models/Post";

const app = express();
mongoose.connect("mongodb://localhost/blog");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/posts", (req, res) => {
	const data = req.body;

	const post = new PostModel({
		title: data.title,
		text: data.text
	});

	post.save().then(() => {
		res.send({ status: "ok" });
	});
});

app.get("/posts", (req, res) => {
	Post.find().then((err, posts) => {
		if (err) {
			res.send(err);
		}
		res.json(posts);
	});
});

// app.use(cors());

// app.get("/posts", Post.index);
// app.post("/posts", Post.create);
// app.get("/posts/:id", Post.read);
// app.delete("/posts/:id", Post.delete);
// app.patch("/posts/:id", Post.update);

app.listen(3000, () => {
	console.log("SERVER STARTED!");
});
