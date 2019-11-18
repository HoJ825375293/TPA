import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import * as serviceWorker from './components/serviceWorker';
import 'antd/dist/antd.css'
import { HashRouter as Router, Route } from 'react-router-dom';
import RoomResultPage from './pages/RoomResultPage';
import HotelResultPage from './pages/HotelResultPage';
import TransportResultPage from './pages/TransportResultPage';
import LogPage from './pages/LogPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';

ReactDOM.render(
        <Router>
                <Route path="/" exact component={HomePage} />
                <Route path="/roomResult" component={RoomResultPage} />
                <Route path="/hotelResult" component={HotelResultPage} />
                <Route path="/transportResult" component={TransportResultPage} />
                <Route path="/login" component={LogPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/room" component={RoomPage} />
        </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();