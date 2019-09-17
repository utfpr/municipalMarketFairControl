import React, { PureComponent, Fragment } from 'react';

import {
    Table, Tag, Popconfirm, Button,
    Modal, Form, DatePicker,
    Upload, Icon, message,
    Menu, Dropdown,
} from 'antd';
import moment from 'moment-timezone';

import ContentComponent from '../../components/ContentComponent';

import * as feiraAPI from '../../api/feira';
import styles from './Feira.module.scss';

const { Column } = Table;

const UPLOAD_URL = `${process.env.REACT_APP_HOST}/image/upload`;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FeiraScreen extends PureComponent {

    state = {
        feiras: [],
        visible: false,
        feiraAtual: {},
        loading: true,
        fileList: [],
        selectedFeira: {},
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadFeiras();
    }

    _loadFeiras = async () => {
        this.setState({ loading: true });
        const feiras = await feiraAPI.listFeiras();
        const feiraAtual = await feiraAPI.feiraAtual();
        this.setState({ feiras, feiraAtual, loading: false });
    }

    _handleSubmit = (e) => {
        const { form: { resetFields, validateFields } } = this.props;

        e.preventDefault();
        validateFields((err, values) => {
            const data = moment(values.data).format('YYYY-MM-DD');
            const photo = values.photo ? values.photo[0].response.filename : undefined;
            if (!err) {
                const { selectedFeira } = this.state;
                if (!selectedFeira.data) {
                    return feiraAPI.post(data, photo)
                        .then(() => {
                            resetFields();
                            this._loadFeiras();
                            message.success('Feira adicionada com sucesso.', 2.5);
                            this._hideModal();
                            this.setState({ fileList: [] });
                        });
                }
                return feiraAPI.atualizaFoto(selectedFeira.data, photo)
                    .then(() => {
                        resetFields();
                        this._loadFeiras();
                        message.success('Feira atualizada com sucesso.', 2.5);
                        this._hideModal();
                        this.setState({ fileList: [] });
                    });
            }
        });
    }

    _alteraStatusFeira = data => {
        return feiraAPI.alteraStatusFeira(data).then(() => {
            this._loadFeiras();
            message.success('Mudança de Status', 2.5);
            this._hideModal();
        });
    }

    _setSelectedFeira = feira => {
        this.setState({ selectedFeira: feira, visible: true });
    }

    _renderAcoes = item => {
        const menuItens = (
            <Menu>
                {
                    item.status
                        ? (
                            <Menu.Item key="1" onClick={() => this._alteraStatusFeira(item.data)} >
                                <Icon type="close" />
                                Inativar
                            </Menu.Item>
                        )
                        : (
                            <Menu.Item key="2" onClick={() => this._alteraStatusFeira(item.data)} >
                                <Icon type="check" />
                                Reativar
                            </Menu.Item>
                        )
                }
            </Menu>
        );

        return (
            <Dropdown.Button onClick={() => this._setSelectedFeira(item)} overlay={menuItens}>
                <Icon type="eye" />
                Visualizar
            </Dropdown.Button>
        );
        // return (
        //     <>
        //     <Button icon="eye" onClick={() => this._setSelectedFeira(item)}>
        //         Visualizar
        //     </Button>
        //     {this._renderButtonAtivaInativa(item)}
        //     </>
        // );

        // if (moment(feira.data).isBefore(moment())) return (
        //     <Button icon="close" disabled type="danger">
        //         Inativar
        //     </Button>
        // )
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    handleChange = (info) => {
        let fileList = info.fileList;

        // // 1. Limit the number of uploaded files
        // // Only to show two recent uploaded files, and old ones will be replaced by the new
        // fileList = fileList.slice(-2);

        // // 2. Read from response and show file link
        // fileList = fileList.map((file) => {
        //   if (file.response) {
        //     // Component will show file.url as link
        //     file.url = file.response.url;
        //   }
        //   return file;
        // });

        // // 3. Filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //   if (file.response) {
        //     return file.response.status === 'success';
        //   }
        //   return false;
        // });

        this.setState({ fileList });
    }

    _renderModal = () => {
        const { visible, fileList, selectedFeira } = this.state;

        const { form } = this.props;

        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched,
        } = form;

        if (!visible) return null;

        const dataError = isFieldTouched('data') && getFieldError('data');

        const isEditing = Boolean(selectedFeira.data);

        return (
            <Modal
                title={isEditing ? `Editar feira do dia ${moment(selectedFeira.data).format('DD/MM/YYYY')}` : "Adicionar uma feira"}
                visible={visible}
                onCancel={this._hideModal}
                footer={null}
            >
                {
                    selectedFeira.evento_image_url
                        ? (
                            <div
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_HOST}/image/${selectedFeira.evento_image_url})`
                                }}
                                className={styles.eventoImage}
                            />
                        ) : null
                }
                <Form onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={dataError ? 'error' : ''}
                        help={dataError || ''}
                    >
                        {isEditing ? (<span>Não é possível alterar a data de uma feira<br /></span>) : null}

                        {getFieldDecorator('data', {
                            rules: [{
                                required: !isEditing,
                                message: 'A data é obrigatória!'
                            }]
                        })(
                            <DatePicker disabled={isEditing} placeholder="Selecione uma data" format="DD/MM/YYYY" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        Enviar imagem do evento:
                        <div className="dropbox">
                            {getFieldDecorator('photo', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                fileList: fileList,
                                onChange: this.handleChange,
                            })(
                                <Upload
                                    multiple={false}
                                    name="photo"
                                    action={UPLOAD_URL}
                                    disabled={fileList.length >= 1}
                                    listType="picture"
                                >
                                    <Button disabled={fileList.length >= 1}>
                                        <Icon type="upload" /> Enviar foto do evento
                                </Button>
                                </Upload>
                            )}
                        </div>
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
        );//here
    }

    _showModal = () => {
        this.setState({ visible: true });
    }

    _hideModal = () => {
        this.setState({ visible: false, fileList: [], selectedFeira: {} });
    }

    _renderFeiraAtual = () => {
        const { feiraAtual } = this.state;
        if (!feiraAtual || !feiraAtual.data) return (
            <div className={styles.proximaFeiraContainer}>
                <h3>Não existe nenhuma feira para a próxima semana.</h3>
            </div>
        );

        return (
            <div className={styles.proximaFeiraContainer}>
                <div className={styles.descricao}>
                    <h3>Próxima feira: <span style={{ fontWeight: 'normal' }}>{moment(feiraAtual.data).format('DD/MM/YYYY')}</span></h3>
                    <h3>Data limite: <span style={{ fontWeight: 'normal' }}>{moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')}</span></h3>
                </div>
                <div>
                    <Popconfirm
                        title={<span>Você quer inativar esta feira?</span>}
                        okText="Sim"
                        cancelText="Não"
                        onConfirm={() => this._alteraStatusFeira(feiraAtual.data)}

                    >
                        <Button icon="close" type="danger">Inativar</Button>
                    </Popconfirm>
                </div>
            </div>
        );
    }

    _cancelaFeiraAtual = async () => {
        await feiraAPI.deletaUltimaFeira()
            .then(() => {
                this._loadFeiras()
            });

    }
    render() {
        const { feiras, loading } = this.state;

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
                    {this._renderFeiraAtual()}
                    <Table
                        dataSource={novaFeiras}
                        loading={loading}
                    >

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
                                    : <Tag color="#f50">Inativo</Tag>
                            }}
                            width={80}
                        />
                        <Column
                            title="Ações"
                            key="acoes"
                            render={this._renderAcoes}
                            width={200}
                        />
                    </Table>
                </ContentComponent>
                {this._renderModal()}
            </Fragment>
        );
    }

}

const WrappedHorizontalFeirasForm = Form.create({ name: 'feiras_form' })(FeiraScreen);

export default WrappedHorizontalFeirasForm;