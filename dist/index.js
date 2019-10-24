"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Post = require("./models/Post");

var _Post2 = _interopRequireDefault(_Post);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.connect("mongodb://localhost/blog");

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post("/posts", function (req, res) {
	var data = req.body;

	var post = new _Post2.default({
		title: data.title,
		text: data.text
	});

	post.save().then(function () {
		res.send({ status: "ok" });
	});
});

app.get("/posts", function (req, res) {
	_Post2.default.find().then(function (err, posts) {
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

app.listen(3000, function () {
	console.log("SERVER STARTED!");
});