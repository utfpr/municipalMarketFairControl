<template>
    <a-layout class="content">
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="6">
                <a-card title="Feira Municipal">
                    <a-form :autoFormCreate="(form)=>{this.form = form}" ref="form">
                        <a-form-item fieldDecoratorId="cpf" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Digite um CPF válido!'}, {validator: this.checkCpf, }]}">
                            <a-input placeholder="CPF" v-mask="['###.###.###-##']">
                                <a-icon slot="prefix" type="idcard" />
                            </a-input>
                        </a-form-item>
                        <a-form-item fieldDecoratorId="senha" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Mínimo 6 caracteres!', min: 6},]}">
                            <a-input placeholder="Senha" :type="this.mostrarSenha ? 'text' : 'password'">
                                <a-icon slot="prefix" type="lock" />
                                <a-icon slot="suffix" type="eye" @click="() => {this.mostrarSenha = !this.mostrarSenha}" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button @click="onLogin" type="primary" block>Entrar</a-button>
                        </a-form-item>
                        <a-form-item v-if="this.credenciaisIncorretas">
                            <a-alert message="Credenciais incorretas" type="error" showIcon />
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
        </a-row>

    </a-layout>
</template>

<script>

import { mask } from 'vue-the-mask'
import CPF, { validate, strip } from 'cpf-check';
import login from '@/api/login';

export default {
    directives: { mask },
    data() {
        return {
            mostrarSenha: false,
            credenciaisIncorretas: false
        }
    },

    created() {
        if (localStorage.getItem('token') !== null) {
            if (localStorage.getItem('tag') === 'feirante')
                this.$router.push({ name: 'feirante' })
            else
                this.$router.push({ name: 'supervisor' })
        }
    },

    methods: {
        checkCpf(rule, value, callback) {
            let errors = [];
            if (value === undefined || !validate(strip(value)).valid) {
                errors.push('')
            }
            return callback(errors);
        },

        onLogin() {

            this.form.validateFields(async (err, values) => {
                if (!err) {
                    const info = await login(values.cpf, values.senha);
                    if (info === null) {
                        this.credenciaisIncorretas = true;
                    } else {
                        this.credenciaisIncorretas = false;
                        localStorage.setItem('userID', info.userID);
                        localStorage.setItem('token', info.token);
                        localStorage.setItem('tag', info.tag);

                        if (info.tag === 'feirante')
                            this.$router.push({ name: 'feirante' })
                        else
                            this.$router.push({ name: 'supervisor' })
                    }
                }
            })
        }
    }
}
</script>


<style scoped>
.content {
  justify-content: center;
}
.anticon-eye {
  cursor: pointer;
}
</style>
