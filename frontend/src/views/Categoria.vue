<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 30px' }">
        <div :style="{ padding: '24px', background: '#fff'}">
          <div :style="{ padding: '5px' }">
            <a-collapse>
              <a-collapse-panel header="This is panel header 1" key="1">
                <p>{{text}}</p>
              </a-collapse-panel>
            </a-collapse>
            <div style="text-align: right; margin-top:20px ">
              <a-form layout='inline' :autoFormCreate="(form)=>{this.form = form}">
                <div>
                  <a-col :span='12'>
                    <a-form-item
                      label='Nome'
                      fieldDecoratorId="username"
                      :fieldDecoratorOptions="{rules: [{ required: true,
                      message: 'Por favor, insira o nome' }]}"
                    >
                      <a-input placeholder='Por favor, insira o nome' />
                    </a-form-item>
                  </a-col>
                  <a-col :span='3'>
                    <a-form-item>
                      <a-checkbox
                        :checked="checkNick"
                        @change="handleChange"
                      >
                        Requer CNPJ
                      </a-checkbox>
                    </a-form-item>
                  </a-col>
                  <a-col :span='2'>
                    <a-form-item>
                      <a-button type="primary">Adicionar</a-button>
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
      visible: false,
      confirmLoading: false,
      ModalText: '',
      checkNick: false,
      formItemLayout,
      formTailLayout,
      text: '',
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = 'Aguarde';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    check() {
      this.form.validateFields((err) => {
        if (!err) {
          console.info('success');
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true });
      });
    },
    creteCategoria() {
      this.form.validateFields();
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

