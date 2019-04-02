import React, { PureComponent } from 'react';

import { Layout, Icon } from 'antd';
import MenuSidebar from '../components/MenuSidebar';

const { Header, Sider, Content } = Layout;

class HomeScreen extends PureComponent {

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
                    <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                    }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }

}

export default HomeScreen;
