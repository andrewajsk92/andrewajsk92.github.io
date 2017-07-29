import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './Home'
import About from './About'
import Car from './Car'
import NewPost from './NewPost'




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
    

	render(){
        
        return(
            <div>
                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/car' component={Car}/>
                        <Route path='/About' component={About}/>
                        <Route path='/NewPost' component={NewPost}/>
                    </Switch>
                </main>

            </div>
        );
    }
}

export default Main