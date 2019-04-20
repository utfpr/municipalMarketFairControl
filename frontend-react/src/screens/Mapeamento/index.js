import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

import { Table } from 'antd';
import moment from 'moment-timezone';

import { SVGMap } from 'react-svg-map';
import Map from './Mapa';
import * as participaAPI from '../../api/participa';
import * as celulaAPI from '../../api/celula';

import 'react-svg-map/lib/index.css';

const { Column } = Table;

export default class MapeamentoScreen extends PureComponent {

    state = {
        confirmados: [],
        celulas: [],
    };


    componentDidMount() {
        this._loadValues();
    }

    _loadValues = () => {
        this._getConfirmados();
        this._getCelulas();
    }

    _getCelulas = async () => {
        const celulas = await celulaAPI.get();
        this.setState({celulas});
    }

    _getConfirmados = async () => {
        const confirmados = await participaAPI.getConfirmados();
        this.setState({confirmados});
    }

    _onClick = event => {
        console.log(event.target.id);
    }

    _isCelulaOcupada = (celulaDoMapa, index) => {
        const { confirmados } = this.state;
        if (!confirmados || !confirmados.feirantes) return 'svg-map__location';
        const feiranteNaCelula = confirmados.feirantes.find(feirante => feirante.celulaId === celulaDoMapa.id);
        if (!feiranteNaCelula) return 'svg-map__location';
        return feiranteNaCelula.periodo === 3 ? 'diaTodo' : 'meioPeriodo';
    }

    render() {
        const { confirmados } = this.state;

        return (
            <ContentComponent
                title="Mapeamento"
            >
                <div style={{ height: 'auto', width: '100%' }}>
                    <SVGMap
                        map={Map}
                        onLocationClick={this._onClick}
                        locationClassName={this._isCelulaOcupada}
                    />
                </div>
                <Table
                    dataSource={confirmados.feirantes}
                    rowKey={row => row.feirante.cpf}
                >
                    <Column
                        title="Nome"
                        dataIndex="feirante.nome"
                    />
                    <Column
                        title="Data e hora da confirmação"
                        dataIndex="horaConfirmacao"
                        render={data => moment(data, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [às] HH:mm:ss')}
                    />
                </Table>
            </ContentComponent>
        );
    }

}
