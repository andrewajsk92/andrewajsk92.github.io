import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import { Col } from 'react-bootstrap';


import Header from "./Common/Header";
import Main from "./Common/Main";


class App extends Component {
  render() {
    return (
      <div>
      	<Header />
      	<div>
          <Main />
      	</div>
      </div>
    );
  }
}

export default App;