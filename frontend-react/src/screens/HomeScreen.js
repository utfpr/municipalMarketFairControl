import React, { Component } from 'react';

import { Layout, Icon } from 'antd';
import MenuSidebar from '../components/MenuSidebar';

const { Header, Sider } = Layout;

class HomeScreen extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        const { collapsed } = { ...this.state };
        this.setState({
            collapsed: !collapsed,
        });
    }

    render() {
        const { children } = this.props;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <MenuSidebar />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    {children}
                </Layout>
            </Layout>
        );
    }

}

export default HomeScreen;
