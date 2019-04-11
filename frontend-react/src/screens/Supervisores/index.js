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
    
    _onDeleteSupervisor = async cpf => {
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
                    ? selectedSupervisor.nome
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
            </Modal>
    );
}
 
/* atrubutos :
  cpf,
  nome,
  senha,
  isAdm
  */

  // TABELA SÓ COM AS INFORMAÇÕES BÁSICA, CLICAR NUMA MODAL ABRE O RESTO DAS INFORMAÇÕES !
    _renderAcoes = linha => {

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" onClick={() => this.showModal(linha)}>
                    Editar
                </Button>

                {
                    linha.root_adm
                        ? (
                            <Button 
                                shape="circle"
                                icon="delete"
                                type="danger"
                                disabled
                            />
                        )
                        : (
                            <Popconfirm
                                title="Você quer relamente deletar este supervisor?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => this._onDeleteSupervisor(linha.cpf)}
                            >
                                <Button 
                                    shape="circle"
                                    icon="delete"
                                    type="danger"
                                />
                            </Popconfirm>
                        )
                }
                
            </div>
        )
    }

    render() {
        const { Supervisor, loading } = this.state;

        const colunas = [
            {
                key: 'cpf',
                dataIndex: 'cpf',
                title: 'CPF',
                width: 150,
            },
            {
                key: 'nome',
                dataIndex: 'nome',
                title: 'Nome',
            },
            {
                key: 'isAdm',
                dataIndex: 'is_adm',
                title: 'Administrador',
                width: 50,
                render: isAdm => {
                    return isAdm
                        ? <Tag color="#87d068">Sim</Tag>
                        : <Tag color="#2db7f5">Não</Tag>
                }
            },
            {
                key: 'acoes',
                title: 'Ações',
                render: linha => this._renderAcoes(linha),
                width: 130,
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
}