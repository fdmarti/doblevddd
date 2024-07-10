<template>
    <progress :class="['progress progress-info w-40', completion === 100 ? 'progress-success' : 'progress-info']"
        :value="cubicBezierNumber" max="100"></progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTransition } from '@vueuse/core'

interface Props {
    completion: number;
}

const props = defineProps<Props>()

const baseNumber = ref(0)
const duration = 1500

const cubicBezierNumber = useTransition(baseNumber, {
    duration,
    transition: [0.75, 0, 0.25, 1],
})

const toggleTransitionProgress = () => {
    baseNumber.value = props.completion
}

onMounted(() => {
    toggleTransitionProgress()
})
</script>