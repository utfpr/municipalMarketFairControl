import React, { PureComponent, Fragment } from 'react';

import {
    Input, Button, Form,
    Checkbox, Radio, Select,
    Row, Col,
} from 'antd';

import * as feirantesAPI from '../../api/feirante';
import * as categoriasAPI from '../../api/categoria';
import * as subcategoriasAPI from '../../api/subcategoria';

const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FeirantesForm extends PureComponent {

    state = {
        categorias: [],
        subcategorias: [],
        needCnpj: false,
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadValues();
        this._loadCategorias();
    }

    _handleChange = async (value) => {
        const { form } = this.props;
        const { setFieldsValue } = form;

        await setFieldsValue({
            subcategoria: '',
        });
        this._loadSubcategorias(value);
    }

    _handleBlur = async () => {
        const { categorias } = this.state;
        const { getFieldValue } = this.props.form;
        const idCategoria = await getFieldValue('categoria');

        const selectedCategory = await categorias.find(categoria => categoria.id === idCategoria);
        this.setState({ needCnpj: selectedCategory.need_cnpj === 1 ? true : false });
    }

    _handleFocus = () => {
        console.log('focus');
    }

    _loadValues = async cpf => {
        const { feirante, form } = this.props;
        const { setFieldsValue, resetFields } = form;
        const { data: categoria } = await subcategoriasAPI.getCatBySub(feirante.sub_categoria_id);

        await this._loadSubcategorias(categoria.id);

        if (feirante) {
            resetFields();
            await setFieldsValue({
                cpf: feirante.cpf,
                cnpj: feirante.cnpj,
                nomeFantasia: feirante.nome_fantasia,
                nomeFeirante: feirante.nome,
                rg: feirante.rg,
                razaoSocial: feirante.razao_social,
                comprimentoBarraca: feirante.comprimento_barraca,
                larguraBarraca: feirante.largura_barraca,
                voltagemEE: (feirante.usa_ee === 1)
                    ? ((feirante.voltagem_ee === 110)
                        ? 1 : 2)
                    : 0,
                usaEE: feirante.usa_ee,
                categoria: categoria.id,
                subcategoria: feirante.sub_categoria_id,
                logradouro :feirante.endereco.logradouro,
                numero:feirante.endereco.numero,
                cep:feirante.endereco.cep,
                bairro:feirante.endereco.bairro,
                senha:feirante.senha


            });
        }
    }

    _loadCategorias = async () => {
        this.setState({ loading: true });
        const categorias = await categoriasAPI.get();
        this.setState({ categorias, loading: false });
    }

    _loadSubcategorias = async id => {
        this.setState({ loading: true });
        const subcategorias = await categoriasAPI.getSub(id);
        this.setState({ subcategorias, loading: false });
    }

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


    _handleSubmit = (e) => {
        const {
            refresh, onSuccess, form: { resetFields },
            feirante,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return feirante && feirante.cpf
                    //? feirantesAPI.put(feirante.cpf, values.cnpj, values.rg)
                    ? feirantesAPI
                        .put(
                            feirante.cpf,
                            values.cnpj,
                            values.nomeFeirante,
                            values.rg,
                            values.usaEE,
                            values.nomeFantasia,
                            values.razaoSocial,
                            values.comprimentoBarraca,
                            values.larguraBarraca,
                            {
                                logradouro: values.logradouro,
                                bairro: values.bairro,
                                numero: Number(values.numero),
                                CEP: values.cep,
                            },
                            values.voltagemEE === 1 ? 110 : 220,
                            values.subcategoria,
                            values.senha,
                        )
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        })
                    : feirantesAPI.post(
                        values.cpf,
                        values.cnpj,
                        values.nomeFeirante,
                        values.rg,
                        values.usaEE,
                        values.nomeFantasia,
                        values.razaoSocial,
                        values.comprimentoBarraca,
                        values.larguraBarraca,
                        {
                            logradouro: values.logradouro,
                            bairro: values.bairro,
                            numero: values.numero,
                            CEP: values.cep,
                        },
                        values.voltagemEE === 1 ? 110 : 220,
                        values.subcategoria,
                        values.senha, // FALTA O CAMPO DA SENHA
                    )
                        .then(() => {
                            resetFields();
                            refresh();
                            onSuccess();
                        });
            }
        });
    }
    /*{
        logradouro: 'Rua Carlos gomes',
        bairro: 'Jd. Independencia',
        numero: 1461,
        CEP: '87113100',

        BAIRRO NUMERO E CEP N REQUERIDOS
    }*/

    render() {
        const { categorias, subcategorias, needCnpj } = this.state;
        const { feirante, form, readOnly } = this.props;
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
        const logradouroFeiranteError = isFieldTouched('logradouro') && getFieldError('logradouro');
        const bairroFeiranteError = isFieldTouched('bairro') && getFieldError('bairro');
        const cepFeiranteError = isFieldTouched('cep') && getFieldError('cep');
        const numeroFeiranteError = isFieldTouched('numero') && getFieldError('numero');
        const voltagemEEFeiranteError = isFieldTouched('voltagemEE') && getFieldError('voltagemEE');
        const subcategoriaFeiranteError = isFieldTouched('subcategoria') && getFieldError('subcategoria');
        const categoriaFeiranteError = isFieldTouched('categoria') && getFieldError('categoria');
        const senhaError = isFieldTouched('categoria') && getFieldError('categoria');


        return (
            <Fragment>
                <Form onSubmit={this._handleSubmit}>

                    <Form.Item
                        label="Nome"
                        validateStatus={nomeFeiranteError ? 'error' : ''}
                        help={nomeFeiranteError || ''}
                    >
                        {getFieldDecorator('nomeFeirante', {
                            rules: [{
                                required: true,
                                message: "O nome do feirante é obrigatório!"
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="Pedro Silva"
                            />
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col md={12} lg={12}>
                            <Form.Item
                                validateStatus={cpfFeiranteError ? 'error' : ''}
                                help={cpfFeiranteError || ''}
                                label="CPF"
                            >
                                {getFieldDecorator('cpf', {
                                    rules: [{
                                        required: true,
                                        message: 'O CPF do feirante é obrigatório!'
                                    }]
                                })(
                                    <Input
                                        disabled={Boolean(feirante.cpf) || readOnly}
                                        placeholder="123.456.789-10"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={12} lg={12}>
                            <Form.Item
                                label="RG"
                                validateStatus={rgFeiranteError ? 'error' : ''}
                                help={rgFeiranteError || ''}
                            >
                                {getFieldDecorator('rg', {
                                    rules: [{
                                        required: true,
                                        message: 'O rg do feirante é obrigatório!'
                                    }]
                                })(
                                    <Input
                                        disabled={Boolean(feirante.rg) || readOnly}
                                        placeholder="12.345.123-1"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col lg={12}>
                            <Form.Item
                                label='Categoria'
                                validateStatus={categoriaFeiranteError ? 'error' : ''}
                                help={categoriaFeiranteError || ''}
                            >
                                {getFieldDecorator('categoria', {
                                    rules: [{
                                        required: true,
                                        message: 'A categoria é obrigatória!'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder='Selecione uma categoria'
                                        optionFilterProp='children'
                                        onChange={this._handleChange}
                                        onBlur={this._handleBlur}
                                        disabled={readOnly}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            categorias.map(categoria => (
                                                <Option key={categoria.id} value={categoria.id}>{categoria.nome}</Option>
                                            ))
                                        }

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item
                                label='Subcategoria'
                                validateStatus={subcategoriaFeiranteError ? 'error' : ''}
                                help={subcategoriaFeiranteError || ''}
                            >
                                {getFieldDecorator('subcategoria', {
                                    rules: [{
                                        required: true,
                                        message: 'A subcategoria é obrigatória!'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder='Selecione uma subcategoria'
                                        optionFilterProp='children'
                                        disabled={!getFieldValue('categoria') || readOnly}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            subcategorias.map(subcategoria => (
                                                <Option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nome}</Option>
                                            ))
                                        }

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="CNPJ"
                        validateStatus={cnpjFeiranteError ? 'error' : ''}
                        help={cnpjFeiranteError || ''}
                    >
                        {getFieldDecorator('cnpj', {
                            rules: [{
                                required: needCnpj,
                                message: 'O cnpj do feirante é obrigatório!'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="12.456.321/1234-56"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Nome Fantasia"
                        validateStatus={nomeFantasiaFeiranteError ? 'error' : ''}
                        help={nomeFantasiaFeiranteError || ''}
                    >
                        {getFieldDecorator('nomeFantasia', {
                            rules: [{
                                required: needCnpj,
                                message: 'O nome fantasia do feirante é obrigatório!'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="Nome Fantasia"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Razão Social"
                        validateStatus={razaoSocialFeiranteError ? 'error' : ''}
                        help={razaoSocialFeiranteError || ''}
                    >
                        {getFieldDecorator('razaoSocial', {
                            rules: [{
                                required: needCnpj,
                                message: 'A razao social não é obrigatória!'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="Razão Social"
                            />
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col lg={12}>
                            <Form.Item
                                validateStatus={usaEEFeiranteError ? 'error' : ''}
                                help={usaEEFeiranteError || ''}
                            >
                                {getFieldDecorator('usaEE', {
                                    rules: [{
                                        required: true,
                                        message: 'É preciso especificar se o feirante usa energia.'
                                    }]
                                })(
                                    <Checkbox disabled={readOnly} checked={getFieldValue('usaEE')}>Usa Eletricidade</Checkbox>
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item
                                validateStatus={voltagemEEFeiranteError ? 'error' : ''}
                                help={voltagemEEFeiranteError || ''}
                            >
                                {getFieldDecorator('voltagemEE', {
                                    rules: [{
                                        required: false,
                                        message: 'se tiver energia, mostrar que é requerido'
                                    }]
                                })(
                                    <RadioGroup disabled={readOnly} onChange={this.onChange} value={this.state.value}>
                                        <Radio
                                            disabled={(getFieldValue('usaEE')) ? false : true}
                                            value={1}
                                        >
                                            110v
                                        </Radio>
                                        <Radio
                                            disabled={(getFieldValue('usaEE')) ? false : true}
                                            value={2}
                                        >
                                            220v
                                        </Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col lg={12}>
                            <Form.Item
                                label="Comprimento da barraca"
                                validateStatus={comprimentoFeiranteError ? 'error' : ''}
                                help={comprimentoFeiranteError || ''}
                            >
                                {getFieldDecorator('comprimentoBarraca', {
                                    rules: [{
                                        required: true,
                                        message: 'É necessário especificar o comprimento da barraca.'
                                    }]
                                })(
                                    <Input
                                        disabled={readOnly}
                                        placeholder="Comprimento da barraca (em metros)."
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item
                                label="Largura da barraca"
                                validateStatus={larguraFeiranteError ? 'error' : ''}
                                help={larguraFeiranteError || ''}
                            >
                                {getFieldDecorator('larguraBarraca', {
                                    rules: [{
                                        required: true,
                                        message: 'É necessário especificar a largura da barraca.'
                                    }]
                                })(
                                    <Input
                                        disabled={readOnly}
                                        placeholder="Largura da barraca (em metros)."
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Bairro"
                        validateStatus={bairroFeiranteError ? 'error' : ''}
                        help={bairroFeiranteError || ''}
                    
                    >
                        {getFieldDecorator('bairro', {
                            rules: [{
                                required: false,
                                message: 'O bairro'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="Ex: Jd. Alvorada"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Logradouro"
                        validateStatus={logradouroFeiranteError ? 'error' : ''}
                        help={logradouroFeiranteError || ''}
                    >
                        {getFieldDecorator('logradouro', {
                            rules: [{
                                required: true,
                                message: 'O Logradouro'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="Ex: Rua das Palmeiras"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Numero"
                        validateStatus={numeroFeiranteError ? 'error' : ''}
                        help={numeroFeiranteError || ''}
                    >
                        {getFieldDecorator('numero', {
                            rules: [{
                                required: false,
                                message: 'O numero'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="123"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="cep"
                        validateStatus={cepFeiranteError ? 'error' : ''}
                        help={cepFeiranteError || ''}
                    >
                        {getFieldDecorator('cep', {
                            rules: [{
                                required:false,
                                message: 'O cep'
                            }]
                        })(
                            <Input
                                disabled={readOnly}
                                placeholder="87301000"
                            />
                        )}
                    </Form.Item>
                    {
                        !readOnly
                        ? (
                            <>
                                <Form.Item
                                    label="Senha"
                                    validateStatus={senhaError ? 'error' : ''}
                                    help={senhaError || ''}
                                >
                                    {getFieldDecorator('senha', {
                                        rules: [{
                                            required: true,
                                            message: 'É necessário informar uma senha'
                                        }]
                                    })(
                                        <Input.Password placeholder="password" />
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
                                            feirante.cpf
                                                ? 'Atualizar'
                                                : 'Adicionar'
                                        }
                                    </Button>
                                </Form.Item>
                            </>
                        ) : null
                    }

                </Form >
            </Fragment >
        );
    }
}
const WrappedHorizontalFeirantesForm = Form.create({ name: 'feirantes_form' })(FeirantesForm);

export default WrappedHorizontalFeirantesForm;
                /*
Endereço:
logradouro: values.logradouro,
bairro: values.bairro,
numero: parseInt(values.numero),
CEP: cep
*/