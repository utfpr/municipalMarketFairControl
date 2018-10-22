<template>
  <div>
    <div id="button-container">
      <a-button type="primary" size="large" @click="showModal('add')" icon="plus">Adicionar</a-button>
      <a-button type="danger" size="large" :disabled="!hasSelected">Excluir</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" size="middle" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" bordered> {
      }}>

      <a slot="action" slot-scope="text" href="javascript:;">
        <a-button icon="info-circle-o"></a-button>
      </a>
      <span slot="cbAdm" slot-scope="cbAdm">
        <a-tag v-if="cbAdm" color="blue">Administrador</a-tag>
        <a-tag v-else color="green">Supervisor</a-tag>
      </span>

      <template slot="actions" slot-scope="text, record, index">
        <a @click="() => showModal(record.cpf, 'view')">Visualizar</a>&nbsp;|&nbsp;
        <a @click="() => showModal(record.cpf, 'edit')">Editar</a>
      </template>
    </a-table>

    <a-modal title="Basic Modal" v-model="modal" @ok="handleOk">
      <Modal :model="this.model" @updateModel="this.updateModel" :action="this.action" />
    </a-modal>
  </div>
</template>

<script>
import Modal from '@/components/supervisor/Modal.vue';

const columns = [
  {
    dataIndex: 'cpf',
    key: 'cpf',
    title: 'CPF',
    width: '20%'
  },
  {
    dataIndex: 'nome',
    key: 'nome',
    title: 'Nome',
  },
  {
    dataIndex: 'isAdm',
    key: 'isAdm',
    title: "Permissão",
    scopedSlots: { customRender: 'cbAdm' },
    width: '20%'
  }, {
    dataIndex: 'actions',
    key: 'actions',
    title: "Ações",
    scopedSlots: { customRender: 'actions' },
    width: '15%'
  },
];

const data = [
  {
    cpf: '111.111.111-11',
    nome: 'Supervisor 1',
    isAdm: true
  },
  {
    cpf: '222.222.222-22',
    nome: 'Supervisor 2',
    isAdm: false
  }
];


export default {
  components: {
    Modal
  },
  data() {
    return {
      columns,
      data,
      model: {
        cpf: '',
        nome: ''
      },
      action: '',
      modal: false,
      selectedRowKeys: []
    }
  },

  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    showModal(key, action) {
      this.modal = true;
      this.action = action;

      if (action === 'add')
        this.model = {
          cpf: '',
          nome: ''
        };
      else
        this.model = this.data.filter(item => key === item.cpf)[0];
    },

    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    handleOk() {
      this.modal = false;
    },

    updateModel(newValue) {
      this.model = newValue;
    }
  }

}
</script>


<style scoped>
#button-container button {
  margin-bottom: 15px;
  margin-right: 15px;
}
</style>
