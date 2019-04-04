import React, { PureComponent } from 'react';
import ContentComponent from '../../components/ContentComponent';

import ModalComponent from '../../components/ModalComponent';

export default class MapeamentoScreen extends PureComponent {

    state = {};

    render() {
        return (
            <ContentComponent
                title="Mapeamento"
            >
                <h1>Componente Mapeamento</h1>
                <ModalComponent titulo="Modal Mapeamento">
                    Hello 1
                </ModalComponent>
            </ContentComponent>
        );
    }

}
