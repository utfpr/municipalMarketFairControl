import React, { Component } from 'react';

import { BrowserRouter, matchPath } from 'react-router-dom';

import routes from './routes';
import MainLayout from './layouts/MainLayout';

import './App.css';
import 'antd/dist/antd.css';

class App extends Component {

    state = {};

    componentDidMount() {
        this._loadUser();
    }

    _loadUser = () => {
        const token = localStorage.getItem('token');

        try {
            if (token !== null){
                const tag = localStorage.getItem('tag');
                if (tag === 'feirante') {
                    // history.push('/feirante');
                } else if(tag === 'supervisor' || tag === 'administrador') {
                    // history.push('/supervisor');
                } else {
                    window.location = '/';
                }
            }
        } catch (ex) {
            console.warn(ex);
        }

    };

    _mediaProviderUpdate = ref => {
        if (ref) {
            ref.provider.update();
        }
    };

    render() {
        const route = routes.find(r => matchPath(window.location.pathname, r));
        const token = localStorage.getItem('token');
        
        if (route && route.private && !token) {
            localStorage.clear();
            window.location = '/';
            return null;
        }
        return (
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        );
    }

}

export default App;
