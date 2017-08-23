import React, { Component } from 'react';

import * as firebase from 'firebase';

class PromisePractice extends Component{

  componentDidMount(){
    const buyRef = firebase.database().ref().child('Buy');
    const sellRef = firebase.database().ref().child('Sell');

    buyRef.on("value", snap => {
      var items = [];

      snap.forEach((data) => {
        var item = {
          Title: data.val().Title,
          Pics: data.val().Pics,
          PostedDate: data.val().PostedDate,
          Price: data.val().Price,
          Availability: data.val().Availability,
          Buy: data.val().Buy,
          Key: data.key,
          User: data.val().User
        }
        items.push(item);
        this.setState({BuyItems: items});
        // console.log(data.val());
      })
    })
  }

  render(){
    return(
      <div>
        {Object.keys}
      </div>
    )
  }
}

export default PromisePractice;