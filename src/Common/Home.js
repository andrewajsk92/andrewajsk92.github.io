import React, { Component } from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyBuY9y2xC_54QCn-R42fe7z1yTAoM-eJNk",
    authDomain: "buyandsell-449e9.firebaseapp.com",
    databaseURL: "https://buyandsell-449e9.firebaseio.com",
    projectId: "buyandsell-449e9",
    storageBucket: "buyandsell-449e9.appspot.com",
    messagingSenderId: "993095145852"
};
firebase.initializeApp(config);



class Home extends Component {
	constructor(){
        super();
        this.state = {
        	items: []
        }
    }

	componentDidMount(){
		const rootRef = firebase.database().ref().child('Buy');
        // const rootRef = firebase.database().ref().child('Buy');
        // const priceRef = rootRef.child('BuyItem1');
        rootRef.on("value", snap => {
        	var items = [];

        	snap.forEach((data) => {
        		var item = {
        			Title: data.val().Title,
        			Pics: data.val().Pics,
        			PostedDate: data.val().PostedDate,
        			Price: data.val().Price,
        			Availability: data.val().Availability
        		}
        		items.push(item);
        		this.setState({items: items});
        	})



        })
        // priceRef.on('value', snap => {
        //     this.setState({
        //         speed: snap.val()
        //     });
        // });
    }

    render(){

        return (
        	<div>
	        	<ButtonToolbar>
					<Link to="/NewPost" ><Button bsStyle="primary">New Post</Button></Link>

			    </ButtonToolbar>
        		HUH??
        		{this.state.items.map((content, i) => 
        			<Content key = {i} contentData = {content} />
        		)}
        	</div>
        );
    }
}

class Content extends Component{
	render(){
		return (
			<ul>
				<li> {this.props.contentData.Title}</li>
				<li> {this.props.contentData.Price}</li>
				<li> {this.props.contentData.Pics} </li>
				<li> {this.props.contentData.PostedDate} </li>
				<li> {this.props.contentData.Availability} </li>
			</ul>
		)
	}
}

export default Home