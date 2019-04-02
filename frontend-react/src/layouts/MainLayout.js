import React, { Component } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import routes from '../routes';
import HomeScreen from '../screens/HomeScreen';

class MainLayout extends Component {

    state = {}

    _renderRoute = (route, index) => {
        return (
            <Route key={index} {...route} />
        );
    }

    _renderPrivateRoute = (route, index) => {
        const { component: Comp, ...others } = route;
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
            route.private
                ? this._renderPrivateRoute(route, index)
                : this._renderRoute(route, index)
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
