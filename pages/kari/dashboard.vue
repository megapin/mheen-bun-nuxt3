<script setup lang="ts">
const selectedImg = ref<string>('jinseong-isometric-05.jpg')
const units = ref(Array(8).fill(0).map((_, i) => `jinseong-isometric-0${i + 1}.jpg`))
</script>

<template>
  <div class="h-screen w-screen flex overflow-hidden">
    <div class="w-331px p-2 h-full overflow-y-auto">
      <img v-for="item in units" :src="`/kari/downloaded/units/${item}`" 
        w-300px h-200px object-contain rounded b b-solid b-gray-300 hover="b-2 b-gray-500" cursor-pointer
        :class="{ 'b-2 b-gray-500': selectedImg === item }"
        @click="selectedImg = item"/>
    </div>
    <div class="flex flex-1 justify-center items-center w-full h-full">
      <img :src="`/kari/downloaded/units/${selectedImg}`" w-full h-full object-contain />
    </div>
  </div>
</template>

<style scoped>
img {
  /* background-image: url('yourimage.png');
  background-color: blue; */
  background-blend-mode: multiply;
}
</style>