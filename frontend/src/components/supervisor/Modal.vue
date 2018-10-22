<template>
  <div>
    <input placeholder="CPF" v-model="model.cpf" :disabled="this.action === 'view'" />
    <input type="text" v-model="model.nome" :disabled="this.action === 'view'" />
  </div>
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