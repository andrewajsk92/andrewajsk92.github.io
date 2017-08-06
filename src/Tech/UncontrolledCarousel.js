import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';

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
      <Carousel>
        {Object.values(this.props.Pics).map((pic,i) => 
          <Carousel.Item key={i}>
            <img width={500} height alt="NOT FOUND" src={pic}/>
          </Carousel.Item>
        )}
      </Carousel>
    )
  }
  
}

export default UncontrolledCarousel;