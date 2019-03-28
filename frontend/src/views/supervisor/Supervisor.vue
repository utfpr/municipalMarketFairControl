<template>
  <div class="container">
    <div class="btn-container" style="text-align: right">
      <a-button type="primary" icon="plus" size="medium" @click="showModal('', 'add')">Adicionar</a-button>
    </div>

    <a-table :dataSource="data" :columns="columns" bordered>
      <span slot="cpf" slot-scope="text, record">
        {{text}}
      </span>
      <span slot="permissao" slot-scope="text, record">
        <a-tag v-if="record.is_adm" color="blue">Administrador</a-tag>
        <a-tag v-else color="green">Supervisor</a-tag>
      </span>
      <template slot="actions" slot-scope="text, record, index">
        <a-row>
          <a-col :span="12">
            <a-button type="dashed" icon="edit" @click="showModal(record.cpf, 'edit')"></a-button>
          </a-col>
          <a-col>
            <a-popconfirm placement="bottomRight" title="Deseja realmente remover este supervisor?"
              @confirm="onDelete(record.cpf)" @cancel="" okText="Remover" cancelText="Cancelar">
              <a-button :disabled="record.root_adm !== 0" type="danger" icon="delete" @click="onDelete(record.cpf)">
              </a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </template>
    </a-table>

    <a-modal title="Supervisor" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk"
      :visible="this.visible">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">
        <a-row>
          <a-col :span="12">
            <a-form-item fieldDecoratorId="cpf"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!'}, {validator: this.checkCpf, }]}">
              <a-input placeholder="CPF" v-mask="['###.###.###-##']" :disabled="this.action !== 'add'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" :offset="2">
            <a-form-item fieldDecoratorId="isAdm" :checked="checkAdm"
              :fieldDecoratorOptions="{valuePropName: 'checked'}">
              <a-checkbox :disabled="this.action === 'view'">Administrador</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item fieldDecoratorId="nome"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um nome!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder=" Nome">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="11" :offset="1" v-if="this.action === 'add'"> -->
          <a-col :span="11" :offset="1">
            <a-form-item fieldDecoratorId="senha"
              :fieldDecoratorOptions="{rules: [{ required: passChange, message: 'Mínimo 6 caracteres!', min: 6},]}">
              <a-input placeholder="Senha" :disabled="!passChange" :type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" @click="clickMostrarSenha" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
      <template slot="footer">
        <a-button @click="this.onCancel">Cancelar</a-button>
        <a-button type="primary" v-if="this.action !== 'view'" @click="this.onOk">
          {{this.action === 'add' ? 'Adicionar' : 'Atualizar'}}</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>

  import * as supervisorAPI from '@/api/supervisor';
  import { mask } from 'vue-the-mask'
  import CPF, { validate, strip, format } from 'cpf-check';

  const columns = [
    { title: 'CPF', dataIndex: 'cpf', width: '15%', scopedSlots: { customRender: 'cpf' } },
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Permissão', dataIndex: 'permissao', scopedSlots: { customRender: 'permissao' }, width: '10%' },
    { title: 'Ações', colSpan: 1, scopedSlots: { customRender: 'actions' }, width: '12%' }
  ];

  export default {
    directives: { mask },
    components: {},
    data() {
      return {
        columns,
        data: [],
        visible: false,
        mostrarSenha: false,
        form: null,
        action: '',
        selectedRows: [],
        checkAdm: false,
        passChange: true,
      }
    },

    async created() {
      this.data = await supervisorAPI.get();
      console.log(this.data)
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

      showModal(cpf, action) {
        this.visible = true;
        this.action = action;

        setTimeout(() => {
          if (action === 'add') {
            this.form.resetFields();
            this.passChange = true;
          } else if (action === 'edit' || action === 'view') {
            this.passChange = strip(cpf) === localStorage.getItem('userID') ? true : false;
            supervisorAPI.getByCpf(strip(cpf)).then(record => {

              this.form.setFieldsValue({ cpf: record.cpf, nome: record.nome, isAdm: record.is_adm });
            })

          }
        }, 100);
      },

      onCancel() {
        this.visible = false;
      },

      onOk() {

        this.visible = false;
        this.form.validateFields(async (err, values) => {
          if (!err) {

            if (this.action === 'add') {
              await supervisorAPI.post(values.cpf, values.nome, values.senha, values.isAdm);
            } else if (this.action === 'edit') {
              await supervisorAPI.put(strip(values.cpf), values.nome, values.isAdm);
              if (!values.isAdm && !passChange) {
                localStorage.setItem('tag', 'supervisor');
                this.$router.push('/');
              }
            }
          }
          this.data = await supervisorAPI.get();
        })

      },

      async onDelete(cpf) {

        console.log('removendo')
        await supervisorAPI.del(strip(cpf));

        console.log('atualizando')
        this.data = await supervisorAPI.get();
      },

      clickMostrarSenha() {
        this.mostrarSenha = !this.mostrarSenha;
      },
      checkCpf(rule, value, callback) {
        let errors = [];
        if (value === undefined || !validate(strip(value)).valid) {
          errors.push('')
        }
        return callback(errors);
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
</style>