import React, {Component} from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import * as firebase from 'firebase';

class NewPost extends Component{

	constructor(props){
		super(props);
		this.state = {
			Title: '',
			Price: ''
		}
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.addPost = this.addPost.bind(this);

	}

	addPost (e){
    e.preventDefault();

    const pic = this.state.Pics;
		const rootRef = firebase.database().ref().child('Buy');
    if(pic != null){
      const storageRef = firebase.storage().ref('Images/' + pic.name);
      const uploadTask = storageRef.put(pic);

      uploadTask.on("state_changed", (snapshot) => {

      }, (error) => {
        //Errors
      }, () => {
        //Handle successful uploads
        var pics = uploadTask.snapshot.downloadURL;
        var item = {
          Title: this.state.Title,
          PostedDate: new Date().toString(),
          Price: this.state.Price,
          Availability: true,
          Pics: pics
        }
        rootRef.push(item);
        console.log(pics);
      });
  		console.log("PUSHED WTF YES PIC");
    } else{
      var item = {
        Title: this.state.Title,
        PostedDate: new Date().toString(),
        Price: this.state.Price,
        Availability: true,
        Pic: null
      }
      rootRef.push(item);
      console.log("PUSHED WTF NO PIC");

    }
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
    let pics = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        Pics: pics,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(pics);
  }

	handleSubmit(event){
		console.log("WUT");
	}

  cancel(){
    console.log("HMM");
  }

	render(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

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
              <b> Pics* (PNG, JPEG, GIF only)</b>
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

// <button type="submit" className="btn btn-primary center large-height">Sign Up</button>


