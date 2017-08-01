import React,{Component} from 'react'
import TodoItem from './todoItem.js'

export default class TodoList extends Component{
	constructor(){
		super()
	}

	render(){
		const todoItems=this.props.todoList.length?this.props.todoList.map((item,index)=>(
				<TodoItem key={index} content={item.content} date={item.date} deleteItem={this.props.deleteItem} />
			)
		):'暂无代办事项'
		return (
			<div>
				{todoItems}
			</div>
		)
	}
}