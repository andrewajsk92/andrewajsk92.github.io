import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Home from './Home'
import About from './About'
import Car from './Car'
import NewPost from './NewPost'
import Detail from './Detail'
import SignIn from './SignIn'
import SignUp from './SignUp'
import EditPost from './EditPost'
import PromisePractice from './PromisePractice'
import VerifyEmail from './VerifyEmail';

import * as firebase from 'firebase';





// var database = firebase.database();
// const db = firebase.database();
// const dbRef = db.ref().child('data');

// console.log(firebase.auth().app)
// var userId = firebase.auth().currentUser.uid;
// console.log(userId);

// var database = firebase.database();
// console.log(database);
// var ref = firebase.database().ref();                           
// console.log(ref);
// var userId = firebase.auth().currentUser.uid;
// console.log(userId);


class Main extends Component{

  // requireAuth(nextState, replace, next){
  //   console.log("REQUIRING AUTH");
  //   if(!firebase.auth().currentUser){
  //     replace({
  //       pathname: '/SignIn'
  //     })
  //     next();
  //   }
  //   next();
  // }

  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
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
        <main>
          <Switch>
            <Route exact path='/' render={() => 
              (
                this.state.currentUser === null ?
                (
                  <Home />
                ) : (
                  
                  this.state.currentUser.emailVerified === false ? 
                  (
                    <VerifyEmail />
                  ): (
                    <Home />
                  )
                )
              )
            }/>

            <Route path='/car' component={Car}/>
            <Route path='/About' component={About}/>

            <Route path='/PromisePractice' component={PromisePractice}/>

            <Route path="/EditPost/:BuyOrSell/:itemKey" render={() => 
              this.state.currentUser === null ? 
              (
                <Redirect to="/" />
              ) : (
                <EditPost />
              )
            } />

            <Route path='/NewPost' render={() => 
              (
                firebase.auth().currentUser === null ?
                (
                  <Redirect to="/" />
                ) : (
                  <NewPost />
                )
              )
            }/>

            <Route path='/Detail/:BuyOrSell/:itemKey' component={Detail}/>

            <Route path='/SignIn' render={() => 
              (
                firebase.auth().currentUser === null ?
                (
                  <SignIn />
                ) : (
                  <Redirect to ="/" />
                )
              )
            }/>

            <Route path='/SignUp' render={() => 
              (
                firebase.auth().currentUser === null ?
                (
                  <SignUp />
                ) : (
                  <Redirect to ="/" />
                )
              )
            }/>

            <Redirect to="/404" />

          </Switch>
        </main>

      </div>
    );
  }
}

export default Main