<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout>
      <div style="text-align: left; margin:20px 0px 0px 20px;">
        <a-form layout='inline' :autoFormCreate="(form)=>{this.form = form}">
          <div>
            <a-form-item
                label='Nome'
                fieldDecoratorId="nome"
                :fieldDecoratorOptions="{rules: [{ required: true,
                message: 'Por favor, insira o nome' }]}"
              >
              <a-input placeholder='Por favor, insira o nome' />
            </a-form-item>
            <a-form-item fieldDecoratorId="needcpnj">
              <a-checkbox :checked="checkNeedCnpj"
                @change="handleChange"
              >
              Requer CNPJ
              </a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-button @click="this.onOk" type="primary">Adicionar</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
      <a-layout-content :style="{ margin: '24px 16px 30px', height: '140px', width: '500'}">
        <div :style="{ padding: '24px', background: '#fff'}">
          <div :style="{ padding: '5px' }">
            <a-collapse v-if="categorias">
              <a-collapse-panel v-for="(obj, index) in categorias" :key="index">
                <template slot="header">
                  {{obj.nome}}
                  <a-button
                    v-on:click="onDelete(obj.id)"
                    style="float: right"
                    type="danger"
                    icon="delete"
                    v-on:click.stop="doThis">
                      <a-popconfirm title="Deseja realmente excluir?"
                      @confirm="confirm"
                      @cancel="cancel" okText="Yes" cancelText="No">
                        <a href="#">A</a>
                      </a-popconfirm>
                  </a-button>
                  <a-button
                    v-on:click="showModal()"
                    v-on:click.stop
                    style="float: right"
                    type="dashed"
                    icon="edit">
                  </a-button>
                </template>
                <p>Sub Categorias</p>
                <a-form>
                  <a-form-item
                    label='Nome'
                    fieldDecoratorId="nome"
                    :fieldDecoratorOptions="{rules: [{ required: true,
                    message: 'Por favor, insira o nome' }]}"
                  >
                    <a-input placeholder='Por favor, insira o nome' />
                  </a-form-item>
                </a-form>
              </a-collapse-panel>
            </a-collapse>
            <a-modal title="Categoria" okText="Adicionar"
              cancelText="Cancelar"
              @cancel="this.onCancel"
              @ok="this.onEdit(record.id)"
              :visible="this.visible">
              <a-form>
                <a-form-item
                  label='Nome'
                  fieldDecoratorId="nomeedit"
                  :fieldDecoratorOptions="{rules: [{ required: true,
                  message: 'Por favor, insira o nome' }]}"
                >
                  <a-input placeholder='Por favor, insira o nome' />
                </a-form-item>
                <a-form-item fieldDecoratorId="needcpnjedit">
                  <a-checkbox :checked="checkNeedCnpj"
                  @change="handleChange"
                  >
                  Requer CNPJ
                  </a-checkbox>
                </a-form-item>
              </a-form>
              <template slot="footer">
                <a-button @click="this.onCancel">Cancelar</a-button>
                <a-button @click="this.onEdit">Editar</a-button>
              </template>
            </a-modal>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import * as categoriaAPI from '@/api/categoria';
/* eslint-disable */
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
  data() {
    return {
      categorias: [],
      visible: false,
      confirmLoading: false,
      ModalText: '',
      checkNeedCnpj: false,
      checkNeedCnpjEdit: false,
      formItemLayout,
      formTailLayout,
      text: '',
    };
  },

  async created() {
    this.categorias = await categoriaAPI.get();
    // this.categorias.forEach(cat => {
    //   categoriaAPI.getSub(cat.id, (res) => {
    //     cat.subcategorias = res;
    //   });
    // });
  },

  methods: {
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },

    onCancel() {
      this.visible = false;
    },
    onOk() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await categoriaAPI.post(values.nome, values.needcpnj);
          this.form.resetFields();
          this.checkNeedCnpj = false;
        }
        this.categorias = await categoriaAPI.get();
      });
    },

    async onEdit(id) {
            console.log('asdsadsadas');
      this.form.validateFields(async (err, values) => {
        if(!err) {
          console.log(id);
          await categoriaAPI.put(id, values.nomeedit, values.checkNeedCnpjEdit);
          this.form.resetFields();
        }
        this.categorias = await categoriaAPI.get();
      });
    },

    async onDelete(id) {
      await categoriaAPI.del(id);
      console.log('atualizando');
      this.categorias = await categoriaAPI.get();
    },

    handleChange(e) {
      this.checkNeedCnpj = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nome'], { force: true });
      });
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.borda {
  border: 1px solid black;
}
</style>

