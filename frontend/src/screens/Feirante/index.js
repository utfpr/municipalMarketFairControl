import React, { PureComponent, Fragment } from 'react';
import { 
    Button, Modal,
    Tag, Table,
    Select,
} from 'antd';

import ContentComponent from '../../components/ContentComponent';
import TabelaComponent from '../../components/TabelaComponent';
import FeirantesForm from './FeirantesForm';
import * as feirantesAPI from '../../api/feirante';
import EmptyComponent from '../../components/EmptyComponent';


const { Column } = Table;
const Option = Select.Option;

export default class FeiranteScreen extends PureComponent {

    state = {
        feirantes: [],
        visible: false,
        loading: true,
        selectedFeirante: {},
    };

    componentDidMount() {
        this._loadFeirantes();
    }

    _loadFeirantes = async () => {
        this.setState({ loading: true });
        const feirantes = await feirantesAPI.get();
        this.setState({ feirantes, loading: false });
    }
    
    _onDeleteFeirante = async cpf => {
        await feirantesAPI.del(cpf)
            .then(() => {
                this._loadFeirantes();
            });
    }

    showModal = feirante => {
        this.setState({
            visible: true,
            selectedFeirante: feirante,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            selectedFeirante: {},
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedFeirante: {},
        });
    }

    _renderModal = () => {
        const { visible, selectedFeirante} = this.state;

        return (
            <Modal
                title={ selectedFeirante && selectedFeirante.cpf
                    ? `${selectedFeirante.nome} - ${selectedFeirante.nome_fantasia}`
                    : 'Cadastrar um novo feirante'
                }
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                destroyOnClose
                maskClosable={false}
                >
                    <FeirantesForm 
                        feirante={selectedFeirante}
                        onSuccess={this.handleOk}
                        refresh={this._loadFeirantes}
                    />
                    {
                       /* selectedFeirante && selectedFeirante.cpf
                            ? (
                                <Fragment>
                                    <Divider>
                                        Subcategorias
                                    </Divider>
                                    <Subcategorias categoria={selectedCategoria} />
                                </Fragment>
                            ) : null
                            */
                    }
            </Modal>
        );
    }

/* atrubutos :
  cpf,
  cnpj,
  nome,
  rg, 
  usa_ee,
  nome_fantasia,
  razao_social,
  comprimento_barraca,
  largura_barraca,
  endereco,
  voltagem_ee,
  sub_categoria_id,
  */

  // TABELA SÓ COM AS INFORMAÇÕES BÁSICA, CLICAR NUMA MODAL ABRE O RESTO DAS INFORMAÇÕES !
    render() {
        const { feirantes, loading } = this.state;

        return (
            <Fragment>
                <ContentComponent
                    buttonProps={{
                        text: 'Adicionar',
                        onClick: this.showModal,
                        type: 'primary',
                        icon: 'plus',
                    }}
                    title="Feirantes"
                >
                    <Table
                        dataSource={feirantes} 
                        size="small"
                        loading={loading}
                        pagination={{
                            pageSize: 15,
                        }}
                        locale={{
                            emptyText: <EmptyComponent onButtonClick={this.showModal} />
                        }}
                    >
                        <Column
                            key='nome'
                            dataIndex='nome'
                            title='Nome'
                        />
                        <Column
                            key='nome_fantasia'
                            dataIndex='nome_fantasia'
                            title='Nome Fantasia'
                        />
                        <Column
                            key='cpf'
                            dataIndex='cpf'
                            title='CPF'
                            width={120}
                        />
                        
                        <Column
                            key='rg'
                            dataIndex='rg'
                            title='RG'
                            width={100}
                        />
                        <Column
                            key='cnpj' 
                            dataIndex='cnpj'
                            title='CNPJ'
                            width={180}
                            render={(cnpj) => {
                                return cnpj
                                ? cnpj
                                : <Tag color='#f50'>Não usa</Tag>
                            }}
                        />
                        <Column
                            key='usa_ee'
                            dataIndex='usa_ee'
                            title='Voltagem'
                            width={70}
                            render={(usa_ee, linha) => {
                                return usa_ee
                                ? <Tag color={linha.voltagem_ee === 110 ? '#87d068' : '#1abc9c'}>{linha.voltagem_ee}v</Tag>
                                : <Tag color="#f50">Não</Tag>
                            }}
                        />
                        <Column
                            key='acoes'
                            title='Ações'
                            width={160}
                            render={ linha => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button 
                                        type="primary" 
                                        onClick={() => this.showModal(linha)}
                                    >
                                        Detalhes
                                    </Button>
                                    
                                    
                                </div>
                            )}
                        />
                    </Table>

                    { this._renderModal() }
                </ContentComponent>
            </Fragment>
           
        );
    }
}
