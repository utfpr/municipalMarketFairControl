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
                :autoFormCreate="(form)=>{this.form = form}"
              >
                <template v-if="form">
                  <a-form-item
                    :validateStatus="userNameError() ? 'error' : ''"
                    :help="userNameError() || ''"
                    fieldDecoratorId="cpf"
                    :fieldDecoratorOptions="{
                      rules: [
                        { required: true, validator: this.checkCpf, message: 'Por favor, insira um CPF valido!'} 
                      ]
                    }"
                  >
                    <a-input placeholder='CPF' size="large" v-mask="['###.###.###-##']">
                      <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                    </a-input>
                  </a-form-item>
                  <a-form-item
                    :validateStatus="passwordError() ? 'error' : ''"
                    :help="passwordError() || ''"
                    fieldDecoratorId="senha"
                    :fieldDecoratorOptions="{
                      rules: [{ required: true, message: 'Senha curta, minimo de 6 dígitos!', min:6 }]
                    }"
                  >
                    <a-input :type = "visible ? 'text' : 'password'" placeholder='Senha' size="large" >
                      <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>

                      <a-icon v-if = "visible" slot = "suffix" type = "eye-o" style = "color: 'rgba(0,0,0,.25)'; cursor: pointer;" @click = "toggleVisible" />
                      <a-icon v-else slot = "suffix" type = "eye" style = "color: 'rgba(0,0,0,.25)';  cursor: pointer;" @click = "toggleVisible" />
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      type='primary'
                      block htmlType='submit'
                      :disabled="hasErrors(form.getFieldsError())"
                      class='login-form-button'
                      @click="onLogin"
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
import { mask } from 'vue-the-mask'
import CPF, { validate, strip } from 'cpf-check';
import login from '@/api/login';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  directives: { mask },
  data() {
    return {
      hasErrors,
      show: true,
      form: null,
      visible: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  created() {
    if (localStorage.getItem('token') !== null){
      if (localStorage.getItem('tag') === 'feirante')
        this.$router.push({ name: 'feirante' })
      else
        this.$router.push({ name: 'supervisor' })
    }
  },
  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('cpf') && getFieldError('cpf');
    },
    checkCpf(rule, value, callback) {
      let errors = [];
      if (value === undefined || !validate(strip(value)).valid) {
        errors.push('')
      }
      return callback(errors);
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('senha') && getFieldError('senha');
    },
    openNotificationWithIcon(type) {
      if (type === 'success'){
        this.$notification[type]({
          message: 'Bem vindo! ',
        })
      }
      else {
        this.$notification[type]({
          message: 'Falha ao efetuar o Login!',
          description: 'Dados incorretos! Por favor verifique o CPF e a Senha.'
        })
      }
    },
    onLogin() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const info = await login(values.cpf, values.senha);
          if (info === null) {
            this.openNotificationWithIcon('error');
          } else {
            this.openNotificationWithIcon('success');
            localStorage.setItem('token', info.token);
            localStorage.setItem('tag', info.tag);
            if (info.tag === 'feirante')
              this.$router.push({ name: 'feirante' })
            else
              this.$router.push({ name: 'supervisor' })
          }
        }
      })
    },
    toggleVisible () {
        this.visible = !this.visible
      }
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
