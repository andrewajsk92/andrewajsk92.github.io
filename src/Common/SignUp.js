import React,{Component} from 'react';

import { Link, Redirect } from 'react-router-dom';

import {Button} from 'react-materialize';
import * as firebase from 'firebase';

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',

      redirect: false,
      error: ''
    }

    this.addUser = this.addUser.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
  }

  addUser(e){
    e.preventDefault();

    if(this.state.password === this.state.passwordConfirm){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        this.setState({
          error: errorMessage
        })
      }).then((response) => {
        if(response === 201){
          console.log ("ADDED");
          firebase.auth().currentUser.sendEmailVerification().then((response) => {
            // Email sent.
            if(response === 201){
              console.log("VERIFIED");
              this.setState({
                redirect: true,
                error: ''
              });
            }
          }, (error) => {
            // An error happened.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            this.setState({
              error: errorMessage
            })
            console.log("ERROR");
          });

        }
        
      });
    } else{
      this.setState({
        error: 'Password does not match with the confirmed password'
      })
      console.log("PASSWORD MAN");
    }
    
  }

  handleChangeEmail(event){
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleChangePasswordConfirm(event){
    this.setState({passwordConfirm: event.target.value});
  }

  render(){
    if(this.state.redirect === true){
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.addUser}>
          <div>
            <label><b>Email*</b></label>
            <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChangeEmail} required/>
          </div>

          <div>
            <label><b>Password* (AT LEAST 6 CHARACTERS)</b></label>
            <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChangePassword} required/>
          </div>

          <div>
            <label><b>Confirm Password* (AT LEAST 6 CHARACTERS)</b></label>
            <input type="password" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.handleChangePasswordConfirm} required/>
          </div>

          <div className="signInOrUpError">
            {this.state.error}
          </div>

          <div>
            <Button type="submit" value="Submit">Sign Up</Button>
            <Link to="/"><Button>Cancel</Button> </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;