<template>
    <div ref="form">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useForm } from '@/components/FormBase/useForm.ts'

const { showMaximize, showMinimize, showClose, isShow } = useForm()
const form = ref<HTMLElement | null>(null)



onMounted(() => {
    
})

</script>

<style scoped>

</style>