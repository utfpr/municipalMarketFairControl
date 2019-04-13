import React, { PureComponent, Fragment } from 'react';

import { Layout, Button, Spin } from 'antd';

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

    _renderContent = () => {
        const { buttonProps, title, children} = this.props;
        return (
            <Fragment>
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
            </Fragment>
        )
    }

    render() {
        const { loading } = this.props;
        return (
            <Content className={styles.container}>
                {
                    loading
                        ? (
                            <Spin>
                                {this._renderContent()}
                            </Spin>
                        )
                        : (
                            <Fragment>
                                {this._renderContent()}
                            </Fragment>
                        )
                }
                
            </Content>
        );
    }

}
