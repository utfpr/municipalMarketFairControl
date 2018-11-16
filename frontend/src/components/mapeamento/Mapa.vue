<template>
    <div class="container">

        <svg height="98%" width="71%" preserveAspectRatio="xMaxYMax" >

            <svg v-for="celula in celulas">
                <Celula :x="celula.x" :y="celula.y" :width="celula.width" :height="celula.height" />
            </svg>

            <image height="100%"  xlink:href="@/assets/background.svg" style="border: 1px solid black" />

        </svg>
    </div>
</template>

<script>

import resize from 'vue-resize-directive'
import Celula from '@/components/mapeamento/Celula'

export default {
    components: {Celula},
    data() {
       
        return {
            bgWidth: 0,
            bgHeight: 0,
            celulas : [{id: 1, x: this.transformPosition(0.9), y: this.transformPosition(0.5), width:  this.transformPosition(0.03), height:  this.transformPosition(0.06)}]
        }
    },
    directives: {
        resize,
    },

    methods: {
    
        transformPosition(pos) {
            return (pos * 100) + '%';
        }
    },

}
</script>

<style scoped>
.container {
  padding-top: 5px;
  position: relative;
  height: 100%;
}
.bg {
}
</style>
