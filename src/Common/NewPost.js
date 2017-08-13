import React, {Component} from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

class NewPost extends Component{

  constructor(props){
    super(props);
    this.state = {
      Title: '',
      Price: '',
      Pics: [],
      BuyOrSell: 'Buy',
      User: '',

      redirect: false
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
      PostedDate: new Date().toDateString(),
      Price: this.state.Price,
      Availability: true,
      BuyOrSell: this.state.BuyOrSell,
      User: firebase.auth().currentUser.uid,
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
    this.setState({
      redirect: true
    });
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

    if(this.state.redirect === true){
      return <Redirect to="/" />
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
              <label> <input type="radio" value="Buy" checked={this.state.BuyOrSell ==='Buy'}  onChange={this.handleBuyOrSell}/> Buy </label>
              <label> <input type="radio" value="Sell" checked={this.state.BuyOrSell === 'Sell'} onChange={this.handleBuyOrSell}/> Sell </label>
            </div>

            <div>
              <b> Pics (PNG, JPEG, GIF only)</b>
              <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e)=>this.handleChangeImage(e)}/>
            </div>

            <div>
              <ButtonToolbar>
                <Button type="submit" value="Submit"  bsStyle="primary">Post</Button>
                <Link to="/"> <Button onClick={this.cancel}>Cancel</Button></Link>
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


