import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

export default class FeiraScreen extends PureComponent {

    state = {};

    render() {
        return (
            <ContentComponent
                title="Feira"
            >
                <h1>Componente Feira</h1>
            </ContentComponent>
        );
    }

}
