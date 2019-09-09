import React, { PureComponent } from 'react';

import {
  Input, Button, Form,
  message
} from 'antd';
import moment from 'moment-timezone';

import * as relatorioAPI from '../../api/relatorio';

const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class RelatorioForm extends PureComponent {

  state = {
    relatorios: [],
  };

  componentDidMount() {
    this.props.form.validateFields();
    this._loadValues();
    this._loadRelatorios();
  }

  _loadValues = () => null;

  _handleSubmit = (e) => {
    const {
      refresh, onSuccess, form: { resetFields },
      aviso,
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('Carregando...', 0);
        return aviso && aviso.id
          ? relatorioAPI.put(aviso.id, values.assunto_aviso, values.texto_aviso, values.feiras)
            .then(() => {
              resetFields();
              refresh();
              onSuccess()
              message.success('Relatório atualizado com sucesso', 2.5);
            }).catch(() => {
              message.error('Não foi possível atualizar este relatório, tente novamente mais tarde', 2.5);
            })
          : relatorioAPI.post(values.assunto_aviso, values.texto_aviso,values.feiras)
            .then(() => {
              resetFields();
              refresh();
              onSuccess();
              message.success('Relatorio adicionado com sucesso', 2.5);
            }).catch(() => {
              message.error('Não foi possível adicionar um novo relatório, tente novamente mais tarde', 2.5);
            });
      }
    });
  }


  _handleChange = () => null;

  render() {
    const { aviso, form } = this.props;

    const {
      getFieldDecorator, getFieldsError, getFieldError,
      isFieldTouched, getFieldValue,
    } = form;

    const assuntoAvisoError = isFieldTouched('assunto_aviso') && getFieldError('assunto_aviso');
    const textoAvisoError = isFieldTouched('texto_aviso') && getFieldError('texto_aviso');
    return (
        <Form onSubmit={this._handleSubmit}>
          <Form.Item
            label="Assunto"
            validateStatus={assuntoAvisoError ? 'error' : ''}
            help={assuntoAvisoError || ''}
          >
            {getFieldDecorator('assunto_aviso', {
              rules: [{
                required: true,
                message: 'O assunto é obrigatório!'
              }]
            })(
              <Input
                placeholder="Assunto"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Texto"
            validateStatus={textoAvisoError ? 'error' : ''}
            help={textoAvisoError || ''}
          >
            {getFieldDecorator('texto_aviso')(
              <TextArea
                placeholder="Texto"
                rows={4}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                hasErrors(getFieldsError()) || (
                  getFieldValue('assunto_aviso') === aviso.assunto
                  && getFieldValue('texto_aviso') === aviso.texto)
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
    );
  }

}

const WrappedHorizontalRelatorioForm = Form.create({ name: 'relatorios_form' })(RelatorioForm);

export default WrappedHorizontalRelatorioForm;