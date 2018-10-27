import { Form } from 'ant-design-vue';

export default Form.create({
  props: ['cpf', 'visible'], // must declare like vue `props` https://vuejs.org/v2/api/#props
  onFieldsChange(instance, changedFields) {
    instance.$emit('change', changedFields);
  },
  mapPropsToFields(props) {
    return {
      cpf: Form.createFormField({
        ...props.cpf,
        value: props.cpf.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})({
  render() {
    const { getFieldDecorator } = this.form;
    return (
      <a-modal
        title="Supervisor"
        okText="Adicionar"
        cancelText="Cancelar"
        // cancel="this.onCancel"
        // ok="this.onOk"
        // visible="this.visible"
      >
        <a-form layout="vertical" ref="form">
          {/* <a-form-item>
          <a-row>
            <a-col span="8">
              <a-input placeholder="CPF" v-model="cpf" v-mask="['###.###.###-##']">
                <a-icon slot="prefix" type="idcard" />
              </a-input>
            </a-col>
            <a-col span="14" offset="2">
              <a-input placeholder="Nome">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-col span="11">
              <a-input placeholder="Senha" type="this.mostrarSenha ? 'text' : 'password'">
                <a-icon slot="prefix" type="lock" />
                <a-icon slot="suffix" type="eye" click="clickMostrarSenha" />
              </a-input>
            </a-col>
            <a-col span="8" offset="4">
              <a-checkbox>Administrador</a-checkbox>
            </a-col>
          </a-row>
        </a-form-item> */}
        </a-form>
      </a-modal>
    );
  },
});
