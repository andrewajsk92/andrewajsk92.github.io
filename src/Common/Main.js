import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Home from './Home'
import About from './About'
import Car from './Car'
import NewPost from './NewPost'
import Detail from './Detail'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'

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
  constructor(props){
    super(props);

  }

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
    

  render(){
        
    return(
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/car' component={Car}/>
            <Route path='/About' component={About}/>
            <Route path='/NewPost' component={NewPost}/>
            <Route path='/Detail' component={Detail}/>

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

            <Route path='/SignOut' render={() => 
              (
                firebase.auth().currentUser === null ? 
                (
                  <Redirect to="/" />
                ) : (
                  <SignOut />
                )
              )}/>
          </Switch>
        </main>

      </div>
    );
  }
}

export default Main