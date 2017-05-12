var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	task = require("./task"),
	path = require("path"),
	app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));


app.get("/", function(req,res){
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/task", function(req, res){
	var task = new task ({
		name: req.body.taskName,
		description: req.body.desc,
		date: new Date()
	});

	task.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/data");
		}

	});
});

app.get("/data", function(req, res){
	task.find({}, function(err, data){
		res.json(data);
	});
});

mongoose.connect("mongodb://localhost/task");

app.listen(8080);

console.log("server is running");