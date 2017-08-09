import React, {Component} from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class NewPost extends Component{

  constructor(props){
    super(props);
    this.state = {
      Title: '',
      Price: '',
      Pics: [],
      BuyOrSell: 'Buy'
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);

    this.addPost = this.addPost.bind(this);

  }


  addPost (e){
    e.preventDefault();
    const rootRef = firebase.database().ref().child(this.state.BuyOrSell);

    var item = {
      Title: this.state.Title,
      PostedDate: new Date().toString(),
      Price: this.state.Price,
      Availability: true,
      Buy: true,
      Pics: []
    }
    const newlyAddedItem = rootRef.push(item);
    console.log(newlyAddedItem.key);

    if(this.state.Pics !== []){
      this.state.Pics.forEach((pic) => {
        const storageRef = firebase.storage().ref('Images/' + newlyAddedItem.key + '/' + pic.name);

        const uploadTask = storageRef.put(pic);
        uploadTask.on("state_changed", (snapshot) => {
        }, (error) => {
          //Errors
        }, () => {
          //Handle successful uploads
          var picURL = uploadTask.snapshot.downloadURL;
          // this.setState(previousState => {
          //   Pics: [previousState.Pics, picURL]
          // })
          // console.log(this.state.Pics);
          newlyAddedItem.child('Pics').push(picURL);

        });
      })
      

    } else{

    }

    // const pic = this.state.Pics;
    // if(this.state.Pics != []){

    //   const storageRef = firebase.storage().ref('Images/' + pic.name);
    //   const uploadTask = storageRef.put(pic);

    //   uploadTask.on("state_changed", (snapshot) => {

    //   }, (error) => {
    //     //Errors
    //   }, () => {
    //     //Handle successful uploads
    //     var pics = uploadTask.snapshot.downloadURL;
    //     var item = {
    //       Title: this.state.Title,
    //       PostedDate: new Date().toString(),
    //       Price: this.state.Price,
    //       Availability: true,
    //       Pics: pics
    //     }
    //     rootRef.push(item);
    //     console.log(pics);
    //   });
    //   console.log("PUSHED WTF YES PIC");
    //   console.log(item);
    // } else{
    //   var item = {
    //     Title: this.state.Title,
    //     PostedDate: new Date().toString(),
    //     Price: this.state.Price,
    //     Availability: true,
    //     Pics: this.state.Pics
    //   }
    //   rootRef.push(item);
    //   console.log("PUSHED WTF NO PIC");
    // }
  }

  handleChangeTitle(event){
    this.setState({Title: event.target.value});
    console.log("TITLE DONE");
  }

  handleChangePrice(event){
    this.setState({Price: event.target.value});
    console.log("PRICE DONE");
  }

  handleChangeImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[e.target.files.length - 1];

    reader.onloadend = () => {
      this.state.Pics.push(pic);
      this.setState({
        Pics: this.state.Pics,
        imagePreviewUrl: reader.result
      });
      console.log(this.state.Pics.length);

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

    console.log(this.state.BuyOrSell);
    return(
      <div>
        <form onSubmit={this.addPost}>
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
              <form>
                <label> <input type="radio" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.handleBuyOrSell}/> Buy </label>
                <label> <input type="radio" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.handleBuyOrSell}/> Sell </label>
              </form>
            </div>

            <div>
              <b> Pics (PNG, JPEG, GIF only)</b>
              <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e)=>this.handleChangeImage(e)}/>
            </div>

            <div>
              <ButtonToolbar>
                <Button type="submit" value="Submit"  bsStyle="primary">Post</Button>
                <Button onClick={this.cancel}>Cancel</Button>
              </ButtonToolbar>
            </div>

            <div className="imgPreview">
              {$imagePreview}
            </div>

          </div>
        </form>
      </div>
    )
  }
}

export default NewPost;


