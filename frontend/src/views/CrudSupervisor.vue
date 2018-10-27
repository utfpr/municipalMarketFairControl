<template>
  <div class="container">
    <div class="btn-container">
      <a-button type="primary" icon="plus" size="large" @click="showModal">Adicionar</a-button>
    </div>
    <a-table :dataSource="data" :columns="columns" bordered>
      <template slot="actions" slot-scope="text, record, index">
        <a-row>
          <a-col :span="12">
            <a-button type="dashed" icon="profile">Visualizar</a-button>
          </a-col>
          <a-col>
            <a-button type="dashed" icon="edit">Atualizar</a-button>
          </a-col>
        </a-row>

      </template>
    </a-table>

    <a-modal title="Supervisor" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk" :visible="this.visible">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">

        <a-row>
          <a-col :span="8">
            <a-form-item fieldDecoratorId="cpf" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!' }, {validator: (rule, value, cb) => cb(this.validarCpf(value)), }]}">
              <a-input placeholder="CPF" v-model="cpf" v-mask="['###.###.###-##']">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="14" :offset="2">
            <a-form-item>
              <a-input placeholder="Nome">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="11">
            <a-form-item>
              <a-input placeholder="Senha" :type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" @click="clickMostrarSenha" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" :offset="4">
            <a-form-item>
              <a-checkbox>Administrador</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import * as supervisorAPI from '@/api/supervisor';
import { mask } from 'vue-the-mask'
import CPF, { validate, strip } from 'cpf-check';

const columns = [
  { title: 'CPF', dataIndex: 'cpf' },
  { title: 'Nome', dataIndex: 'nome' },
  { title: 'Permissão', dataIndex: 'permissao' },
  { title: 'Ações', scopedSlots: { customRender: 'actions' }, width: '25%' }
];

export default {
  directives: { mask },
  components: {},
  data() {
    return {
      columns,
      data: [],
      visible: false,

      cpf: '',

      mostrarSenha: false
    }
  },

  async created() {
    this.data = await supervisorAPI.get();
  },

  methods: {

    showModal() {
      this.visible = true;
    },

    onCancel() {
      this.visible = false;
    },

    onOk() {
      this.form.validateFields((err, values) => {

        console.log('Received values of form: ', values)

      })
      //this.visible = false;
    },

    clickMostrarSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    },

    validarCpf(value) {
      console.log(value,validate(value))
      return value !== undefined && validate(strip(value)).valid;
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

.anticon-eye {
  cursor: pointer;
}
</style>

