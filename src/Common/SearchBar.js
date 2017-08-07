import React, {Component} from 'react';

import * as firebase from 'firebase';


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
      <List items={this.state.items}/>
      </div>
    );
  }
}

class List extends Component {
  render(){
    return (
      <ul className="list-group">
      {
        this.props.items.map((item, i) => {
          return <li className="list-group-item" data-category={item} key={i}>{item.Title}</li>
        })
       }
      </ul>
    )  
  }
}

export default SearchBar;