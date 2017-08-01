var express = require('express');
var router = express.Router();
var Todo=require('../src/models/todo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/getAllItems",function(req,res,next){
	Todo.find({}).sort({'date':-1}).exec((err,todoList)=>{
		if(err){
			console.log("router NO"+err)
		}else{
			res.json(todoList)
		}
	})
});

router.post("/addItem",function(req,res,next){
	let newItem=req.body;
	Todo.create(newItem,(err)=>{
		if(err){
			console.log(err)
		}else{
			Todo.find({},function(err,todoList){
				if(err){
					console.log(err)
				}else{
					res.json(todoList)
				}
			})
		}
	})
});

router.post("/deleteItem",function(req,res,next){
	let delete_date=req.body.date
	Todo.remove({date:delete_date},function(err,result){
		if(err){
			console.log(err)
		}else{
			res.json(result)
		}
	})
});

module.exports = router;
