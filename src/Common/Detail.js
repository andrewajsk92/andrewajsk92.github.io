import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';
import NoImageIcon from './NoImageIcon.jpeg';
// import Hamster from './Hamster.jpg';
import ControlledCarousel from '../Tech/ControlledCarousel';
import * as firebase from 'firebase';

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
          <li> <ControlledCarousel Pics={this.state.Pics}/></li>
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

