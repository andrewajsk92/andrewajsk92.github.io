import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';
// import Hamster from './Hamster.jpg';
import {ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ControlledCarousel from '../Tech/ControlledCarousel';
import * as firebase from 'firebase';
import NoImageIcon from './NoImageIcon.jpeg';


class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      Pics: ''
    }

    this.changePic = this.changePic.bind(this);
  }

  changePic(){
    this.setState({image: NoImageIcon});
  }

  componentDidMount(){
    const BuyOrSell = 'Buy/';
    const itemKey = window.location.pathname.split('/Detail/'+BuyOrSell)[1];
    console.log(itemKey);
    const itemRef = firebase.database().ref().child('Buy').child(itemKey);
    // console.log(itemRef);

    itemRef.on("value", (snap) => {
      console.log(snap.val().Title);
      // snap.forEach((data) => {
      //   console.log(data.val());
      // })
      this.setState({
        Title:snap.val().Title,
        Pics:snap.val().Pics,
        PostedDate:snap.val().PostedDate,
        Price: snap.val().Price,
        Availability:snap.val().Availability,
        Buy:snap.val().Buy,
        Key:snap.key
      })
    })
  }

  render(){
    
    return(
      <div>
        <div>
          <ButtonToolbar>
            <Link to="/NewPost" ><Button bsStyle="primary">Edit</Button></Link>
          </ButtonToolbar>
        </div>

        <div>
          {this.state.Title}
        </div>

        <div>
          {this.state.PostedDate}
        </div>

        <div>
          {this.state.Price}
        </div>

        <div>
          {this.state.Availability ? "good to go": "fuckk off"}
        </div>

        <div>
          {this.state.Buy ? "buying" : "selling"}
        </div>

        <div>
          <ControlledCarousel Pics={this.state.Pics}/>
        </div>
      </div>
    )
  }
}

export default Detail;

 // <img src='asdf' alt='nope' onError={console.log("WTF")} />
        // <div>
        //   koollllllllllllllllll
        // </div>

        // <div>
        //   <img src={this.state.image} onError={this.changePic} />
        // </div>

        // <div>
        // HMMMMMM
        // </div>

        // <div>
        //   <img src={this.state.image} onError={this.setState({image: NoImageIcon})} />
        // </div>

