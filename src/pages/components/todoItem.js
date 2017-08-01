import React,{Component} from 'react'

export default class TodoItem extends Component{
	constructor(){
		super()
	}

	handleDelete(){
		this.props.deleteItem(this.props.date)
	}

	render(){
		return (
			<div className="todoItem">
				<p>
					<span className="itemCont">{ this.props.content }</span>
					<span className="itemTime">{ this.props.date }</span>
					<button className="delBtn" onClick={this.handleDelete.bind(this)}>X</button>
				</p>					
			</div>
		)
	}
}