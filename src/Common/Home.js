import React, { Component } from 'react';

// import {ButtonToolbar, Button, ButtonGroup, Col,Grid, Row } from 'react-bootstrap';

import {Button, Icon, Col, Row} from 'react-materialize';

import { Link } from 'react-router-dom';

import SearchBar from './SearchBar.js';

import * as firebase from 'firebase';
// import NoImageIcon from './NoImageIcon.jpeg';
import UncontrolledCarousel from '../Tech/UncontrolledCarousel';





const user = firebase.auth().currentUser;

class Home extends Component {
	constructor(props){
    super(props);
    this.state = {
    	BuyItems: [],
      SellItems: [],

      BuyOrSell: 'Buy',
      SortPrice: 'Increasing',
      Recent: 'MostRecent'
    }
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);
    this.handleSortPrice = this.handleSortPrice.bind(this);
    this.handleRecent = this.handleRecent.bind(this);
  }

  componentDidMount(){
    // const BuyOrSell = 'Buy';
    const buyRef = firebase.database().ref().child('Buy');
    const sellRef = firebase.database().ref().child('Sell');

    buyRef.on("value", snap => {
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
    		this.setState({BuyItems: items});
        // console.log(data.val());
    	})
    })

    sellRef.on("value", snap => {
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
        this.setState({SellItems: items});
        // console.log(data.val());
      })
    })
  }

  handleBuyOrSell(e){
    this.setState({
      BuyOrSell: e.target.value
    })
  }

  handleSortPrice(e){
    this.setState({
      SortPrice: e.target.value,
      BuyItems: this.state.BuyItems.sort((a, b) => {
        if(e.target.value === 'Increasing'){ 
          return a.Price - b.Price;
        } else {
          return b.Price - a.Price;
        }
      }),

      SellItems: this.state.SellItems.sort((a, b) => {
        if(e.target.value === 'Increasing'){ 
          return a.Price - b.Price;
        } else {
          return b.Price - a.Price;
        }
      })
    })
  }

  handleRecent(e){
    this.setState({
      Recent: e.target.value,
      BuyItems: this.state.BuyItems.sort((a, b) => {
        if(e.target.value === 'MostRecent'){
          console.log("MOST");
          return a.PostedDate < b.PostedDate;
        } else {
          console.log("LEAST");
          return b.PostedDate >= a.PostedDate;
        }
      }),
      SellItems: this.state.SellItems.sort((a, b) => {
        if(e.target.value === 'MostRecent '){ 
          return a.PostedDate < b.PostedDate;
        } else {
          return b.PostedDate >= a.PostedDate;
        }
      })
    })
  }

  render(){
    // console.log(this.state.BuyItems);
    // console.log(this.state.SellItems);
    // console.log(firebase.auth().currentUser);
    return (
    	<div>
        <Col s={2}> 
          <div>
            <form>
              <label> <input type="radio" value="Increasing" checked={this.state.SortPrice ==='Increasing'}  onChange={this.handleSortPrice}/> Increasing </label>
              <label> <input type="radio" value="Decreasing" checked={this.state.SortPrice === 'Decreasing'} onChange={this.handleSortPrice}/> Decreasing </label>
            </form>
          </div>

          <div>
            <form>
              <label> <input type="radio" value="MostRecent" checked={this.state.Recent ==='MostRecent'}  onChange={this.handleRecent}/> Most Recent </label>
              <label> <input type="radio" value="LeastRecent" checked={this.state.Recent === 'LeastRecent'} onChange={this.handleRecent}/> Least Recent </label>
            </form>
          </div>
        </Col>

        <Col s={10}>
          {firebase.auth().currentUser !== null ? (<Link to="/NewPost" ><Button>New Post</Button></Link>) : ('')}

          <Row>
            <Col s={4} m={4}></Col>
            <Col s={4} m={4}>
              <form>
                <label> <input type="radio" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.handleBuyOrSell}/> Buy </label>
                <label> <input type="radio" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.handleBuyOrSell}/> Sell </label>
              </form>
              {this.state.BuyOrSell}

            </Col>
            <Col s={4} m={4}></Col>
          </Row>

          <div>
            {this.state.BuyOrSell === 'Buy' ? (
              <div>
              <h3> HIHIHI </h3>
              <SearchBar items={this.state.BuyItems} BuyOrSell={this.state.BuyOrSell}/>
              </div>
            ) : (
              <div>
              <h4> BYEBYE </h4>
              <SearchBar items={this.state.SellItems} BuyOrSell={this.state.BuyOrSell}/>
              </div>
            )
            }
          </div>
     
        </Col>
    	</div>
    );
  }
}

export default Home;







// <ButtonGroup type="radio" name="options" defaultValue={1} className="BuySellButton">
//                   <Button value={1} className="Testing"> Buy </Button>
//                   <Button value={2}>Sell</Button>
//                 </ButtonGroup>





// HUH??

// {this.state.items.map((content, i) => 
//             <Content key = {i} contentData = {content} />
//           )}

// class Content extends Component{
// 	render(){
//     var BuyOrSell = "Buy";

// 		return (
// 			<ul>
// 				<li> <Link to={"Detail/" + BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link></li>
// 				<li> {this.props.contentData.Price}</li>
// 				<li> <UncontrolledCarousel Pics={this.props.contentData.Pics}/>
//         </li>
// 				<li> {this.props.contentData.PostedDate} </li>
// 				<li> {this.props.contentData.Availability} </li>
//         <li> {this.props.contentData.Key} </li>
// 			</ul>
// 		)
// 	}
// }



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