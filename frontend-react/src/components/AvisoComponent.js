import React, {PureComponent} from 'react';

import { Card, Col } from 'antd';

export default class AvisoComponent extends PureComponent {

    state = {};

    render() {
        const { aviso } = this.props;

        return (
            <Col lg={6} md={12} sm={24}>
                <Card title={aviso.assunto} bordered={false}>
                    <p>{aviso.texto}</p>
                </Card>
            </Col>
        );
    }

}