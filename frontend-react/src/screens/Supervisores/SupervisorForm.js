import React, { PureComponent, Fragment } from 'react';

import { 
    Input, Button, Form,
    Checkbox,
} from 'antd';

import * as supervisorAPI from '../../api/supervisor';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SupervisorForm extends PureComponent {

    state = {};

    async componentDidMount() {
        this.props.form.validateFields();
        await this._loadValues();
    }

    _loadValues = async cpf => {
        const { supervisor, form } = this.props;
        const { setFieldsValue, resetFields } = form;
        if (supervisor) {
            resetFields();
            await setFieldsValue({
                cpf: supervisor.cpf,
                nome: supervisor.nome
            });
        }
    }

    _handleSubmit = (e) => {
        const { 
            refresh, onSuccess, form: {resetFields},
            supervisor,
        } = this.props;
        e.preventDefault();

        console.log('CHESQUEDELE');
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                if (supervisor && supervisor.cpf) return supervisorAPI
                    .put(supervisor.cpf, values.nome, values.isAdm )
                    .then(() => {
                        resetFields();
                        refresh();
                        onSuccess();
                    })
                return supervisorAPI.post(values.cpf, values.nome, values.senha, values.isAdm )
                    .then(() => {
                        resetFields();
                        refresh();
                        onSuccess();
                    })
            }
        });
    }

    render() {
        const { supervisor, form } = this.props;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const nomeSupervisorError = isFieldTouched('nome') && getFieldError('nome');
        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const isAdmError = isFieldTouched('isAdm') && getFieldError('isAdm');
        const senhaError = supervisor.cpf ? isFieldTouched('senha') && getFieldError('senha') : false;
        return (
            <Fragment>
                <Form onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={cpfError ? 'error' : ''}
                        help={cpfError || ''}
                    >
                        {getFieldDecorator('cpf', {rules :[{
                            required: true,
                            message: "O CPF do supervisor é obrigatório!"
                        }]})(
                            <Input
                                disabled={supervisor && supervisor.cpf}
                                placeholder="CPF"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={nomeSupervisorError ? 'error' : ''}
                        help={nomeSupervisorError || ''}
                    >
                        {getFieldDecorator('nome', {rules: [{
                            required: true,
                            message: 'O nome do supervisor é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    {
                        supervisor && supervisor.cpf
                            ? null
                            : (
                                <Form.Item
                                    validateStatus={senhaError ? 'error' : ''}
                                    help={senhaError || ''}
                                >
                                    {getFieldDecorator('senha', {rules :[{
                                        required: true,
                                        message: "A senha do supervisor é obrigatória!"
                                    }]})(
                                        <Input 
                                            placeholder="senha"
                                            type="password"
                                        />
                                    )}
                                </Form.Item>
                            )
                        
                    }
                    
                    <Form.Item
                        validateStatus={isAdmError ? 'error' : ''}
                        help={isAdmError || ''}
                    >
                        {getFieldDecorator('isAdm')(
                            <Checkbox checked={getFieldValue('isAdm')}>É Administrador?</Checkbox>
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
                            supervisor.cpf
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

const WrappedHorizontalSupervisorForm = Form.create({ name: 'supervisor_form' })(SupervisorForm);

export default WrappedHorizontalSupervisorForm;