import React, {Component} from 'react';

import {Button, Row, Col, Card, CardTitle, Input} from 'react-materialize';
import { Link, Redirect } from 'react-router-dom';


import * as firebase from 'firebase';


class EditPost extends Component{
  constructor(props){
    super(props);
    this.state = {
      ItemKey: '',

      BuyOrSell: '',

      Title: '',
      Pics: [],
      NewPics: [],
      PostedDate: '',
      Price: '',
      Availability: '',
      Buy: '',
      Key: '',
      User: '',
      Comment: '',
      Description: '',

      redirect: false
    }; 
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);

    this.deletePic = this.deletePic.bind(this);

    this.editPost = this.editPost.bind(this);
  }

  componentDidMount(){
    const str = window.location.pathname.split('/EditPost/');
    const usefulStr = str[1].split("/");
    const BuyOrSell = usefulStr[0];
    const itemKey = usefulStr[1];

    this.setState({
      BuyOrSell: BuyOrSell,
      ItemKey: itemKey
    });

    const dbRef = firebase.database().ref().child(BuyOrSell).child(itemKey);

    dbRef.on("value", (snap) => {
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
            User: snap.val().User,
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
            User: snap.val().User,
            OldComment: snap.val().Comment,
            Description: snap.val().Description
          })
        }

      }
    })
  }

  editPost (e){
    e.preventDefault();

    const str = window.location.pathname.split('/EditPost/');
    const usefulStr = str[1].split("/");
    const BuyOrSell = usefulStr[0];
    const itemKey = usefulStr[1];
    console.log(BuyOrSell);
    console.log(itemKey);

    console.log(this.state.Pics);



    const rootRef = firebase.database().ref().child(this.state.BuyOrSell).child(this.state.ItemKey);

    var item = {
      Title: this.state.Title,
      Price: this.state.Price,
      BuyOrSell: this.state.BuyOrSell,
      Description: this.state.Description
    }
    const newlyAddedItem = rootRef.update(item);

    this.setState({
      redirect: true
    })

    // if(this.state.Pics !== []){
    //   this.state.Pics.forEach((pic) => {
    //     const storageRef = firebase.storage().ref('Images/' + newlyAddedItem.key + '/' + pic.name);

    //     const uploadTask = storageRef.put(pic);
    //     uploadTask.on("state_changed", (snapshot) => {
    //     }, (error) => {
    //       //Errors
    //     }, () => {
    //       //Handle successful uploads
    //       var picURL = uploadTask.snapshot.downloadURL;
    //       newlyAddedItem.child('Pics').push(picURL);

    //     });
    //   })
      

    // } else{

    // }
    // this.setState({
    //   redirect: true
    // });
  }

  handleChangeTitle(event){
    this.setState({Title: event.target.value});
    console.log("TITLE DONE");
  }

  handleChangePrice(event){
    this.setState({Price: event.target.value});
    console.log("PRICE DONE");
  }

  handleChangeDescription(event){
    this.setState({Description: event.target.value});
  }

  handleChangeImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[e.target.files.length - 1];
    console.log(pic);

    reader.onloadend = () => {
      this.state.Pics.push(pic);
      this.setState({
        Pics: this.state.Pics
      });
    }
    if( pic != null){
      reader.readAsDataURL(pic);
    }
  }

  handleBuyOrSell(e){
    this.setState({
      BuyOrSell: e.target.value
    })
  }

  deletePic(e){
    console.log("CLICKED");


    let newSetOfPictures = [];
    for(let [key, value] of Object.entries(this.state.Pics)){
      if(e.target.src !== value){
        newSetOfPictures[key] = value;
      }
    }
    console.log(newSetOfPictures);
    this.setState({
      Pics: newSetOfPictures
    })
  }

  cancel(){
    console.log("HMM");
  }

  render(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="NO"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if(this.state.redirect === true){
      return <Redirect to="/" />
    }

    console.log("HERE");
    console.log(this.state.Pics);
    return(
      <div>
        <div className="container">
          <div>
            <label><b>Title*</b></label>
            <input type="text" placeholder="Enter Title" value={this.state.Title} onChange={this.handleChangeTitle} required/>
          </div>

          <div>
            <label><b>Desirable Price*</b></label>
            <input type="text" pattern="[0-9]*" placeholder="Enter Password" id="price" name="password" value={this.state.Price} onChange={this.handleChangePrice} required/>
          </div>

          <div>
            <label> <b> People will ______ this item </b></label>
            <Input type="radio" label="Buy" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.handleBuyOrSell}/>
            <Input type="radio" label="Sell" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.handleBuyOrSell}/>
          </div>

          <div>
            <label><b>Description</b></label>
            <input type="text" placeholder="Enter a brief description" value={this.state.Description} onChange={this.handleChangeDescription}/>
          </div>

          <div>
            <b> Pics (PNG, JPEG, GIF only)</b>
            <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e)=>this.handleChangeImage(e)}/>
          </div>

          <div>
              <Button onClick={this.editPost} >Post</Button>
              <Link to="/"> <Button onClick={this.cancel}>Cancel</Button></Link>
          </div>

          

            {this.state.Pics !== undefined && this.state.Pics !== null ? 
              (
                <Row>
                  <div>
                    PREVIEW OF IMAGES BELOW (CLICK ON THE IMAGES TO REMOVE THEM)
                  </div>
                  {this.state.Pics.map((pic, i) => 
                    <Col s={12} m={6} l={4} key={i}>
                      <Card header={<CardTitle image={pic}/>} onClick={this.deletePic}>
                      </Card>
                    </Col>
                  )}
                  </Row>
              ): ( 
                <div>
                </div>
              )
            }
            
        </div>
      </div>
    )
  }
}

                    // <img src={this.state.Pics[key]} alt="NOT FOUND" width="100%" height="200px"/>


export default EditPost;