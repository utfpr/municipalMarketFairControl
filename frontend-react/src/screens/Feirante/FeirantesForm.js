import React, { PureComponent, Fragment } from 'react';

import { 
    Input, Button, Form,
    Checkbox,
} from 'antd';

import * as feirantesAPI from '../../api/feirante';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FeirantesForm extends PureComponent {

    state = {};

    async componentDidMount() {
        this.props.form.validateFields();
        await this._loadValues();
    }

    _loadValues = async cpf => {
        const { feirante, form } = this.props;
        const { setFieldsValue, resetFields } = form;
        if (feirante) {
            resetFields();
            await setFieldsValue({
                cpf_feirante: feirante.cpf,
                nome_feirante: feirante.nome,
                nome_fantasia_feirante: feirante.nome_fantasia ,
            });
        }
    }

    _handleSubmit = (e) => {
        const { 
            refresh, onSuccess, form: {resetFields},
            feirante,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                return feirante && feirante.cpf
                    ? feirantesAPI.put(feirante.cpf, values.nome_feirante, values.nome_fantasia_feirante)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
                    : feirantesAPI.post(values.nome_feirante, values.nome_fantasia_feirante)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        });
            }
        });
    }

    render() {
        const { feirante, form } = this.props;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const nomeFeiranteError = isFieldTouched('nome_feirante') && getFieldError('nome_feirante');
        const nome_fantasia_feiranteError = isFieldTouched('nome_fantasia_feirante') && getFieldError('nome_fantasia_feirante');
        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={nomeFeiranteError ? 'error' : ''}
                        help={nomeFeiranteError || ''}
                    >
                        {getFieldDecorator('nome_feirante', {rules: [{
                            required: true,
                            message: 'O nome do feirante é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    validateStatus={nome_fantasia_feiranteError ? 'error' : ''}
                    help={nome_fantasia_feiranteError || ''}
                    >
                        {getFieldDecorator('nome_fantasia_feirante', {rules :[{
                            required: true,
                            message: "O nome fantasia do feirante é obrigatório!"
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
                            || getFieldValue('nome_feirante') === feirante.nome
                        }
                    >
                        {
                            feirante.cpf
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

const WrappedHorizontalFeirantesForm = Form.create({ name: 'feirantes_form' })(FeirantesForm);

export default WrappedHorizontalFeirantesForm;