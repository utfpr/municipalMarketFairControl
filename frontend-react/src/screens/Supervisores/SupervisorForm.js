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
                cpf_feirante: supervisor.cpf,
                nome_supervisor: supervisor.nome,
                cpf_supervisor: supervisor.nome_fantasia ,
            });
        }
    }

    _handleSubmit = (e) => {
        const { 
            refresh, onSuccess, form: {resetFields},
            supervisor,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                return supervisor && supervisor.cpf
                    ? supervisorAPI.put(supervisor.cpf, values.nome_supervisor, supervisor.isAdm )
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
                    : supervisorAPI.post(values.nome_supervisor, values.cpf_supervisor)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        });
            }
        });
    }

    render() {
        const { supervisor, form } = this.props;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const nomeSupervisorError = isFieldTouched('nome_supervisor') && getFieldError('nome_supervisor');
        const cpf_SupervisorError = isFieldTouched('cpf_supervisor') && getFieldError('cpf_supervisor');
        const isAdm_SupervisorError = isFieldTouched('isAdm_supervisor') && getFieldError('isAdm_supervisor');
        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={nomeSupervisorError ? 'error' : ''}
                        help={nomeSupervisorError || ''}
                    >
                        {getFieldDecorator('nome_supervisor', {rules: [{
                            required: true,
                            message: 'O nome do supervisor é obrigatório!'
                        }]})(
                            <Input
                                placeholder="Nome"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    validateStatus={cpf_SupervisorError ? 'error' : ''}
                    help={cpf_SupervisorError || ''}
                    >
                        {getFieldDecorator('cpf_supervisor', {rules :[{
                            required: true,
                            message: "O CPF do supervisor é obrigatório!"
                        }]})(
                            <Input 
                            placeholder="CPF"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    validateStatus={isAdm_SupervisorError ? 'error' : ''}
                    help={isAdm_SupervisorError || ''}
                    >
                        {getFieldDecorator('isAdm_supervisor')(
                            <Checkbox checked={getFieldValue('isAdm_supervisor')}>É Administrador?</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                            || getFieldValue('nome_supervisor') === supervisor.nome
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

const WrappedHorizontalSupervisorForm = Form.create({ name: 'feirantes_form' })(SupervisorForm);

export default WrappedHorizontalSupervisorForm;