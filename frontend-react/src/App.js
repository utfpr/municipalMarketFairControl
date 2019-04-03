import React, { Component } from 'react';

import { BrowserRouter, matchPath } from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';
import routes from './routes';
import MainLayout from './layouts/MainLayout';

class App extends Component {

    state = {};

    _loadUser = async () => {
        const route = routes.find(r => matchPath(window.location.pathname, r));

        if (route && !route.private) {
            return;
        }

        try {
            // const { data: { token } } = await axios.put('/users/login');
            // await updateToken(token);
        } catch (ex) {
            console.warn(ex);
            if (route) {
                // removeToken();
                window.location = '/login';
            }
        }
    };

    _mediaProviderUpdate = ref => {
        if (ref) {
            ref.provider.update();
        }
    };

    render() {
        return (
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        );
    }

}

export default App;
