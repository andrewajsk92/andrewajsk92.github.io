import React, {Component} from 'react';


import { Link } from 'react-router-dom';
import UncontrolledCarousel from '../Tech/UncontrolledCarousel';



class SearchBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
      BuyOrSell: 'Buy'
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

  componentWillReceiveProps(nextProps){
    // console.log("PROPS CHANGED WTF MAN");
    // console.log(nextProps);
    // console.log(this.props.items);
    this.setState({
      items: nextProps.items,
      BuyOrSell: nextProps.BuyOrSell
    })
  }


  render(){
    // console.log(this.props.items);
    // console.log(this.state.items);
    // console.log(this.props.BuyOrSell);
    // console.log(this.state.BuyOrSell);
    return (
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
          </fieldset>
        </form>

        {this.state.items.map((content, i) => 
          <Content key = {i} contentData = {content} BuyOrSell={this.state.BuyOrSell}/>
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

    return (
      <ul className="list-group">
        <li className="list-group-item" > <Link to={"Detail/" + this.props.BuyOrSell + "/" +this.props.contentData.Key} > {this.props.contentData.Title} </Link></li>
        <li className="list-group-item" > ${this.props.contentData.Price}</li>
        <li className="list-group-item" > <UncontrolledCarousel Pics={this.props.contentData.Pics}/> </li>
        <li className="list-group-item" > {this.props.contentData.PostedDate} </li>
        <li className="list-group-item" > {this.props.contentData.Availability} </li>
        <li className="list-group-item" > {this.props.contentData.Key} </li>
        <li className="list-group-item" > {this.props.contentData.User} </li>
      </ul>
    )
  }
}

export default SearchBar;