import React, { PureComponent } from 'react';

import moment from 'moment-timezone';
import {
    Table, Input, Button, Col, Row
} from 'antd';

import * as feiraAPI from '../../api/feira';
import * as relatorioAPI from '../../api/relatorio';
import ContentComponent from '../../components/ContentComponent';
import styles from './RelatorioFeirante.module.scss';
import EmptyComponent from '../../components/EmptyComponent';
import { getParticipacaoUltimaFeira } from '../../api/participa';

const { Column } = Table;

export default class RelatorioFeirante extends PureComponent {
    state = {
        participantes: [],
        faturamentoPeriodo: [],
        loading: true,
        dataFeira: '',
        presencas: [],
    };

    componentDidMount() {
        this._loadValues();
    }

    _loadValues = async () => {
        this.setState({ loading: true });
        try {
            // Chamar a rota de relatorios do 
            await getParticipacaoUltimaFeira()
                .then(response => {
                    const { data } = response;
                    this.setState({ presencas: data });
                }).catch(ex => console.warn(ex));

        } catch (ex) {
            console.warn(ex);
        }
        this.setState({ loading: false });
    }
    _renderPeriodo = periodo => {

        if (periodo = 1 ) return "Manhã";
        if (periodo = 2 ) return "Tarde";
        return "Manhã e Tarde";
    }
    
    render() {
        const { presencas, loading } = this.state;

        return (
            <ContentComponent
                loading={loading}
                title="Relatórios"
            >
                <Row gutter={10}>
                    <Col span={4}>
                        <div>
                            <Input
                                placeholder="Faturamento"
                                formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                            <div style={{ marginTop: 5 }}>

                                <Button
                                    onClick={this.toggle}
                                    type="primary">

                                    Adicionar
    
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Table
                    dataSource={presencas}
                    loading={loading}
                    rowKey={linha => linha.data}
                    locale={{
                        emptyText: <EmptyComponent />
                    }}
                >
                    <Column
                        title="Data"
                        dataIndex="data_feira"
                        key="data"
                        render={data => moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                        width={90}
                    />
                    <Column
                        title="CPF"
                        dataIndex="cpf_feirante"
                        key="CPF"
                        width={90}
                    />
                    <Column
                        title="Faturamento"
                        key="faturamento"
                        dataIndex="faturamento"
                        width={90}
                    />
                    <Column
                        title="Periodo"
                        dataIndex="periodo"
                        key="periodo"
                        render={this._renderPeriodo}
                        width={90}
                    />

                </Table>


            </ContentComponent>
        );
    }

}