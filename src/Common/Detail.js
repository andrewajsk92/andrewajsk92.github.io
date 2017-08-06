import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';
import NoImageIcon from './NoImageIcon.jpeg';
// import Hamster from './Hamster.jpg';
import ControlledCarousel from '../Tech/ControlledCarousel';

class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      image: 'haw'
    }

    this.changePic = this.changePic.bind(this);
  }

  changePic(){
    this.setState({image: NoImageIcon});
  }

  render(){
    var link = window.location.pathname.split('Detail/');
    return(
      <div>
        <div>
          {link}
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

