<!-- <template>
  <div ref="container" bg-dark></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThreeSvg } from '~/composables/useThreeSvg'

const container = ref(null)
const { loadSvg } = useThreeSvg(container)

onMounted(() => {
  loadSvg('/kari/svg/kari-05.svg')
})
</script> -->

<script setup>
import { ref, onMounted } from 'vue'
import { useThreeSvg } from '~/composables/useThreeSvg'

const containerRef = ref(null)
const { loadSvg } = useThreeSvg(containerRef)

onMounted(() => {
  loadSvg('/public/kari/svg/kari-05.svg')
})
</script>

<template>
  <div ref="containerRef" class="three-container bg-dark"></div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
}
</style>