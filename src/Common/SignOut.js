import React,{Component} from 'react';

import * as firebase from 'firebase';

import {Button} from 'react-bootstrap';


class SignOut extends Component {

  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);
  }


  signOut(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("GOOD MAN");
    }).catch((error) => {
      // An error happened.
      console.log("FAILED WTF");
    });
  }

  render() {
    return(
      <div>
        HAW HAW HAW HAW
        <Button onClick={this.signOut}>Sign Out</Button>

      </div>
    )
  }
}

export default SignOut;