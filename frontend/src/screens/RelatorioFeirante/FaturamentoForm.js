import React from 'react';

import { Form, Input, Button } from 'antd';
import * as faturamentoAPI from '../../api/participa';

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { size } = this.props;
    const { number } = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
      </span>
    );
  }
}

class FaturamentoForm extends React.Component {
  handleSubmit = e => {
    const { form, feira } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { faturamento } = values;
        console.log('Received values of form: ', faturamento.number, feira.data_feira);
        faturamentoAPI.setFaturamento(faturamento.number, feira.data_feira)
            }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Faturamento">
          {getFieldDecorator('faturamento', {
            initialValue: { number: 0 },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedFaturamentoForm = Form.create({ name: 'customized_form_controls' })(FaturamentoForm);

export default WrappedFaturamentoForm;