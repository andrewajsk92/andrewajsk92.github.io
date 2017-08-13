import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBuY9y2xC_54QCn-R42fe7z1yTAoM-eJNk",
  authDomain: "buyandsell-449e9.firebaseapp.com",
  databaseURL: "https://buyandsell-449e9.firebaseio.com",
  projectId: "buyandsell-449e9",
  storageBucket: "buyandsell-449e9.appspot.com",
  messagingSenderId: "993095145852"
};
firebase.initializeApp(config);

var currentUser = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    currentUser = user;
    // console.log("USER LOGGED IN");
  } else {
    // No user is signed in.
    currentUser = user;
    // console.log("NOONE LOGGED IN");
  }
});



class App extends Component{
  signOut(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("GOOD MAN");
    }).catch((error) => {
      // An error happened.
      console.log("FAILED WTF");
    });
  }

  render(){
    return(

      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" >Buy and Sell</a>
            </div>
            
            {currentUser === null ? 
              (
                <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/car">Cars</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/SignIn"> Log In </Link></li>
                  <li><Link to="/SignUp"> Sign Up </Link></li>
                </ul>

              ) : (
                <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/car">Cars</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/" onClick={this.signOut}> Sign Out </Link></li>
                </ul>   
              )
            }          

            

            
          </div>
        </nav>
      </div>
    )
  }
}


export default App;


            // <ul className="nav navbar-nav">
            //   <li><Link to="/">Home</Link></li>
            //   <li><Link to="/car">Cars</Link></li>
            //   <li><Link to="/about">About</Link></li>
            //   <li><Link to="/SignIn"> Log In </Link></li>
            //   <li><Link to="/SignUp"> Sign Up </Link></li>
            //   <li><Link to="/" onClick={this.signOut}> Sign Out </Link></li>
            // </ul>


