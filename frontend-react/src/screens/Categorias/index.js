import React, { PureComponent, Fragment } from 'react';

import { 
    Button, Popconfirm, Modal,
    Tag,
} from 'antd';

import CategoriasForm from './CategoriasForm';
import ContentComponent from '../../components/ContentComponent';
import TabelaComponent from '../../components/TabelaComponent';
import * as categoriasAPI from '../../api/categoria';

export default class CategoriasScreen extends PureComponent {

    state = {
        categorias: [],
        visible: false,
    };

    componentDidMount() {
        this._loadCategorias();
    }
    
    _loadCategorias = async () => {
        const categorias = await categoriasAPI.get();
        this.setState({ categorias });
    }

    _onDeleteCategoria = async id => {
        await categoriasAPI.del(id)
            .then(() => {
                this._loadCategorias();
            });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { categorias } = this.state;

        const colunas = [
            {
                key: 'id',
                dataIndex: 'id',
                title: '#',
                width: 60,
            },
            {
                key: 'nome',
                dataIndex: 'nome',
                title: 'Nome',
            },
            {
                key: 'cnpj',
                dataIndex: 'need_cnpj',
                title: 'Requer CNPJ',
                width: 70,
                render: need_cnpj => {
                    return need_cnpj === 1
                        ? <Tag color="#87d068">Sim</Tag>
                        : <Tag color="#2db7f5">Não</Tag>
                }
            },
            {
                key: 'acoes',
                title: 'Ações',
                render: linha => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={() => categoriasAPI.getSub(linha.id)}>
                            Detalhes
                        </Button>
                        <Popconfirm
                            title="Você quer relamente deletar esta categoria?"
                            okText="Sim"
                            cancelText="Não"
                            onConfirm={() => this._onDeleteCategoria(linha.id)}
                        >
                            <Button shape="circle" icon="delete" type="danger" />
                        </Popconfirm>
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
                    title="Categorias"
                >
                    <TabelaComponent
                        linhas={categorias} 
                        colunas={colunas}
                        size="small"
                        pagination={{
                            pageSize: 15,
                        }}
                    />
                    <Modal
                        title="Adicionar uma nova categoria"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                        >
                            <CategoriasForm 
                                onSuccess={this.handleOk}
                                refresh={this._loadCategorias}
                            />
                    </Modal>
                </ContentComponent>
            </Fragment>
           
        );
    }

}
