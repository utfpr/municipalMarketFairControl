import React, { PureComponent } from 'react';

import {
    Row, Form, Steps,
    Modal, Button, Radio,
} from 'antd';
import moment from 'moment-timezone';
import * as feiraAPI from '../../api/feira';
import classNames from 'classnames';

import ContentComponent from '../../components/ContentComponent';

import * as avisoAPI from '../../api/aviso';
import * as participaAPI from '../../api/participa';
import styles from './ConfirmacaoFeirante.module.scss';
import AvisoComponent from '../../components/AvisoComponent';

const { Step } = Steps;

class ConfirmacaoFeirante extends PureComponent {

    state = {
        avisos: [],
        feiraAtual: {},
        loading: true,
        visible: false,
        current: 0,
        selectedPeriodo: null,
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadValues();
    }

    _loadValues = async () => {
        this.setState({ loading: true });
        const avisos = await avisoAPI.getProximaFeira();
        const feiraAtual = await feiraAPI.feiraAtual();
        this.setState({ avisos, feiraAtual, loading: false });
    }

    _showModal = () => {
        this.setState({ visible: true });
    }

    _onChangePeriodo = event => {
        const { value } = event.target;
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

    _cancelaParticipacao = () => {
        return participaAPI.cancelaParticipacao()
            .then(() => {
                this.setState({ current: 0});
            }).catch(ex => {
                console.error(ex);
            });
    }

    _renderCurrentStep = () => {
        // const { current, feiraAtual } = this.state;
        const { current, feiraAtual = {}, selectedPeriodo } = this.state;

        if (current === 0) {
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                cursor: 'pointer',
            };
            return (
                <>
                    <h4 className={styles.alignCenter}>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para confirmar presença</h4>
                    <div className={classNames([styles.alignCenter, styles.presenca])}>
                        <Radio.Group
                            onChange={this._onChangePeriodo}
                            style={{ display: 'block' }}
                            value={selectedPeriodo}
                        >
                            <Radio style={radioStyle} value={1}>
                                Manhã
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                                Tarde
                            </Radio>
                            <Radio style={radioStyle} value={3}>
                                Dia Todo
                            </Radio>
                        </Radio.Group>

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
                    <h4 className={styles.alignCenter}>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para cancelar presença</h4>
                    <div  className={classNames([styles.alignCenter, styles.presenca])}>
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
            current, visible, step,
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