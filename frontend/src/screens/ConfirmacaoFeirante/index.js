import React, { PureComponent } from 'react';

import {
    Row, Form, Steps,
    Modal, Button,
    Select,
} from 'antd';
import moment from 'moment-timezone';
import * as feiraAPI from '../../api/feira';
import classNames from 'classnames';

import ContentComponent from '../../components/ContentComponent';

import * as avisoAPI from '../../api/aviso';
import * as participaAPI from '../../api/participa';
import styles from './ConfirmacaoFeirante.module.scss';
import AvisoComponent from '../../components/AvisoComponent';

import { SVGMap } from 'react-svg-map';
import Map from '../Mapeamento/Mapa';

const { Step } = Steps;
const Option = Select.Option;

class ConfirmacaoFeirante extends PureComponent {

    state = {
        avisos: [],
        feiraAtual: {},
        loading: true,
        visible: false,
        current: 0,
        selectedPeriodo: null,
        participacao: {},

        customMap: {
            ...Map,
        }
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadValues();
    }

    _loadValues = async () => {
        try {
            this.setState({ loading: true });
            const avisos = await avisoAPI.getAvisosProximaFeira();
            const feiraAtual = await feiraAPI.feiraAtual();
            this.setState({ avisos, feiraAtual: feiraAtual });
            await this._getUltimaFeira();
            this.setState({ loading: false });

        } catch (ex) {
            console.warn(ex);
            this.setState({ loading: false });
        }
    }

    _getUltimaFeira = async () => {
        const { feiraAtual } = this.state;
        const participacao = await participaAPI.getParticipacaoUltimaFeira();
        if (participacao.length) {
            let current = 0;
            const ultimaFeira = participacao[0];

            if (moment(feiraAtual.data).isSame(moment(ultimaFeira.data_feira))) {
                if (ultimaFeira.periodo && !ultimaFeira.celula_id) {
                    current = 1;
                } else if (ultimaFeira.periodo && ultimaFeira.celula_id) {
                    current = 2;
                }
            }
            
            this.setState({ participacao: participacao[0], current });
        }
    }

    _showModal = () => {
        this.setState({ visible: true });
    }

    _onChangePeriodo = value => {
        this.setState({ selectedPeriodo: value });
    }

    _hideModal = () => {
        this.setState({ visible: false });
    }

    _confirmaFeirante = () => {
        const { selectedPeriodo } = this.state;
        return participaAPI.setPeriodo(selectedPeriodo)
            .then(response => {
                this.setState({ current: 1, selectedPeriodo: null });
            }).catch(ex => {
                console.error(ex);
            });
    }

    _renderCelulaColor = (celulaDoMapa, index) => {
        const { participacao } = this.state;

        if (celulaDoMapa.id !== participacao.celula_id) return 'celulaMapa livre';
        return 'celulaMapa diaTodo';
    }

    _cancelaParticipacao = () => {
        return participaAPI.cancelaParticipacao()
            .then(() => {
                this.setState({ current: 0 });
            }).catch(ex => {
                console.error(ex);
            });
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

    _findCelula = id => {
        const { customMap } = this.state;
        return customMap.locations.find((location) => location.id === id);
    }

    _renderCurrentStep = () => {
        const { current, feiraAtual = {}, selectedPeriodo, customMap } = this.state;

        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }

        if (current === 0) {

            return (
                <>
                    <h4 className={styles.alignCenter}>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para confirmar presença</h4>
                    <div className={classNames([styles.alignCenter, styles.presenca])}>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Selecione o Periodo"
                            optionFilterProp="children"
                            onChange={this._onChangePeriodo}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value={1} >Manhã </Option>
                            <Option value={2}>Tarde</Option>
                            <Option value={3}>Dia Todo</Option>
                        </Select>

                        <Button
                            type="primary"
                            onClick={this._confirmaFeirante}
                            disabled={!selectedPeriodo}
                        >
                            Confirmar Presença
                        </Button>

                    </div>
                </>
            );
        }

        if (current === 1) {
            return (
                <>
                    <h4 className={styles.alignCenter}>Aguardando alocação e confirmação.</h4>
                    <div className={classNames([styles.alignCenter, styles.presenca])}>
                        <Button onClick={this._cancelaParticipacao} type="danger">Cancelar Presença</Button>

                    </div>
                </>
            );
        }

        if (current === 2) {
            return (
                <>
                    <div className={classNames([styles.alignCenter, styles.presenca])}>
                        <SVGMap
                            map={customMap}
                            onLocationClick={this._onClick}
                            locationClassName={this._renderCelulaColor}
                            onLocationMouseOver={this.handleLocationMouseOver}
                            onLocationMouseOut={this.handleLocationMouseOut}
                            onLocationMouseMove={this.handleLocationMouseMove}
                        />

                        <h4 className={styles.alignCenter}>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para cancelar presença</h4>
                        <Button onClick={this._cancelaParticipacao} type="danger">Cancelar Presença</Button>
                    </div>
                </>
            );
        }
    }

    _renderAvisos = () => {
        const { avisos } = this.state;

        return (
            <div className={styles.avisosContainer}>
                <h1>Avisos</h1>
                {
                    avisos.length
                        ? (
                            <Row gutter={24}>
                                {
                                    avisos.map(aviso => {
                                        return <AvisoComponent key={aviso.id} aviso={aviso} />;
                                    })
                                }
                            </Row>
                        ) : (
                            <p>Sem avisos para a próxima feira</p>
                        )
                }
            </div>
        );
    }

    _renderFotoEventoFeira = () => {
        const { feiraAtual } = this.state;

        const feiraEventoImagem = feiraAtual.evento_image_url;
        if (!feiraEventoImagem) return null;
        return (
            <div
                className={styles.eventoImage}
                onClick={this._showModal}
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_HOST}/image/${feiraEventoImagem})`
                }}
            />
        )
    }

    render() {
        const {
            loading, feiraAtual,
            current, visible,
        } = this.state;

        return (
            <ContentComponent
                loading={loading}
                title={`Próxima feira: ${moment(feiraAtual.data).format('DD/MM/YYYY')}`}
                limitedSize
            >
                {this._renderFotoEventoFeira()}
                {this._renderAvisos()}


                <Steps current={current}>
                    <Step title="Confirmar Presença" />
                    <Step title="Aguardando confirmação" />
                    <Step title="Presença Confirmada" />
                </Steps>

                {this._renderCurrentStep()}

                <Modal
                    visible={visible}
                    onCancel={this._hideModal}
                    footer={null}
                >
                    <img src={`${process.env.REACT_APP_HOST}/image/${feiraAtual.evento_image_url}`} alt="evento" />
                </Modal>
            </ContentComponent>
        );
    }

}

const WrappedHorizontalConfirmacaoFeiranteForm = Form.create({ name: 'feiras_form' })(ConfirmacaoFeirante);

export default WrappedHorizontalConfirmacaoFeiranteForm;