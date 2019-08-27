import React, { PureComponent } from 'react';
import MaskedInput from 'react-text-mask';

import styles from './LoginScreen.module.scss';
import image from '../../assets/brazao.png';

import {
    Input, Icon, Button, Form,
    message,
} from 'antd';
import { validateCPF } from '../../helpers/validators';

import login from '../../api/login';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginScreen extends PureComponent {

    state = {};

    componentDidMount() {
        const { history } = this.props;
        if (localStorage.getItem('token') !== null) {
            if (localStorage.getItem('tag') === 'feirante') {
                history.push('/feirante');
            }
            else {
                history.push('/supervisor');
            }
        }
        this.props.form.validateFields();
    }

    _handleSubmit = (e) => {
        const { history } = this.props;
        e.preventDefault();
        message.loading('Carregando...', 0);
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                await login(values.cpf, values.senha)
                    .then(response => {
                        message.success('Logado com sucesso', 1.0);
                        localStorage.setItem('userID', response.data.userID);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('tag', response.data.tag);

                        if (response.data.tag === 'feirante') {
                            history.push('/feirante');
                        } else {
                            history.push('/supervisor');
                        }
                    })
                    .catch(ex => {
                        console.warn(ex);
                        message.error('CPF ou senha incorretos', 2.5);
                    });
            }
        });
    }

    render() {

        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const senhaError = isFieldTouched('senha') && getFieldError('senha');
        return (
            <div className={styles.holder}>
                <div className={styles.bgImage} />
                <div className={styles.container}>
                    <div className={styles.card}>
                        <img className={styles.brazao} alt="brazão" src={image} />
                        <h1>Sistema da Feira</h1>
                        <Form onSubmit={this._handleSubmit}>
                            <Form.Item
                                validateStatus={cpfError ? 'error' : ''}
                                help={cpfError || ''}
                            >
                                {getFieldDecorator('cpf', {
                                    rules: [
                                        {
                                            validator: validateCPF,
                                        },
                                    ],
                                })(
                                    <MaskedInput
                                        placeholder="CPF"
                                        mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                        render={(ref, props) => (
                                            <input className="ant-input" ref={ref} {...props} />
                                        )}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={senhaError ? 'error' : ''}
                                help={senhaError || ''}
                            >
                                {getFieldDecorator('senha', {
                                    rules: [{
                                        required: true,
                                        message: 'Insira sua senha!'
                                    }],
                                })(
                                    <Input
                                        type="password"
                                        placeholder="Senha"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    disabled={hasErrors(getFieldsError())}
                                >
                                    Entrar
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

const WrappedHorizontalLoginForm = Form.create({ name: 'login_form' })(LoginScreen);

export default WrappedHorizontalLoginForm;