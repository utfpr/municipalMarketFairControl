import React, { PureComponent, Fragment } from 'react';

import { 
    Table, Tag, Popconfirm, Button,
    Modal, Form, DatePicker, Upload, Icon,message,
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
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadFeiras();
    }

    _loadFeiras = async () => {
        this.setState({loading: true});
        const feiras = await feiraAPI.listFeiras();
        const feiraAtual = await feiraAPI.feiraAtual();
        this.setState({ feiras, feiraAtual, loading: false });
    }

    _handleSubmit = (e) => {
        const { form: {resetFields, validateFields} } = this.props;

        e.preventDefault();
        validateFields((err, values) => {
            const data = moment(values.data).format('YYYY-MM-DD');
            const photo = values.photo ? values.photo[0].response.filename : undefined;
            if (!err) {
                return feiraAPI.post(data, photo)
                    .then(() => {
                        resetFields();
                        this._loadFeiras();
                        message.success('Feira adicionada com sucesso.', 2.5);
                        this._hideModal();
                        this.setState({fileList: []});
                    });
            }
        });
    }

    _alteraStatusFeira = data => {
        return feiraAPI.alteraStatusFeira(data).then(() => {
            this._loadFeiras();
            message.success('Mudança de Status', 2.5);
        });
    }

    _renderAcoes = feira => {
        
        if (moment(feira.data).isBefore(moment())) return (
            <Button icon="close" disabled type="danger">
                Inativar
            </Button>
        )

        if (!feira.status) return (
            <Popconfirm
                title="Você quer reativar esta feira?"
                okText="Sim"
                cancelText="Não"
                onConfirm={
                    () => this._alteraStatusFeira(feira.data)
                }
            >
                <Button icon="check">
                    Reativar
                </Button>
            </Popconfirm>
        );

        return (
            <Popconfirm
                title="Você quer cancelar esta feira?"
                okText="Sim"
                cancelText="Não"
                onConfirm={
                    () => this._alteraStatusFeira(feira.data)
                }
            >
                <Button icon="close" type="danger">
                    Inativar
                </Button>
            </Popconfirm>
        );
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
        const { visible, fileList } = this.state;

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
                <Form onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={dataError ? 'error' : ''}
                        help={dataError || ''}
                    >
                        {getFieldDecorator('data', {rules: [{
                            required: true,
                            message: 'A data é obrigatória!'
                        }]})(
                            <DatePicker placeholder="Selecione uma data" format="DD/MM/YYYY"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        Possui evento neste dia?
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
                                // showUploadList={false}
                                listType="picture"
                                // 
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
        );
    }
    
    _showModal = () => {
        this.setState({visible: true});
    }

    _hideModal = () => {
        this.setState({visible: false, fileList: []});
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
                    <Table dataSource={novaFeiras}
                           loading={loading}>
                           
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
                            width={110}
                        />
                        <Column
                            title="Ações"
                            key="acoes"
                            render={this._renderAcoes}
                            width={105}
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