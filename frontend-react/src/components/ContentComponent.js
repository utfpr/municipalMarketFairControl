import React, { PureComponent } from 'react';

import { Layout } from 'antd';

const { Content } = Layout;


export default class ContentComponent extends PureComponent {

    state = {};

    render() {
        const { children } = this.props;
        return (
            <Content style={{
                margin: '16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
                {children}
            </Content>
        );
    }

}
