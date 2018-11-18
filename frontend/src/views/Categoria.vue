<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 30px' }">
        <div :style="{ padding: '24px', background: '#fff'}">
          <div :style="{ padding: '5px' }">
            <a-collapse v-if="data">
              <a-collapse-panel v-for="(obj, index) in data" :header="obj.nome" :key="index">
                <p>{{}}</p>
              </a-collapse-panel>
            </a-collapse>
            <div style="text-align: right; margin-top:20px ">
              <a-form layout='inline' :autoFormCreate="(form)=>{this.form = form}">
                <div>
                  <a-col :span='12'>
                    <a-form-item
                      label='Nome'
                      fieldDecoratorId="nome"
                      :fieldDecoratorOptions="{rules: [{ required: true,
                      message: 'Por favor, insira o nome' }]}"
                    >
                      <a-input placeholder='Por favor, insira o nome' />
                    </a-form-item>
                  </a-col>
                  <a-col :span='3'>
                    <a-form-item fieldDecoratorId="needcpnj">
                      <a-checkbox :checked="checkNeedCnpj"
                        @change="handleChange"
                      >
                        Requer CNPJ
                      </a-checkbox>
                    </a-form-item>
                  </a-col>
                  <a-col :span='2'>
                    <a-form-item>
                      <a-button @click="this.onOk" type="primary">Adicionar</a-button>
                    </a-form-item>
                  </a-col>
                </div>
              </a-form>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import * as categoriaAPI from '@/api/categoria';

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
      data: [],
      visible: false,
      confirmLoading: false,
      ModalText: '',
      checkNeedCnpj: false,
      formItemLayout,
      formTailLayout,
      text: '',
    };
  },

  async created() {
    this.data = await categoriaAPI.get()
  },

  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    onOk() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await categoriaAPI.post(values.nome, values.needcpnj);
        }
        this.data = await categoriaAPI.get();
      });
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

