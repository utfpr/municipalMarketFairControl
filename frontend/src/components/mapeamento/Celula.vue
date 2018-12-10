<template>
  <a-tooltip v-if="associed" placement="topLeft">
    <template slot="title">
      <span>{{id}} {{feirante.nome}}</span>
    </template>
    <div class="cell" v-bind:style="style" @click="onClick($event)" style="text-align: right">
      <span v-if="parseInt(largura) / base > 0.034">{{id}}</span>
    </div>
  </a-tooltip>
  <a-tooltip v-else-if="parseInt(largura) / base < 0.033">
    <template slot="title">
      <span>{{id}}</span>
    </template>
    <div class="cell" v-bind:style="style" @click="onClick($event)" style="text-align: right">
    </div>
  </a-tooltip>
  <div class="cell" v-else v-bind:style="style" @click="onClick($event)" style="text-align: right">
    <span v-if="parseInt(largura) / base > 0.033">{{id}}</span>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "y",
    "x",
    "comprimento",
    "largura",
    "selected",
    "associed",
    "feirante",
    "base",
  ],
  mounted() {},
  // <div style="position: absolute; top: 4%; left: 9%">1</div>
  computed: {
    style() {
      return {
        top: this.y,
        left: this.x,
        width: this.comprimento,
        height: this.largura,
        backgroundColor: this.associed
          ? "#d9dce0"
          : this.selected
          ? "#91d65ff"
          : "#99ff33",
        border: "1px solid #873800",
        borderRadius: "3px"
      };
    }
  },
  methods: {
    transformPosition(pos) {
      return pos * 100 + "%";
    },

    onClick(event) {
      event.stopPropagation();
      this.$emit("click", this.id);
    }
  }
};
</script>

<style scoped>
.cell {
  position: absolute;
  cursor: pointer;
}
</style>

