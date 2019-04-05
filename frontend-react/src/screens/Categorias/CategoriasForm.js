import React, { PureComponent } from 'react';

import { 
    Input, Button, Form,
    Checkbox,
} from 'antd';

import * as categoriasAPI from '../../api/categoria';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CategoriasForm extends PureComponent {

    state = {};

    componentDidMount() {
        this.props.form.validateFields();
    }

    _handleSubmit = (e) => {
        const { refresh, onSuccess } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values);
            if (!err) {
                const info = await categoriasAPI.post(values.nome_categoria, values.need_cnpj)
                    .then(() => {
                        refresh();
                        onSuccess();
                    });
            }
        });
    }

    render() {

        
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const nomeCategoriaError = isFieldTouched('nome_categoria') && getFieldError('nome_categoria');
        const needCNPJError = isFieldTouched('need_cnpj') && getFieldError('need_cnpj');
        return (
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
                        <Checkbox>Requer CNPJ?</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                >
                    Adicionar
                </Button>
                </Form.Item>
            </Form>
        );
    }

}

const WrappedHorizontalCategoriasForm = Form.create({ name: 'categorias_form' })(CategoriasForm);

export default WrappedHorizontalCategoriasForm;