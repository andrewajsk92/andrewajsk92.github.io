import React, {Component} from 'react';

import * as firebase from 'firebase';


class FilteredList extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      initialItems: []
    }
    this.filterList = this.filterList.bind(this);
  }

  filterList(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  
  componentDidMount(){
    const rootRef = firebase.database().ref().child('Buy');
    rootRef.on("value", snap => {
      var items = [];

      snap.forEach((data) => {
        var item = [ data.val().Title]
        // var item = {
        //   Title: data.val().Title,
        //   Pics: data.val().Pics,
        //   PostedDate: data.val().PostedDate,
        //   Price: data.val().Price,
        //   Availability: data.val().Availability,
        //   Buy: data.val().Buy,
        //   Key: data.key
        // }
        items.push(item);
        this.setState({initialItems: items});
        // console.log(data.val());
      })
    })
  }

  render(){
    console.log(this.state.initialItems);
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
};

class List extends Component{
  render(){
    return (
      <ul>
      {
        this.props.items.map((item, i) => {
          <li key={i}>{item.Title}</li>
        })
       }
      </ul>
    )  
  }
};

export default FilteredList;