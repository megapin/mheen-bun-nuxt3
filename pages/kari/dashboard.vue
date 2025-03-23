<script setup lang="ts">
const selectedImg = ref<string>('/kari/svg/jinseong-isometric-05.svg')
const units = ref(Array(8).fill(0).map((_, i) => `jinseong-isometric-0${i + 1}.jpg`))

const activeTab = ref<string>('dashboard')

const toggleTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <!-- <div class="w-331px p-2 h-full overflow-y-auto">
      <img v-for="item in units" :src="`/kari/downloaded/units/${item}`" 
        w-300px h-200px object-contain rounded b b-solid b-gray-300 hover="b-2 b-gray-500" cursor-pointer
        :class="{ 'b-2 b-gray-500': selectedImg === item }"
        @click="selectedImg = item"/>
    </div> -->

    <div class="w-full flex justify-center pt-4 pb-2">
      <div class="toggle-container bg-gray-200 rounded-full p-1 flex">
        <button 
          @click="toggleTab('dashboard')" 
          class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
          :class="activeTab === 'dashboard' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-300'">
          Dashboard
        </button>
        <button 
          @click="toggleTab('data')" 
          class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
          :class="activeTab === 'data' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-300'">
          Data
        </button>
      </div>
    </div>

    <div class="flex flex-1 justify-center items-center w-full h-full">
      <img :src="`${selectedImg}`" w-full h-full object-contain />
    </div>

    <!-- <div v-if="activeTab === 'data'" class="flex flex-1 justify-center items-center w-full h-full">
      <img :src="`/kari/retouched/dashboard.webp`" w-full h-full object-contain />
    </div> -->

  </div>
</template>

<style scoped>
img {
  /* background-image: url('yourimage.png');
  background-color: blue; */
  background-blend-mode: multiply;
}
</style>