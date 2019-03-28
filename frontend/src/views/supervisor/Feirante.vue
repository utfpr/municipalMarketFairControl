<!-- eslint-disable -->

<template>
  <div class="container">
    <div class="btn-container" style="text-align: right">
      <a-button type="primary" icon="plus" @click="showModal('', 'add')">Adicionar</a-button>
    </div>

    <a-table :dataSource="data" :columns="columns" bordered>
      <span slot="cpf" slot-scope="text, record">
        {{text}}
      </span>
      <span slot="ramo" slot-scope="text, record">
        {{showRamo(record.sub_categoria_id)}}
      </span>
      <template slot="actions" slot-scope="text, record, index">
        <a-row type="flex" justify="space-between">
          <!-- <a-col>
            <a-button type="dashed" icon="profile" @click="showModalView(record.cpf)"></a-button>
          </a-col> -->
          <a-col>
            <a-button type="dashed" icon="edit" @click="showModal(record.cpf, 'edit')"></a-button>
          </a-col>
          <a-col>
            <a-popconfirm placement="bottomRight" title="Deseja realmente remover este feirante?"
              @confirm="onDelete(record.cpf)" okText="Remover" cancelText="Cancelar">
              <a-button type="danger" icon="delete" @click="onDelete(record.cpf)"></a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </template>
      <p slot="expandedRowRender" @click="pegaDados(record)" slot-scope="record" style="margin: 0">
        <strong>RG:</strong> {{record.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4')}}<br />
        <strong>Nome:</strong> {{record.nome}}<br />
        <strong>Ramo:</strong> {{record.subCategoria.nome}}<br />
        <span v-if="String(record.nome_fantasia) !== '' ">
          <strong>Nome Fantasia:</strong> {{record.nome_fantasia}}<br />
        </span>
        <span v-if="String(record.razao_social) !== '' ">
          <strong>Razão Social:</strong> {{record.razao_social}}<br />
        </span>
        <span v-if="String(record.cnpj) !== '' ">
          <strong>CNPJ:</strong>
          {{String(record.cnpj).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')}}<br />
        </span>
        <strong>CEP:</strong> {{record.endereco.cep.replace(/(\d{2})(\d{3})(\d{1})/g, '$1.$2-$3')}}<br />
        <strong>Bairro:</strong> {{record.endereco.bairro}}<br />
        <strong>Logradouro:</strong> {{record.endereco.logradouro}}<br />
        <strong>Número:</strong> {{record.endereco.numero}}<br />
        <strong>Barraca:</strong> {{String(record.comprimento_barraca)}} x {{String(record.largura_barraca)}}<br />
        <span v-if="record.usa_ee">
          <strong>Voltagem:</strong> {{String(record.voltagem_ee).replace(/(\d{3})/g, '$1v')}}<br />
        </span>
      </p>
    </a-table>

    <a-modal title="Feirante" okText="Adicionar" cancelText="Cancelar" @cancel="this.onCancel" @ok="this.onOk"
      :visible="this.visible">
      <a-form :autoFormCreate="(form)=>{this.form = form}" layout="vertical" ref="form">
        <p v-if="this.action === 'add'" style="font-size: 15px color: black"><span style="color: red">*</span> Campo
          Obrigatório</p>
        <!-- CPF, RG -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="CPF:" fieldDecoratorId="cpf"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!'}, {validator: this.checkCpf, }]}">
              <a-input placeholder="CPF" v-mask="['###.###.###-##']" :disabled="this.action !== 'add'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="RG:" fieldDecoratorId="rg"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um RG válido!'}]}">
              <a-input placeholder="RG" v-mask="['##.###.###-#']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Nome -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Nome:" fieldDecoratorId="nome"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um nome!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Pessoa Física">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Categoria, Subcategoria -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="Categoria de venda:" fieldDecoratorId="categoria_venda"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Escolha um ramo!'},]}">
              <a-select showSearch placeholder="Categoria de venda" :disabled="this.action === 'view'"
                optionFilterProp="children" style="width: 200px" @focus="handleFocus" @blur="handleBlur"
                @change="handleCategoriaChange" :filterOption="filterOption">
                <a-select-option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                  {{categoria.nome}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Subcategoria de venda:" fieldDecoratorId="sub_categoria_id"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Escolha um ramo!'},]}">
              <a-select showSearch placeholder="Subcategoria de venda" :disabled="this.action === 'view'"
                optionFilterProp="children" style="width: 200px" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange" :filterOption="filterOption">
                <a-select-option @click="setCategoria(subcategoria.id)" v-for="subcategoria in this.subcategorias"
                  :key="subcategoria" :value="subcategoria.id">{{subcategoria.nome}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Razão Social -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Razão Social:" fieldDecoratorId="razao_social"
              :fieldDecoratorOptions="{rules: [{ required: false, message: 'Digite uma razão social!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Razão Social">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Nome Fantasia -->
        <a-row>
          <a-col :span="24" :offset="0">
            <a-form-item label="Nome Fantasia:" fieldDecoratorId="nome_fantasia"
              :fieldDecoratorOptions="{rules: [{ required: false, message: 'Digite um nome fantasia!', min: 1},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Nome Fantasia">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- CNPJ, Senha -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="CNPJ:" fieldDecoratorId="cnpj"
              :fieldDecoratorOptions="{rules: [{ required: false, message: 'Digite um CNPJ válido!'}]}">
              <a-input placeholder="CNPJ" v-mask="['##.###.###/####-##']" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Senha:" fieldDecoratorId="senha"
              :fieldDecoratorOptions="{rules: [{ required: this.action === 'add', message: 'Mínimo 6 caracteres!', min: 6},]}">
              <a-input placeholder="Senha" :disabled="!passChange" :type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" @click="clickMostrarSenha" v-if="this.action !== 'view'" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- CEP, Bairro -->
        <a-row>
          <a-col :span="11" :offset="0">
            <a-form-item label="CEP:" fieldDecoratorId="cep"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CEP!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="CEP" v-mask="['#####-###']">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Bairro:" fieldDecoratorId="bairro"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um bairro!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Bairro">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Logradouro, Numero -->
        <a-row>
          <a-col :span="18" :offset="0">
            <a-form-item label="Logradouro:" fieldDecoratorId="logradouro"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um logradouro!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="Logradouro">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="2">
            <a-form-item label="Número:" fieldDecoratorId="numero"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um numero!', min: 1,},]}">
              <a-input :disabled="this.action === 'view'" placeholder="N°">
                <a-icon slot="prefix" type="environment" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Comprimento, Largura barraca -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="Comprimento da barraca:" fieldDecoratorId="comprimento_barraca"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite o comprimento!'},]}">
              <a-input v-mask="['#']" placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="Largura da barraca:" fieldDecoratorId="largura_barraca"
              :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite a largura!'},]}">
              <a-input v-mask="['#']" placeholder="Metros" :disabled="this.action === 'view'">
                <a-icon slot="prefix" type="shop" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- Energia Elétrica -->
        <a-row>
          <a-col :span="11" :offset="2" v-if="this.action !== 'view'">
            <a-form-item label="Usa Energia Elétrica:">
              <a-radio-group :defaultValue="false" name="radioGroup" fieldDecoratorId="usa_ee"
                :disabled="this.action === 'view'">
                <a-radio :disabled="this.action === 'view'" :value="true" @click="setRadio(true)">Sim</a-radio>
                <a-radio :disabled="this.action === 'view'" :value="false" @click="setRadio(false)">Não</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="Tensão:" fieldDecoratorId="voltagem_ee"
              :fieldDecoratorOptions="{rules: [{ required: this.radio_ee, message: 'Escolha a tensão!'},]}">
              <a-select showSearch placeholder="Tensão" :disabled="!this.radio_ee || this.action === 'view'"
                optionFilterProp="children" style="width: 200px" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange" :filterOption="filterOption">
                <a-select-option value="110v">110v</a-select-option>
                <a-select-option value="220v">220v</a-select-option>
              </a-select>
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

  /* eslint-disable */

  import * as feiranteAPI from '@/api/feirante';
  import * as categoriaAPI from '@/api/categoria';
  import * as subcategoriaAPI from '@/api/subcategoria';


  import { mask } from 'vue-the-mask';
  import CPF, { validate, strip, format } from 'cpf-check';

  const columns = [
    { title: 'CPF', dataIndex: 'cpf', width: '15%', scopedSlots: { customRender: 'cpf' } },
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Nome Fantasia', dataIndex: 'nome_fantasia', scopedSlots: { customRender: 'nome_fantasia' } },
    { title: 'Ações', colSpan: 1, scopedSlots: { customRender: 'actions' }, width: '12%' }
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
        token: null,
        passChange: true,
        categorias: [],
        radio_ee: false,
        subcategorias: [],
        insertCategoria: 1,
      };
    },

    async created() {
      this.categorias = await categoriaAPI.get();
      this.data = await feiranteAPI.get();
      for (let i = 0; i < this.data.length; i += 1) {
        this.data[i].subCategoria = await subcategoriaAPI.getSubById(this.data[i].sub_categoria_id);
      }
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

      async pegaDados(record) {
        subcategoriaAPI.getSubById(record.sub_categoria_id).then(record => {
          this.sub_categoria_id = record.nome;
        });
      },

      handleChange(value) {
        console.log(`selected ${value}`);
      },

      async handleCategoriaChange(key) {
        this.subcategorias = await categoriaAPI.getSub(key);
      },

      async setCategoria(id) {
        this.insertCategoria = id;
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

      setRadio(valor) {
        if (valor == false)
          setTimeout(() => { this.form.setFieldsValue({ voltagem_ee: '' }) });

        this.radio_ee = valor;
      },

      async showRamo(value) {
        subcategoriaAPI.getSubById(value).then(record => {
          console.log(record.nome);
          return record.nome;
        });
      },

      cleanMask(value) {
        return value.replace(/[^\d.-]/g, '');
      },

      async showModal(cpf, action) {
        this.visible = true;
        this.action = action;
        setTimeout(() => {
          if (action === 'add') {
            this.form.resetFields();
            this.passChange = true;
          } else if (action === 'edit') {
            this.passChange = strip(cpf) === localStorage.getItem('userID') ? true : false;
            feiranteAPI.getByCpf(strip(cpf)).then(record => {
              subcategoriaAPI.getSubById(record.sub_categoria_id).then(record => {
                this.form.setFieldsValue({ sub_categoria_id: String(record.nome) });
                this.isertCategoria = record.id;
              });
              subcategoriaAPI.getCatBySub(record.sub_categoria_id).then(record => {
                this.form.setFieldsValue({ categoria_venda: String(record.nome) });
                categoriaAPI.getSub(record.id).then(record => {
                  this.subcategorias = record.action
                });
              });
              this.form.setFieldsValue({
                cpf: record.cpf,
                cnpj: record.cnpj,
                nome: record.nome,
                rg: record.rg,
                usa_ee: record.usa_ee,
                nome_fantasia: record.nome_fantasia,
                razao_social: record.razao_social,
                comprimento_barraca: record.comprimento_barraca,
                largura_barraca: record.largura_barraca,
                logradouro: record.endereco.logradouro,
                bairro: record.endereco.bairro,
                numero: String(record.endereco.numero),
                cep: record.cep,
                voltagem_ee: record.voltagem_ee,
              });
            })
          }
        }, 100);
      },

      onCancel() {
        this.form.resetFields();
        this.visible = false;
      },

      onOk() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            let cnpj = "";
            if (values.cnpj != null) {
              cnpj = values.cnpj.replace(/[.\/\-]/g, "");
            }
            const rg = values.rg.replace(/[.\/\-]/g, "");
            const cep = values.cep.replace(/[-]/g, "");
            if (this.action === 'add') {
              await feiranteAPI.post(
                strip(values.cpf),
                cnpj,
                values.nome,
                rg,
                this.radio_ee,
                values.nome_fantasia,
                values.razao_social,
                parseFloat(values.comprimento_barraca),
                parseFloat(values.largura_barraca),
                {
                  logradouro: values.logradouro,
                  bairro: values.bairro,
                  numero: parseInt(values.numero),
                  CEP: cep
                },
                parseInt(values.voltagem_ee),
                parseInt(values.sub_categoria_id),
                values.senha,
              );
            } else if (this.action === 'edit') {
              await feiranteAPI.put(
                strip(values.cpf),
                cnpj,
                values.nome,
                rg,
                this.radio_ee,
                values.nome_fantasia,
                values.razao_social,
                parseFloat(values.comprimento_barraca),
                parseFloat(values.largura_barraca),
                {
                  logradouro: values.logradouro,
                  bairro: values.bairro,
                  numero: parseInt(values.numero),
                  CEP: cep
                },
                parseInt(values.voltagem_ee),
                this.insertCategoria,
              );
            }
            this.data = await feiranteAPI.get();
            this.visible = false;
          }
        });
      },

      async onDelete(cpf) {

        console.log('removendo')
        await feiranteAPI.del(strip(cpf));

        console.log('atualizando')
        this.data = await feiranteAPI.get();
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