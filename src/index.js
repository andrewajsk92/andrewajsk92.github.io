import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'




// ReactDOM.render(<Home />, document.getElementById('app'));

// ReactDOM.render(
//     <BrowserRouter>
//     	<Route component={Main}>
// 	        <Route exact path="/" component={Home}/>
// 	        <Route path="/car" component={Car}/>
// 	        <Route path="/about" component={About}/>
// 	        <Route path="/app" component={App}/>
// 		</Route>
//     </BrowserRouter>,
//     document.getElementById('container')
// );

ReactDOM.render(
    <BrowserRouter>
    	<App />
    </BrowserRouter>,
    document.getElementById('container')
);

registerServiceWorker();
