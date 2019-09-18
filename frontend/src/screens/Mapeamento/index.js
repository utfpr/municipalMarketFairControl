import React, { Component } from 'react';
import ContentComponent from '../../components/ContentComponent';

import { Table, Modal, Tag } from 'antd';
import moment from 'moment-timezone';

import { SVGMap } from 'react-svg-map';
import Map from './Mapa';
import * as participaAPI from '../../api/participa';

import AlocacaoForm from './AlocacaoForm';

import 'react-svg-map/lib/index.css';

const { Column } = Table;

export default class MapeamentoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            confirmados: [],
            participa: [],
            loading: true,
            pointedLocation: null,
            selectedCelula: undefined,
            visible: false,
            celula: {},
			tooltipStyle: {
				display: 'none'
            },
            customMap: {
                ...Map,
            }
		};

        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
	}

    componentDidMount() {
        this._loadValues();
    }
    
    _getLocationName = (event) => {
        return this._findCelula(Number(event.target.id));
    }

    handleLocationMouseOver = (event) => {
        const pointedLocation = this._getLocationName(event);
		this.setState({ pointedLocation });
	}

	handleLocationMouseOut = () => {
		this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

	handleLocationMouseMove = (event) => {
		const tooltipStyle = {
			display: 'block',
			top: event.clientY + 25,
			left: event.clientX - 125
		};
		this.setState({ tooltipStyle });
    }

    _loadValues = async () => {
        await this._getConfirmados();
        await this._loadCelulas();
        this.setState({loading: false});
    }

    _loadCelulas = () => {
        const { confirmados, customMap, selectedCelula } = this.state;
        const newMap = {
            ...customMap,
            locations: customMap.locations.map((location, index) => {
                const feirantes = confirmados.feirantes 
                    ? confirmados.feirantes.filter(feirante => feirante.celulaId === index)
                    : [];
                const newLocation = {
                    ...location,
                    id: index,
                    key: index,
                    name: `Celula ${index}`,
                    feirantes,
                }

                return newLocation;
            })
        }
        
        this.setState({ customMap: newMap });
        
        if (selectedCelula) {
            this._refreshCelula();
        }
    }

    _getConfirmados = async () => {
        const confirmados = await participaAPI.getConfirmados();
        this.setState({confirmados});
    }

    _refreshCelula = () => {
        const { selectedCelula } = this.state;
        const celula = this._findCelula(selectedCelula);
        this.setState({celula});
    }

    _onClick = event => {
        const id = Number(event.target.id);
        this.setState({selectedCelula: id, visible: true}, this._refreshCelula);
    }

    _findCelula = id => {
        const { customMap } = this.state;
        return customMap.locations.find((location) => location.id === id);
    }

    _renderCelulaColor = (celulaDoMapa, index) => {
        
        const celula = this._findCelula(celulaDoMapa.id);
        if (!celula || !celula.feirantes || !celula.feirantes.length) return 'celulaMapa livre';
        if ((celula.feirantes.length === 1 && celula.feirantes[0].periodo === 3)
            || celula.feirantes.length === 2) 
            return 'celulaMapa diaTodo';
        return 'celulaMapa meioPeriodo';

    }

    _renderPeriodo = location => {
        const periodo = typeof location === "object" ? location.periodo : location;
        switch(periodo) {
            case 1:
                return 'Manhã';
            case 2:
                return 'Tarde';
            case 3:
                return 'Manhã e tarde';
            default:
                return null;
        }
    }

    handleCancel = () => {
        this.setState({celula: {}, selectedCelula: undefined, visible: false});
    }

    render() {
        const { 
            confirmados, loading, pointedLocation,
            visible, celula, customMap,
        } = this.state;

        return (
            <ContentComponent
                title="Mapeamento"
                loading={loading}
            >
                <div style={{ height: 'auto', width: '100%' }}>
                    <SVGMap
                        map={customMap}
                        onLocationClick={this._onClick}
                        locationClassName={this._renderCelulaColor}
                        onLocationMouseOver={this.handleLocationMouseOver}
                        onLocationMouseOut={this.handleLocationMouseOut}
                        onLocationMouseMove={this.handleLocationMouseMove}
                    />
                    <div className="map-tooltip" style={this.state.tooltipStyle}>
                        {
                            pointedLocation && pointedLocation.feirantes.length
                                ? pointedLocation.feirantes.map(location => <p key={location.feirante.cpf}>{location.feirante.nome} - {this._renderPeriodo(location)}</p>)
                                : 'Livre'
                        }
                    </div>
                </div>
                <h2>Feirantes confirmados</h2>
                <Table
                    dataSource={confirmados.feirantes}
                    rowKey={row => row.feirante.cpf}
                >
                    <Column
                        title="Nome"
                        dataIndex="feirante"
                        render={feirante => feirante.nomeFantasia || feirante.nome}
                    />
                    <Column
                        title="Sub Categoria"
                        dataIndex="sub_categoria.nome"
                    />
                    <Column
                        title="Periodo"
                        dataIndex="periodo"
                        render={this._renderPeriodo}
                    />
                    <Column
                        title="Data e hora da confirmação"
                        dataIndex="horaConfirmacao"
                        render={data => moment(data, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [às] HH:mm:ss')}
                    />
                    <Column
                        title="Alocado"
                        dataIndex="celulaId"
                        render={celula => celula !== null ? <Tag color="#87d068">Sim</Tag> : <Tag color="#f50">Não</Tag>}
                    />
                </Table>
                <Modal
                    title={`Alocar feirante na celula #${celula.id}`}
                    visible={visible}
                    onCancel={this.handleCancel}
                    width={600}
                    footer={null}
                    >
                        <AlocacaoForm 
                            celula={celula}
                            confirmados={ {...confirmados } }
                            loadCelulas={this._loadCelulas}
                            onSuccess={this.handleOk}
                            refresh={this._loadValues}
                        />
                </Modal>
            </ContentComponent>
        );
    }

}
