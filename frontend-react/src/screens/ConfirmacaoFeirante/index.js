import React, { PureComponent } from 'react';

import { 
    Row, Form, Steps, Modal,
} from 'antd';
import moment from 'moment-timezone';

import ContentComponent from '../../components/ContentComponent';

import * as avisoAPI from '../../api/aviso';
import * as feiraAPI from '../../api/feira';
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
    };

    componentDidMount() {
        this.props.form.validateFields();
        this._loadValues();
    }

    _loadValues = async () => {
        this.setState({loading: true});
        const avisos = await avisoAPI.get();
        const feiraAtual = await feiraAPI.feiraAtual();
        this.setState({ avisos, feiraAtual, loading: false });
    }

    _showModal = () => {
        this.setState({visible: true});
    }

    _hideModal = () => {
        this.setState({visible: false});
    }

    _renderCurrentStep = () => {
        const { current, feiraAtual } = this.state;

        if (current === 0) {
            return (
                <h3>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para confirmar presença</h3>
            );
        }

        if(current === 1) {
            return (
                <p>Teste 02</p>
            )
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
                    <Step title="Confirmar Presença"/>
                    <Step title="Cancelar"/>
                </Steps>

                {this._renderCurrentStep()}

                {/* <div className={styles.alignCenter} >
                    <Button type="danger">Cancelar Feira</Button>
                </div> */}
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