import React, { PureComponent } from 'react';

import moment from 'moment-timezone';
import {
    Table, Input, Button, Col, Row, Modal, Popconfirm
} from 'antd';

import * as feiraAPI from '../../api/feira';
import * as relatorioAPI from '../../api/relatorio';
import ContentComponent from '../../components/ContentComponent';
import styles from './RelatorioFeirante.module.scss';
import EmptyComponent from '../../components/EmptyComponent';
import { getParticipacaoUltimaFeira } from '../../api/participa';
import WrappedFaturamentoForm from './FaturamentoForm';

const { Column } = Table;

export default class RelatorioFeirante extends PureComponent {
    state = {
        participantes: [],
        faturamentoPeriodo: [],
        loading: true,
        dataFeira: '',
        presencas: [],
        selectedFeira: {}
    };

    componentDidMount() {
        this._loadValues();
    }

    _loadValues = async () => {
        this.setState({ loading: true });
        try {
            // Chamar a rota de relatorios do 
            await getParticipacaoUltimaFeira()
                .then(data => {
                    console.log(data);
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

    showModal = feira => {
        this.setState({
          visible: true,
          selectedFeira: feira,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false, selectedFeira: {} });
      };


    _renderModal = () => {
            const { visible, loading, selectedFeira } = this.state;
            return (
              <div>
                
                <Modal
                  visible={visible}
                  title="Title"
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <WrappedFaturamentoForm feira={selectedFeira} />
                </Modal>
              </div>
            );
          }
        


    render() {
        const { presencas, loading } = this.state;

        return (
            <ContentComponent>
                <Row gutter={10}>
                    <Col span={4}>
                        <div>
                            <Input
                                placeholder="Pesquisar"
                                formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                            
                        </div>
                    </Col>
                </Row>

                <Table
                    dataSource={presencas}
                    loading={loading}
                    rowKey={linha => linha.data}
                    locale={{
                        emptyText: <EmptyComponent onButtonClick={this.showModal} />
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
                    <Column
                        title="Ações"
                        key="acoes"
                        render={feira => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button 
                                    loading={loading}
                                    onClick={() => this.showModal(feira)}
                                    type="primary"
                                >
                                    Adicionar
                                </Button>
                            </div>
                        )}
                        width={160}
                    />
                </Table>

                { this._renderModal() }
            </ContentComponent>
        );
    }

}