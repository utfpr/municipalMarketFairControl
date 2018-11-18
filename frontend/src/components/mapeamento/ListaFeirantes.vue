<template >
    <a-collapse>
        <a-collapse-panel header="Não posicionados" key="1">
            <!-- <span v-for="feirante in naoConfirmados">
                <a-tag class="tag-feirante"> {{feirante.nome}}</a-tag>
            </span> -->

         
                 <a-tag v-for="feirante in naoConfirmados" :key="feirante.cpf" class="tag-feirante" draggable="true" @dragstart="dragStart"> {{feirante.nome}}</a-tag>
         
            <!-- <a-list :dataSource="naoConfirmados">
                
                <a-list-item slot="renderItem" slot-scope="item, index" class="listItem" @click="selectFeirante(item)" :style="item.cpf ===  selectedFeirante ? selected: ''">
                    <a-tag>  {{item.nome}}</a-tag>
                  
                </a-list-item>

            </a-list> -->
        </a-collapse-panel>
        <a-collapse-panel header="Posicionados" key="2">

        </a-collapse-panel>
    </a-collapse>
</template>

<script>
  import draggable from 'vuedraggable'
import * as participaAPI from '@/api/participa';

export default {
    components: {draggable},
    data() {
        return {
            selectedFeirante: null,
            selectedCell: null,
            naoConfirmados: [
                {
                    cpf: '111.111.111-11',
                    nome: 'Jurandir'
                },
                {
                    cpf: '222.111.111-11',
                    nome: 'Ademir'
                },
                {
                    cpf: '333.111.111-11',
                    nome: 'Jorge'
                },
                {
                    cpf: '444.111.111-11',
                    nome: 'Dennis'
                },
                {
                    cpf: '555.111.111-11',
                    nome: 'Otavio'
                },
                {
                    cpf: '666.111.111-11',
                    nome: 'Lucas'
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
