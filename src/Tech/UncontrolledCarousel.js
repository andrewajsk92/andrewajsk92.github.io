import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';
import NoImageIcon from '../Common/NoImageIcon.jpeg';

class UncontrolledCarousel extends Component{

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      direciton: null
    }
  }

  render(){
    return (
      <div>
        {this.props.Pics !== undefined ? (
          <Carousel>
            {Object.keys(this.props.Pics).map((pic,i) => 
              <Carousel.Item key={i}>
                <img width={500} height={300} alt="NOT FOUND" src={this.props.Pics[pic]}/>
              </Carousel.Item>
            )}
          </Carousel>
          ) : (
          <img src={NoImageIcon} alt="NOT FOUND" width={500} height={300}/>
          )
        }
      </div>
    )
  }
  
}

export default UncontrolledCarousel;