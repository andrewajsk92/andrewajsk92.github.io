import React, {Component} from 'react';

import {Carousel} from 'react-materialize';

import NoImageIcon from '../Common/NoImageIcon.jpeg';

class ControlledCarousel extends Component{
  constructor(props){
    super(props);
    this.state = {
      Pics: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      Pics: nextProps.Pics
    })
  }

  render(){
    console.log(this.state.Pics);
    let keys = Object.keys(this.state.Pics);
    console.log(keys);
    let values = [];
    console.log(this.state.Pics.length);
    for (let i = 0; i < keys.length; i++){
      values.push(this.state.Pics[keys[i]]);
      console.log(this.state.Pics[keys[i]]);
    }
    console.log(values);
    return(
      <div>
        {this.state.Pics !== undefined && this.state.Pics !== [] && this.state.Pics !== null? 
          (
            <Carousel images={values} />
          ) : (
            <img src={NoImageIcon} alt="NOT FOUND" width={500} height={300}/>
          )
        }
      </div>
    )
  }  
}

export default ControlledCarousel;

// {this.props.Pics !== undefined && this.props.Pics !== [] ? 
//           (
//             <Carousel options={{ fullWidth: true }}>
//               {Object.keys(this.props.Pics).map((key, i) => 
//                 <img src={this.props.Pics[key]} alt="NOT FOUND" key={i}/>
//               )}
//             </Carousel>
//           ) : (
//             <img src={NoImageIcon} alt="NOT FOUND" width={500} height={300}/>
//           )
//         }