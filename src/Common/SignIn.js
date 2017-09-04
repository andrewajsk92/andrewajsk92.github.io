import React,{Component} from 'react';

import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


import {Button} from 'react-materialize';
import * as firebase from 'firebase';


class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',

      error: ''

    }
    this.signIn = this.signIn.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  signIn(e){
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      this.setState({
        error: errorMessage
      })
    }).then((response) => {
      console.log("WTF");
      if(response === 201){
        console.log("DONE");

        this.setState({
          error: ''
        });
      }

    });
  }

  handleChangeEmail(event){
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  render(){
    return(
      <div>

        <form onSubmit={this.signIn}>
          <div>
            <label><b>Email</b></label>
            <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChangeEmail} required/>
          </div>

          <div>
            <label><b>Password</b></label>
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} required/>
          </div>

          <div className="signInOrUpError">
            {this.state.error}
          </div>

          <div>
            <Button type="submit" value="Submit"> Sign In</Button>
            <Link to="/"> <Button>Cancel</Button> </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;