import React, { PureComponent } from 'react';

import {
    Button, Form,
    Input,
} from 'antd';

import * as subcategoriasAPI from '../../api/subcategoria';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UpdateSubcategoria extends PureComponent {

    state = {
        editingSubcategoria: {},
    };

    componentDidMount() {
        this._loadValues();
    }

    _loadValues = async () => {
        const { form: { setFieldsValue }, subcategoria } = this.props;

        return setFieldsValue({
            nome: subcategoria.nome,
        });
    }

    _updateSubcategoriaSubmit = event => {
        const {
            form: { resetFields }, subcategoria, refresh,
            onCancel,
        } = this.props;

        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                return subcategoriasAPI.put(values.nome, subcategoria.id)
                    .then(() => {
                        resetFields(['nome']);
                        this.setState({ subcategoria: {} });
                        onCancel();
                        refresh();
                    });
            }
        });
    }

    render() {

        const { form } = this.props;

        const {
            getFieldError, getFieldDecorator,
            isFieldTouched, getFieldsError,
            getFieldValue,
        } = form;

        const nomeError = isFieldTouched('nome') && getFieldError('nome');

        return (
            <Form onSubmit={this._updateSubcategoriaSubmit}>
                <Form.Item
                    validateStatus={nomeError ? 'error' : ''}
                    help={nomeError || ''}
                >
                    {getFieldDecorator('nome', {
                        rules: [{
                            required: true,
                            message: 'O nome da subcategoria é obrigatório!'
                        }]
                    })(
                        <Input
                            placeholder="Nome"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        disabled={
                            hasErrors(getFieldsError())
                            || !getFieldValue('nome')
                        }
                    >
                        Atualizar
                </Button>
                </Form.Item>
            </Form>
        );
    }

}

const WrappedHorizontalUpdateSubcategoriasForm = Form.create({ name: 'subcategorias_form' })(UpdateSubcategoria);

export default WrappedHorizontalUpdateSubcategoriasForm;