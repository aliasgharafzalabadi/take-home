<template>
    <div v-if="show" class="modal">
        hello
    </div>
</template>

<script setup>
import {ref} from 'vue'

show = ref(false)

const init = ()=>{
    show.value = true
}


defineExpose({ init });

</script>

<style scoped>
.modal {
    width: 100%;
    height: 100%;
    z-index: 1000000000;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>