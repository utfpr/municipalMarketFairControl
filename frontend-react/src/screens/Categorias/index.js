import React, { PureComponent, Fragment } from 'react';

import { 
    Button, Popconfirm, Modal,
    Tag, Divider, message,
    Table,
} from 'antd';

import CategoriasForm from './CategoriasForm';
import Subcategorias from './Subcategorias';
import ContentComponent from '../../components/ContentComponent';
import EmptyComponent from '../../components/EmptyComponent';
import * as categoriasAPI from '../../api/categoria';

const { Column } = Table;

export default class CategoriasScreen extends PureComponent {

    state = {
        categorias: [],
        visible: false,
        loading: true,
        selectedCategoria: {},
    };

    componentDidMount() {
        this._loadCategorias();
    }

    _loadCategorias = async () => {
        this.setState({ loading: true });
        
        const categorias = await categoriasAPI.get();
        this.setState({ categorias, loading: false });
    }

    _onDeleteCategoria = async id => {
        message.loading('Carregando...', 0);
        await categoriasAPI.del(id)
            .then(() => {
                this._loadCategorias();
                message.success('Categoria deletada com sucesso.', 2.5);
            })
            .catch(() => {
                message.error('Não foi possível excluir, tente novamente mais tarde!', 2.5);
            });
    }

    showModal = categoria => {
        this.setState({
            visible: true,
            selectedCategoria: categoria,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            selectedCategoria: {},
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedCategoria: {},
        });
    }

    _renderModal = () => {
        const { visible, selectedCategoria } = this.state;

        if (!visible) return null;

        return (
            <Modal
                title={ selectedCategoria && selectedCategoria.id
                    ? `#${selectedCategoria.id} - ${selectedCategoria.nome}`
                    : 'Adicionar nova categoria'
                }
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <CategoriasForm 
                        categoria={selectedCategoria}
                        onSuccess={this.handleOk}
                        refresh={this._loadCategorias}
                        
                    />
                    {
                        selectedCategoria && selectedCategoria.id
                            ? (
                                <Fragment>
                                    <Divider>
                                        Subcategorias
                                    </Divider>
                                    <Subcategorias categoria={selectedCategoria} />
                                </Fragment>
                            ) : null
                    }
            </Modal>
        );
    }

    render() {
        const { categorias, loading } = this.state;

        return (
            <ContentComponent
                buttonProps={{
                    text: 'Adicionar',
                    onClick: this.showModal,
                    type: 'primary',
                    icon: 'plus',
                }}
                title="Categorias"
            >
                <Table
                    dataSource={categorias}
                    loading={loading}
                    pagination={{
                        pageSize: 15,
                    }}
                    locale={{
                        emptyText: <EmptyComponent onButtonClick={this.showModal} />
                    }}
                >
                    <Column
                        key="id"
                        dataIndex="id"
                        title="#"
                        width={60}
                    />
                    <Column
                        key="nome"
                        dataIndex="nome"
                        title="Nome"
                    />
                    <Column
                        key="cnpj"
                        dataIndex="need_cnpj"
                        title="Requer CNPJ"
                        width={120}
                        render={need_cnpj => {
                            return need_cnpj === 1
                                ? <Tag color="#87d068">Sim</Tag>
                                : <Tag color="#2db7f5">Não</Tag>
                        }}
                    />
                    <Column
                        key="acoes"
                        title="Ações"
                        render={linha => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="primary" onClick={() => this.showModal(linha)}>
                                    Detalhes
                                </Button>
                                <Popconfirm
                                    title="Você quer deletar esta categoria?"
                                    okText="Sim"
                                    cancelText="Não"
                                    onConfirm={() => this._onDeleteCategoria(linha.id)}
                                >
                                    <Button shape="circle" icon="delete" type="danger" />
                                </Popconfirm>
                            </div>
                        )}
                        width={160}
                    />
                </Table>
                { this._renderModal() }
            </ContentComponent>

        );
    }

}
