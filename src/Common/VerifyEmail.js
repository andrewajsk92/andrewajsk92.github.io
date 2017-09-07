import React, {Component} from 'react';

import {Button} from 'react-materialize';
import * as firebase from 'firebase';

class VerifyEmail extends Component{

  signOut(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("GOOD MAN");
    }).catch((error) => {
      // An error happened.
      console.log("FAILED WTF");
    });
  }

  verify(){
    firebase.auth().currentUser.sendEmailVerification().then((response) => {
      if(response === 201){
        // Email sent.
        console.log("VERIFIED");
      }
    }, function(error) {
      // An error happened.
      console.log("ERROR");
    });

  }


  render(){
    return(
      <div>
        A Verification has been sent to your email! Once you verify it, you can refresh the page and start using the website!
        <div>
          <Button onClick={this.verify.bind(this)}>  Re-send Verification </Button>
          <Button onClick={this.signOut.bind(this)}> Sign Out </Button>
        </div>
      </div>
    )
  }
}

export default VerifyEmail;