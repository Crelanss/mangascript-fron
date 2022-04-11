import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import MangaStore from './store/MangaStore';
import CartStore from "./store/CartStore";
import OrdersStore from "./store/OrdersStore";
import {BrowserRouter} from 'react-router-dom';

export const Context = createContext(null)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <Context.Provider value={{
            user: new UserStore(),
            manga: new MangaStore(),
            cart: new CartStore(),
            orders: new OrdersStore()
        }}>
            <App/>
        </Context.Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
