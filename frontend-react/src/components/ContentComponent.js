import React, { PureComponent } from 'react';

import { Layout, Button } from 'antd';

import styles from './ContentComponent.module.scss';

const { Content } = Layout;


export default class ContentComponent extends PureComponent {

    state = {};

    _renderHeaderButton = () => {
        const { buttonProps } = this.props;
        return (
            <Button {...buttonProps}>
                {buttonProps.text}
            </Button>
        )
    }

    render() {
        const { children, title, buttonProps } = this.props;
        return (
            <Content className={styles.container}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    {
                        buttonProps
                            ? (
                                this._renderHeaderButton()
                            ) : null
                    }
                </div>
                <div className={styles.divider} />
                {children}
            </Content>
        );
    }

}
