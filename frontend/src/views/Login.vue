<template>
  <div class="">
    <a-row type="flex" justify="center">
      <a-col
        :xs="{ span: 0, offset: 0 }"
        :lg="{ span: 16, offset: 0 }"
        :md="{ span: 16, offset: 0 }"
      >
        <div class="gutter-left"></div>
      </a-col>
      <a-col
        :xs="{ span: 24, offset: 0 }"
        :lg="{ span: 8, offset: 0 }"
        :md="{ span: 8, offset: 0 }"
      >
        <div class="gutter-right">
          <div class="cabs">
            <h2 class="titulo">Entre na sua conta</h2>
          </div>
          <a-row :gutter="24">
            <a-col :span="21" :offset="2">
              <a-form
                layout='vertical'
                @submit="handleSubmit"
                :autoFormCreate="(form)=>{this.form = form}"
              >
                <template v-if="form">
                  <a-form-item
                    :validateStatus="userNameError() ? 'error' : ''"
                    :help="userNameError() || ''"
                    fieldDecoratorId="cpf"
                    :fieldDecoratorOptions="{
                      rules: [{ required: true, message: 'Por favor, insira seu CPF!' }]
                    }"
                    @change="onChangeText"
                  >
                    <a-input placeholder='CPF' size="large" v-mask="['###.###.###-##']">
                      <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                    </a-input>
                  </a-form-item>
                  <a-form-item
                    :validateStatus="passwordError() ? 'error' : ''"
                    :help="passwordError() || ''"
                    fieldDecoratorId="senha"
                    :fieldDecoratorOptions="{
                      rules: [{ required: true, message: 'Por favor, insira sua Senha!', min:6 }]
                    }"
                    @change="onChangeText"
                  >
                    <a-input type='password' placeholder='Senha' size="large" >
                      <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      type='primary'
                      block htmlType='submit'
                      class='login-form-button'
                      :disabled="hasErrors(form.getFieldsError())"
                    >
                      Entrar
                    </a-button>
                  </a-form-item>
                </template>
              </a-form>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from 'axios';
import { mask } from 'vue-the-mask';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: 'login',
  directives: { mask },
  data() {
    return {
      hasErrors,
      show: true,
      cpf: '',
      senha: '',
      form: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    onChangeText(e) {
      const newState = { ...this.state };
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      /*axios.post('https://www.feira.com/api/login', { 
        cpf, senha
      }).then(res => {
        $notification['success']({
          message: 'Bem Vindo! ',
          description: 'Login efetuado com sucesso!',
        });
      }).catch(ex => {
        $notification['error']({
          message: 'Erro',
          description: 'Erro: ' + ex,
        });
      });*/
    },
  },
};
</script>
<style>
.gutter-right {
  padding: 5px 0;
}
@media only screen and (min-device-width: 970px) {
  .gutter-right {
    margin-left: -80px;
    margin-right: 30px;
    height: 669px;
  }
}
.gutter-left {
  background-repeat: no-repeat;
  background-size: 800px 700px;
  background-image: url(../image/login.jpg);
  padding: 5px 0;
  height: 669px;
}
.titulo{
  text-align: center;
}
.cabs {
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #fff;
  background-color: rgb(255, 255, 255);
  border-bottom: 2px solid #e8e8e8;
  margin-bottom: 30px;
  margin-top: 22%;
  margin-left: 13px;
}

</style>
