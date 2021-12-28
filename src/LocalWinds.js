import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import appReducer from './redux/reducers';
import {createStore} from 'redux';

const store = createStore(appReducer);

export const LocalWinds = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}