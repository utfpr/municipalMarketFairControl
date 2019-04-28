import React, { PureComponent, Fragment } from 'react';

import { 
    Popconfirm, Button, Form,
    Input, Modal, message,
} from 'antd';

import TabelaComponent from '../../components/TabelaComponent';

import UpdateSubcategoria from './UpdateSubcategoria';

import * as categoriasAPI from '../../api/categoria';
import * as subcategoriasAPI from '../../api/subcategoria';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Subcategorias extends PureComponent {

    state = {
        subcategorias: [],
        loading: true,
        editingSubcategoria: {},
    };

    componentDidMount() {
        this._loadSubcategorias();
    }

    _handleSubmit = (e) => {
        const { 
            form: {resetFields},
            categoria,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                message.loading('Carregando...', 0);
                return subcategoriasAPI.post(values.nome, categoria.id)
                    .then(() => {
                        resetFields();
                        this._loadSubcategorias();
                        message.success('Subcategoria criada com sucesso!', 2.5);
                    }).catch(() => {
                        message.error('Não foi possível adicionar subcategoria!', 2.5);
                    });
            }
        });
    }

    _loadSubcategorias = async () => {
        const { categoria } = this.props;
        this.setState({loading: true});
        const subcategorias = await categoriasAPI.getSub(categoria.id);
        this.setState({subcategorias, loading: false});
    }

    _onDeleteSubCategoria = id => {
        message.loading('Carregando...', 0);
        return subcategoriasAPI.deleteSub(id)
            .then(() => {
                this._loadSubcategorias();
                message.success('Subcategoria excluída com sucesso!', 2.5);
            }).catch(() => {
                message.error('Não foi possível excluir subcategoria, tente novamente mais tarde', 2.5);
            });
    }

    _onEditSub = async sub => {
        const { form: { setFieldsValue } } = this.props;

        this.setState({ editingSubcategoria: sub });
        return await setFieldsValue({
            novo_nome: sub.nome,
        });
    }

    _renderSubcategorias = () => {
        const { subcategorias, loading } = this.state;

        const colunas = [
            {
                key: 'SubcategoriaId',
                dataIndex: 'id',
                title: '#',
                width: 50,
            }, {
                key: 'SubcategoriaNome',
                dataIndex: 'nome',
                title: 'Nome',
            }, {
                key: 'acoes',
                title: 'Ações',
                width: 90,
                render: linha => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button shape="circle" icon="edit" onClick={() => this._onEditSub(linha)} />
                            <Popconfirm
                                title="Deseja deletar esta subcategoria?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => this._onDeleteSubCategoria(linha.id)}
                            >
                                <Button shape="circle" icon="delete" type="danger" />
                            </Popconfirm>
                        </div>
                    );
                }
            },
        ];

        return (
            <TabelaComponent
                linhas={subcategorias} 
                colunas={colunas}
                loading={loading}
                size="small"
                pagination={{
                    pageSize: 15,
                }}
            />
        );
    }

    handleCancel = () => {
        this.setState({ editingSubcategoria: {} });
    }

    render() {

        const { form } = this.props;

        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const { editingSubcategoria } = this.state;

        const nomeError = isFieldTouched('nome') && getFieldError('nome');

        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={nomeError ? 'error' : ''}
                        help={nomeError || ''}
                    >
                        {getFieldDecorator('nome', {rules: [{
                            required: true,
                            message: 'O nome da subcategoria é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                            || !getFieldValue('nome')
                        }
                    >
                        Adicionar
                    </Button>
                    </Form.Item>
                </Form>
                <Modal
                    title={`${editingSubcategoria.id} - ${editingSubcategoria.nome}`}
                    visible={Boolean(editingSubcategoria && editingSubcategoria.id)}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={300}
                >
                    {
                        editingSubcategoria && editingSubcategoria.id
                        ? (
                            <UpdateSubcategoria
                                onCancel={this.handleCancel}
                                refresh={this._loadSubcategorias}
                                subcategoria={editingSubcategoria}
                            />
                        ) : null
                    }
                </Modal>
                { this._renderSubcategorias() }
            </Fragment>
        );
    }

}

const WrappedHorizontalSubcategoriasForm = Form.create({ name: 'categorias_form' })(Subcategorias);

export default WrappedHorizontalSubcategoriasForm;