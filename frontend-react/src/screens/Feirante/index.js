import React, { PureComponent, Fragment } from 'react';
import { 
    Button, Modal,
    Tag,
} from 'antd';

import ContentComponent from '../../components/ContentComponent';
import TabelaComponent from '../../components/TabelaComponent';
import FeirantesForm from './FeirantesForm';
import * as feirantesAPI from '../../api/feirante';

export default class FeiranteScreen extends PureComponent {

    state = {
        feirantes: [],
        visible: false,
        loading: true,
        selectedFeirante: {},
    };

    componentDidMount() {
        this._loadFeirantes();
    }

    _loadFeirantes = async () => {
        this.setState({ loading: true });
        const feirantes = await feirantesAPI.get();
        this.setState({ feirantes, loading: false });
    }
    
    _onDeleteFeirante = async cpf => {
        await feirantesAPI.del(cpf)
            .then(() => {
                this._loadFeirantes();
            });
    }

    showModal = feirante => {
        this.setState({
            visible: true,
            selectedFeirante: feirante,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            selectedFeirante: {},
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedFeirante: {},
        });
    }

    _renderModal = () => {
        const { visible, selectedFeirante} = this.state;

        if (!visible) return null;

        return (
            <Modal
                title={ selectedFeirante && selectedFeirante.cpf
                    ? `${selectedFeirante.nome} - ${selectedFeirante.nome_fantasia}`
                    : 'Cadastrar um novo feirante'
                }
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <FeirantesForm 
                        feirante={selectedFeirante}
                        onSuccess={this.handleOk}
                        refresh={this._loadFeirantes}
                    />
                    {
                       /* selectedFeirante && selectedFeirante.cpf
                            ? (
                                <Fragment>
                                    <Divider>
                                        Subcategorias
                                    </Divider>
                                    <Subcategorias categoria={selectedCategoria} />
                                </Fragment>
                            ) : null
                            */
                    }
            </Modal>
        );
    }
 
/* atrubutos :
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
  */

  // TABELA SÓ COM AS INFORMAÇÕES BÁSICA, CLICAR NUMA MODAL ABRE O RESTO DAS INFORMAÇÕES !
    render() {
        const { feirantes, loading } = this.state;

        const colunas = [
            {
                key: 'cpf',
                dataIndex: 'cpf',
                title: 'Cpf',
                width: 120,
            },
            {
                key: 'cnpj', 
                dataIndex: 'cnpj',
                title: 'Cnpj',
                width: 60,
                render: (cnpj) => {
                    return cnpj
                    ? cnpj
                    : <Tag color='#f50'>Não usa</Tag>
                }
            },
            {
                key: 'rg',
                dataIndex: 'rg',
                title: 'RG',
                width: 60,
            },
            {
                key: 'nome',
                dataIndex: 'nome',
                title: 'Nome',
            },
            {
                key: 'nome_fantasia',
                dataIndex: 'nome_fantasia',
                title: 'Nome Fantasia',
            },
            { key: 'usa_ee',
            dataIndex: 'usa_ee',
            title: 'Usa EE',
            width: 70,
            render: (usa_ee, linha) => {
                return usa_ee
                    ? <Tag color={linha.voltagem_ee === 110 ? '#87d068' : '#1abc9c'}>{linha.voltagem_ee}v</Tag>
                    : <Tag color="#108ee9">Não</Tag>
            }
        },
            
            {
                key: 'acoes',
                title: 'Ações',
                render: linha => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={() => this.showModal(linha)}>
                            Detalhes
                        </Button>
                        
                        
                    </div>
                ),
                width: 160,
            },
        ];

        return (
            <Fragment>
                <ContentComponent
                    buttonProps={{
                        text: 'Adicionar',
                        onClick: this.showModal,
                        type: 'primary',
                        icon: 'plus',
                    }}
                    title="Feirantes"
                >
                    <TabelaComponent
                        linhas={feirantes} 
                        colunas={colunas}
                        size="small"
                        loading={loading}
                        pagination={{
                            pageSize: 15,
                        }}
                    />
                    { this._renderModal() }
                </ContentComponent>
            </Fragment>
           
        );
    }
}
