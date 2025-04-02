<script setup lang="ts">
// import { useResizeSvg } from '~/composables/useResizeSvg'
// import kari_00 from '/public/kari/svg/kari_00.svg?raw'
import kari_01 from '/public/kari/svg/kari_01.svg?raw'
import kari_02 from '/public/kari/svg/kari_02.svg?raw'
import kari_03 from '/public/kari/svg/kari_03.svg?raw'
import kari_04 from '/public/kari/svg/kari_04.svg?raw'
import kari_05 from '/public/kari/svg/kari_05.svg?raw'
import kari_06 from '/public/kari/svg/kari_06.svg?raw'
import kari_07 from '/public/kari/svg/kari_07.svg?raw'
import kari_08 from '/public/kari/svg/kari_08.svg?raw'
import kari_09 from '/public/kari/svg/kari_09.svg?raw'
import kari_10 from '/public/kari/svg/kari_10.svg?raw'
import kari_11 from '/public/kari/svg/kari_09.svg?raw'
import kari_14 from '/public/kari/svg/kari_10.svg?raw'
import kari_12 from '/public/kari/svg/kari_09.svg?raw'
import kari_15 from '/public/kari/svg/kari_10.svg?raw'
import kari_13 from '/public/kari/svg/kari_09.svg?raw'
import kari_16 from '/public/kari/svg/kari_10.svg?raw'
import pipe_01 from '/public/kari/svg/pipes/pipe_01.svg?raw'
import pipe_02 from '/public/kari/svg/pipes/pipe_02.svg?raw'
import pipe_03 from '/public/kari/svg/pipes/pipe_03.svg?raw'
import pipe_04 from '/public/kari/svg/pipes/pipe_04.svg?raw'
import pipe_05 from '/public/kari/svg/pipes/pipe_05.svg?raw'
import pipe_06 from '/public/kari/svg/pipes/pipe_06.svg?raw'
import pipe_07 from '/public/kari/svg/pipes/pipe_07.svg?raw'
import pipe_08 from '/public/kari/svg/pipes/pipe_08.svg?raw'
import pipe_09 from '/public/kari/svg/pipes/pipe_09.svg?raw'
import { images } from './images'


const svgMap = {
  kari_01, kari_02, kari_03, kari_04, kari_05, 
  kari_06, kari_07, kari_08, kari_09, kari_10,
  kari_11, kari_12, kari_13, kari_14, kari_15, kari_16,
  pipe_01, pipe_02, pipe_03, pipe_04, pipe_05,
  pipe_06, pipe_07, pipe_08, pipe_09,
};

const selectedImage = ref(null);

const selectImage = (image) => selectedImage.value = image;

const handleStartDrag = (event, image) => {
  selectImage(image);
  startDrag(event, image);
};

const { items, startDrag } = useDraggable(images);

// 크기 클래스에서 숫자 추출 함수
const extractSizeValue = (sizeClass) => {
  const match = sizeClass.match(/\[(\d+)rem\]/);
  return match ? parseInt(match[1]) : 18;
};

const getSvgStyle = (size) => {
  const value = extractSizeValue(size);
  return { width: `${value}rem` };
};
</script>

<template>
  <div class="relative h-full w-full flex items-center justify-center">
    <!-- SVG 이미지들 -->
    <div 
      v-for="image in items" 
      :key="image.id" 
      class="flex flex-col items-center absolute cursor-move z-10"
      :class="{ 'z-50': image.isDragging, 
      // 'ring-2 ring-blue-500 ring-opacity-70': selectedImage && selectedImage.id === image.id 
      }"
      :style="{ 
        left: `calc(50% + ${image.x}px)`, 
        top: `calc(50% + ${image.y}px)`, 
        transform: `translate(-50%, -50%) ${image.isDragging ? 'scale(1.02)' : 'scale(1)'}`,
        transition: image.isDragging ? 'none' : 'transform 0.1s ease',
        // border: selectedImage && selectedImage.id === image.id ? '2px solid rgba(59, 130, 246, 0.7)' : 'none',
        // borderRadius: '4px',
        // backgroundColor: image.isDragging ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      }"
      @mousedown="(e) => handleStartDrag(e, image)">
      <div v-html="svgMap[image.id]" :style="getSvgStyle(image.size)"></div>
      <div class="text-white text-xl">{{ image.label }}</div>
      <!-- <span class="text-sm text-gray-500">{{ image.x }}/{{ image.y }}</span> -->
    </div>
  </div>
</template>

<style>
.st0 {
  stroke-width: .3px;
}

.st0, .st1 {
  fill: none;
  stroke: #fff;
}

/* 슬라이드 애니메이션 수정 - 이제 레이어로 표시되므로 translateX만 변경 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* 나머지 스타일 유지 */
.cursor-move:hover {
  cursor: grab;
}

.cursor-move:active {
  cursor: grabbing;
}

.bg-gradient {
  background: linear-gradient(135deg, #070514 0%, #0c0a2b 50%, #141230 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite;

  /* background: linear-gradient(135deg, #040f2d 0%, #061839 50%, #0a2a5a 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite; */

  /* background: linear-gradient(135deg, #052017 0%, #073d2b 50%, #0a5241 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite; */
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 더 심층적인 효과를 위한 추가 옵션 (선택적) */
.bg-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
  pointer-events: none;
}
</style>


<style>
.logo-container {
  position: relative;
  cursor: pointer;
}

.kari-logo {
  overflow: visible;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3));
  transition: filter 0.5s ease;
}

.kari-logo:hover {
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
}

/* 기본 요소 스타일 */
.green-element, .blue-element {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.green-element {
  fill: url(#green-gradient);
}

.blue-element {
  fill: url(#blue-gradient);
}

/* 지연 애니메이션 */
.delay-1 { animation-delay: 0.15s; }
.delay-2 { animation-delay: 0.3s; }
.delay-3 { animation-delay: 0.45s; }
.delay-4 { animation-delay: 0.6s; }
.delay-5 { animation-delay: 0.75s; }
.delay-6 { animation-delay: 0.9s; }

/* 페이드인 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 호버 애니메이션 */
.kari-logo:hover .green-element,
.kari-logo:hover .blue-element {
  animation-play-state: running;
}

.kari-logo:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease-out;
}
</style>