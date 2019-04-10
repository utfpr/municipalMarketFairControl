import React, { PureComponent, Fragment } from 'react';
import { 
    Button, Popconfirm, Modal,
    Tag, Divider,Icon
} from 'antd';

import ContentComponent from '../../components/ContentComponent';
//import ModalComponent from '../../components/ModalComponent';
import TabelaComponent from '../../components/TabelaComponent';
import SupervisorForm from './SupervisorForm';
import * as SupervisorAPI from '../../api/supervisor';

export default class SupervisorScreen extends PureComponent {

    state = {
        Supervisor: [],
        visible: false,
        loading: true,
        selectedSupervisor: {},
    };

    componentDidMount() {
        this._loadSupervisor();
    }

    _loadSupervisor = async () => {
        this.setState({ loading: true });
        const Supervisor = await SupervisorAPI.get();
        this.setState({ Supervisor, loading: false });
    }
    
    _onDeleteFeirante = async cpf => {
        await SupervisorAPI.del(cpf)
            .then(() => {
                this._loadSupervisor();
            });
    }

    showModal = supervisor => {
        this.setState({
            visible: true,
            selectedSupervisor: supervisor,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            selectedSupervisor: {},
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedSupervisor: {},
        });
    }

    _renderModal = () => {
        const { visible, selectedSupervisor} = this.state;

        if (!visible) return null;

        return (
            <Modal
                title={ selectedSupervisor && selectedSupervisor.cpf
                    ? `#${selectedSupervisor.cpf} - ${selectedSupervisor.nome}`
                    : 'Cadastrar um novo supervisor'
                }
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <SupervisorForm 
                        supervisor={selectedSupervisor}
                        onSuccess={this.handleOk}
                        refresh={this._loadSupervisor}
                    />
                    {
                        /*
                        selectedSupervisor && selectedSupervisor.cpf
                            ? (
                                <Fragment>
                                    <Divider>
                                        Supervisores
                                    </Divider>
                                    <Supervisores supervisor={selectedCategoria} />
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
        const { Supervisor, loading } = this.state;

        const colunas = [
            {
                key: 'cpf',
                dataIndex: 'cpf',
                title: 'Cpf',
                width: 60,
            },
            {
                key: 'nome',
                dataIndex: 'nome',
                title: 'Nome',
            },
            {
                key: 'isAdm',
                dataIndex: 'isAdm',
                title: 'É Adm',
                width: 70,
                render: isAdm => {
                    return isAdm === 1
                        ? <Tag color="#87d068">Sim</Tag>
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
                    title="Supervisor"
                >
                    <TabelaComponent
                        linhas={Supervisor} 
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

    /*
    _renderButtons = () => (
        <Button type="primary">
            <Icon type="plus" />
            Adicionar
        </Button>
    );
    */

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
                title="supervisor"
                renderExtraContents={this._renderButtons}
            >
                <ModalComponent titulo="Modal supervisor">
                    Hello
                </ModalComponent>
                <h1>Teste</h1>
                <TabelaComponent linhas={linhas} colunas={colunas}/>
            </ContentComponent>
        );
    } */

}

/*
import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

export default class SupervisorScreen extends PureComponent {

    state = {};

    render() {
        return (
            <ContentComponent
                title="Supervisor"
            >
                <h1>Componente Supervisor</h1>
            </ContentComponent>
        );

    }

}
*/