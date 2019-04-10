import React, { PureComponent, Fragment } from 'react';
import { 
    Button, Popconfirm, Modal,
    Tag, Divider, Icon,
} from 'antd';

import ContentComponent from '../../components/ContentComponent';
//import ModalComponent from '../../components/ModalComponent'; //? precisa ?
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
                    ? `#${selectedFeirante.cpf} - ${selectedFeirante.nome}`
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
                width: 60,
            },
            {
                key: 'cnpj', 
                dataIndex: 'cnpj',
                title: 'Cnpj',
                width: 60,
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
            {
                key: 'usa_ee',
                dataIndex: 'usa_ee',
                title: 'Usa EE',
                width: 70,
                render: usa_ee => {
                    return usa_ee === 1
                        ? <Tag color="#87d068">Sim</Tag> //CASO SIM , MOSTRA A VOLTAGEM , VER COMO FAZ 
                        : <Tag color="#2db7f5">Não</Tag>
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

    /*_renderButtons = () => (
        <Button type="primary">
            <Icon type="plus" />
            Adicionar
        </Button>
    );*/

    /*render() {

        const linhas = [
            {
                key: 1,
                nome: 'Willian',
                idade: 21,
                email: 'willianbarbosa@alunos.utfpr.edu.br',
            },
            {
                key: 2,
                nome: 'Alan',
                idade: 13,
                email: 'alan@alunos.utfpr.edu.br',
            },
        ];

        const colunas = [
            {
                title: 'Nome',
                dataIndex: 'nome',
                key: 'nome',
            },
            {
                title: 'Idade',
                dataIndex: 'idade',
                key: 'idade',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
        ]

        return (
            <ContentComponent
                title="Feirante"
                renderExtraContents={this._renderButtons}
            >
                <ModalComponent titulo="Modal feirante">
                    Hello
                </ModalComponent>
                <h1>Teste</h1>
                <TabelaComponent linhas={linhas} colunas={colunas}/>
            </ContentComponent>
        );
    } */

}
