import React, {Component} from 'react';

// import {Carousel} from 'react-bootstrap';
import {Carousel} from 'react-materialize';
// import Hamster from './Hamster.jpg';
import {ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ControlledCarousel from '../Tech/ControlledCarousel';
import * as firebase from 'firebase';
import NoImageIcon from './NoImageIcon.jpeg';
import Hamster from './Hamster.jpg';

class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      Pics: '',

      BuyOrSell: 'Buy',
      ItemKey: ''
    }

    this.changePic = this.changePic.bind(this);
  }

  changePic(){
    this.setState({image: NoImageIcon});
  }

  componentDidMount(){
    const str = window.location.pathname.split('/Detail/');
    const usefulStr = str[1].split("/");
    const BuyOrSell = usefulStr[0];
    const itemKey = usefulStr[1];

    console.log("BuyOrSell = " + BuyOrSell );
    console.log("itemKey = " + itemKey);
    this.setState({
      BuyOrSell: BuyOrSell,
      ItemKey: itemKey
    });
    console.log(itemKey);
    const itemRef = firebase.database().ref().child(BuyOrSell).child(itemKey);
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
    // console.log(this.state.Pics);
    // console.log(Object.values(this.state.Pics));
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

        <div>
          <Link to="/"> Go Back </Link>
        </div>
      </div>
    )
  }
}

export default Detail;

// {this.state.Pics !== undefined ? 
//             (
//               <Carousel images={Object.values(this.state.Pics)} />
//             ) : (
//               <img src={NoImageIcon} width={500} height={300}/>
//             )
//           }


// <ControlledCarousel Pics={this.state.Pics}/>


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

