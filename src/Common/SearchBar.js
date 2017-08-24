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
      BuyItems: [],
      SellItems: [],
      BuyOrSell: 'Buy',

      searchKeyword: ''
    }

    this.filterList = this.filterList.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);
  }

  filterList(event){
    this.setState({
      searchKeyword: event.target.value
    })
    if(this.state.BuyOrSell === 'Buy'){
      var updatedList = this.state.BuyItems;
    } else {
      updatedList = this.state.SellItems;
    }
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
    if(this.state.BuyOrSell === 'Buy'){
      this.setState({
        BuyItems: nextProps.BuyItems,
        SellItems: nextProps.SellItems,
        items: nextProps.BuyItems
      })
    } else {
      this.setState({
        BuyItems: nextProps.BuyItems,
        SellItems: nextProps.SellItems,
        items: nextProps.SellItems
      })
    }
  }

  // componentDidMount(){
  //   this.setState({
  //     BuyItems: this.props.BuyItems,
  //     SellItems: this.props.SellItems
  //   })
  // }

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

    if(event.target.value === 'Buy'){
      var updatedList = this.state.BuyItems;
    } else {
      updatedList = this.state.SellItems;
    }
    updatedList = updatedList.filter((item) => {
      return item.Title.toLowerCase().search(
        this.state.searchKeyword.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});

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
          <Col s={4} m={4}></Col>
          <Col s={4} m={4}>
            <Row>
              <Input type="radio" label="Buy" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.handleBuyOrSell}/>  
              <Input type="radio" label="Sell" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.handleBuyOrSell}/> 
            </Row>

          </Col>
          <Col s={4} m={4}></Col>
        </Row>

        <Row>
          {this.state.items.map((content, i) => 
            <Col s={12} m={6} l={4} key={i}>
              <Card 
                header={<HomeCarousel reveal Pics={content.Pics} Title={content.Title} waves='light'/>}
                title={<Link to={"Detail/" + content.BuyOrSell + "/" + content.Key} > {content.Title} </Link>}
                reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}
              >
                <p> {content.User} </p>
                <p>${content.Price} / distance </p>
              </Card>
            </Col>
          )}
        </Row>
        
        
        
      </div>
    );
  }
}

// <Col s={12} m={6} l={4} key={i}>
//               <Content contentData = {content} BuyOrSell={this.state.BuyOrSell}/>
//             </Col>

class Content extends Component{
  render(){

    return (
      <Card 
        header={<HomeCarousel reveal Pics={this.props.contentData.Pics} Title={this.props.contentData.Title} waves='light'/>}
        title={<Link to={"Detail/" + this.props.BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link>}
        reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}
      >
        <p> {this.props.contentData.User} </p>
        <p>${this.props.contentData.Price} / distance </p>
      </Card>
    )
  }
}

export default SearchBar;




// <ul className="list-group">
//         <li className="list-group-item" > <UncontrolledCarousel Pics={this.props.contentData.Pics}/> </li>
//         <li className="list-group-item" > <Link to={"Detail/" + this.props.BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link></li>
//         <li className="list-group-item" > ${this.props.contentData.Price}</li>
//         <li className="list-group-item" > {this.props.contentData.PostedDate} </li>
//         <li className="list-group-item" > {this.props.contentData.Availability} </li>
//         <li className="list-group-item" > {this.props.contentData.Key} </li>
//         <li className="list-group-item" > {this.props.contentData.User} </li>
//       </ul>







// {this.state.BuyOrSell === 'Buy' ? 
//           (
//             <Row>
//               {this.state.BuyItems.map((content, i) => 
//                 <Content key = {i} contentData = {content} BuyOrSell={this.state.BuyOrSell}/>
//               )}
//             </Row>
//           ) : (
//             <Row>
//               {this.state.SellItems.map((content, i) => 
//                 <Content key = {i} contentData = {content} BuyOrSell={this.state.BuyOrSell}/>
//               )}
//             </Row>
//           )
//         }



