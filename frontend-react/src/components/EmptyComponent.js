import React, {PureComponent} from 'react';

import { Empty, Button } from 'antd';

export default class TabelaComponent extends PureComponent {

    state = {};

    render() {
        const { onButtonClick, ...other } = this.props;

        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                height: 60,
                }}
                description="Nenhum registro"
                {...other}
            >
                { onButtonClick 
                    ? (<Button type="primary" onClick={onButtonClick}>Adicionar</Button>)
                    : null
                }
            </Empty>
        );
    }

}

