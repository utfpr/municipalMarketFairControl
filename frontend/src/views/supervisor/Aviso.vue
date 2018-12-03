<template>
  <div class="container">
    <div class="btn-container" style="text-align: right">
      <a-button type="primary" icon="plus" size="medium" @click="showModal('', 'add')">Adicionar</a-button>
    </div>

    <a-table :dataSource="data" :columns="columns" bordered>
      <span slot="id" slot-scope="text, record">
        {{text}}
      </span>


      <!-- <span slot="permissao" slot-scope="text, record">
        <a-tag v-if="record.is_adm" color="blue">{{record}}</a-tag>
        <a-tag v-else color="green">Supervisor</a-tag>
      </span> -->
      <template slot="actions" slot-scope="text, record, index">
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-button type="dashed" icon="file" @click="showModal(record.id, 'view')"/>
          </a-col>
          <a-col>
            <a-button type="dashed" icon="edit" @click="showModal(record.id, 'edit')"/>
          </a-col>
          <a-col>
            <a-button type="danger" icon="delete" @click="onDelete(record.id)"/>
          </a-col>
        </a-row>
      </template>
    </a-table>

    <a-modal title="Avisos" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk" :visible="this.edit">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">
        <a-row>
          <a-form-item fieldDecoratorId="assunto" :fieldDecoratorOptions="{rules: [{ required: true, message: 'O assunto deve ser informado!', min: 1},]}">
            <a-input placeholder="Assunto do aviso" />
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item fieldDecoratorId="texto" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Conteúdo inválido!', min: 1, max: 1000},]}">
            <a-input type="textarea" rows="10" placeholder="Aviso a ser enviado para os feirantes" />
          </a-form-item>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button @click="this.onCancel">Cancelar</a-button>
        <a-button type="primary" v-if="this.action !== 'view'" @click="this.onOk">{{this.action === 'add' ? 'Adicionar' : 'Atualizar'}}</a-button>
      </template>
    </a-modal>
    <a-modal @title="this.viewer" @cancel="this.onCancel" :visible="this.view">
      <h1 span="2">Assunto</h1>
        <p>{{this.viewer.assunto}}</p>
      <h1>Informações</h1>
        <p>{{this.viewer.texto}}</p>
      <template slot="footer">
        <a-button @click="this.onCancel">Ok</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>

import * as avisoAPI from '@/api/aviso';

const columns = [
  // { title: 'CPF', dataIndex: 'cpf', width: '15%', scopedSlots: { customRender: 'cpf' } },
  { title: 'Assunto', dataIndex: 'assunto'},
  // { title: 'Permissão', dataIndex: 'permissao', scopedSlots: { customRender: 'permissao' }, width: '15%' },
  { title: 'Ações', colSpan: 1, scopedSlots: { customRender: 'actions' }, width: '16%'}
];

export default {
  directives: {},
  components: {},
  data() {
    return {
      columns,
      data: [],
      edit: false,
      view: false,
      viewer: {},
      mostrarSenha: false,
      form: null,
      action: '',
      selectedRows: [],
      avisoId: 0,
    }
  },

  async created() {
    this.data = await avisoAPI.get();
  },

  computed: {
    selecionado() {
      return this.selectedRows.length > 0
    },

    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows;
        },
      }
    }
  },

  methods: {

    showModal(id, action) {
      this.avisoId = id;
      this.action = action;
      setTimeout(() => {
        if (action === 'add') {
          this.edit = true;
          this.form.resetFields();
        } else if (action === 'edit') {
          this.edit = true;
          avisoAPI.getById(id).then(record => {
            this.form.setFieldsValue({assunto: record.assunto, texto: record.texto});
          });
        } else if (action === 'view') {
          avisoAPI.getById(id).then(record => {
            this.viewer = {assunto: record.assunto, texto: record.texto};
          });
          this.view = true;
        }
      }, 100);
    },

    onCancel() {
      this.edit = false;
      this.view = false;
    },

    onOk() {

      this.form.validateFields(async (err, values) => {
        if (!err) {

          if (this.action === 'add') {
            await avisoAPI.post(values.assunto, values.texto);
          } else if (this.action === 'edit') {
            await avisoAPI.put(this.avisoId, values.assunto, values.texto);
          }

          this.data = await avisoAPI.get();
          this.edit = false;
        }
      })

    },

    async onDelete(id) {

      console.log('removendo')
      await avisoAPI.del(id);

      console.log('atualizando')
      this.data = await avisoAPI.get();
    },

  }

};
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
</style>

