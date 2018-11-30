<template>
  <div class="container">
    <div class="btn-container" style="text-align: center">

      <a-select 
      placeholder="Selecione a data da feira"
      style="width: 45%"
      @change="handleFeiraChange">
        <a-select-option v-for="feira in this.feiras" :key="feira.data">{{parseData(feira.data)}}</a-select-option>
      </a-select>
      <!-- <a-select v-model="secondCity" style="width: 120px">
        <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
      </a-select> -->
    </div>
    <div>
      <h1>
        {{text}}
      </h1>
      

    </div>
    <div>
      <a-collapse v-if="this.date !== ''" accordion>
      <a-collapse-panel header="Feirantes que Participaram" key="1" :disabled="this.participaram.lenght === 0">

        <a-table :dataSource="participaram" :columns="columns" bordered>
          <span slot="cpf" slot-scope="text, record">
            {{text}}
          </span>
        </a-table>
      </a-collapse-panel>
      <a-collapse-panel header="Feirantes que não Participaram" key="2" :disabled="this.naoParticiparam.lenght === 0">
        <a-table :dataSource="naoParticiparam" :columns="nonColumns" bordered>
          <span slot="cpf" slot-scope="text, record">
            {{text}}
          </span>
        </a-table>
      </a-collapse-panel>
    </a-collapse>
    </div>
    <br>
    <br>
    <br>
  </div>
</template>

<script>

import * as relatorioAPI from '@/api/relatorio';

const columns = [
  // { title: 'CPF', dataIndex: 'cpf', width: '15%', scopedSlots: { customRender: 'cpf' } },
  { title: 'Nome', dataIndex: 'nome', colSpan: 1, width: '15%' },
  { title: 'Nome Fantasia', dataIndex: 'nomeFantasia', colSpan: 1,  scopedSlots: { customRender: 'permissao' }, width: '15%' },
  { title: 'Faturamento (R$)', dataIndex: 'faturamento', colSpan: 1, scopedSlots: { customRender: 'faturamento' }, width: '12%'}
];
const nonColumns = [
  // { title: 'CPF', dataIndex: 'cpf', width: '15%', scopedSlots: { customRender: 'cpf' } },
  { title: 'Nome', dataIndex: 'nome', colSpan: 1, width: '15%' },
  { title: 'Nome Fantasia', dataIndex: 'nomeFantasia', colSpan: 1,  scopedSlots: { customRender: 'permissao' }, width: '15%' },
  // { title: 'Faturamento (R$)', dataIndex: 'faturamento', colSpan: 1, scopedSlots: { customRender: 'faturamento' }, width: '12%'}
];

export default {
  data() {
    return {
      columns,
      nonColumns,
      feiras: [],
      participaram: [],
      naoParticiparam: [],
      faturamento: 0.0,
      text: '',
      date: '',
    }
  },

  async created () {
    this.feiras = await relatorioAPI.getFeiras();
    this.text = 'Selecione a data de uma feira'
  },
  methods: {
    async handleFeiraChange(value) {
      const { participaram, naoParticiparam } = await relatorioAPI.getParticipantes(value);
      participaram.forEach(element => {
        this.faturamento += element.faturamento;
        element.faturamento = `R$ ${element.faturamento}`;
      });
      this.text = `Faturamento total da feira: R$ ${this.faturamento}`;

      this.participaram = participaram;

      this.naoParticiparam = naoParticiparam;

      this.date = value;
    },
    parseData (data) {
      return `${data.split('-')[2]}-${data.split('-')[1]}-${data.split('-')[0]}`
    }
  }
}
</script>

<style scoped>
.container {
  padding: 15px;
}

.btn-container {
  margin-bottom: 15px;
}

.btn-container :nth-child(2) {
  margin-left: 10px;
}

.anticon-eye {
  cursor: pointer;
}
h1 {
    text-align: center;
    color: grey;
    /* font-family: verdana; */
    font-size: 300%;
}
</style>
