<template>
  <div class="">
    <a-row type="flex" justify="center">
      <a-col
        :xs="{ span: 0, offset: 0 }"
        :lg="{ span: 16, offset: 0 }"
        :md="{ span: 16, offset: 0 }"
      >
        <div class="gutter-left imagem"></div>
      </a-col>
      <a-col
        :xs="{ span: 24, offset: 0 }"
        :lg="{ span: 8, offset: 0 }"
        :md="{ span: 8, offset: 0 }"
      >
        <div class="gutter-right ">
          <div class="cabs fig">
            
          </div>
            <div class="heasd">
              <h2 class="titulo">Entre na sua conta</h2>
            </div>
            <div class="ok">
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
  margin-top: 20%;
}
.imagem {
  background-repeat: no-repeat;
  background-size: 95%;
  background-image: url(../image/login4.jpg);
  background-position: center;
}
.fig {
  background-repeat: no-repeat;
  background-size: 25%;
  background-image: url(../image/brazao.png);
  background-position: center;
  padding-bottom: 15%;
}
.gutter-left {
  margin-top: 5%;
  height: 100%;
  border-right: 2px dotted #747272;
}
.titulo{
  text-align: center;
}
.cabs {
  padding-top: 10%;
}
.heasd {
  padding-top: 5%;
  border-bottom: 2px dashed #e8e8e8;
  padding-bottom: 4%;
  margin-left: 5%;
  margin-right: 7%;
}
.ok {
  margin-top: 7%;
  margin-left: 5%;
  margin-right: 7%;
  
}
</style>
