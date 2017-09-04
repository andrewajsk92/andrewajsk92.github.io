import React, { Component } from 'react';
import {Row, Input} from 'react-materialize';


class Sort extends Component{
  render(){
    return(
      <div>
        <label><b> Sort by Price </b></label>
        <Row>
          <Input s={12} type="radio" label="Increasing" value="Increasing" checked={this.state.SortPrice ==='Increasing'}  onChange={this.handleSortPrice}/>
          <Input s={12} type="radio" label="Decreasing" value="Decreasing" checked={this.state.SortPrice === 'Decreasing'} onChange={this.handleSortPrice}/>
        </Row>

        <label><b> Upload date </b></label>
        <Row>
          <Input s={12} type="radio" label="Any Time" value="AnyTime" checked={this.state.SortDate ==='AnyTime'}  onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="Today" value="Today" checked={this.state.SortDate === 'Today'} onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="This Week" value="ThisWeek" checked={this.state.SortDate ==='ThisWeek'}  onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="This Month" value="ThisMonth" checked={this.state.SortDate === 'ThisMonth'} onChange={this.handleSortDate}/>
        </Row>

        <label><b> Proximity </b></label>
        <Row>
          <Input s={12} type="radio" label="Any Time" value="AnyTime" checked={this.state.SortDate ==='AnyTime'}  onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="Today" value="Today" checked={this.state.SortDate === 'Today'} onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="This Week" value="ThisWeek" checked={this.state.SortDate ==='ThisWeek'}  onChange={this.handleSortDate}/>
          <Input s={12} type="radio" label="This Month" value="ThisMonth" checked={this.state.SortDate === 'ThisMonth'} onChange={this.handleSortDate}/>
        </Row>
      </div>
    )
  }
}

export default Sort;