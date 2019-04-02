import React, { PureComponent } from 'react';

import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import routes from '../routes';

class MenuSidebar extends PureComponent {

    state = {
        selectedKey: [],
    };

    componentDidMount() {
        this._setPath();
    }

    _setPath = () => {
        const { pathname } = this.props.location;
        const currentRoute = routes.find(route => route.path === pathname);
        this.setState({ selectedKey: [currentRoute.key] });
    }


    _onChangeRoute = event => {
        const { item: { props } } = event;
        const { history } = this.props;
        this.setState(
            { selectedKey: [props.eventKey] },
            history.push({
                pathname: props.path,
                state: { selectedKey: [props.eventKey] },
            }),
        );
    }

    render() {
        const { selectedKey } = this.state;
        return (
            <Menu
                theme="dark"
                mode="inline"
                onClick={this._onChangeRoute}
                selectedKeys={selectedKey}
            >
                {
                    routes.map(route => {
                        if (route.hidden) return null;
                        return (
                            <Menu.Item
                                key={route.key}
                                path={route.path}
                                name={route.label}
                            >
                                <Icon type={route.icon} />
                                <span>{route.label}</span>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        );
    }

}

export default withRouter(MenuSidebar);
