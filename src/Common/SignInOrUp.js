import React, {Component} from 'react'

import SignIn from './SignIn'
import SignUp from './SignUp'

import {Row, Col} from 'react-materialize';


class SignInOrUp extends Component{
  render(){
    return( 
      <Row>
        <Col s={12} m={6}>
          <h5> Sign In </h5>
          <SignIn />
        </Col>

        <Col s={12} m={6}>
          <h5> Sign up </h5>
          <SignUp />
        </Col>
      </Row>
    )
  }
}

export default SignInOrUp;