import React, {Component} from 'react';

import { Button, Row, Col, Card, CardTitle, Input} from 'react-materialize';
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
      Comment: '',

      ImagePreviewUrl: [],

      Description: '',

      redirect: false
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleBuyOrSell = this.handleBuyOrSell.bind(this);
    this.cancel = this.cancel.bind(this);

    this.deletePic = this.deletePic.bind(this);

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
      User: firebase.auth().currentUser.email,
      Pics: [],
      Comment: '',
      Description: this.state.Description
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
  }

  handleChangePrice(event){
    this.setState({Price: event.target.value});
  }

  handleChangeDescription(event){
    this.setState({Description: event.target.value});
  }

  handleChangeImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let pic = e.target.files[e.target.files.length - 1];

    reader.onloadend = () => {
      this.state.Pics.push(pic);
      this.state.ImagePreviewUrl.push(reader.result);
      this.setState({
        Pics: this.state.Pics,
        ImagePreviewUrl: this.state.ImagePreviewUrl
      });
      // console.log(this.state.Pics.length);

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
    this.setState({
      redirect: true
    });
  }

  deletePic(e){
    // console.log(e.target);

    let newPic = [];
    let newImagePreviewUrl = [];

    for(let i = 0 ; i < this.state.ImagePreviewUrl.length ; i++){
      if(this.state.ImagePreviewUrl[i] !== e.target.src) {
        newPic.push(this.state.Pics[i]);
        newImagePreviewUrl.push(this.state.ImagePreviewUrl[i]);
      }
    }

    this.setState({
      Pics: newPic,
      ImagePreviewUrl: newImagePreviewUrl
    })
  }

  render(){

    if(this.state.redirect === true){
      return <Redirect to="/" />
    }

    // console.log(this.state.BuyOrSell);
    console.log(this.state.Pics);
    console.log(this.state.ImagePreviewUrl);
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
              <input type="text" pattern="[0-9]*" placeholder="Enter Price" id="price" name="password" value={this.state.Price} onChange={this.handleChangePrice} required/>
            </div>

            <div>
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
                <Button type="submit" value="Submit" >Post</Button>
                <Link to="/"> <Button className="red darken-1" onClick={this.cancel}>Cancel</Button></Link>
            </div>

            
            {this.state.Pics !== undefined && this.state.Pics !== null ? 
              (
                <Row>
                  <div>
                    PREVIEW OF IMAGES BELOW (CLICK ON THE IMAGES TO REMOVE THEM)
                  </div>
                  {this.state.ImagePreviewUrl.map((pic, i) => 
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
        </form>
      </div>
    )
  }
}

export default NewPost;


