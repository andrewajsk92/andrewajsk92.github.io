import React, { Component } from 'react';

import {ButtonToolbar, Button, ButtonGroup, Col,Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar.js';

import * as firebase from 'firebase';
// import NoImageIcon from './NoImageIcon.jpeg';
import UncontrolledCarousel from '../Tech/UncontrolledCarousel';



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
    rootRef.on("value", snap => {
    	var items = [];

    	snap.forEach((data) => {
    		var item = {
    			Title: data.val().Title,
    			Pics: data.val().Pics,
    			PostedDate: data.val().PostedDate,
    			Price: data.val().Price,
    			Availability: data.val().Availability,
          Buy: data.val().Buy,
          Key: data.key
    		}
    		items.push(item);
    		this.setState({items: items});
        // console.log(data.val());
    	})
    })
  }

  // onError(e){
  //   this.setState({
  //     Pics: "./NoImageIcon.jpeg"
  //   })
  // }

  render(){

    return (
    	<div>
        <Col xs={2}> 
          <h2>
            THIS IS SORTING
          </h2>
        </Col>

        <Col xs={10}>
        	<ButtonToolbar>
            <Link to="/NewPost" ><Button bsStyle="primary">New Post</Button></Link>
          </ButtonToolbar>

          <div>
            <SearchBar />
          </div>

          <Grid>
            <Row>
              <Col xs={1} md={4}></Col>
              <Col xs={4} md={4}>
                <ButtonGroup type="radio" name="options" defaultValue={1} className="BuySellButton">
                    <Button value={1} className="Testing"> Buy </Button>
                  <Button value={2}>Sell</Button>
                </ButtonGroup>
              </Col>
              <Col xs={1} md={4}></Col>
            </Row>
          </Grid>

		
      		HUH??
          {this.state.items.map((content, i) => 
      		  <Content key = {i} contentData = {content} />
          )}
        </Col>
    	</div>
    );
  }
}

class Content extends Component{
	render(){
    var BuyOrSell = "Buy";

		return (
			<ul>
				<li> <Link to={"Detail/" + BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link></li>
				<li> {this.props.contentData.Price}</li>
				<li> <UncontrolledCarousel Pics={this.props.contentData.Pics}/>
        </li>
				<li> {this.props.contentData.PostedDate} </li>
				<li> {this.props.contentData.Availability} </li>
        <li> {this.props.contentData.Key} </li>
			</ul>
		)
	}
}

export default Home


// <Content key = {i} contentData = {content} />





// {this.state.items.map((content, i) => 
//             <ul key={i}>
//               <li> {content.Title}</li>
//               <li> {content.Price}</li>
//               <li> <img src={content.Pics} onError={(e)=>{console.log("KKK"); e.target.src={NoImageIcon}}}/></li>
//               <li> {content.PostedDate} </li>
//               <li> {content.Availability} </li>
//             </ul>
//           )}