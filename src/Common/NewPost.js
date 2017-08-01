import React, {Component} from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class NewPost extends Component{

	constructor(props){
		super(props);
		this.state = {
			Title: 'TITLE',
			Pics: '',
			Price: 0,
		}
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangePics = this.handleChangePics.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.addPost = this.addPost.bind(this);

	}

	addPost (e){
    e.preventDefault();

		const rootRef = firebase.database().ref().child('Buy');
		var item = {
			Title: this.state.Title,
			Pics: this.state.Pics,
			PostedDate: new Date().toString(),
			Price: this.state.Price,
			Availability: true

  //     Title: "TEST",
  //     Pics: "TESTING NONE",
  //     PostedDate: new Date().toString(),
  //     Price: 50,
  //     Availability: true
		}
		rootRef.push(item);
		console.log("PUSHED WTF");
	}

	handleChangeTitle(event){
		this.setState({Title: event.target.value});
    console.log("TITLE DONE");
	}

	handleChangePics(event){
		this.setState({Pics: event.target.value});
    console.log("PICS DONE");
	}

	handleChangePrice(event){
		this.setState({Price: event.target.value});
    console.log("PRICE DONE");
	}

	handleSubmit(event){
		console.log("WUT");
	}

	render(){

		return(
			<div>
				<form onSubmit={this.addPost}>
					<div className="container">
						<div>
						  	<label><b>Title*</b></label>
						    <input type="text" placeholder="Enter Title" value={this.state.Title} onChange={this.handleChangeTitle} required/>
						</div>
						
						<div>
						    <label><b>Pics</b></label>
						    <input type="text" placeholder="Enter Institution" id="pics" name="institution" value={this.state.Pics} onChange={this.handleChangePics}/>
						</div>

						<div>
						    <label><b>Desirable Price*</b></label>
						    <input type="text" pattern="[0-9]*" placeholder="Enter Password" id="price" name="password" value={this.state.Price} onChange={this.handleChangePrice} required/>
						</div>
            
				    <div>
				    	<ButtonToolbar>
  							<Button type="submit" value="Submit"  bsStyle="primary">Post</Button>
                <Button>Cancel</Button>
					    </ButtonToolbar>
			    	</div>
					</div>
				</form>
			</div>
		)
	}
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default NewPost;

// <button type="submit" className="btn btn-primary center large-height">Sign Up</button>


