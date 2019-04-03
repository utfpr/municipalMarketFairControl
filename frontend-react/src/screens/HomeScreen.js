import React, { Component } from 'react';

import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
// import MenuSidebar from '../components/MenuSidebar';

import routes from '../routes';


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

    _toggle = () => {
        const { collapsed } = { ...this.state };
        this.setState({
            collapsed: !collapsed,
        });
    }

    _renderNavItems = () => {
        return routes.map(route => {
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
                    <Header style={{
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 16,
                    }}
                    >
                        <Icon
                            className="trigger"
                            style={{
                                border: '1px solid rgba(0,0,0,0.3)',
                                borderRadius: 4,
                                padding: 12,
                            }}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this._toggle}
                        />
                        <h1 style={{
                            marginBottom: 3,
                            marginLeft: 8,
                            fontSize: 20,
                        }}
                        >
                            Municipal Market Fair Control
                        </h1>
                    </Header>
                    {children}
                </Layout>
            </Layout>
        );
    }

}

export default withRouter(HomeScreen);
