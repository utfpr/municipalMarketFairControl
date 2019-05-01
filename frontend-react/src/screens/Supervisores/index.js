import React, { PureComponent, Fragment } from 'react';
import { 
    Button, Popconfirm, Modal,
    Tag, Table, Empty, message,
} from 'antd';

import ContentComponent from '../../components/ContentComponent';
import SupervisorForm from './SupervisorForm';
import * as SupervisorAPI from '../../api/supervisor';
import EmptyComponent from '../../components/EmptyComponent';

const { Column } = Table;

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
        message.loading('Carregando.', 0);
        await SupervisorAPI.del(cpf)
            .then(() => {
                message.success('Supervisor deletado com sucesso.', 2.5);
                this._loadSupervisor();
            })
            .catch(() => {
                message.error('Não foi possível excluir, tente novamente mais tarde!', 2.5);
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
                    : 'Cadastrar novo supervisor'
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
                                title="Você quer deletar este supervisor?"
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

        return (
            <Fragment>
                <ContentComponent
                    buttonProps={{
                        text: 'Adicionar',
                        onClick: this.showModal,
                        type: 'primary',
                        icon: 'plus',
                    }}
                    title="Supervisores"
                >
                    <Table
                        dataSource={Supervisor} 
                        size="small"
                        loading={loading}
                        rowKey={linha => linha.cpf}
                        pagination={{
                            pageSize: 15,
                        }}
                        
                        locale={(
                            <Empty
                                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                imageStyle={{
                                height: 60,
                                }}
                                description={
                                <span>
                                    Customize <a href="#API">Description</a>
                                </span>
                                }
                            >
                                <Button type="primary">Create Now</Button>
                            </Empty>
                        )}
                    >
                        <Column
                            key="cpf"
                            dataIndex="cpf"
                            title="CPF"
                            width={150}
                        />
                        <Column
                            key="nome"
                            dataIndex="nome"
                            title="Nome"
                        />
                        <Column
                            key="isAdm"
                            dataIndex="is_adm"
                            title="Administrador"
                            width={50}
                            render={isAdm => {
                                return isAdm
                                    ? <Tag color="#87d068">Sim</Tag>
                                    : <Tag color="#2db7f5">Não</Tag>
                            }}
                        />
                        <Column
                            key="acoes"
                            title="Ações"
                            render={linha => this._renderAcoes(linha)}
                            width={130}
                        />
                    </Table>
                    { this._renderModal() }
                </ContentComponent>
            </Fragment>
           
        );
    }
}