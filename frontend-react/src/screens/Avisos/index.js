import React, { PureComponent, Fragment } from 'react';

import { 
    Button, Popconfirm, Modal,
    Tag, Divider,
} from 'antd';

import AvisosForm from './AvisosForm';
import ContentComponent from '../../components/ContentComponent';
import TabelaComponent from '../../components/TabelaComponent';
import * as avisosAPI from '../../api/aviso';

/* Campos no BD
id
assunto
texto*/

export default class AvisosScreen extends PureComponent {

    state = {
        avisos: [],
        visible: false,
        loading: true,
        selectedAviso: {},
    };

    componentDidMount() {
        this._loadAvisos();
    }
    
    _loadAvisos = async () => {
        this.setState({ loading: true });
        const avisos = await avisosAPI.get();
        this.setState({ avisos, loading: false });
    }

    _onDeleteAviso = async id => {
        await avisosAPI.del(id)
            .then(() => {
                this._loadAvisos();
            });
    }

    showModal = aviso => {
        this.setState({
            visible: true,
            selectedAviso: aviso,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            selectedAviso: {},
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedAviso: {},
        });
    }

    _renderModal = () => {
        const { visible, selectedAviso } = this.state;

        if (!visible) return null;

        return (
            <Modal
                title={ selectedAviso && selectedAviso.id
                    ? `#${selectedAviso.id} - ${selectedAviso.assunto}`
                    : 'Adicionar uma novo aviso'
                }
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <AvisosForm 
                        aviso={selectedAviso}
                        onSuccess={this.handleOk}
                        refresh={this._loadAvisos}
                    />
                    
            </Modal>
        );
    }

    render() {
        const { avisos, loading } = this.state;

        const colunas = [
            {
                key: 'id',
                dataIndex: 'id',
                title: '#',
                width: 60,
            },
            {
                key: 'assunto',
                dataIndex: 'assunto',
                title: 'Assunto',
            },
            {
                key: 'texto',
                dataIndex: 'texto',
                title: 'Texto',
                width: 70,
                
            },
            {
                key: 'acoes',
                title: 'Ações',
                render: linha => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={() => this.showModal(linha)}>
                            Detalhes
                        </Button>
                        <Popconfirm
                            title="Você quer relamente deletar esta aviso?"
                            okText="Sim"
                            cancelText="Não"
                            onConfirm={() => this._onDeleteAviso(linha.id)}
                        >
                            <Button shape="circle" icon="delete" type="danger" />
                        </Popconfirm>
                    </div>
                ),
                width: 160,
            },
        ];

        return (
            <Fragment>
                <ContentComponent
                    buttonProps={{
                        text: 'Adicionar',
                        onClick: this.showModal,
                        type: 'primary',
                        icon: 'plus',
                    }}
                    title="Avisos"
                >
                    <TabelaComponent
                        linhas={avisos} 
                        colunas={colunas}
                        size="small"
                        loading={loading}
                        pagination={{
                            pageSize: 15,
                        }}
                    />
                    { this._renderModal() }
                </ContentComponent>
            </Fragment>
           
        );
    }

}



/*import React, { PureComponent } from 'react';
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

} */
