<template>
    <div class="cell" v-bind:style="style" @click="onClick($event)">
        
    </div>

</template>

<script>
export default {
    props: ['id', 'top', 'left', 'width', 'height', 'selected'],
    mounted() {
       
    },
    // <div style="position: absolute; top: 4%; left: 9%">1</div>
    computed: {
        style() {
            return {
                top: this.top,
                left: this.left,
                width: this.width,
                height: this.height,
                backgroundColor: this.selected ?'#91d5ff' :'#d9dce0' ,
                border: '1px solid #873800',
                borderRadius: '3px'
            }
        }


    }, methods: {
        transformPosition(pos) {
            return (pos * 100) + '%';
        },

        onClick(event) {
            event.stopPropagation()
            this.$emit('click', this.id);
        }
    }

}
</script>

<style scoped>
.cell {

  position: absolute;
  cursor: pointer;
}
</style>

