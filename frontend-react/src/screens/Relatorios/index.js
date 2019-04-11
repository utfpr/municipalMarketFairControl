import React, { PureComponent, Fragment } from 'react';

import { 
    Table, Tag, Button,
    Modal, Popconfirm,
} from 'antd';
import moment from 'moment-timezone';

import ContentComponent from '../../components/ContentComponent';

import * as relatorioAPI from '../../api/relatorio';

import RelatoriosForm from './Relatoriosform';

const { Column } = Table;

export default class RelatoriosScreen extends PureComponent {

    state = {
        relatorios: [],
        visible: false,
        participantes: {},
    };

    componentDidMount() {
        this._loadRelatorios();
    }

    _loadRelatorios = async () => {
        const relatorios = await relatorioAPI.getFeiras();
        this.setState({ relatorios });
    }

    _getParticipantes = async data => {
        const participantes = await relatorioAPI.getParticipantes(data);
        this.setState({ participantes });
    }
    
    _showModal = (event, data) => {
        event.preventDefault();
        this._getParticipantes(data);
        this.setState({visible: true});
    }

    _renderAcoes = feira => {
        return (
            <Button onClick={() => this._showModal(feira.data)} disabled={!feira.status} type="primary">
                Relatório
            </Button>
        );
    }

    _hideModal = () => {
        this.setState({visible: false});
    }

    _renderModal = () => {
        const { visible, relatorios, participantes } = this.state;

        if (!visible) return null;

        return (
            <Modal
                title="Relatório"
                visible={visible}
                onCancel={this._hideModal}
                footer={null}
                >
                    <Table rowKey={linha => linha.id} dataSource={participantes}>

                    </Table>

            </Modal>
        );
    }

    render() {
        const { relatorios, loading } = this.state;

        return (
        <Fragment>
                <ContentComponent
                    title="Relatórios"
                >
                    <Table rowKey={linha => linha.id} dataSource={relatorios}>
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
                                : <Tag color="#f50">Cancelada</Tag>
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
                {this._renderModal()}
            </Fragment>
        )
    }

}

