import React, { Component } from 'react';

import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import routes from '../routes';
import styles from './FeiranteScreen.module.scss';

const { Header, Content } = Layout;

class FeiranteScreen extends Component {

    state = {
        collapsed: false,
        selectedKey: [],
    };

    componentDidMount() {
        this._setPath();
    }

    _setPath = () => {
        const { pathname } = this.props.location;
        const currentRoute = routes.find(route => route.path === pathname);
        if (!currentRoute) return null;
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

    _onLogout = () => {
        localStorage.clear();
        window.location = '/';
    }

    _toggle = () => {
        const { collapsed } = { ...this.state };
        this.setState({
            collapsed: !collapsed,
        });
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

    _renderNavItems = () => {
        return routes.map(route => {
            if(route.permissions.find(permission => permission === "feirante")) {
                return (
                    <Menu.Item
                        key={route.key}
                        path={route.path}
                        name={route.label}
                        onClick={this._onChangeRoute}
                    >
                        <Icon type={route.icon} />
                        <span>{route.label}</span>
                    </Menu.Item>
                );
            }
            return null;
        });
    }

    render() {
        const { children } = this.props;
        const { selectedKey } = this.state;
        return (
            <Layout className="layout">
                <Header>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={selectedKey}
                        style={{ lineHeight: '64px' }}
                    >
                        {this._renderNavItems()}
                    </Menu>
                </Header>
                {children}
            </Layout>
        );
    }

}

export default withRouter(FeiranteScreen);
