import React, { PureComponent, Fragment } from 'react';

import {
  Input, Button, Form,
  message,Select
} from 'antd';
import moment from 'moment-timezone';

import * as feiraAPI from '../../api/feira';
import * as avisosAPI from '../../api/aviso';

const { TextArea } = Input;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class AvisosForm extends PureComponent {

  state = {
    feiras: [],
  };

  async componentDidMount() {
    this.props.form.validateFields();
    await this._loadValues();
    this._loadFeiras();
  }

  _loadValues = async id => {
    const { aviso, form } = this.props;
    const { setFieldsValue, resetFields } = form;
    if (aviso) {
      resetFields();
      await setFieldsValue({
        data_feira: aviso.data_feira,
        assunto_aviso: aviso.assunto,
        texto_aviso: aviso.texto
      });
    }
  }

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
          ? avisosAPI.put(aviso.id, values.assunto_aviso, values.texto_aviso, values.feiras)
            .then(() => {
              resetFields();
              refresh();
              onSuccess()
              message.success('Aviso atualizado com sucesso', 2.5);
            }).catch(() => {
              message.error('Não foi possível atualizar este aviso, tente novamente mais tarde', 2.5);
            })
          : avisosAPI.post(values.assunto_aviso, values.texto_aviso,values.feiras)
            .then(() => {
              resetFields();
              refresh();
              onSuccess();
              message.success('Aviso adicionado com sucesso', 2.5);
            }).catch(() => {
              message.error('Não foi possível adicionar novos avisos, tente novamente mais tarde', 2.5);
            });
      }
    });
  }

  _loadFeiras = async () => {
    this.setState({ loading: true });
    const feiras = await feiraAPI.listFeiras();
    this.setState({ feiras, loading: false });
  }

  _handleChange = async () => {
    const { form } = this.props;
    const { setFieldsValue } = form;

    await setFieldsValue({
      feiras: '',
    });
    this._loadFeiras();
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
        <Form onSubmit={this._handleSubmit}>
          <Form.Item
            label='Feiras'
          //validateStatus={categoriaFeiranteError ? 'error' : ''}
          //help={categoriaFeiranteError || ''}
          >
            {getFieldDecorator('feiras', {
              rules: [{
                required: true,
                message: 'A feira é obrigatória!'
              }]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Selecione a feira para esse aviso'
                optionFilterProp='children'
                onChange={this._handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  this.state.feiras.map(feira => (
                    <Option key={feira.data} value={feira.data}>{moment(feira.data).format('DD/MM/YYYY')}</Option>
                  ))
                }

              </Select>
            )}
          </Form.Item>
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
      </Fragment>
    );
  }

}

const WrappedHorizontalAvisosForm = Form.create({ name: 'avisos_form' })(AvisosForm);

export default WrappedHorizontalAvisosForm;