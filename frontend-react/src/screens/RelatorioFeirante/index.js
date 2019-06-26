import React, { PureComponent, Fragment  } from 'react';

import moment from 'moment-timezone';
import { 
    Statistic, Row, Col, Card,
    Table,Input,Button,InputNumber
} from 'antd';

import * as feiraAPI from '../../api/feira';

import * as relatorioAPI from '../../api/relatorio';

import ContentComponent from '../../components/ContentComponent';
import styles from './RelatorioFeirante.module.scss';
import EmptyComponent from '../../components/EmptyComponent';

const { Column } = Table;

export default class RelatorioFeirante extends PureComponent {
    state = {
        participantes: [],
        faturamentoPeriodo: [],
        loading: true,
        dataFeira: '',
    };
    componentDidMount() {
        this._loadValues();
    }
    
    _loadValues = async () => {
        this.setState({loading: true});
        try {
            const { data } = this.props.match.params;
            const newDate = data.split('-');
            const dataFeira = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
            await this._getParticipantes();
            await this._getFaturamento();
            this.setState({dataFeira, loading: false});
        } catch(ex) {
            console.warn(ex);
        }
    }
    
    _getFaturamento = async () => {
        const { dataFeira } = this.state;
        const faturamentoPeriodo = await relatorioAPI.getFaturamentoPeriodo(moment(feiraAPI.feiraAtual()).format('YYYY-MM-DD'));
        this.setState({faturamentoPeriodo});
    }
    
    _getFaturamentAtual = (periodoDesejado) => {
        const { faturamentoPeriodo } = this.state;
        if (!faturamentoPeriodo) return 0;
        const periodo = faturamentoPeriodo.find(fat => fat.periodo === periodoDesejado);
        return periodo ? periodo.faturamento : 0;
    }

    render() {
        const { feiras, participantes, dataFeira, loading } = this.state;

        const presentes = participantes.participaram ? participantes.participaram.length : 0;
        const ausentes = participantes.naoParticiparam ? participantes.naoParticiparam.length : 0;
    
        return (
            <ContentComponent
                loading={loading}
                title={`Feira do dia ${moment(feiraAPI.feiraAtual).format('DD/MM/YYYY')}`}
            >
                <Row gutter={10}>

                    <div>

                            <Input
                            placeholder="Faturamento"
                            formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                            <div style={{ marginTop: 5 }}>
                            <Button onClick={this.toggle} type="primary">
                             Adicionar 
                            </Button>
                        </div>
                    </div>
                
                </Row>

                <h2 className={styles.titulo}>Faturamento Geral</h2>

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

                    </Table>
    
  
            </ContentComponent>
        );
    }

}