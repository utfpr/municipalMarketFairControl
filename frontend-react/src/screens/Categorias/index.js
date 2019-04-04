import React, { PureComponent } from 'react';

import { Button, Popconfirm } from 'antd';

import ContentComponent from '../../components/ContentComponent';
import TabelaComponent from '../../components/TabelaComponent';
import * as categoriasAPI from '../../api/categoria';

export default class CategoriasScreen extends PureComponent {

    state = {
        categorias: [],
    };

    componentDidMount() {
        this._loadCategorias();
    }
    
    _loadCategorias = async () => {
        const categorias = await categoriasAPI.get();
        this.setState({ categorias });
        console.log(categorias);
    }

    _onDeleteCategoria = async id => {
        await categoriasAPI.del(id)
            .then(() => {
                this._loadCategorias();
            });
    }

    render() {
        const { categorias } = this.state;

        const colunas = [
            {
                key: 'id',
                dataIndex: 'id',
                title: '#',
            },
            {
                key: 'nome',
                dataIndex: 'nome',
                title: 'Nome',
            },
            {
                key: 'acoes',
                dataIndex: 'id',
                title: 'Ações',
                render: (id, linha) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary">
                            Detalhes
                        </Button>
                        <Popconfirm
                            title="Você quer relamente deletar esta categoria?"
                            okText="Sim"
                            cancelText="Não"
                            onConfirm={() => this._onDeleteCategoria(id)}
                        >
                            <Button shape="circle" icon="delete" type="danger" />
                        </Popconfirm>
                    </div>
                ),
                width: 160,
            },
        ];

        const lin = categorias.map(linha => {
            return {
                key: linha.id,
                id: linha.id,
                nome: linha.nome
            }
        });

        return (
            <ContentComponent
                title="Categorias"
            >
                <TabelaComponent linhas={lin} colunas={colunas} />
            </ContentComponent>
        );
    }

}
