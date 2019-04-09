import React, { PureComponent, Fragment } from 'react';

import { 
    Input, Button, Form,
} from 'antd';

import * as avisosAPI from '../../api/aviso';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class AvisosForm extends PureComponent {

    state = {};

    async componentDidMount() {
        this.props.form.validateFields();
        await this._loadValues();
    }

    _loadValues = async id => {
        const { aviso, form } = this.props;
        const { setFieldsValue, resetFields } = form;
        if (aviso) {
            resetFields();
            await setFieldsValue({
                assunto_aviso: aviso.assunto,
                texto_aviso: aviso.texto
            });
        }
    }

    _handleSubmit = (e) => {
        const { 
            refresh, onSuccess, form: {resetFields},
            aviso,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                return aviso && aviso.id
                    ? avisosAPI.put(aviso.id, values.assunto_aviso, values.texto_aviso)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
                    : avisosAPI.post(values.assunto_aviso, values.texto_aviso)
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        });
            }
        });
    }

    render() {
        const { aviso, form } = this.props;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const assuntoAvisoError = isFieldTouched('assunto_aviso') && getFieldError('assunto_aviso');
        const textoAvisoError = isFieldTouched('texto_aviso') && getFieldError('texto_aviso');
        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={assuntoAvisoError ? 'error' : ''}
                        help={assuntoAvisoError || ''}
                    >
                        {getFieldDecorator('assunto_aviso', 
                        )(
                            <Input
                                placeholder="Assunto"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    validateStatus={textoAvisoError ? 'error' : ''}
                    help={textoAvisoError || ''}
                    >
                        {getFieldDecorator('texto_aviso')(
                            <Input 
                            placeholder="Texto">
                            /></Input>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            hasErrors(getFieldsError())
                            || getFieldValue('assunto_aviso') === aviso.assunto
                        }
                    >
                        {
                            aviso.id
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

const WrappedHorizontalAvisosForm = Form.create({ name: 'avisos_form' })(AvisosForm);

export default WrappedHorizontalAvisosForm;