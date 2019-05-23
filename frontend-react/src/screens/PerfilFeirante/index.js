import React, { PureComponent } from 'react';

import { 
    Form,
} from 'antd';

import * as feiranteAPI from '../../api/feirante';

import ContentComponent from '../../components/ContentComponent';
import WrappedHorizontalFeirantesForm from '../Feirante/FeirantesForm';

class PerfilFeirante extends PureComponent {

    state = {
        loading: true,
        feirante: {},
    };

    componentDidMount() {
        this._loadValues();
    }

    _loadValues = async () => {
        this.setState({loading: true});
        const cpf = localStorage.getItem('userID')
        const feirante = await feiranteAPI.getProfile(cpf);
        this.setState({ feirante, loading: false });
        console.log(feirante);
    }

    render() {
        const {
            loading, feirante,
        } = this.state;

        return (
            <ContentComponent
                loading={loading}
                title="Perfil"
                limitedSize
            >
                <WrappedHorizontalFeirantesForm readOnly feirante={feirante} />
            </ContentComponent>
        );
    }

}

const WrappedHorizontalPerfilFeiranteForm = Form.create({ name: 'feiras_form' })(PerfilFeirante);

export default WrappedHorizontalPerfilFeiranteForm;