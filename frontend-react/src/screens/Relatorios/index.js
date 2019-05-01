import React, { PureComponent, Fragment } from 'react';

import { 
    Table, Tag, Button,
} from 'antd';
import moment from 'moment-timezone';

import ContentComponent from '../../components/ContentComponent';
import EmptyComponent from '../../components/EmptyComponent';

import * as relatorioAPI from '../../api/relatorio';

const { Column } = Table;

export default class RelatoriosScreen extends PureComponent {

    state = {
        feiras: [],
        visible: false,
        participantes: {},
        loading: true,
    };

    componentDidMount() {
        this._loadRelatorios();
    }

    _loadRelatorios = async () => {
        this.setState({loading: true});
        const feiras = await relatorioAPI.getFeiras();
        this.setState({ feiras, loading: false });
    }

    _goToRelatorio = (event, data) => {
        event.preventDefault();
        const { history } = this.props;
        history.push(`/supervisor/relatorios/${moment(data).format('DD-MM-YYYY')}`);
    }

    _renderAcoes = feira => {
        return (
            <Button onClick={event => this._goToRelatorio(event, feira.data)} disabled={!feira.status} type="primary">
                Relatório
            </Button>
        );
    }

    _hideModal = () => {
        this.setState({visible: false});
    }

    render() {
        const { feiras, loading } = this.state;

        return (
        <Fragment>
                <ContentComponent
                    title="Relatórios"
                >
                    <Table 
                        dataSource={feiras}
                        loading={loading}
                        rowKey={linha => linha.data}
                        locale={{
                            emptyText: <EmptyComponent />
                        }}
                    >
                        <Column
                            title="Data"
                            dataIndex="data"
                            key="data"
                            render={data => moment(data).format('DD/MM/YYYY')}
                            width={90}
                        />
                        <Column
                            title="Data limite"
                            dataIndex="data_limite"
                            key="data_limite"
                            render={data => moment(data).format('DD/MM/YYYY [às] HH:mm')}
                        />
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={status => {
                                return status
                                ? <Tag color="#87d068">Ativo</Tag>
                                : <Tag color="#f50">Inativo</Tag>
                            }}
                            width={70}
                        />
                        <Column
                            title="Ações"
                            key="acoes"
                            render={this._renderAcoes}
                            width={105}
                        />
                    </Table>
                </ContentComponent>
            </Fragment>
        )
    }

}

