import React, {PureComponent} from 'react';

import { Card, Col } from 'antd';

export default class AvisoComponent extends PureComponent {

    state = {};

    render() {
        const { aviso } = this.props;

        return (
            <Col sm={24} style={{marginBottom: 20 }}>
                <Card
                    title={aviso.assunto}
                    style={{
                        backgroundColor: '#fafafa', 
                    }}
                    bordered
                >
                    <p>{aviso.texto}</p>
                </Card>
            </Col>
        );
    }

}