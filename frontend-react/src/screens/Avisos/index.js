import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

export default class AvisosComponent extends PureComponent {

    state = {};

    render() {
        return (
            <ContentComponent
                title="Avisos"
            >
                <h1>Componente Avisos</h1>
            </ContentComponent>
        );
    }

}
