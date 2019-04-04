import React, { PureComponent } from 'react';

import { Layout } from 'antd';

import styles from './ContentComponent.module.scss';

const { Content } = Layout;


export default class ContentComponent extends PureComponent {

    state = {};

    render() {
        const { children, title } = this.props;
        return (
            <Content className={styles.container}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                </div>
                {children}
            </Content>
        );
    }

}
