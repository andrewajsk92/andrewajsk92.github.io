import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

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


		

		

		
	</div>
)

export default App;
