var mongoose=require("mongoose")
var TodoSchema=require("../schemas/todo.js")
var Todo=mongoose.model("TodoModel",TodoSchema)

module.exports=Todo