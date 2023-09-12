import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router/>
    </Provider>

);

reportWebVitals();
