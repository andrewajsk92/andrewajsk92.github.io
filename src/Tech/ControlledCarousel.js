import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';

import NoImageIcon from '../Common/NoImageIcon.jpeg';
// import Hamster from '../Common/Hamster.jpg';

class ControlledCarousel extends Component{

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      direciton: null
    }
  }

  // getInitialState() {
  //   return {
  //     index: 0,
  //     direction: null
  //   };
  // }

  // handleSelect(selectedIndex, e) {
  //   alert('selected=' + selectedIndex + ', direction=' + e.direction);
  //   this.setState({
  //     index: selectedIndex,
  //     direction: e.direction
  //   });
  // }

  render() {
    return (
      <div>
        {this.props.Pics !== undefined ? (
          <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={(selectedIndex, e)=>this.setState({index: selectedIndex, direction: e.direction})}>
            {Object.values(this.props.Pics).map((pic,i) => 
              <Carousel.Item key={i}>
                <img width={500} height={300} alt="NOT FOUND" src={pic}/>
              </Carousel.Item>
            )}
          </Carousel>
          ) : (
            <img src={NoImageIcon} width={500} height={300}/>

          )
        }
      </div>
    );
  }
}

export default ControlledCarousel;

        // <Carousel.Item>
        //   <img width={500} height={300} alt="900x500" src={NoImageIcon}/>
        //   <Carousel.Caption>
        //     <h3>First slide label</h3>
        //     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //   </Carousel.Caption>
        // </Carousel.Item>
        // <Carousel.Item>
        //   <img width={500} height={300} alt="900x500" src={Hamster}/>
        //   <Carousel.Caption>
        //     <h3>Second slide label</h3>
        //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //   </Carousel.Caption>
        // </Carousel.Item>
        // <Carousel.Item>
        //   <img width={500} height={300} alt="900x500" src="/assets/carousel.png"/>
        //   <Carousel.Caption>
        //     <h3>Third slide label</h3>
        //     <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        //   </Carousel.Caption>
        // </Carousel.Item>