<script setup>
const duration = ref(15 * 60*1000)
const elapsed = ref(0)

let lastTime
let handle

// let raf 
// let cancelRaf
// onMounted(() => {
// 	// raf = window.requestAnimationFrame()
// 	// cancelRaf = window.cancelAnimationFrame()
// 	raf = window
// 	// cancelRaf = window.cancelAnimationFrame()
// })
//
// const update = () => {
//   elapsed.value = performance.now() - lastTime
//   if (elapsed.value >= duration.value) {
//     // cancelAnimationFrame(handle)
// 		raf.cancelAnimationFrame(handle)
//   } else {
//     // handle = requestAnimationFrame(update)
// 		handle = raf.requestAnimationFrame(update)
//   }
// }
//
// const reset = () => {
//   elapsed.value = 0
//   lastTime = performance.now()
//   update()
// }
//
// const progressRate = computed(() =>
//   Math.min(elapsed.value / duration.value, 1)
// )
//
// reset()
//
// onUnmounted(() => {
//   cancelAnimationFrame(handle)
// })
</script>

<template>
	<div flex row gap5>
		<!-- <client-only> -->
		<!-- <label>Elapsed Time: <progress :value="progressRate"></progress></label> -->
		<!-- <div>{{ (elapsed / 1000).toFixed(1) }}s</div> -->
		<!---->
		<!-- <div> -->
		<!-- 	Duration: <input type="range" v-model="duration" min="1" :max="duration*2"> -->
		<!-- 	{{ (duration / 60000).toFixed(1) }}m -->
		<!-- </div> -->
		<!---->
		<!-- <button @click="reset">Reset</button> -->
		<!-- </client-only> -->
	</div>
</template>

<style>
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>
