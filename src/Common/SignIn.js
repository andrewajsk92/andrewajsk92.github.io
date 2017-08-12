import React,{Component} from 'react';

import {Button} from 'react-materialize';
import * as firebase from 'firebase';


class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.signIn = this.signIn.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  signIn(e){
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
    }).then(() => {
      console.log("DONE");
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
            <input type="text" placeholder="Enter Email" value={this.state.email} onChange={this.handleChangeEmail} required/>
          </div>

          <div>
            <label><b>Password</b></label>
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} required/>
          </div>

          <div>
            <Button type="submit" value="Submit"> Sign In</Button>
            <Button onClick={this.cancel}>Cancel</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;