import React, { PureComponent, Fragment } from 'react';

import { 
    Row, Button, Form, Steps,
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

    _renderCurrentStep = () => {
        const { current } = this.state;

        if (current === 0) {
            return (
                <p>Teste 01</p>
            );
        }

        if(current === 1) {
            return (
                <p>Teste 02</p>
            )
        }

    }

    render() {
        const {
            loading, avisos, feiraAtual,
            current,
        } = this.state;

        return (
            <ContentComponent
                loading={loading}
                title={`Próxima feira: ${moment(feiraAtual.data).format('DD/MM/YYYY')}`}
            >
                <h3>Você tem até o dia {moment(feiraAtual.data_limite).format('DD/MM/YYYY [às] HH:mm')} para confirmar presença</h3>
                
                <div className={styles.avisosContainer}>
                    <h1>Avisos</h1>
                    <Row gutter={24}>
                        {
                            avisos.map(aviso=>{
                                return <AvisoComponent key={aviso.id} aviso={aviso} />
                            }) 
                        }
                    </Row>
                </div>
                
                <Steps current={current}>
                    <Step title="Confirmar Presença"/>
                    <Step title="Cancelar"/>
                </Steps>

                {this._renderCurrentStep()}

                {/* <div className={styles.alignCenter} >
                    <Button type="danger">Cancelar Feira</Button>
                </div> */}
            </ContentComponent>
        );
    }

}

const WrappedHorizontalConfirmacaoFeiranteForm = Form.create({ name: 'feiras_form' })(ConfirmacaoFeirante);

export default WrappedHorizontalConfirmacaoFeiranteForm;