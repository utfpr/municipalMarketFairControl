<template>
    <div class="container" v-resize.initial="onResize">
        <img src="@/assets/background.svg" style="position:absolute; top: 0; left: 0;" width="70%" ref="bg">

        <div v-for="celula in celulas">
            <Celula :id="celula.id" :top="celula.top" :left="celula.left" :width="celula.width" :height="celula.height" />
        </div>
    </div>
</template>

<script>

import resize from 'vue-resize-directive'
import Celula from '@/components/mapeamento/Celula'

export default {
    components: { Celula },
    data() {

        return {
            bgWidth: 0,
            bgHeight: 0,
            celulas: []
        }
    },
    directives: {
        resize,
    },

    methods: {

        transformPos(x, base) {
            return (x * base) + 'px';
        },

        onResize() {
            this.bgWidth = this.$refs.bg.clientWidth;
            this.bgHeight = this.$refs.bg.clientHeight;

            this.celulas = [
                {
                    id: 1,
                    top: this.transformPos(0.04, this.bgHeight),
                    left: this.transformPos(0.12, this.bgWidth),
                    width: this.transformPos(0.04, this.bgWidth),
                    height: this.transformPos(0.04, this.bgHeight)
                },
                 {
                    id: 2,
                    top: this.transformPos(0.04, this.bgHeight),
                    left: this.transformPos(0.84, this.bgWidth),
                    width: this.transformPos(0.04, this.bgWidth),
                    height: this.transformPos(0.04, this.bgHeight)
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
