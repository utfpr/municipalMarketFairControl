<template>
  <a-layout id="content">
    <div id="table-container">
      <Table />
    </div>
  </a-layout>
</template>

<script>

import Table from '@/components/supervisor/Table.vue';


export default {
  components: {
    Table,
  },
}
</script>


<style scoped>
#content {
  display: flex;
  flex-direction: column;
}

#table-container {
  flex: 1;
  padding: 15px;
  overflow: hidden;
}
</style>
