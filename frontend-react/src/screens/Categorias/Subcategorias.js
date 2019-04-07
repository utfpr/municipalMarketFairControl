import React, { PureComponent, Fragment } from 'react';

import { Popconfirm, Button } from 'antd';

import TabelaComponent from '../../components/TabelaComponent';

import * as categoriasAPI from '../../api/categoria';
import * as subcategoriasAPI from '../../api/subcategoria';

class Subcategorias extends PureComponent {

    state = {
        subcategorias: [],
    };

    componentDidMount() {
        this._loadSubcategorias();
    }

    _loadSubcategorias = async () => {
        const { categoria } = this.props;
        
        // if(!categoria.id) return null;
        const subcategorias = await categoriasAPI.getSub(categoria.id);
        this.setState({subcategorias});
            
    }

    _onDeleteSubCategoria = id => {
        return subcategoriasAPI.deleteSub(id)
            .then(() => {
                this._loadSubcategorias();
            });
    }

    _renderSubcategorias = () => {
        const { subcategorias } = this.state;

        const colunas = [
            {
                key: 'SubcategoriaId',
                dataIndex: 'id',
                title: '#',
                width: 50,
            }, {
                key: 'SubcategoriaNome',
                dataIndex: 'nome',
                title: 'Nome',
            }, {
                key: 'acoes',
                title: 'Ações',
                width: 50,
                render: linha => {
                    return (
                        <Popconfirm
                            title="Você quer relamente deletar esta categoria?"
                            okText="Sim"
                            cancelText="Não"
                            onConfirm={() => this._onDeleteSubCategoria(linha.id)}
                        >
                            <Button shape="circle" icon="delete" type="danger" />
                        </Popconfirm>
                    );
                }
            },
        ];

        return (
            <TabelaComponent
                linhas={subcategorias} 
                colunas={colunas}
                size="small"
                pagination={{
                    pageSize: 15,
                }}
            />
        );
    }

    render() {

        // const { subcategorias } = this.state;

        return (
            <Fragment>
                { this._renderSubcategorias() }
            </Fragment>
        );
    }

}

export default Subcategorias;