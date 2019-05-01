import React, { Component } from 'react';

import {
    Layout, Icon, Menu, Popconfirm,
    Modal,
} from 'antd';
import { withRouter } from 'react-router-dom';

import routes from '../routes';
import styles from './HomeScreen.module.scss';

const { confirm } = Modal;
const { Header, Sider } = Layout;

class HomeScreen extends Component {

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
        confirm({
            title: 'Você deseja realmente sair da aplicação?',
            okText: 'Sim',
            cancelText: 'Cancelar',
            onOk: () => {
              localStorage.clear();
              window.location = '/';
            },
        });
    }

    _toggle = () => {
        const { collapsed } = { ...this.state };
        this.setState({
            collapsed: !collapsed,
        });
    }

    _renderNavItems = () => {
        return routes.map(route => {
            const loggedUserType = localStorage.getItem('tag');
            if (route.hidden) return null;

            if(!route.permissions.find(permission => permission === loggedUserType)) return null;
            
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
        });
    }

    render() {
        const { children } = this.props;
        const { selectedKey } = this.state;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={this._onChangeRoute}
                        selectedKeys={selectedKey}
                    >
                        {this._renderNavItems()}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        <Icon
                            className={styles.collapseButton}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this._toggle}
                        />
                        <h1 
                            style={{
                                marginBottom: 3,
                                marginLeft: 8,
                                fontSize: 20,
                                flex: 1,
                            }}
                        >
                            Sistema de Controle da Feira Criativa
                        </h1>
                        <Icon onClick={this._onLogout} className={styles.logoutButton} type="logout" />
                    </Header>
                    {children}
                </Layout>
            </Layout>
        );
    }

}

export default withRouter(HomeScreen);
