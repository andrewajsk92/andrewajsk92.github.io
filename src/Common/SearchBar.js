import React, {Component} from 'react';


import { Link } from 'react-router-dom';
import HomeCarousel from '../Tech/HomeCarousel';

import {Col, Row, Input, Card, CardTitle} from 'react-materialize';

import NoImageIcon from './NoImageIcon.jpeg';




class SearchBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
      unfilteredItems: [],
      BuyOrSell: 'Buy',

      searchKeyword: ''
    }

    this.filterList = this.filterList.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  filterList(event){
    this.setState({
      searchKeyword: event.target.value
    })
    
    var updatedList = this.state.unfilteredItems;
    
    // var updatedList = this.state.items;
    updatedList = updatedList.filter((item) => {
      return item.Title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentWillReceiveProps(nextProps){
    // console.log("PROPS CHANGED WTF MAN");
    // console.log(nextProps);
    // console.log(this.props.items);
    this.setState({
      unfilteredItems: nextProps.items,
      BuyOrSell: nextProps.BuyOrSell,
      items: nextProps.items
    })
  }



  render(){
    // console.log(this.props.items);
    // console.log(this.state.items);
    // console.log(this.props.BuyOrSell);
    // console.log(this.state.BuyOrSell);
    return (
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
          </fieldset>
        </form>

        <Row>
          <Col s={1} offset="s3"> <label> <b> I am...</b></label> </Col>
          <Col s={4}>
            
            <Row>
              <Input type="radio" label="Buying" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.props.handleBuyOrSell}/>  
              <Input type="radio" label="Selling" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.props.handleBuyOrSell}/> 
            </Row>

          </Col>
          <Col s={4}></Col>
        </Row>

        <Row>
          {this.state.items.map((content, i) => 
            <Col s={12} m={6} l={4} key={i}>
              <Content contentData = {content} BuyOrSell={this.state.BuyOrSell}/>
            </Col>
          )}
        </Row>
        
        
        
      </div>
    );
  }
}

            // <Col s={12} m={6} l={4} key={i}>
            //   <Card 
            //     header={<HomeCarousel reveal Pics={content.Pics} Title={content.Title} waves='light'/>}
            //     title={<Link to={"Detail/" + content.BuyOrSell + "/" + content.Key} > {content.Title} </Link>}
            //     reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}
            //     key={i}
            //   >
            //     <p> {content.User} </p>
            //     <p>${content.Price} / distance </p>
            //   </Card>
            // </Col>

class Content extends Component{
  render(){

    return (
      <Card 
        header={<HomeCarousel reveal Pics={this.props.contentData.Pics} Title={this.props.contentData.Title} waves='light'/>}
        title={<Link to={"/Detail/" + this.props.BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link>}
        reveal={<p>{this.props.contentData.Description}</p>}
      >
        <p> {this.props.contentData.OriginalPoster} </p>
        <p>${this.props.contentData.Price} / distance </p>
      </Card>
    )
  }
}

export default SearchBar;


