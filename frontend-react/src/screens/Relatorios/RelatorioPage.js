import React, { PureComponent } from 'react';

import moment from 'moment-timezone';
import { 
    Statistic, Row, Col, Card,
    Table, Divider,
} from 'antd';

import ContentComponent from '../../components/ContentComponent';

import * as relatorioAPI from '../../api/relatorio';
import styles from './Relatorios.module.scss';

const { Column } = Table;

export default class RelatorioPage extends PureComponent {
    state = {
        participantes: [],
        loading: true,
        dataFeira: '',
    };

    componentDidMount() {
        this._loadParticipantes();
    }
    
    _loadParticipantes = () => {
        const { data } = this.props.match.params;
        const newDate = data.split('-');
        const dataFeira = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
        this.setState({dataFeira}, this._getParticipantes);
    }
    
    _getParticipantes = async () => {
        this.setState({loading: true});
        const { dataFeira } = this.state;
        const participantes = await relatorioAPI.getParticipantes(dataFeira);
        this.setState({participantes, loading: false});
    }

    _renderFeiraInvalida = () => {
        return (
            <ContentComponent
                title="Relatórios"
            >
                <div className={styles.errorContainer}>
                    <h2>Feira não existente!</h2>
                    <a href="/supervisor/relatorios" alt="voltar">Voltar</a>
                </div>
            </ContentComponent>
        )
    }

    render() {
        const { participantes, dataFeira, loading } = this.state;

        if (!participantes) return this._renderFeiraInvalida();

        const presentes = participantes.participaram ? participantes.participaram.length : 0;
        const ausentes = participantes.naoParticiparam ? participantes.naoParticiparam.length : 0;
        
        
        return (
            <ContentComponent
                loading={loading}
                title={`Feira do dia ${moment(dataFeira).format('DD/MM/YYYY')}`}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Card 
                            style={{
                                backgroundColor: '#2ecc71',
                                border: 'none',
                            }}
                        >
                            <Statistic
                                title="Faturamento"
                                value={participantes.faturamento}
                                precision={2}
                                style={{color: '#fff'}}
                                valueStyle={{ color: '#fff' }}
                                prefix="R$"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{
                                backgroundColor: '#3498db',
                                border: 'none',
                            }}
                        >
                            <Statistic
                                title="Presentes"
                                value={presentes}
                                style={{color: '#fff'}}
                                valueStyle={{ color: '#fff' }}
                                suffix={presentes > 1 ? 'feirantes' : 'feirante'}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{
                                backgroundColor: '#e74c3c',
                                border: 'none',
                            }}
                        >
                            <Statistic
                                title="Ausentes"
                                value={ausentes}
                                style={{color: '#fff'}}
                                valueStyle={{ color: '#fff' }}
                                suffix={ausentes > 1 ? 'feirantes' : 'feirante'}
                            />
                        </Card>
                    </Col>
                </Row>

                <Divider>Participaram</Divider>
                <Table 
                    rowKey={linha => linha.cpf} 
                    dataSource={participantes.participaram}
                    locale={{
                        emptyText: 'Nenhum registro'
                    }}
                >
                    <Column
                        title="CPF"
                        dataIndex="cpf"
                        key="cpf"
                        render={cpf => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')}
                        width={150}
                    />
                    <Column
                        title="Nome"
                        dataIndex="nome"
                        key="nome"
                    />
                    <Column
                        title="Nome fantasia"
                        dataIndex="nomeFantasia"
                        key="nomeFantasia"
                    />
                    <Column
                        title="Faturamento"
                        key="faturamento"
                        dataIndex="faturamento"
                        render={faturamento => faturamento ? faturamento.toLocaleString('pt-BR', { 
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: 'BRL',
                        }) : 'R$ 0,00'}
                        width={105}
                    />
                </Table>
                <Divider>Não participaram</Divider>
                <Table 
                    rowKey={linha => linha.cpf} 
                    dataSource={participantes.naoParticiparam}
                    locale={{
                        emptyText: 'Nenhum registro'
                    }}
                >
                    <Column
                        title="CPF"
                        dataIndex="cpf"
                        key="cpf"
                        render={cpf => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')}
                        width={150}
                    />
                    <Column
                        title="Nome"
                        dataIndex="nome"
                        key="nome"
                    />
                    <Column
                        title="Nome fantasia"
                        dataIndex="nomeFantasia"
                        key="nomeFantasia"
                    />
                </Table>
            </ContentComponent>
        );
    }

}