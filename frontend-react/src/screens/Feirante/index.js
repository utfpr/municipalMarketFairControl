import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

import { Button, Icon } from 'antd';

import ModalComponent from '../../components/ModalComponent';
import TabelaComponent from '../../components/TabelaComponent';

export default class FeiranteScreen extends PureComponent {

    state = {};

    _renderButtons = () => (
        <Button type="primary">
            <Icon type="plus" />
            Adicionar
        </Button>
    );

    render() {

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
    }

}
