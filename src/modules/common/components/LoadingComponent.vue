<template>
  <div class="w-full flex justify-center p-4">
    <svg :width="size" :height="size" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle class="spinner_nOfF fill-red-500" cx="4" cy="12" r="3" />
      <circle class="spinner_nOfF spinner_fVhf fill-base-100" cx="4" cy="12" r="3" />
      <circle class="spinner_nOfF spinner_piVe fill-red-500" cx="4" cy="12" r="3" />
      <circle class="spinner_nOfF spinner_MSNs fill-base-100" cx="4" cy="12" r="3" />
    </svg>
  </div>
</template>
<script setup lang="ts">
interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), {
  size: 60,
});
</script>
<style scoped>
.spinner_nOfF {
  animation: spinner_qtyZ 2s cubic-bezier(0.36, 0.6, 0.31, 1) infinite;
}

.spinner_fVhf {
  animation-delay: -0.5s;
}

.spinner_piVe {
  animation-delay: -1s;
}

.spinner_MSNs {
  animation-delay: -1.5s;
}

@keyframes spinner_qtyZ {
  0% {
    r: 0;
  }

  25% {
    r: 3px;
    cx: 4px;
  }

  50% {
    r: 3px;
    cx: 12px;
  }

  75% {
    r: 3px;
    cx: 20px;
  }

  100% {
    r: 0;
    cx: 20px;
  }
}
</style>
