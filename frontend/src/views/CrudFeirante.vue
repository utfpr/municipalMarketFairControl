<!-- eslint-disable -->

<template>
  <div class="container">
    <div class="btn-container">
      <a-button type="primary" icon ="user-add" size ="large" @click="showModal('', 'add')">Adicionar</a-button>
      <a-button type="danger" icon ="user-delete" size ="large" :disabled="!selecionado" @click="this.onDelete">Remover</a-button>
    </div>
    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" bordered>
      <a slot="nome" slot-scope="text" href="javascript:;">{{text}}</a>
      <template slot="operacao" slot-scope="text, record">
        <a-button type="dashed" icon ="solution" @click="showModal('', 'view')">Detalhes</a-button>
        <a-divider type="vertical" />
        <a-button type="dashed" icon ="edit" @click="showModal('', 'edit')">Editar</a-button>
      </template>
    </a-table>
    <a-modal title="Feirante" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk" :visible="this.visible">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">
        <!-- CPF, RG -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="CPF" fieldDecoratorId="cpf" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!'}, {validator: this.checkCpf, }]}">
              <a-input placeholder="CPF" v-mask="['###.###.###-##']" :disabled="this.action !== 'add'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="RG" fieldDecoratorId="rg" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um RG válido!'}]}">
              <a-input placeholder="RG" v-mask="['##.###.###-#']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Nome, CNPJ -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="Nome" fieldDecoratorId="nome" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um nome!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Nome">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="CNPJ" fieldDecoratorId="cnpj" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CNPJ válido!'}]}">
              <a-input placeholder="CNPJ" v-mask="['##.###.##/####-##']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Razao Social, Nome Fantasia -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="Razão Social" fieldDecoratorId="razao_social" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite uma razão social!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Razão Social">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Nome Fantasia" fieldDecoratorId="nome_fantasia" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um nome fantasia!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Nome Fantasia">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Subcategoria, Senha -->
        <a-row>
          <a-col :span="11" v-if="this.action === 'add'">
            <a-form-item label="Ramo de Venda" fieldDecoratorId="sub_categoria_id" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Escolha um ramo!'},]}">
              <a-select
                showSearch
                placeholder="Ramo de venda"
                :disabled="this.action === 'view'"
                optionFilterProp="children"
                style="width: 200px"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :filterOption="filterOption"
              >
                <a-select-option value="Alfaiate">Alfaiate</a-select-option>
                <a-select-option value="Bolos">Bolos</a-select-option>
                <a-select-option value="Frutas">Frutas</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2" v-if="this.action === 'add'">
            <a-form-item label="Senha" fieldDecoratorId="senha" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Mínimo 6 caracteres!', min: 6},]}">
              <a-input placeholder="Senha" :type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" @click="clickMostrarSenha" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Energia Eletrica, Voltagem -->
        <!-- <a-row>
          <a-col :span="9" :offset="2">
            <a-form-item label="Utiliza Energia Elétrica" fieldDecoratorId="usa_ee" :fieldDecoratorOptions="{valuePropName: 'checked'}">
              <a-checkbox @click="setCheckbox()" :disabled="this.action === 'view'"></a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Voltagem" fieldDecoratorId="voltagem_ee"  :fieldDecoratorOptions="{rules: [{ required: requiredVoltagem(), message: 'Digite a voltagem!'},]}">
              <a-input :disabled="this.check_ee == '0' || this.action === 'view'" placeholder="Voltagem" >
                <a-icon slot="prefix" type="poweroff" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row>
          <a-col :span="9" :offset="2">
            <a-form-item label="Usa Energia Elétrica" >
              <a-radio-group :defaultValue="0" name="radioGroup" fieldDecoratorId="usa_ee" :disabled="this.action === 'view'" >
                <a-radio :value="1" @click="setRadio('1')" >Sim</a-radio>
                <a-radio :value="0" @click="setRadio('0')" >Não</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Voltagem" fieldDecoratorId="voltagem_ee"  :fieldDecoratorOptions="{rules: [{ required: requiredVoltagemRadio(), message: 'Digite a voltagem!'},]}">
              <a-input :disabled="this.radio_ee == '0' || this.action === 'view'" placeholder="Voltagem" >
                <a-icon slot="prefix" type="poweroff" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Comprimento, Largura barraca -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="Comprimento da barraca" fieldDecoratorId="comprimento_barraca" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite o comprimento!'},]}">
              <a-input placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Largura da barraca" fieldDecoratorId="largura_barraca" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite a largura!'},]}">
              <a-input placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button @click="this.onCancel">Cancelar</a-button>
        <a-button type="primary" v-if="this.action !== 'view'" @click="this.onOk">{{this.action === 'add' ? 'Adicionar' : 'Atualizar'}}</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>

