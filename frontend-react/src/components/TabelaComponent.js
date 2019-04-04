import React, {PureComponent} from 'react';

import { Table } from 'antd';

export default class TabelaComponent extends PureComponent {

    state = {};

    render() {
        const { colunas, linhas } = this.props;
        return (
            <Table dataSource={linhas} columns={colunas} />
        );
    }

}