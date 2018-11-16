<template>
    <div class="cell" v-bind:style="style">
        {{this.id}}
    </div>

</template>

<script>
export default {
    props: ['id', 'top', 'left', 'width', 'height'],
    created() {

    },
    // <div style="position: absolute; top: 4%; left: 9%">1</div>
    computed: {
        style() {
            return 'top: ' + this.top + '; left: ' + this.left + '; width: ' + this.width + '; height: ' + this.height;
        }


    }, methods: {
        transformPosition(pos) {
            return (pos * 100) + '%';
        }
    }

}
</script>

<style scoped>
.cell {
  background-color: lightgreen;
  position: absolute;
}
</style>