import * as feiranteAPI from '@/api/feirante';
import { mask } from 'vue-the-mask';
import CPF, { validate, strip } from 'cpf-check';

const columns = [
  { title: 'Nome', dataIndex: 'nome', width: '15%' },
  { title: 'Ramo', dataIndex: 'ramo' },
  { title: 'CPF', dataIndex: 'cpf' },
  { title: 'Ações', dataIndex: 'operacao', scopedSlots: { customRender: 'operacao' }, width: '25%' },
];

export default {
  directives: { mask },
  data() {
    return {
      columns,
      data: [],
      visible: false,
      mostrarSenha: false,
      form: null,
      action: '',
      selectedRows: [],
      check_ee: '0',
      radio_ee: '0'
    };
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },

    setCheckbox(){
      if(this.check_ee == '0'){
        this.check_ee = '1';
      }
      else if(this.check_ee == '1'){
        this.check_ee = '0';
      }
    },

    setRadio(valor){
      this.radio_ee = valor;
    },

    requiredVoltagem(){
      if(this.check_ee == '0'){
        return false;
      }
      else if(this.check_ee == '1'){
        return true;
      }
    },

    requiredVoltagemRadio(){
      if(this.radio_ee == '0'){
        return false;
      }
      else if(this.radio_ee == '1'){
        return true;
      }
    },

    showModal(record, action) {
      this.check_ee = '0';
      this.visible = true;
      this.action = action;
      setTimeout(() => {
        if (action === 'add') {
          this.form.resetFields();
        } else if (action === 'edit' || action === 'view') {
          this.form.setFieldsValue({ 
            cpf: record.cpf,
            rg: record.rg, 
            nome: record.nome, 
            cnpj: record.cnpj, 
            usa_ee: record.usa_ee, 
            nome_fantasia: record.nome_fantasia,
            razao_social: record.razao_social,
            comprimento_barraca: record.comprimento_barraca,
            largura_barraca: record.largura_barraca,
            voltagem_ee: record.voltagem_ee,
            status: record.status,
            sub_categoria_id: record.sub_categoria_id,
            senha: record.senha
          });
        }
      }, 100);
    },

    onCancel() {
      this.visible = false;
    },

    onOk() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.action === 'add') {
            await feiranteAPI.post(
              values.cpf,
              values.rg, 
              values.nome, 
              values.cnpj, 
              values.usa_ee, 
              values.nome_fantasia,
              values.razao_social,
              values.comprimento_barraca,
              values.largura_barraca,
              values.voltagem_ee,
              values.status,
              values.sub_categoria_id,
              values.senha
            );
          } else if (this.action === 'edit') {
            await supervisorAPI.put(
              strip(values.cpf),
              values.rg, 
              values.nome,
              values.cnpj, 
              values.usa_ee, 
              values.nome_fantasia,
              values.razao_social,
              values.comprimento_barraca,
              values.largura_barraca,
              values.voltagem_ee,
              values.status,
              values.sub_categoria_id
            );
          }
          this.data = await feiranteAPI.get();
          this.visible = false;
        }
      });
    },

    async onDelete() {
      for (let row of this.selectedRows) {
        console.log('removendo')
        await feiranteAPI.del(strip(row.cpf));
      }
      console.log('atualizando')
      this.data = await feiranteAPI.get();
    },

    clickMostrarSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    },

    checkCpf(rule, value, callback) {
      const errors = [];
      if (value === undefined || !validate(strip(value)).valid) {
        errors.push('');
      }
      return callback(errors);
    },

    inputVoltagem() {
      return (this.action === 'view' || this.form.usa_ee === false);
    },
  },

  computed: {
    selecionado() {
      return this.selectedRows.length > 0;
    },

    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows;
        },
      };
    },
  },

  async created() {
    this.data = await feiranteAPI.get();
  },
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
