import React, { PureComponent, Fragment } from 'react';

import { 
    Table, Tag, Popconfirm, Button,
    Modal, Form, Input,
} from 'antd';
import moment from 'moment-timezone';

import ContentComponent from '../../components/ContentComponent';

import * as feiraAPI from '../../api/feira';

const { Column } = Table;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FeiraScreen extends PureComponent {

    state = {
        feiras: [],
        visible: false,
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadFeira();
    }

    _loadFeira = async () => {
        const feiras = await feiraAPI.listFeiras();
        this.setState({ feiras });
    }

    _handleSubmit = (e) => {
        const { form: {resetFields, validateFields} } = this.props;

        e.preventDefault();
        validateFields((err, values) => {
            console.log(values);
            if (!err) {
                return feiraAPI.post(values.data)
                    .then(() => {
                        resetFields();
                        this._loadFeira();
                        this._hideModal();
                    });
            }
        });
    }

    // _renderAcoes = feira => {
    //     if (!feira.status) return (
    //         <Button icon="close" disabled={true} type="danger">
    //             Cancelar
    //         </Button>
    //     );

    //     return (
    //         <Popconfirm
    //             title="Você quer relamente cancelar esta feira?"
    //             okText="Sim"
    //             cancelText="Não"
    //             onConfirm={() => console.log('cancelar')}
    //         >
    //             <Button icon="close" disabled={!feira.status} type="danger">
    //                 Cancelar
    //             </Button>
    //         </Popconfirm>
    //     );
    // }

    _renderModal = () => {
        const { visible } = this.state;

        const { form } = this.props;

        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched,
        } = form;

        if (!visible) return null;

        const dataError = isFieldTouched('data') && getFieldError('data');

        return (
            <Modal
                title="Adicionar uma nova feira"
                visible={visible}
                onCancel={this._hideModal}
                footer={null}
            >
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={dataError ? 'error' : ''}
                        help={dataError || ''}
                    >
                        {getFieldDecorator('data', {rules: [{
                            required: true,
                            message: 'O data é obrigatória!'
                        }]})(
                            <Input
                                placeholder="DD/MM/AAAA"
                            />
                        )}
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                        }
                    >
                        Adicionar
                    </Button>
                </Form>
            </Modal>
        );
    }
    
    _showModal = () => {
        this.setState({visible: true});
    }

    _hideModal = () => {
        this.setState({visible: false});
    }

    render() {
        const { feiras } = this.state;

        const novaFeiras = feiras.map(feira => {
            return {
                key: feira.data,
                ...feira,
            }
        });


        return (
            <Fragment>
                <ContentComponent
                    title="Feira"
                    buttonProps={{
                        text: 'Adicionar',
                        onClick: this._showModal,
                        type: 'primary',
                        icon: 'plus',
                    }}
                >

                    <Table dataSource={novaFeiras}>
                        <Column
                            title="Data"
                            dataIndex="data"
                            key="data"
                            render={data => moment(data).format('DD/MM/YYYY')}
                            width={90}
                        />
                        <Column
                            title="Data limite"
                            dataIndex="data_limite"
                            key="data_limite"
                            render={data => moment(data).format('DD/MM/YYYY [às] HH:mm')}
                        />
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={status => {
                                return status
                                ? <Tag color="#87d068">Ativo</Tag>
                                : <Tag color="#f50">Cancelada</Tag>
                            }}
                            width={70}
                        />
                        {/* <Column
                            title="Ações"
                            key="acoes"
                            render={this._renderAcoes}
                            width={105}
                        /> */}
                    </Table>
                </ContentComponent>
                {this._renderModal()}
            </Fragment>
        );
    }

}

const WrappedHorizontalFeirasForm = Form.create({ name: 'feiras_form' })(FeiraScreen);

export default WrappedHorizontalFeirasForm;