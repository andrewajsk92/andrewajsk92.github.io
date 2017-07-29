import React, {Component} from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class NewPost extends Component{

	constructor(props){
		super(props);
		this.state = {
			Title: '',
			Pics: '',
			Price: '',
		}
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangePics = this.handleChangePics.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.addPost = this.addPost.bind(this);

	}

	addPost (){
		const rootRef = firebase.database().ref().child('Buy');
		var item = {
			Title: this.state.Title,
			Pics: this.state.Pics,
			PostedDate: new Date().toString(),
			Price: this.state.Price,
			Availability: true
		}
		rootRef.push(item);
		console.log("PUSHED WTF");
	}

	handleChangeTitle(event){
		this.setState({Title: event.target.value});
	}

	handleChangePics(event){
		this.setState({Pics: event.target.value});
	}

	handleChangePrice(event){
		this.setState({Price: event.target.value});
	}

	handleSubmit(event){
		console.log("WUT");
	}

	render(){

		return(
			<div>
				<form onSubmit={this.addPost} className="form-horizontal center-children">
					<div className="container">
						<div>
						  	<label><b>Title*</b></label>
						    <input type="text" placeholder="Enter Title" value={this.state.Title} onChange={this.handleChangeTitle} required/>
						</div>
						
						<div>
						    <label><b>Pics</b></label>
						    <input type="text" placeholder="Enter Institution" id="pics" name="institution" value={this.state.Pics} onChange={this.handleChangePics}/>
						</div>

						<div>
						    <label><b>Desirable Price*</b></label>
						    <input type="password" placeholder="Enter Password" id="price" name="password" value={this.state.Price} onChange={this.handleChangePrice} required/>
						</div>

				    <div>
				    	<ButtonToolbar>
							<Button type="submit" value="Submit" bsStyle="primary">Post</Button>
							<Button>Cancel</Button>
					    </ButtonToolbar>
			    	</div>
					</div>
				</form>
			</div>
		)
	}
}

export default NewPost;

// <button type="submit" className="btn btn-primary center large-height">Sign Up</button>


