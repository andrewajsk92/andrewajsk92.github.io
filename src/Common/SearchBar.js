import React from 'react'


var FilteredList = React.createClass({
  filterList(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Bacon",
         "Eggs",
         "Salmon",
         "Granola",
         "Bananas",
         "Beer",
         "Wine",
         "Yogurt"
       ],
       items: []
     }
  },
  componentWillMount(){
    this.setState({items: this.state.initialItems})
  },
  render(){
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )  
  }
});

export default FilteredList;