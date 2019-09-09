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

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };


    _renderModal = () => {
            const { visible, loading } = this.state;
            return (
              <div>
                
                <Modal
                  visible={visible}
                  title="Title"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                      Submit
                    </Button>,
                  ]}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </div>
            );
          }
        


    render() {
        const { presencas, loading } = this.state;

        return (
            <ContentComponent
                loading={loading}
                buttonProps={{
                    text: 'Adicionar',
                    onClick: this.showModal,
                    type: 'primary',
                    icon: 'plus',
                }}
                title="Relatórios"
                
            >
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
                        render={linha => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button 
                                loading={loading}
                                buttonProps={{
                                    text: 'Adicionar',
                                    onClick: this.showModal,
                                    type: 'primary',
                                    icon: 'plus',
                                }}
                                title="Relatórios">
                                    Detalhes
                                </Button>
                                <Popconfirm
                                    title="Você quer deletar esta categoria?"
                                    okText="Sim"
                                    cancelText="Não"
                                    onConfirm={this._renderPeriodo}
                                >
                                    <Button shape="circle" icon="delete" type="danger" />
                                </Popconfirm>
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