import React from 'react';
import {Provider} from 'react-redux';

import store from './store';

import Company from './components/company';
import User from './components/user';
import LoginPage from './pages/login';


function app(){
    return(
        <Provider store={store}>
            <LoginPage/>
            <Company/>
            <User/>
        </Provider>
    );
}

export default app;