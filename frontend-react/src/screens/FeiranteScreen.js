import React, { Component } from 'react';

import {
    Layout, Icon, Menu, Button,
    Drawer, Modal,
} from 'antd';
import { withRouter } from 'react-router-dom';

import routes from '../routes';
import styles from './FeiranteScreen.module.scss';

const { Header } = Layout;
const { confirm } = Modal;

class FeiranteScreen extends Component {

    state = {
        collapsed: false,
        selectedKey: [],
        visible: false,
    };

    componentDidMount() {
        this._setPath();
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

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

    _onAskToLogout = () => {
        confirm({
            title: 'Você deseja realmente sair da aplicação?',
            okText: 'Sim',
            cancelText: 'Cancelar',
            onOk: () => {
              this._onLogout();
            },
        });
    }

    _renderSairButton = () => {
        return (
            <Menu.Item
                key="sair"
                name="sair"
                onClick={this._onAskToLogout}
            >
                <Icon type="logout" />
                <span>Sair</span>
            </Menu.Item>
        )
    }

    render() {
        const { children } = this.props;
        const { selectedKey } = this.state;
        return (
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={selectedKey}
                        className={styles.menuDesktop}
                    >
                        {this._renderNavItems()}
                        {this._renderSairButton()}
                    </Menu>
                    <Button
                        type="primary"
                        onClick={this.showDrawer}
                        className={styles.menuButton}
                    >
                        Menu
                    </Button>
                </Header>
                {children}
                <Drawer
                    title="Menu"
                    placement="right"
                    closable
                    className={styles.drawer}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Menu
                        theme="light"
                        mode="vertical"
                        selectedKeys={selectedKey}
                    >
                        {this._renderNavItems()}
                        {this._renderSairButton()}
                    </Menu>
                   
                </Drawer>
            </Layout>
        );
    }

}

export default withRouter(FeiranteScreen);
