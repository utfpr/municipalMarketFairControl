import React, { PureComponent, Fragment } from 'react';

import { 
    Input, Button, Form,
    Checkbox,Radio,
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
                cpf: feirante.cpf,
                cnpj: feirante.cnpj,
                nomeFantasia: feirante.nome_fantasia ,
                nomeFeirante: feirante.nome ,
                rg: feirante.rg ,
                razaoSocial: feirante.razao_social ,
                comprimentoBarraca: feirante.comprimento_barraca ,
                larguraBarraca:feirante.largura_barraca ,
                voltagemEE : (feirante.usa_ee==1)
                             ?((feirante.voltagem_ee===110)
                                 ? 1 :2)
                             :0 ,
                usaEE :feirante.usa_ee,
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
                    //? feirantesAPI.put(feirante.cpf, values.cnpj, values.rg)
                    ? feirantesAPI.put(feirante.cpf,values.cnpj, values.nome,values.rg,values.usaEE,values.nomeFantasia,
                        values.razaoSocial,values.comprimentoBarraca,values.larguraBarraca,"",
                        (values.voltagemEE==1)?110:220,0) // FALTA O SUBCATEGORIA E ENDEREÇO
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
  /*PUT já existe , POST novo
  cpf,
  cnpj,
  nome,
  rg, 
  usa_ee, 
  nome_fantasia,
  razao_social,
  comprimento_barraca,
  largura_barraca,
  endereco,
  voltagem_ee,
  sub_categoria_id,
  POST : senha
  */

                    : feirantesAPI.post(values.cpf,values.cnpj, values.nome,values.rg,values.usaEE,values.nomeFantasia,
                        values.razaoSocial,values.comprimentoBarraca,values.larguraBarraca,"",
                        values.voltagemEE,0)
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
        const RadioGroup = Radio.Group;
        
        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const cpfFeiranteError = isFieldTouched('cpf') && getFieldError('cpf');
        const nomeFeiranteError = isFieldTouched('nomeFeirante') && getFieldError('nomeFeirante');
        const cnpjFeiranteError = isFieldTouched('nomeFantasia') && getFieldError('nomeFantasia');
        const rgFeiranteError = isFieldTouched('rg') && getFieldError('rg');
        const usaEEFeiranteError = isFieldTouched('usaEE') && getFieldError('usaEE');
        const nomeFantasiaFeiranteError = isFieldTouched('nomeFantasia') && getFieldError('nomeFantasia');
        const razaoSocialFeiranteError = isFieldTouched('razaoSocial') && getFieldError('razaoSocial');
        const comprimentoFeiranteError = isFieldTouched('comprimentoBarraca') && getFieldError('comprimentoBarraca');
        const larguraFeiranteError = isFieldTouched('larguraBarraca') && getFieldError('larguraBarraca');
        //const enderecoFeiranteError = isFieldTouched('endereco') && getFieldError('endereco');
        const voltagemEEFeiranteError = isFieldTouched('voltagemEE') && getFieldError('voltagemEE');
        //const subcategoriaFeiranteError = isFieldTouched('subcategoria') && getFieldError('subcategoria');
        

        return (
            <Fragment>
                <Form onSubmit={this._handleSubmit}>
                    
                <Form.Item
                    validateStatus={nomeFeiranteError ? 'error' : ''}
                    help={nomeFeiranteError || ''}
                    >
                        {getFieldDecorator('nomeFeirante', {rules :[{
                            required: true,
                            message: "O nome do feirante é obrigatório!"
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
                            message: 'O nome fantasia do feirante é obrigatório!'
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
                    
                    <Form.Item
                        validateStatus={comprimentoFeiranteError ? 'error' : ''}
                        help={comprimentoFeiranteError || ''}
                    >
                        {getFieldDecorator('comprimentoBarraca', {rules: [{
                            required: false,
                            message: 'É necessário especificar o comprimento da barraca.'
                        }]})(
                            <Input
                                placeholder="Comprimento da barraca (em metros)."
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={larguraFeiranteError ? 'error' : ''}
                        help={larguraFeiranteError || ''}
                    >
                        {getFieldDecorator('larguraBarraca', {rules: [{
                            required: false,
                            message: 'É necessário especificar a largura da barraca.'
                        }]})(
                            <Input
                                placeholder="Largura da barraca (em metros)."
                            />
                        )}
                    </Form.Item>
                    
                    
                    <Form.Item
                        validateStatus={voltagemEEFeiranteError ? 'error' : ''}
                        help={voltagemEEFeiranteError || ''}
                    >
                        {getFieldDecorator('voltagemEE', {rules: [{
                            required: false,
                            message: 'se tiver energia, mostrar que é requerido'
                        }]})(
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio  disabled={(getFieldValue('usaEE'))?false:true}
                                value={1}>110v
                                </Radio>
                            <Radio  disabled={(getFieldValue('usaEE'))?false:true}
                                value={2}>220v
                                </Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                   
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        /*disabled="false"/*{
                            hasErrors(getFieldsError())
                            || getFieldValue('nome') === feirante.nome
                        }*/
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
