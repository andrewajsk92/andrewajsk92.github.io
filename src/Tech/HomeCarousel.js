import React, {Component} from 'react';

import {Carousel} from 'react-materialize';
import NoImageIcon from '../Common/NoImageIcon.jpeg';

class HomeCarousel extends Component{
  
  render(){
    // console.log(this.props.Title);
    // console.log(this.props.Pics);
    return(
      <div>
        {this.props.Pics !== undefined && this.props.Pics !== [] ? 
          (
            <Carousel options={{ fullWidth: true }}>
              {Object.keys(this.props.Pics).map((key, i) => 
                <img src={this.props.Pics[key]} alt="NOT FOUND" key={i}/>
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



// constructor(props){
//     super(props);
//     this.state = {
//       index: 0,
//       direciton: null
//     }
//   }

//   render(){
//     return (
//       <div>
//         {this.props.Pics !== undefined ? (
//           <Carousel>
//             {Object.keys(this.props.Pics).map((pic,i) => 
//               <Carousel.Item key={i}>
//                 <img width={500} height={300} alt="NOT FOUND" src={this.props.Pics[pic]}/>
//               </Carousel.Item>
//             )}
//           </Carousel>
//           ) : (
//           <img src={NoImageIcon} alt="NOT FOUND" width={500} height={300}/>
//           )
//         }
//       </div>
//     )
//   }