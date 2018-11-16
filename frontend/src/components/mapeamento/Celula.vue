<template>
    <rect :x="this.x" :y="this.y" :height="this.height" :width="this.width" style="stroke:#009900; fill: #00cc00" />
</template>

<script>
export default {
    props: ['x', 'y', 'width', 'height'],
    created() {
       
    },

}
</script>

<style scoped>
</style>

