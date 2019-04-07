import React, {PureComponent} from 'react';

import { Table } from 'antd';

export default class TabelaComponent extends PureComponent {

    state = {};

    render() {
        const { colunas, linhas, ...tableProps } = this.props;

        const lin = linhas.map(linha => {
            return {
                key: linha.id,
                ...linha,
            }
        });


        return (
            <Table
                dataSource={lin}
                columns={colunas}
                {...tableProps}
            />
        );
    }

}