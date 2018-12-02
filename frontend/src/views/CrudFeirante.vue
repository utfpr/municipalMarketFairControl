<!-- eslint-disable -->

<template>
  <div class="container">
    <div class="btn-container">
      <a-button type="primary" icon ="plus" size ="large" @click="showModal('', 'add')">Adicionar</a-button>
      <a-button type="danger" icon ="close" size ="large" :disabled="!selecionado" @click="this.onDelete">Remover</a-button>
    </div>
    
    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" bordered>
      <template slot="actions" slot-scope="text, record, index">
        <a-row>
          <a-col :span="12">
            <a-button type="dashed" icon="profile" @click="showModal(record, 'view')">Visualizar</a-button>
          </a-col>
          <a-col>
            <a-button type="dashed" icon="edit" @click="showModal(record, 'edit')">Atualizar</a-button>
          </a-col>
        </a-row>
      </template>
    </a-table>

    <a-modal title="Feirante" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk" :visible="this.visible">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">
        <p v-if="this.action === 'add'" style="font-size: 15px color: black"><span style="color: red">*</span> Campo Obrigatório</p>
        <!-- CPF, RG -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="CPF:" fieldDecoratorId="cpf" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!'}, {validator: this.checkCpf, }]}">
              <a-input placeholder="CPF" v-mask="['###.###.###-##']" :disabled="this.action !== 'add'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="RG:" fieldDecoratorId="rg" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um RG válido!'}]}">
              <a-input placeholder="RG" v-mask="['##.###.###-#']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Nome -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Nome:" fieldDecoratorId="nome" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um nome!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Pessoa Física">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Categoria, Subcategoria -->
        <a-row>
          <a-col :span="11" :offset="0" v-if="this.action === 'add'">
            <a-form-item label="Categoria de venda:" fieldDecoratorId="categoria" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Escolha um ramo!'},]}">
              <a-select
                showSearch
                placeholder="Categoria de venda"
                :disabled="this.action === 'view'"
                optionFilterProp="children"
                style="width: 200px"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :filterOption="filterOption"
              >
                <a-select-option @click="setCategoria('1') " value="Alimentos">Alimentos</a-select-option>
                <a-select-option @click="setCategoria('0')" value="Artesanato">Artesanato</a-select-option>
                <a-select-option @click="setCategoria('0')" value="Materiais de Construção">Materiais de Construção</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2" v-if="this.action === 'add'">
            <a-form-item label="Subcategoria de venda:" fieldDecoratorId="sub_categoria_id" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Escolha um ramo!'},]}">
              <a-select
                showSearch
                placeholder="subcategoria de venda"
                :disabled="this.action === 'view'"
                optionFilterProp="children"
                style="width: 200px"
                @focus="handleFocus"
                @-blur="handleBlur"
                @change="handleChange"
                :filterOption="filterOption"
              >
                <a-select-option @click="setCategoria('1')" value="Tijolo">Tijolo</a-select-option>
                <a-select-option @click="setCategoria('0')" value="Cimento">Cimento</a-select-option>
                <a-select-option @click="setCategoria('0')" value="Ternite">Ternite</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Razão Social -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Razão Social:" fieldDecoratorId="razao_social" :fieldDecoratorOptions="{rules: [{ required: this.selectCategoria === '1', message: 'Digite uma razão social!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Razão Social">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Nome Fantasia -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Nome Fantasia:" fieldDecoratorId="nome_fantasia" :fieldDecoratorOptions="{rules: [{ required: this.selectCategoria === '1', message: 'Digite um nome fantasia!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Nome Fantasia">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- CNPJ, Senha -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="CNPJ:" fieldDecoratorId="cnpj" :fieldDecoratorOptions="{rules: [{ required: this.selectCategoria === '1', message: 'Digite um CNPJ válido!'}]}">
              <a-input placeholder="CNPJ" v-mask="['##.###.##/####-##']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Senha:" fieldDecoratorId="senha" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Mínimo 6 caracteres!', min: 6},]}">
              <a-input placeholder="Senha" :disabled="this.action === 'view'" :type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" @click="clickMostrarSenha" v-if="this.action !== 'view'"/>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- CEP, Cidade -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="CEP:" fieldDecoratorId="cep" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CEP!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="CEP">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Cidade:" fieldDecoratorId="cidade" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite uma cidade!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Cidade">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- UF, Bairro -->
        <a-row>
          <a-col :span="4" :offset="0">
            <a-form-item label="UF:" fieldDecoratorId="uf" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite uma UF!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="UF">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="18" :offset="2">
            <a-form-item label="Bairro:" fieldDecoratorId="bairro" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um bairro!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="bairro">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Logradouro, Numero -->
        <a-row>
          <a-col :span="18" :offset="0">
            <a-form-item label="Logradouro:" fieldDecoratorId="logradouro" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um logradouro!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Logradouro">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="2">
            <a-form-item label="Número:" fieldDecoratorId="numero" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um numero!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="N°">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Comprimento, Largura barraca -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="Comprimento da barraca:" fieldDecoratorId="comprimento_barraca" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite o comprimento!'},]}">
              <a-input v-mask="['#']" placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Largura da barraca:" fieldDecoratorId="largura_barraca" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite a largura!'},]}">
              <a-input v-mask="['#']" placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Energia Elétrica -->
        <a-row>
          <a-col :span="11" :offset="2" v-if="this.action !== 'view'" >
            <a-form-item label="Usa Energia Elétrica:" >
              <a-radio-group :defaultValue="0" name="radioGroup" fieldDecoratorId="usa_ee" :disabled="this.action === 'view'" >
                <a-radio :disabled="this.action === 'view'" :value="1" @click="setRadio('1')" >Sim</a-radio>
                <a-radio :disabled="this.action === 'view'" :value="0" @click="setRadio('0')" >Não</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="0">
            <a-form-item label="Voltagem:" fieldDecoratorId="voltagem_ee"  :fieldDecoratorOptions="{rules: [{ required: this.radio_ee === '1', message: 'Digite a voltagem!'},]}">
              <a-input :disabled="this.radio_ee == '0' || this.action === 'view'" placeholder="Voltagem" >
                <a-icon slot="prefix" type="poweroff" />
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

/* eslint-disable */

import * as feiranteAPI from '@/api/feirante';
import { mask } from 'vue-the-mask';
import CPF, { validate, strip } from 'cpf-check';

const columns = [
  { title: 'CPF', dataIndex: 'cpf', width: '15%' },
  { title: 'Nome', dataIndex: 'nome' },
  { title: 'Ramo', dataIndex: 'ramo' },
  { title: 'Ações', scopedSlots: { customRender: 'actions' }, width: '25%' }
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
      radio_ee: '0',
      selectCategoria: '0',
      token: null,
    };
  },

  async created() {
    if(localStorage.getItem('token') !== null)
      if(localStorage.getItem('tag') === 'feirante')
        this.$router.push({name: 'feirante'})
      else 
        this.token = localStorage.getItem('token');

    this.data = await feiranteAPI.get();
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

    setRadio(valor){
      this.radio_ee = valor;
    }, 

    setCategoria(valor){
      this.selectCategoria = valor;
    },

    showModal(record, action) {
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
            logradouro: record.endereco.logradouro,
            bairro: record.endereco.bairro,
            numero: record.endereco.numero,
            CEP: record.endereco.cep,
            voltagem_ee: record.voltagem_ee,
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
              values.cnpj,
              values.nome, 
              values.rg,
              values.usa_ee,
              values.nome_fantasia,
              values.razao_social,
              values.comprimento_barraca,
              values.largura_barraca,
              {
                logradouro: values.logradouro,
                bairro: values.bairro,
                numero: values.numero,
                CEP: values.cep
              },
              values.voltagem_ee,
              values.sub_categoria_id,
              values.senha,
              {headers: {token: this.token}}
            );
          } else if (this.action === 'edit') {
            await feiranteAPI.put(
              strip(values.cpf),
              values.cnpj,
              values.nome,
              values.rg,
              values.usa_ee, 
              values.nome_fantasia,
              values.razao_social,
              values.comprimento_barraca,
              values.largura_barraca,
              {
                logradouro: values.logradouro,
                bairro: values.bairro,
                numero: values.numero,
                CEP: values.cep
              },
              values.voltagem_ee,
              values.sub_categoria_id,
              {headers: {token: this.token}}
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
