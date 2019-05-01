import React, { Component } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import routes from '../routes';
import HomeScreen from '../screens/HomeScreen';
import FeiranteScreen from '../screens/FeiranteScreen';

class MainLayout extends Component {

    state = {}

    _renderRoute = (route, index) => {
        return (
            <Route key={index} {...route} />
        );
    }

    _renderPrivateRoute = (route, index) => {
        const { component: Comp, ...others } = route;

        if (route.permissions.find(permission => permission === 'feirante')) {
            return (
                <Route
                    key={index}
                    render={props => {
                        return (
                            <FeiranteScreen>
                                <Comp {...props} />
                            </FeiranteScreen>
                        );
                    }}
                    {...others}
                />
            );
        }

        return (
            <Route
                key={index}
                render={props => {
                    return (
                        <HomeScreen>
                            <Comp {...props} />
                        </HomeScreen>
                    );
                }}
                {...others}
            />
        );
    }

    _renderContent = () => {
        return routes.map((route, index) => (
            route.public
                ? this._renderRoute(route, index)
                : this._renderPrivateRoute(route, index)
        ));
    }

    render() {

        return (
            <div>
                <Switch>
                    {this._renderContent()}
                </Switch>
            </div>
        );
    }

}

export default withRouter(MainLayout);
