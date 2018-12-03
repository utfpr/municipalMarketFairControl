<template>
  <a-tooltip v-if="associed" placement="topLeft" >
    <template slot="title">
      <span>{{feirante.nome}}</span>
    </template>
    <div class="cell" v-bind:style="style" @click="onClick($event)">

    </div>
  </a-tooltip>
  <div class="cell" v-else v-bind:style="style" @click="onClick($event)">

  </div>
  
</template>

<script>
export default {
    props: ['id', 'y', 'x', 'comprimento', 'largura', 'selected', 'associed', 'feirante'],
    mounted() {

    },
    // <div style="position: absolute; top: 4%; left: 9%">1</div>
    computed: {
        style() {
            return {
                top: this.y,
                left: this.x,
                width: this.comprimento,
                height: this.largura,
                backgroundColor: this.associed ? '#99ff33' : this.selected ? '#91d65ff' : '#d9dce0',
                border: '1px solid #873800',
                borderRadius: '3px'
            }
        }


    }, methods: {
        transformPosition(pos) {
            return (pos * 100) + '%';
        },

        onClick(event) {
            event.stopPropagation()
            this.$emit('click', this.id);
        }
    }

}
</script>

<style scoped>
.cell {
  position: absolute;
  cursor: pointer;
}
</style>

