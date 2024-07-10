<template>
    <div class="join">
        <button class="join-item btn btn-outline" @click="emits('previousPage')">
            <LeftArrowIcon />
        </button>
        <button :class="`join-item btn btn-outline text-lg`">
            {{ currentPage }}
        </button>
        <button class="join-item btn btn-outline" @click="emits('nextPage')">
            <RightArrowIcon />
        </button>
    </div>
</template>

<script setup lang="ts">

import { RightArrowIcon, LeftArrowIcon } from '@common/components/icons'

interface Props {
    currentPage: number;
    totalPages: number;
}

defineProps<Props>()

const emits = defineEmits(['nextPage', 'previousPage'])

</script>