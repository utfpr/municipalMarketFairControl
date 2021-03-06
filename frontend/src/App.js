import React, { Component } from 'react';

import { BrowserRouter, matchPath } from 'react-router-dom';
import { message } from 'antd';

import routes from './routes';
import MainLayout from './layouts/MainLayout';

import './App.css';
import 'antd/dist/antd.css';
import { auth } from './api/auth';

class App extends Component {

    state = {};

    componentDidMount() {
        this._verifyUser();
        message.config({
            maxCount: 1,
        });
    }

    _mediaProviderUpdate = ref => {
        if (ref) {
            ref.provider.update();
        }
    };

    _verifyUser = async () => {
        try {
            const route = routes.find(r => matchPath(window.location.pathname, r));
            const loggedUserType = await localStorage.getItem('tag');
            const isUserLogged = await auth(loggedUserType);
            
            if (route && !route.public && !loggedUserType) {
                localStorage.clear();
                window.location = '/';
                return null;
            }

            if (loggedUserType) {
                if (route && !route.public && !isUserLogged.data.cpf) {
                    localStorage.clear();
                    window.location = '/';
                    return null;
                }
                if(!route.permissions.find(permission => permission === loggedUserType) && !route.public) {
                    window.location = '/';
                    return null;
                };
            }

        } catch (ex) {
            console.warn(ex);
        }
    }

    render() {
        return (
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        );
    }

}

export default App;
