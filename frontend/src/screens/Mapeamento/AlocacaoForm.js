import React, { Component, Fragment } from 'react';

import { 
    Popconfirm, Button, Form,
    Select, Table,Checkbox,message,
} from 'antd';
import maskCPF from '../../helpers/masker';

import * as participaAPI from '../../api/participa';

const { Column } = Table;
const { Option } = Select;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AlocacaoForm extends Component {

    state = {
        subcategorias: [],
        loading: false,
        editingSubcategoria: {},
    };

    // componentDidMount() {
    //     this._loadCelulas();
    // }


    // _loadCelulas = () => {
    //     const { celula } = this.props;
    //     this.setState({celula});
    // }

    // componentDidUpdate(prevProps){
    //     if(prevProps.celula !== this.props.celula){
    //         this.setState({          
    //             celula: this.props.celula
    //         });
    //     }
    // }

    _handleSubmit = (e) => {
        // const { celula } = this.state;
        const { 
            form: {resetFields},
            refresh, celula, loadCelulas,onSuccess,
        } = this.props;
        e.preventDefault();
        // this.setState({loading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return participaAPI.setPosicao(values.nome, celula.id)
                    .then(response => {
                        refresh();
                        loadCelulas();
                        resetFields();
                        if (onSuccess) {
                            onSuccess();
                        }
                        message.success('Feirante atualizado com sucesso', 2.5);
                    }).catch(ex => {
                        message.error('Não foi possível atualizar, tente novamente mais tarde', 2.5);
                        console.warn(ex);
                    });
            }
        });
    }

    // _loadSubcategorias = async () => {
    //     const { categoria } = this.props;
    //     this.setState({loading: true});
    //     const subcategorias = await categoriasAPI.getSub(categoria.id);
    //     this.setState({subcategorias, loading: false});
    // }

    _onRemoveFeiranteCelula = cpf => {
        const { refresh,onSuccess} = this.props;
        return  participaAPI.setPosicao(cpf, null)
            .then(() => {
                refresh();
                if (onSuccess) {
                    onSuccess();
                }
                message.success('Feirante removido com sucesso', 2.5);
            }).catch(() => {
                message.error('Não foi possível atualizar,tente novamente mais tarde', 2.5);
            });
    }

    // _onEditSub = async sub => {
    //     const { form: { setFieldsValue } } = this.props;

    //     this.setState({ editingSubcategoria: sub });
    //     return await setFieldsValue({
    //         novo_nome: sub.nome,
    //     });
    // }

    _renderPeriodo = (periodo) => {
        switch(periodo) {
            case 1:
                return 'Manhã';
            case 2:
                return 'Tarde';
            case 3:
                return 'Manhã e tarde';
            default:
                return '';
        }
    }


    _renderFeirantesNaCelula = () => {
        const { loading } = this.state;
        const { celula } = this.props;

        if(!celula) return null;
        
        return (
            <Table
                dataSource={celula.feirantes} 
                loading={loading}
                size="small"
                rowKey={celula => celula.feirante.cpf}
                pagination={{
                    pageSize: 15,
                }}
            >
                <Column
                    key='AlocacaoId'
                    dataIndex="feirante.cpf"
                    title="#"
                    width={120}
                    render={cpf => maskCPF(cpf)}
                />
                <Column
                    key="AlocacaoNome"
                    dataIndex="feirante.nome"
                    title="Nome"
                />
                <Column
                    key="AlocacaoNomeFantasia"
                    dataIndex="feirante.nomeFantasia"
                    title="Nome fantasia"
                />
                <Column
                    key="AlocacaoPeriodo"
                    dataIndex="periodo"
                    title="Periodo"
                    render={periodo => this._renderPeriodo(periodo)}
                />
                <Column
                    key="acoes"
                    title="Ações"
                    width={90}
                    render={linha => {
                        return (
                            <Popconfirm
                                title="Você quer relamente deletar esta categoria?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => this._onRemoveFeiranteCelula(linha.feirante.cpf)}
                            >
                                <Button shape="circle" icon="delete" type="danger" />
                            </Popconfirm>
                        );
                    }}
                />
            </Table>
        );
    }

    handleCancel = () => {
        this.setState({ editingSubcategoria: {} });
    }

    render() {

        const { form, confirmados, celula } = this.props;
        // const { celula } = this.state;

        const {
            getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched, getFieldValue,
        } = form;

        const nomeError = isFieldTouched('nome') && getFieldError('nome');

        const naoAlocados = confirmados.feirantes ? confirmados.feirantes.filter(feirante => feirante.celulaId === null) : [];

        return (
            <Fragment>
                <Form layout="inline" onSubmit={this._handleSubmit}>
                    <Form.Item
                        validateStatus={nomeError ? 'error' : ''}
                        help={nomeError || ''}
                    >
                        {getFieldDecorator('nome', {rules: [{
                            required: true,
                            message: 'O nome da subcategoria é obrigatório!'
                        }]})(
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                disabled={!celula || !celula.feirantes || celula.feirantes.length === 2 || (celula.feirantes[0] && celula.feirantes[0].periodo === 3)}
                                placeholder="Selecione um feirante..."
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    naoAlocados.map(confirmado => {
                                        const nome = `${maskCPF(confirmado.feirante.cpf)} - ${confirmado.feirante.nomeFantasia ? confirmado.feirante.nomeFantasia : confirmado.feirante.nome}`;
                                        return (
                                            <Option
                                                key={confirmado.feirante.cpf}
                                                cpf={confirmado.feirante.cpf}
                                                value={confirmado.feirante.cpf}
                                            >
                                                <span style={{fontWeight: "bold"}}>{nome}</span>
                                                <br />
                                                <span style={{fontStyle: "italic"}}>{confirmado.sub_categoria.nome}</span>
                                            </Option>
                                        );
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                hasErrors(getFieldsError())
                                || !getFieldValue('nome')
                            }
                        >
                            Alocar
                        </Button>
                    </Form.Item>
                    { 
                        celula && celula.feirantes && celula.feirantes.length === 1 && celula.feirantes[0].periodo !== 3
                        ? (
                            <p>Já existe um feirante alocado nesta célula, aloque outro no periodo da {celula.feirantes[0].periodo === 1 ? 'tarde' : 'manhã'}.</p>
                        ) : null
                    }
                </Form>
                { this._renderFeirantesNaCelula() }
            </Fragment>
        );
    }

}

const WrappedHorizontalAlocacaoForm = Form.create({ name: 'categorias_form' })(AlocacaoForm);

export default WrappedHorizontalAlocacaoForm;