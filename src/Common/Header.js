import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

import { Navbar, FormGroup, FormControl, Button, ButtonGroup, Col,Grid, Row } from 'react-bootstrap';
// import {ToggleButtonGroup, ToggleButton} from 'react-toggle-button';

const App = () => (
	<div>
		<nav className="navbar navbar-default">
		    <div className="container-fluid">
		        <div className="navbar-header">
		            <a className="navbar-brand" >Buy and Sell</a>
		        </div>
	            <ul className="nav navbar-nav">
	                {/* Change from a to Link */}
	                <li><Link to="/">Home</Link></li>
	                <li><Link to="/car">Cars</Link></li>
	                <li><Link to="/about">About</Link></li>
	            </ul>
		    </div>
		</nav>

		<div>
			<Navbar>
				<Navbar.Form pullLeft>
			    	<FormGroup>
			    		<FormControl type="text" placeholder="Search" />
			    	</FormGroup>
			    	{' '}
			    	<Button type="submit">Search</Button>
			  	</Navbar.Form>
			</Navbar>

		</div>

		<Grid>
			<Row>
				<Col xs={1} md={4}></Col>
				<Col xs={4} md={4}>
					<ButtonGroup type="radio" name="options" defaultValue={1} className="BuySellButton">
					    <Button value={1} className="Testing"> Buy </Button>
						<Button value={2}>Sell</Button>
					</ButtonGroup>
				</Col>
				<Col xs={1} md={4}></Col>
			</Row>
		</Grid>

		

		
	</div>
)

export default App