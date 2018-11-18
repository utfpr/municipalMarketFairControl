<template>

    <a-layout class="content">
        <a-layout v-if="this.feira === null" class="sem-feira">
            <div>Sem feira na semana!</div>
            <a-icon type="frown-o" class="sem-feira-icon" />
        </a-layout>

        <a-layout-content v-if="this.feira !== null" class="map">
            <Mapa />
        </a-layout-content>
        <a-layout-sider v-if="this.feira !== null" class="sider" width="30%">
            <ListaFeirantes />
        </a-layout-sider>
    </a-layout>
</template>

<script>

import ListaFeirantes from '@/components/mapeamento/ListaFeirantes';
import Mapa from '@/components/mapeamento/Mapa';
import * as feiraAPI from '@/api/feira';

export default {
    components: { ListaFeirantes, Mapa },
    data() {
        return {
            feira: null
        }
    },

    async created() {
        this.feira = await feiraAPI.get()
    }
}
</script>

<style scoped>
.content {
  margin: 15px;
  /* max-height: 100%; */
  height: 82vh;
  background-color: transparent;
}
.map {
  background-color: transparent;
  margin-right: 15px;
  overflow: hidden;
}

.sider {
  background-color: transparent;
}

.sem-feira {
  flex: 1;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sem-feira-icon {
  font-size: 48px;
}
</style>
