import React, {Component} from 'react';

import {Carousel} from 'react-materialize';
import NoImageIcon from '../Common/NoImageIcon.jpeg';

class HomeCarousel extends Component{
  
  render(){
    // console.log(this.props.Title);
    console.log(this.props.Pics);
    return(
      <div>
        {this.props.Pics !== undefined && this.props.Pics !== null && this.props.Pics !== [] ? 
          (
            <Carousel options={{ fullWidth: true }}>
              {this.props.Pics.map((pic, i) => 
                <img src={pic} alt="NOT FOUND" key={i}/>
              )}
            </Carousel>
          ) : (
            <Carousel options={{fullWidth: true}} >
              <img src={NoImageIcon} alt="NOT FOUND"/>
            </Carousel>
          )
        }
      </div>
    )
  }  
}

export default HomeCarousel;
