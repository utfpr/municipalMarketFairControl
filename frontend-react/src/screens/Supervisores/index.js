import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

export default class SupervisorScreen extends PureComponent {

    state = {};

    render() {
        return (
            <ContentComponent
                title="Supervisores"
            >
                <h1>Componente Supervisor</h1>
            </ContentComponent>
        );

    }

}
