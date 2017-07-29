import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Col } from 'react-bootstrap';


import Header from "./Common/Header";
import Main from "./Common/Main";
import Sorting from "./Common/Sorting";


class App extends Component {
  render() {
    return (
      <div>
      	<Header />
      	<div>
      		<Col xs={2}> <Sorting /></Col>
          <Col xs={10}> <Main /> </Col>
      	</div>
      </div>
    );
  }
}

export default App;