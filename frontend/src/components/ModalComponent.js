import React, { PureComponent } from 'react';

import { Modal, Button } from 'antd';

export default class ModalComponent extends PureComponent {

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { children, titulo } = this.props;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    title={titulo}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    {children}
                </Modal>
            </div>
        );
    }

}