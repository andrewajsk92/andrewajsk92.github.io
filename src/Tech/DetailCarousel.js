import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';

import NoImageIcon from '../Common/NoImageIcon.jpeg';

class DetailCarousel extends Component{
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      direciton: null
    }
  }

  render(){
    return(
      <div>
        {this.props.Pics !== undefined ? (
          <Carousel  activeIndex={this.state.index} direction={this.state.direction} onSelect={(selectedIndex, e)=>this.setState({index: selectedIndex, direction: e.direction})}>
            {this.props.Pics.map((pic,i) => 
              <Carousel.Item key={i}>
                <img className="myCarousel" alt="NOT FOUND" src={pic}/>
              </Carousel.Item>
            )}
          </Carousel>
          ) : (
            <img className="noImageIcon" src={NoImageIcon}  />

          )
        }
      </div>
    )
  }  
}

export default DetailCarousel;




// <div>
//         {this.props.Pics !== undefined && this.props.Pics !== [] ? 
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
//       </div>






      //   <div>
      //   {this.state.Pics !== undefined && this.state.Pics !== [] && this.state.Pics !== null? 
      //     (
      //       <Carousel images={values} />
      //     ) : (
      //       <img src={NoImageIcon} alt="NOT FOUND" width={500} height={300}/>
      //     )
      //   }
      // </div>