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
                cnpj: feirante.nome,
                nomeFantasia: feirante.nome_fantasia ,
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
                    ? feirantesAPI.put(feirante.cpf, values.cnpj, values.rg)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
                    : feirantesAPI.post(values.nome, values.nomeFantasia)
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

        const cpfFeiranteError = isFieldTouched('cpf') && getFieldError('cpf');
        const nomeFantasiaError = isFieldTouched('nomeFantasia') && getFieldError('nomeFantasia');
        const cnpjFeiranteError = isFieldTouched('nomeFantasia') && getFieldError('nomeFantasia');
        const rgFeiranteError = isFieldTouched('rg') && getFieldError('rg');
        const usaEEFeiranteError = isFieldTouched('usaEE') && getFieldError('usaEE');
        const nomeFantasiaFeiranteError = isFieldTouched('nomeFantasia') && getFieldError('nomeFantasia');
        const razaoSocialFeiranteError = isFieldTouched('razaoSocial') && getFieldError('razaoSocial');
        //const comprimentoFeiranteError = isFieldTouched('comprimentoBarraca') && getFieldError('comprimentoBarraca');
        //const larguraBarracaFeiranteError = isFieldTouched('larguraBarraca') && getFieldError('larguraBarraca');
        //const enderecoFeiranteError = isFieldTouched('endereco') && getFieldError('endereco');
        //const voltagemEEFeiranteError = isFieldTouched('voltagemEE') && getFieldError('voltagemEE');
        //const subcategoriaFeiranteError = isFieldTouched('subcategoria') && getFieldError('subcategoria');
        

        return (
            <Fragment>
                <Form onSubmit={this._handleSubmit}>
                    
                <Form.Item
                    validateStatus={nomeFantasiaError ? 'error' : ''}
                    help={nomeFantasiaError || ''}
                    >
                        {getFieldDecorator('nomeFantasia', {rules :[{
                            required: true,
                            message: "O nome fantasia do feirante é obrigatório!"
                        }]})(
                            <Input 
                            placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={cpfFeiranteError ? 'error' : ''}
                        help={cpfFeiranteError || ''}
                    >
                        {getFieldDecorator('cpf', {rules: [{
                            required: true,
                            message: 'O CPF do feirante é obrigatório!'
                        }]})(
                            <Input
                                placeholder="CPF"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={cnpjFeiranteError ? 'error' : ''}
                        help={cnpjFeiranteError || ''}
                    >
                        {getFieldDecorator('cnpj', {rules: [{
                            required: false,
                            message: 'O cnpj do feirante é obrigatório!'
                        }]})(
                            <Input
                                placeholder="CNPJ"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={rgFeiranteError ? 'error' : ''}
                        help={rgFeiranteError || ''}
                    >
                        {getFieldDecorator('rg', {rules: [{
                            required: true,
                            message: 'O rg do feirante é obrigatório para sua categoria!'
                        }]})(
                            <Input
                                placeholder="RG"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={usaEEFeiranteError ? 'error' : ''}
                        help={usaEEFeiranteError || ''}
                    >
                        {getFieldDecorator('usaEE', {rules: [{
                            required: true,
                            message: 'É preciso especificar se o feirante usa energia.'
                        }]})(
                            <Checkbox checked={getFieldValue('usaEE')}>Usa Eletricidade</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={nomeFantasiaFeiranteError ? 'error' : ''}
                        help={nomeFantasiaFeiranteError || ''}
                    >
                        {getFieldDecorator('nomeFantasia', {rules: [{
                            required: false,
                            message: 'O nome fantasia do feirante não é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome Fantasia"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={razaoSocialFeiranteError ? 'error' : ''}
                        help={razaoSocialFeiranteError || ''}
                    >
                        {getFieldDecorator('razaoSocial', {rules: [{
                            required: false,
                            message: 'A razao social não é obrigatória!'
                        }]})(
                            <Input
                                placeholder="Razão Social"
                            />
                        )}
                    </Form.Item>
                   
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                            || getFieldValue('nome') === feirante.nome
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
