import React, {Component} from 'react';


import {Button, Input} from 'react-materialize';
// import Hamster from './Hamster.jpg';
import { Link, Redirect } from 'react-router-dom';

import DetailCarousel from '../Tech/DetailCarousel';
import * as firebase from 'firebase';
import NoImageIcon from './NoImageIcon.jpeg';


import Map from './Map.js'

class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      Pics: [],

      BuyOrSell: 'Buy',
      ItemKey: '',

      Comment: '',

      redirect: false
    }

    this.changePic = this.changePic.bind(this);
    this.delete = this.delete.bind(this);
  }

  changePic(){
    this.setState({image: NoImageIcon});
  }

  componentDidMount(){
    const str = window.location.pathname.split('/Detail/');
    const usefulStr = str[1].split("/");
    const BuyOrSell = usefulStr[0];
    const itemKey = usefulStr[1];

    this.setState({
      BuyOrSell: BuyOrSell,
      ItemKey: itemKey
    });

    const itemRef = firebase.database().ref().child(BuyOrSell).child(itemKey);
    // console.log(itemRef);

    itemRef.on("value", (snap) => {
      // console.log(snap.val().Title);
      // snap.forEach((data) => {
      //   console.log(data.val());
      // })
      if(snap.val() !== null){
        this.setState({
          Title:snap.val().Title,
          Pics:snap.val().Pics,
          PostedDate:snap.val().PostedDate,
          Price: snap.val().Price,
          Availability:snap.val().Availability,
          Buy:snap.val().Buy,
          Key:snap.key,
          User: snap.val().User,
          OldComment: snap.val().Comment
        })
      }
    })
  }

  delete(){
    console.log(this.state.BuyOrSell);
    console.log(this.state.ItemKey);
    firebase.database().ref().child(this.state.BuyOrSell).child(this.state.ItemKey).remove();
    this.setState({
      redirect: true
    })
  }

  handleChangeComment(event){
    this.setState({Comment: event.target.value});
  }

  addComment(){
    var item = {
      Commentor: this.state.User,
      Comment: this.state.Comment,
      SubComment: []
    }
    firebase.database().ref().child(this.state.BuyOrSell).child(this.state.ItemKey).child('Comment').push(item);
  }

  render(){
    console.log(this.state);
    // console.log(this.state.Pics);
    // console.log(Object.values(this.state.Pics));
    if(this.state.redirect === true){
      return <Redirect to="/" />
    }
    console.log(this.state);
    return(
      <div>
        {(firebase.auth().currentUser !== null) && (firebase.auth().currentUser.email === this.state.User) ? 
          (
            <div>
              <Link to="/EditPost" ><Button>Edit</Button></Link>
              <Button onClick={this.sold}> Sold </Button>
              <Button onClick={this.delete}>Delete</Button>
            </div>
          ) : (
            <div>
              <Button> Let's Meet Up! </Button>
            </div>
          )
        }
        

        <div>
          {this.state.Title}
        </div>

        {(firebase.auth().currentUser !== null) && (firebase.auth().currentUser.email === this.state.User) ? 
          (
            <div>
              {this.state.User}
            </div>
          ) : (
            <div>
              <a href={"mailto:" +this.state.User}> {this.state.User} </a>
            </div>
          )
        }
        <div>
          {this.state.PostedDate}
        </div>

        <div>
          {this.state.Price}
        </div>

        <div>
          {this.state.Availability ? "good to go": "fuckk off"}
        </div>

        <div>
          {this.state.Buy ? "buying" : "selling"}
        </div>

        <div>
          <DetailCarousel Pics={this.state.Pics}/>
        </div>


        <div>
          <Link to="/"> Go Back </Link>
        </div>

        <div>
          <Map 
            center={{lat:40.728199, lng:-73.9894738}}
            zoom={16}
            containerElement={<div style={{height:400, width:400}} />} 
            mapElement={<div style={{height:400, width:400}} />}/>
        </div>

        <div>
          <form onSubmit={this.addComment.bind(this)}>
            <Input label="Comment" placeholder="HI" value={this.state.Comment} onChange={this.handleChangeComment.bind(this)}/>
            <Button type="submit"> Button </Button>
          </form>
        </div>

        <div>
          {this.state.OldComment === undefined || this.state.OldComment === null ?
            (
              <div>
                NO COMMENT
              </div>
            ) : (
              <div>
                {Object.keys(this.state.OldComment).map((comment, i) => 
                  <div key={i}>
                    {this.state.OldComment[comment].Comment}
                    <div style={{paddingLeft:20 }}>
                      Posted by {this.state.OldComment[comment].Commentor}
                    </div>
                  </div>
                )}
              </div>
            )
          }
          
        </div>

      </div>
    )
  }
}

export default Detail;


