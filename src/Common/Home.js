import React, { Component } from 'react';

// import {ButtonToolbar, Button, ButtonGroup, Col,Grid, Row } from 'react-bootstrap';

import {Button, Col, Row, Input} from 'react-materialize';

import { Link } from 'react-router-dom';

import SearchBar from './SearchBar.js';

import * as firebase from 'firebase';
// import NoImageIcon from './NoImageIcon.jpeg';
// import UncontrolledCarousel from '../Tech/UncontrolledCarousel';





class Home extends Component {
	constructor(props){
    super(props);
    this.state = {
      items: [],
    	BuyItems: [],
      SellItems: [],
      BuyOrSell: 'Buy',

      SortPrice: 'Increasing',
      SortDate: 'AnyTime'
    }
    this.componentDidMount = this.componentDidMount.bind(this);

    this.handleSortPrice = this.handleSortPrice.bind(this);
    this.handleSortDate = this.handleSortDate.bind(this);
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);

  }

  componentDidMount(){
    // const BuyOrSell = 'Buy';
    const buyRef = firebase.database().ref().child('Buy');
    const sellRef = firebase.database().ref().child('Sell');

    buyRef.on("value", snap => {
    	let items = [];
      let counter = 0;
      let numChildren = snap.numChildren();

    	snap.forEach((data) => {
        let item = [];
        if(data.val().Pics === null || data.val().Pics === undefined || data.val().Pics === []){
      		item = {
      			Title: data.val().Title,
      			Pics: data.val().Pics,
      			PostedDate: data.val().PostedDate,
      			Price: data.val().Price,
      			Availability: data.val().Availability,
            BuyOrSell: data.val().BuyOrSell,
            Key: data.key,
            OriginalPoster: data.val().OriginalPoster,
            Description: data.val().Description
      		}
        } else{
          item = {
            Title: data.val().Title,
            Pics: Object.keys(data.val().Pics).map((key) => {
              return data.val().Pics[key]
            }),
            PostedDate: data.val().PostedDate,
            Price: data.val().Price,
            Availability: data.val().Availability,
            BuyOrSell: data.val().BuyOrSell,
            Key: data.key,
            OriginalPoster: data.val().OriginalPoster,
            Description: data.val().Description
          }
        }
    		items.push(item);
    		// this.setState({BuyItems: items});
        counter = counter + 1;
        // console.log(data.val());
        if(counter === numChildren){
          this.setState({
            BuyItems: items.sort((a, b) => {
              return a.Price - b.Price;
            }),
            items: items.sort((a, b) => {
              return a.Price - b.Price;
            })
          })
        }
    	})
    })

    sellRef.on("value", snap => {
      let items = [];
      let counter = 0;
      let numChildren = snap.numChildren();

      snap.forEach((data) => {
        let item = [];
        if(data.val().Pics === null || data.val().Pics === undefined || data.val().Pics === []){
          item = {
            Title: data.val().Title,
            Pics: data.val().Pics,
            PostedDate: data.val().PostedDate,
            Price: data.val().Price,
            Availability: data.val().Availability,
            BuyOrSell: data.val().BuyOrSell,
            Key: data.key,
            OriginalPoster: data.val().OriginalPoster,
            Description: data.val().Description
          }
        } else {
          item = {
            Title: data.val().Title,
            Pics: Object.keys(data.val().Pics).map((key) => {
              return data.val().Pics[key]
            }),
            PostedDate: data.val().PostedDate,
            Price: data.val().Price,
            Availability: data.val().Availability,
            BuyOrSell: data.val().BuyOrSell,
            Key: data.key,
            OriginalPoster: data.val().OriginalPoster,
            Description: data.val().Description
          }
        }

        
        items.push(item);
        this.setState({SellItems: items});
        // console.log(data.val());

        counter = counter + 1;
        // console.log(data.val());
        if(counter === numChildren){
          this.setState({
            SellItems: items.sort((a, b) => {
              return a.Price - b.Price;
            })
          })
        }
      })
    })
  }

  

  handleSortPrice(e){
    this.setState({
      SortPrice: e.target.value,
      BuyItems: this.state.BuyItems.sort((a, b) => {
        if(e.target.value === 'Increasing'){ 
          console.log("INCR");
          return a.Price - b.Price;
        } else {
          console.log("DECR");
          return b.Price - a.Price;
        }
      }),

      SellItems: this.state.SellItems.sort((a, b) => {
        if(e.target.value === 'Increasing'){ 
          return a.Price - b.Price;
        } else {
          return b.Price - a.Price;
        }
      }),

      items: this.state.items.sort((a, b) => {
        if(e.target.value === 'Increasing'){ 
          console.log("INCR");
          return a.Price - b.Price;
        } else {
          console.log("DECR");
          return b.Price - a.Price;
        }
      })
    })
  }

  handleSortDate(e){
    let currTime = new Date();
    var ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
    console.log(e.target.value);
    this.setState({
      SortDate: e.target.value
    })
    if(e.target.value === "AnyTime"){
      if(this.state.BuyOrSell === "Buy"){
        this.setState({
          items: this.state.BuyItems
        })
      } else {
        this.setState({
          items: this.state.SellItems
        })
      }
    } else if(e.target.value === "Today") {
      let timeLimit = currTime - ONE_DAY_IN_MILLIS;
      if(this.state.BuyOrSell === "Buy"){
        this.setState({
          items: this.state.BuyItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      } else {
        this.setState({
          items: this.state.SellItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      }
    } else if (e.target.value === "ThisWeek") {
      let timeLimit = currTime - 7 * ONE_DAY_IN_MILLIS;
      if(this.state.BuyOrSell === "Buy"){
        this.setState({
          items: this.state.BuyItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      } else {
        this.setState({
          items: this.state.SellItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      }
    } else if (e.target.value ==="ThisMonth") {
      let timeLimit = currTime - 31 * ONE_DAY_IN_MILLIS;
      if(this.state.BuyOrSell === "Buy"){
        this.setState({
          items: this.state.BuyItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      } else {
        this.setState({
          items: this.state.SellItems.filter((item) => {
            let PostedDate = new Date(item.PostedDate);
            return PostedDate >= timeLimit;
          })
        })
      }
    }
  }


  handleBuyOrSell(event){
    this.setState({
      BuyOrSell: event.target.value,
    });

    if(event.target.value === 'Buy'){
      this.setState({
        items: this.state.BuyItems
      })
    } else{
      this.setState({
        items: this.state.SellItems
      })
    }

  }

  render(){

    // console.log(this.state.items);
    // console.log(this.state.BuyItems);
    // console.log(this.state.SellItems);
    // console.log(firebase.auth().currentUser);
    // console.log(this.state.SortPrice);
    return (
    	<Row>
        <Col s={2}> 
          <label><b> Sort by Price </b></label>
          <Row>
            <Input s={12} type="radio" label="Increasing" value="Increasing" checked={this.state.SortPrice ==='Increasing'}  onChange={this.handleSortPrice}/>
            <Input s={12} type="radio" label="Decreasing" value="Decreasing" checked={this.state.SortPrice === 'Decreasing'} onChange={this.handleSortPrice}/>
          </Row>

          <label><b> Upload date </b></label>
          <Row>
            <Input s={12} type="radio" label="Any Time" value="AnyTime" checked={this.state.SortDate ==='AnyTime'}  onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="Today" value="Today" checked={this.state.SortDate === 'Today'} onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="This Week" value="ThisWeek" checked={this.state.SortDate ==='ThisWeek'}  onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="This Month" value="ThisMonth" checked={this.state.SortDate === 'ThisMonth'} onChange={this.handleSortDate}/>
          </Row>

          <label><b> Proximity </b></label>
          <Row>
            <Input s={12} type="radio" label="Any Time" value="AnyTime" checked={this.state.SortDate ==='AnyTime'}  onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="Today" value="Today" checked={this.state.SortDate === 'Today'} onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="This Week" value="ThisWeek" checked={this.state.SortDate ==='ThisWeek'}  onChange={this.handleSortDate}/>
            <Input s={12} type="radio" label="This Month" value="ThisMonth" checked={this.state.SortDate === 'ThisMonth'} onChange={this.handleSortDate}/>
          </Row>
        </Col>

        <Col s={10}>
          {firebase.auth().currentUser !== null ? (<Link to="/NewPost" ><Button>New Post</Button></Link>) : ('')}

          <div>
            <SearchBar items={this.state.items} BuyOrSell={this.state.BuyOrSell} handleBuyOrSell={this.handleBuyOrSell}/>
          </div>
     
        </Col>
    	</Row>
    );
  }
}

export default Home;