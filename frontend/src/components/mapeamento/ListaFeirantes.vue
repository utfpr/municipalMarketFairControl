<template >
    <a-collapse :activeKey="['1', '2']">
        <a-collapse-panel header="Não posicionados" key="1">
            <a-tag v-for="participa in naoPosicionados" :key="participa.feirante.cpf" class="tag-feirante" draggable="true" @click="selectFeirante(participa.feirante)" @dragstart="dragStart"> {{participa.feirante.nome}}</a-tag>
        </a-collapse-panel>
        <a-collapse-panel header="Posicionados" key="2">
            <a-tag v-for="participa in posicionados" :key="participa.feirante.cpf" class="tag-feirante" draggable="true" @dragstart="dragStart">{{participa.celulaId}} {{participa.feirante.nome}}</a-tag>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import draggable from 'vuedraggable'
import * as participaAPI from '@/api/participa';

export default {
    components: { draggable },
    data() {
        return {
            selectedFeirante: null,
            selectedCell: null,
            confirmados: []
        }
    },

    computed: {
        selected() {
            return {
                fontWeight: 'bold'
            }
        },

        posicionados() {
            return (this.confirmados.length > 0) ? this.confirmados.filter(participa => { return participa.celulaId !== null }) : [];
        },

        naoPosicionados() {
            return (this.confirmados.length > 0) ? this.confirmados.filter(participa => { return participa.celulaId === null }) : [];
        }
    },


    async mounted() {

        this.confirmados = await participaAPI.getConfirmados();


        this.$root.$on('selectCell', id => {
            this.selectedCell = id;
        })

        this.$root.$on('selectFeirante', cpf => {
            this.selectedFeirante = cpf;
        })
    },

    methods: {
        selectFeirante(item) {
            this.selectedFeirante = item.cpf;
            if (this.selectedCell !== null) {
                participaAPI.setPosicao(this.selectedFeirante, this.selectedCell);
                this.selectedCell = null;
                this.selectedFeirante = null;
                this.$root.$emit('selectCell', null);


            } else {
                this.$root.$emit('selectFeirante', this.selectedFeirante);
            }
        },

        dragStart(x) {
            console.log(x)
        }
    }
}
</script>


<style scoped>
.listItem {
  cursor: pointer;
}

.tag-feirante {
  margin: 5px;
  font-size: 14px;
}
</style>
