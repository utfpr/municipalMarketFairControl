<template>
  <a-form>
    
    <a-form-item>
      <a-row>
        <a-col :span="12">
          <a-input placeholder="CPF" v-model="model.cpf" :disabled="this.action === 'view'" />
        </a-col>

        <a-col :span="8" :offset="4">
          <a-checkbox :disabled="this.action === 'view'">Administrador</a-checkbox>
        </a-col>
      </a-row>

    </a-form-item>
    <a-form-item>
      <a-input placeholder="Nome" type="text" v-model="model.nome" :disabled="this.action === 'view'" />
    </a-form-item>

  </a-form>
</template>
<script>
export default {
  name: 'modal',
  props: {
    action: {
      type: String
    },
    model: {
      type: Object
    }
  },

  watch: {
    model: {
      handler: function (newValue) {
        this.$emit('updateModel', newValue);
      },
      deep: true
    }
  }
}
</script>