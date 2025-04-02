<script setup lang="ts">
import { images } from './images'

const selectedImage = ref(null);

const selectImage = (image) => selectedImage.value = image;

// // 드래그 관련 상태 및 함수
const { items, startDrag } = useDraggable(images);


// 크기 조절을 위한 추가 코드
const sizeOptions = [
  { label: '작게', value: 'w-[12rem]' },
  { label: '보통', value: 'w-[18rem]' },
  { label: '크게', value: 'w-[24rem]' },
  { label: '매우 크게', value: 'w-[30rem]' }
];

// 크기 클래스에서 숫자 추출 함수
const extractSizeValue = (sizeClass) => {
  const match = sizeClass.match(/\[(\d+)rem\]/);
  return match ? parseInt(match[1]) : 18;
};

// 숫자 값을 크기 클래스로 변환
const createSizeClass = (value) => `w-[${value}rem]`;

const getSvgStyle = (size) => {
  const value = extractSizeValue(size);
  return { width: `${value}rem` };
};

// 현재 선택된 이미지의 크기 슬라이더 값
const currentSizeValue = computed({
  get: () => {
    if (!selectedImage.value) return 18;
    return extractSizeValue(selectedImage.value.size);
  },
  set: (newValue) => {
    if (!selectedImage.value) return;
    
    // 선택된 이미지와 items 배열 모두 업데이트
    const newSize = createSizeClass(newValue);
    
    // selectedImage 업데이트
    selectedImage.value = {
      ...selectedImage.value,
      size: newSize
    };
    
    // items 배열에서 해당 이미지 업데이트
    const index = items.value.findIndex(img => img.id === selectedImage.value.id);
    if (index !== -1) {
      items.value[index] = {
        ...items.value[index],
        size: newSize
      };
    }
  }
});

// 크기 변경 함수
const resizeSelectedImage = (newSize) => {
  if (!selectedImage.value) return;
  
  // selectedImage 업데이트
  selectedImage.value = {
    ...selectedImage.value,
    size: newSize
  };
  
  // items 배열에서 해당 이미지 업데이트
  const index = items.value.findIndex(img => img.id === selectedImage.value.id);
  if (index !== -1) {
    items.value[index] = {
      ...items.value[index],
      size: newSize
    };
  }
};
</script>

<template>
  <!-- <transition name="slide-left">
    <div class="fixed left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-700 flex flex-col h-screen z-30 shadow-2xl"> -->
      <div class="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white">공정 정보</h2>
        <button 
          @click="$emit('close')" 
          class="text-gray-400 hover:text-white focus:outline-none bg-transparent">X</button>
      </div>
      
      <!-- 이미지 목록 -->
      <div class="flex-1 overflow-auto">
        <div 
          v-for="image in images" 
          :key="image.id" 
          class="p-3 border-b border-gray-800 cursor-pointer transition-all duration-200"
          :class="selectedImage && selectedImage.id === image.id ? 'bg-blue-900 bg-opacity-30' : 'hover:bg-gray-800'"
          @click="selectImage(image)">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
              <span class="text-blue-400 text-xs font-mono">{{ image.id.split('_')[1] }}</span>
            </div>
            <div>
              <div class="text-white font-medium">{{ image.label }}</div>
              <div class="text-xs text-gray-400">위치: {{ image.x }}, {{ image.y }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 선택된 이미지 상세 정보 -->
      <div v-if="selectedImage" class="p-4 bg-gray-800 border-t border-gray-700">
        <h3 class="text-lg font-medium text-white mb-2">{{ selectedImage.label }}</h3>
        <p class="text-sm text-gray-300 mb-3">{{ selectedImage.description }}</p>
        
        <!-- 크기 조절 슬라이더 추가 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-300 mb-1">크기 조절</label>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-400">작게</span>
            <input 
              type="range" 
              v-model.number="currentSizeValue" 
              min="1" 
              max="36" 
              step="1"
              class="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer">
            <span class="text-xs text-gray-400">크게</span>
          </div>
          <div class="text-center text-xs text-gray-400 mt-1">{{ currentSizeValue }}rem</div>
        </div>
        
        <!-- 프리셋 크기 버튼 -->
        <div class="flex flex-wrap gap-2 mb-3">
          <button 
            v-for="option in sizeOptions" 
            :key="option.value"
            @click="resizeSelectedImage(option.value)"
            class="px-2 py-1 text-xs rounded"
            :class="selectedImage.size === option.value 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'">
            {{ option.label }}
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-gray-700 p-2 rounded">
            <span class="text-gray-400">ID:</span>
            <span class="text-blue-300 ml-1">{{ selectedImage.id }}</span>
          </div>
          <div class="bg-gray-700 p-2 rounded">
            <span class="text-gray-400">크기:</span>
            <span class="text-blue-300 ml-1">{{ selectedImage.size }}</span>
          </div>
        </div>
      </div>
    <!-- </div>
  </transition> -->
</template>