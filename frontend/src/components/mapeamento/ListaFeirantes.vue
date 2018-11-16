<template >
    <a-collapse>
        <a-collapse-panel header="Não confirmados" key="1">
            <a-list :dataSource="naoConfirmados">
                <a-list-item slot="renderItem" slot-scope="item, index" class="listItem" @click="selectFeirante(item)" :style="item.cpf ===  selectedFeirante ? selected: ''">
                    {{item.nome}}
                </a-list-item>
            </a-list>
        </a-collapse-panel>
        <a-collapse-panel header="Confirmados" key="2">

        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import * as participaAPI from '@/api/participa';

export default {
    data() {
        return {
            selectedFeirante: null,
            selectedCell: null,
            naoConfirmados: [
                {
                    cpf: '111.111.111-11',
                    nome: 'Mc TATA'
                },
                {
                    cpf: '222.111.111-11',
                    nome: 'Mc TATA 2'
                },
            ],
            confirmados: []
        }
    },

    computed: {
        selected() {
            return {
                fontWeight: 'bold'
            }
        },
    },


    mounted() {
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
        }
    }
}
</script>


<style scoped>
.listItem {
  cursor: pointer;
}
</style>
