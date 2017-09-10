import React, {Component} from 'react';


import {Button, Input, Row, Col} from 'react-materialize';
// import Hamster from './Hamster.jpg';
import { Link, Redirect } from 'react-router-dom';

import DetailCarousel from '../Tech/DetailCarousel';
import * as firebase from 'firebase';
import NoImageIcon from './NoImageIcon.jpeg';


import Map from './Map.js';
import GoogleMaps from './GoogleMaps.js';

class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      Pics: [],

      BuyOrSell: 'Buy',
      ItemKey: '',

      Comment: '',
      currentUser: '',

      redirect: false
    }

    this.changePic = this.changePic.bind(this);
    this.delete = this.delete.bind(this);
  }

  changePic(){
    this.setState({image: NoImageIcon});
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          currentUser: user
        })
      } else {
        // No user is signed in.
        this.setState({
          currentUser: user
        })
      }
    });

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
        if (snap.val().Pics === null || snap.val().Pics === undefined || snap.val().Pics === []){
          this.setState({
            Title:snap.val().Title,
            Pics: snap.val().Pics,
            PostedDate:snap.val().PostedDate,
            Price: snap.val().Price,
            Availability:snap.val().Availability,
            Buy:snap.val().Buy,
            Key:snap.key,
            OriginalPoster: snap.val().OriginalPoster,
            OldComment: snap.val().Comment,
            Description: snap.val().Description
          })
        } else {
          this.setState({
            Title:snap.val().Title,
            Pics:Object.keys(snap.val().Pics).map((key) => {
              console.log(key);
              return snap.val().Pics[key]
            }),
            PostedDate:snap.val().PostedDate,
            Price: snap.val().Price,
            Availability:snap.val().Availability,
            Buy:snap.val().Buy,
            Key:snap.key,
            OriginalPoster: snap.val().OriginalPoster,
            OldComment: snap.val().Comment,
            Description: snap.val().Description
          })
        }
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
      Commentor: this.state.currentUser.email,
      Comment: this.state.Comment,
      SubComment: []
    }
    console.log(item);
    console.log(this.state.BuyOrSell);
    console.log(this.state.ItemKey);
    firebase.database().ref().child(this.state.BuyOrSell).child(this.state.ItemKey).child('Comment').push(item);
  }

  render(){
    // console.log(this.state.currentUser);
    if(this.state.redirect === true){
      return <Redirect to="/" />
    }
    return(
      <div>
        <br />
        <Row>
          {(firebase.auth().currentUser !== null) && (firebase.auth().currentUser.email === this.state.OriginalPoster) ? 
            (
              <Col s={7}>
                <Link to={"/EditPost/" + this.state.BuyOrSell +"/" + this.state.ItemKey} ><Button>Edit</Button></Link>
                <Button className="yellow darken-1" onClick={this.sold}> Sold </Button>
                <Button className="red darken-1" onClick={this.delete}>Delete</Button>
              </Col>
            ) : (
              <Col s={7}>
                <Button> Let's Meet Up! </Button>
              </Col>
            )
          }


          <Col s={1} offset="s3">
            <Link to="/"> <Button>Go Back</Button> </Link>
          </Col>
        </Row>
        
        <Row>
          <Col s={5}>
            <div>
              <DetailCarousel Pics={this.state.Pics}/>
            </div>

            <br />

            <div className="googleMaps" >
              <GoogleMaps />
            </div>
          </Col>

          <Col s={7}>
            <h3>
              {this.state.Title}
            </h3>

            <div>
              ${this.state.Price}
            </div>

            {(firebase.auth().currentUser !== null) && (firebase.auth().currentUser.email === this.state.OriginalPoster) ? 
              (
                <div>
                  {this.state.OriginalPoster}
                </div>
              ) : (
                <div>
                  <a href={"mailto:" +this.state.OriginalPoster}> {this.state.OriginalPoster} </a>
                </div>
              )
            }
            <div>
              {this.state.PostedDate}
            </div>

            <div>
              {this.state.Availability ? "good to go": "fuckk off"}
            </div>

            <div>
              {this.state.BuyOrSell === "Buy" ? "Buy" : "Sell"}
            </div>

            <div>
              {this.state.Description}
            </div>

            <div className="section"> </div>

            <div className="divider"> </div>

            <div>
              {this.state.currentUser !== null && this.state.currentUser !== undefined ? 
              (
                <div>
                  <Row>
                    <Input s={12} label="Comment" value={this.state.Comment} onChange={this.handleChangeComment.bind(this)}/>
                  </Row>
                  <div>
                    <Button onClick={this.addComment.bind(this)}> Submit Comment </Button>
                  </div>
                </div>
              ):(
                <div>
                </div>
              )}
              
            </div>

            

            <div className="section">
              {this.state.OldComment === undefined || this.state.OldComment === null || this.state.OldComment === "" ?
                (
                  <div>
                    NO COMMENT
                  </div>
                ) : (
                  <div>
                    {Object.keys(this.state.OldComment).map((comment, i) => 
                      <div key={i} className="comments">
                        {this.state.OldComment[comment].Comment}
                        <div className="commentBy">
                          Posted by {this.state.OldComment[comment].Commentor}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Detail;

// <Map 
//                 className="googleMaps"
//                 center={{lat:40.728199, lng:-73.9894738}}
//                 zoom={16}
//                 containerElement={<div />} 
//                 mapElement={<div className="googleMaps"/>}/>
