<template>

    <a-layout class="content">
        <a-layout-content class="map">
            <Mapa />
        </a-layout-content>
        <a-layout-sider class="sider">
            <ListaFeirantes />
        </a-layout-sider>
    </a-layout>

</template>


<script>

import ListaFeirantes from '@/components/mapeamento/ListaFeirantes';
import Mapa from '@/components/mapeamento/Mapa';

export default {
    components: {ListaFeirantes, Mapa}
}
</script>

<style scoped>

.content {
    margin: 15px;
    max-height: 94%;
}
.map {
  background-color: white;
  margin-right: 15px;
}

.sider {
  background-color: transparent;
}
</style>
