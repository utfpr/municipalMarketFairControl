<template>
    <div class="container" v-resize.initial="onResize" v-on:click="this.clearSelection">
        <img src="@/assets/background.svg" style="position:absolute; top: 0; left: 0;" width="90%" ref="bg">

        <div v-for="celula in celulasRender">
            <Celula :id="celula.id" :y="celula.y" :x="celula.x" :comprimento="celula.comprimento" :largura="celula.largura" v-on:click="cellClick" :selected="celula.id === selectedCell" />
        </div>
    </div>
</template>

<script>

import resize from 'vue-resize-directive'
import panzoom from 'panzoom';
import Celula from '@/components/mapeamento/Celula'
import * as participaAPI from '@/api/participa';
import * as feiraAPI from '@/api/feira';
import * as celulaAPI from '@/api/celula';

export default {
    components: { Celula },
    data() {

        return {
            selectedCell: null,
            selectedFeirante: null,
            bgWidth: 0,
            bgHeight: 0,
            celulas: [],
            celulasRender: []
        }
    },
    directives: {
        resize,
    },

    async mounted() {

        const area = document.querySelector('.container');
        panzoom(area, {
            maxZoom: 4,
            minZoom: 1,
            zoomSpeed: 0.2
        })

        this.celulas = this.celulasRender = await celulaAPI.get();

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

            this.celulasRender = this.celulas.map(celula => {
                return {
                    id: celula.id, y: this.transformPos(celula.y, this.bgHeight), x: this.transformPos(celula.x, this.bgWidth),
                    comprimento: this.transformPos(celula.comprimento, this.bgWidth), largura: this.transformPos(celula.largura, this.bgHeight)
                }
            })

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
