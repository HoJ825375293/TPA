import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import * as serviceWorker from './components/serviceWorker';
import 'antd/dist/antd.css'
import { HashRouter as Router, Route } from 'react-router-dom';
// import LogPage from './pages/LogPage';
// import RegisterPage from './pages/RegisterPage';

ReactDOM.render(
        <Router>
                <Route path="/" exact component={HomePage} />
                {/* <Route path="/login" component={LogPage} /> */}
                {/* <Route path="/register" component={RegisterPage} /> */}
        </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();