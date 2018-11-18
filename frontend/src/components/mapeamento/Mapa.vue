<template>
    <div class="container" v-resize.initial="onResize" v-on:click="this.clearSelection">
        <img src="@/assets/background.svg" style="position:absolute; top: 0; left: 0;" width="90%" ref="bg">

        <div v-for="celula in celulas">
            <Celula :id="celula.id" :top="celula.top" :left="celula.left" :width="celula.width" :height="celula.height" v-on:click="cellClick" :selected="celula.id === selectedCell" />
        </div>
    </div>
</template>

<script>

import resize from 'vue-resize-directive'
import panzoom from 'panzoom';
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

        const area = document.querySelector('.container');
        panzoom(area, {
            maxZoom: 4,
            minZoom: 1
        })

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
                    top: this.transformPos(0.065, this.bgHeight),
                    left: this.transformPos(0.135, this.bgWidth),
                    width: this.transformPos(0.018, this.bgWidth),
                    height: this.transformPos(0.023, this.bgHeight)
                },
                {
                    id: 2,
                    top: this.transformPos(0.098, this.bgHeight),
                    left: this.transformPos(0.135, this.bgWidth),
                    width: this.transformPos(0.034, this.bgWidth),
                    height: this.transformPos(0.045, this.bgHeight)
                },
                {
                    id: 3,
                    top: this.transformPos(0.16, this.bgHeight),
                    left: this.transformPos(0.135, this.bgWidth),
                    width: this.transformPos(0.044, this.bgWidth),
                    height: this.transformPos(0.05, this.bgHeight)
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
  overflow: hidden;
}

.container img {
  overflow: hidden;
}
</style>
