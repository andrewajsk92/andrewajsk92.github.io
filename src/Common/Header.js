import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import '../App.css';

import * as firebase from 'firebase';
import {Dropdown, Button, NavItem, Navbar} from 'react-materialize';

var config = {
  apiKey: "AIzaSyBuY9y2xC_54QCn-R42fe7z1yTAoM-eJNk",
  authDomain: "buyandsell-449e9.firebaseapp.com",
  databaseURL: "https://buyandsell-449e9.firebaseio.com",
  projectId: "buyandsell-449e9",
  storageBucket: "buyandsell-449e9.appspot.com",
  messagingSenderId: "993095145852"
};
firebase.initializeApp(config);

// var currentUser = firebase.auth().currentUser;

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in.
//     currentUser = user;
//     console.log("USER LOGGED IN");
//   } else {
//     // No user is signed in.
//     currentUser = user;
//     console.log("NOONE LOGGED IN");
//   }
// });



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
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

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          currentUser: user
        })
      } else {
        // No user is signed in.
        this.setState({
          currentUser: user
        })
      }
    });


  }

  render(){

    return(

      <div>


        
          {this.state.currentUser === null ? 
            (
              <Navbar brand="Buy and Sell" right>
                <li><NavLink to="/">  Home  </NavLink> </li>
                <li><NavLink to="/about"> About </NavLink> </li>
                <li><NavLink to="/SignIn"> Log In </NavLink> </li>
                <li><NavLink to="/SignUp"> Sign Up </NavLink> </li>
              </Navbar>

              
            ) :(
              <Navbar brand="Buy and Sell" right>
                <li><NavLink to="/">  Home  </NavLink> </li>
                <li><NavLink to="/about"> About </NavLink> </li>
                <label>Hello, {this.state.currentUser.email} </label>
                <li> <NavLink to="/" onClick={this.signOut}> Sign Out </NavLink> </li>
                <Dropdown trigger={
                  <Button>Drop me!</Button>
                  }>
                  <NavItem>one</NavItem>
                  <NavItem>two</NavItem>
                  <NavItem divider />
                  <NavItem>three</NavItem>
                </Dropdown>
              </Navbar>
            )
          }






        
      </div>
    )
  }
}


export default App;


// <nav className="navbar navbar-default">
//           <div className="container-fluid">
//             <div className="navbar-header">
//               <a className="navbar-brand" >Buy and Sell</a>
//             </div>
            
//             {this.state.currentUser === null ? 
//               (
//                 <ul className="nav navbar-nav">
//                   <li><Link to="/">Home</Link></li>
//                   <li><Link to="/car">Cars</Link></li>
//                   <li><Link to="/about">About</Link></li>
//                   <li><Link to="/SignIn"> Log In </Link></li>
//                   <li><Link to="/SignUp"> Sign Up </Link></li>
//                 </ul>

//               ) : (
//                 <ul className="nav navbar-nav">
//                   <li><Link to="/">Home</Link></li>
//                   <li><Link to="/car">Cars</Link></li>
//                   <li><Link to="/about">About</Link></li>
//                   <li> <label>Hello, {this.state.currentUser.email} </label></li>
//                   <li><Link to="/" onClick={this.signOut}> Sign Out </Link></li>
//                   <li>
//                   </li>
//                 </ul>   
//               )
//             }

            

//           </div>
//         </nav>

