import React,{Component} from 'react'
import $ from 'jquery'
import TodoList from './components/todoList.js'


export default class Todo extends Component{
	constructor(){
		super()
		this.state={
			todoList:[],
			showTooltip:false
		}
	}

	componentDidMount(){
		this.getTodoList()
	}

	getTodoList(){
		const myFetchOptions={
			method:'GET'
		}
		fetch('/getAllItems',myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				todoList:json
			})
		})
	}

	handleSubmit(event){
		event.preventDefault();

		if(this.input.value===''){
			this.input.focus();
			this.setState({
				showTooltip:true
			})
			return;
		}

		let month = new Date().getMonth() + 1;
		let date = new Date().getDate();
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();

		if (hours < 10) { hours = '0'+hours; }
		if (minutes < 10) { minutes = '0'+minutes; }
		if (seconds < 10) { seconds = '0'+seconds; }

		const newItem={
			content:this.input.value,
			date:month+'/'+date+" "+hours+':'+minutes+":"+seconds
		}

		this.addItem(newItem)
		this.todoForm.reset();
		this.setState({
			showTooltip:false
		})
	}

	addItem(newItem){
		const that = this;
		$.ajax({
			url: '/addItem',
			type: 'post',
			dataType: 'json',
			data: newItem,
			success: data => {
				const todoList = that.todoSort(data);
				that.setState({ 
					todoList :todoList
				});
			},
			error: err => {
				console.log(err);
			}
		})
	}

	todoSort(data){
		data.reverse();
		return data;
	}

	deleteItem (date) {
		const that = this;
		const postData = { 
			date: date 
		};
		$.ajax({
			url: '/deleteItem',
			type: 'post',
			dataType: 'json',
			data: postData,
			success: data => {
				this.getTodoList();
			},
			error: err => {
				console.log(err);
			}
		})
	}

	render(){
		return (
	  		<div className="container">
				<h2 className="header">Todo List</h2>
				<form className="todoForm" ref={(todoForm)=>this.todoForm=todoForm} onSubmit={ this.handleSubmit.bind(this) }>
					<input ref={(input)=>this.input=input} type="text" placeholder="Type content here..." className="todoContent" />
					{ 
						this.state.showTooltip ?<span className="tooltip">Content is required !</span>:""
					}
				</form>
				<TodoList todoList={this.state.todoList} deleteItem={this.deleteItem.bind(this)} />
	  		</div>
		)
	}
}