import React, { PureComponent, Fragment } from 'react';

import { 
    Input, Button, Form,
    Checkbox, message,
} from 'antd';

import * as categoriasAPI from '../../api/categoria';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CategoriasForm extends PureComponent {

    state = {};

    async componentDidMount() {
        this.props.form.validateFields();
        await this._loadValues();
    }

    _loadValues = async id => {
        const { categoria, form } = this.props;
        const { setFieldsValue, resetFields } = form;
        if (categoria) {
            resetFields();
            await setFieldsValue({
                nome_categoria: categoria.nome,
                need_cnpj: categoria.need_cnpj === 1,
            });
        }
    }

    _handleSubmit = (e) => {
        const { 
            refresh, onSuccess, form: {resetFields},
            categoria,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.loading('Carregando...', 0);
                return categoria && categoria.id
                    ? categoriasAPI.put(categoria.id, values.nome_categoria, values.need_cnpj)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                            message.success('Categoria atualizada com sucesso', 2.5);
                        }).catch(() => {
                            message.error('Não foi possível atualizar categoria', 2.5);
                        })
                    : categoriasAPI.post(values.nome_categoria, values.need_cnpj)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                            message.success('Categoria adicionada com sucesso', 2.5);
                        }).catch(() => {
                            message.error('Não foi possível adicionar categoria', 2.5);
                        });
            }
        });
    }

    render() {
        const { categoria, form } = this.props;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const nomeCategoriaError = isFieldTouched('nome_categoria') && getFieldError('nome_categoria');
        const needCNPJError = isFieldTouched('need_cnpj') && getFieldError('need_cnpj');
        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={nomeCategoriaError ? 'error' : ''}
                        help={nomeCategoriaError || ''}
                    >
                        {getFieldDecorator('nome_categoria', {rules: [{
                            required: true,
                            message: 'O nome da categoria é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    validateStatus={needCNPJError ? 'error' : ''}
                    help={needCNPJError || ''}
                    >
                        {getFieldDecorator('need_cnpj')(
                            <Checkbox checked={getFieldValue('need_cnpj')}>Requer CNPJ?</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                        }
                    >
                        {
                            categoria.id
                                ? 'Atualizar'
                                : 'Adicionar'
                        }
                    </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }

}

const WrappedHorizontalCategoriasForm = Form.create({ name: 'categorias_form' })(CategoriasForm);

export default WrappedHorizontalCategoriasForm;