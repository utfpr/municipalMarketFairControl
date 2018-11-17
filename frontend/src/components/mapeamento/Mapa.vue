<template>
    <div class="container" v-resize.initial="onResize" v-on:click="this.clearSelection">
        <img src="@/assets/background.svg" style="position:absolute; top: 0; left: 0;" width="72%" ref="bg">

        <div v-for="celula in celulas">
            <Celula :id="celula.id" :top="celula.top" :left="celula.left" :width="celula.width" :height="celula.height" v-on:click="cellClick" :selected="celula.id === selectedCell" />
        </div>
    </div>
</template>

<script>

import resize from 'vue-resize-directive'
import Celula from '@/components/mapeamento/Celula'
import * as participaAPI from '@/api/participa';

export default {
    components: { Celula },
    data() {

        return {
            selectedCell: null,
            selectedFeirante: null,
            bgWidth: 0,
            bgHeight: 0,
            celulas: []
        }
    },
    directives: {
        resize,
    },

    mounted() {
        this.$root.$on('selectFeirante', cpf => {
            this.selectedFeirante = cpf;
        })

        this.$root.$on('selectCell', id => {
            this.selectedCell = id;
        })
    },

    methods: {

        clearSelection() {
            this.selectedCell = null;
            this.$root.$emit('selectCell', null);
        },

        cellClick(id) {
            this.selectedCell = id;

            if (this.selectedFeirante !== null) {
                participaAPI.setPosicao(this.selectedFeirante, this.selectedCell);
                this.selectedCell = null;
                this.selectedFeirante = null;
                this.$root.$emit('selectFeirante', null);
            } else {
                this.$root.$emit('selectCell', this.selectedCell);
            }

        },

        transformPos(x, base) {
            return (x * base) + 'px';
        },

        onResize() {
            this.bgWidth = this.$refs.bg.clientWidth;
            this.bgHeight = this.$refs.bg.clientHeight;

            this.celulas = [
                {
                    id: 1,
                    top: this.transformPos(0.035, this.bgHeight),
                    left: this.transformPos(0.115, this.bgWidth),
                    width: this.transformPos(0.047, this.bgWidth),
                    height: this.transformPos(0.045, this.bgHeight)
                },
                {
                    id: 2,
                    top: this.transformPos(0.1, this.bgHeight),
                    left: this.transformPos(0.115, this.bgWidth),
                    width: this.transformPos(0.047, this.bgWidth),
                    height: this.transformPos(0.045, this.bgHeight)
                },
            ]
        }
    },
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  padding-top: 56.25%;
}
</style>
