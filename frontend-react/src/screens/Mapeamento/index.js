import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

import { SVGMap } from 'react-svg-map';
import Map from './Mapa';
import * as participaAPI from '../../api/participa';

import 'react-svg-map/lib/index.css';

export default class MapeamentoScreen extends PureComponent {

    state = {
        confirmados: [],
    };


    componentDidMount() {
        this._getConfirmados();
    }

    _getConfirmados = async () => {
        const confirmados = await participaAPI.getConfirmados();
        this.setState({confirmados});
    }

    _onClick = event => {
        console.log(event.target.id);
    }

    render() {
        return (
            <ContentComponent
                title="Mapeamento"
            >
                <div style={{ height: 100, width: 100 }}>
                    <SVGMap map={Map} onLocationClick={this._onClick} />
                </div>
            </ContentComponent>
        );
    }

}
