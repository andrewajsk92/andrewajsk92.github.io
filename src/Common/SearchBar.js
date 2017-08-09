import React, {Component} from 'react';

import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import UncontrolledCarousel from '../Tech/UncontrolledCarousel';



class SearchBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: this.props.items
    }

    this.filterList = this.filterList.bind(this);
  }

  filterList(event){
    var updatedList = this.props.items;
    updatedList = updatedList.filter((item) => {
      return item.Title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentWillReceiveProps(){
    console.log(this.props.items);
    this.setState({
      items: this.props.items
    })
  }


  render(){

    return (
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
          </fieldset>
        </form>

        {this.state.items.map((content, i) => 
          <Content key = {i} contentData = {content} />
        )}
        
      </div>
    );
  }
}
// <Content items={this.state.items}/>

// class List extends Component {
//   render(){
//     console.log(this.props.items);
//     return (
//       <ul className="list-group">
//       {
//         this.props.items.map((item, i) => {
//           <li className="list-group-item" data-category={item} key={i}>{item.Title}</li>
//         })
//        }
//       </ul>
//     )  
//   }
// }

class Content extends Component{
  render(){
    var BuyOrSell = "Buy";

    return (
      <ul className="list-group">
        <li className="list-group-item" > <Link to={"Detail/" + BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link></li>
        <li className="list-group-item" > ${this.props.contentData.Price}</li>
        <li className="list-group-item" > <UncontrolledCarousel Pics={this.props.contentData.Pics}/> </li>
        <li className="list-group-item" > {this.props.contentData.PostedDate} </li>
        <li className="list-group-item" > {this.props.contentData.Availability} </li>
        <li className="list-group-item" > {this.props.contentData.Key} </li>
      </ul>
    )
  }
}

export default SearchBar;