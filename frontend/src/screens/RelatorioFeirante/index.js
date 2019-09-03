import React, { PureComponent } from "react";

import moment from "moment-timezone";
import { Table, Input, Button, Col, Row } from "antd";

import * as feiraAPI from "../../api/feira";
import * as relatorioAPI from "../../api/relatorio";
import ContentComponent from "../../components/ContentComponent";
import styles from "./RelatorioFeirante.module.scss";
import EmptyComponent from "../../components/EmptyComponent";
import {
  getParticipacaoUltimaFeira,
  getParticipacaoGeral
} from "../../api/participa";

const { Column } = Table;

export default class RelatorioFeirante extends PureComponent {
  state = {
    participantes: [],
    faturamentos: [],
    loading: true,
    dataFeira: "",
    presencas: []
  };

  componentDidMount() {
    this._loadValues();
    this._loadFat();
  }

  _loadFat = async () => {
    this.setState({ loading: true });
    try {
      // Chamar a rota de relatorios do
      await getParticipacaoGeral()
        .then(response => {
          this.setState({ faturamentos: response });
        })
        .catch(ex => console.warn(ex));
    } catch (ex) {
      console.warn(ex);
    }
    this.setState({ loading: false });
  };
  _loadValues = async () => {
    this.setState({ loading: true });
    try {
      // Chamar a rota de relatorios do
      await getParticipacaoUltimaFeira()
        .then(response => {
          const { data } = response;
          this.setState({ presencas: data });
        })
        .catch(ex => console.warn(ex));
    } catch (ex) {
      console.warn(ex);
    }
    this.setState({ loading: false });
  };
  _renderPeriodo = periodo => {
    if ((periodo = 1)) return "Manhã";
    if ((periodo = 2)) return "Tarde";
    return "Manhã e Tarde";
  };

  render() {
    const { faturamentos, loading } = this.state;

    return (
      <ContentComponent loading={loading} title="Relatórios">
        <Row gutter={10}>
          <Col span={4}>
            <div>
              <Input
                placeholder="Faturamento"
                formatter={value =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
              <div style={{ marginTop: 5 }}>
                <Button onClick={this.toggle} type="primary">
                  Adicionar
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Table
          dataSource={faturamentos}
          loading={loading}
          rowKey={item => item.data_feira}
          locale={{
            emptyText: <EmptyComponent />
          }}
        >
          <Column
            title="Data"
            dataIndex="data_feira"
            key="data"
            render={data => moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}
            width={90}
          />
          {/* <Column
            title="CPF"
            dataIndex="cpf_feirante"
            key="CPF"
            render={cpf_feirante =>
              cpf_feirante.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                "$1.$2.$3-$4"
              )
            }
            width={90}
          /> */}

          <Column
            title="Periodo"
            dataIndex="periodo"
            key="periodo"
            render={this._renderPeriodo}
            width={90}
          />

          <Column
            title="Faturamento"
            dataIndex="faturamento"
            key="faturamentoKey"
            render={faturamentoteste =>
              String(faturamentoteste).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            width={90}
          />
        </Table>
      </ContentComponent>
    );
  }
}
