<script setup>
// import { useResizeSvg } from '~/composables/useResizeSvg'
import kari_logo from '/public/kari/svg/kari-logo.svg?raw'

const showPanel = ref(false);
const activeTab = ref('dashboard');

const togglePanel = () => showPanel.value = !showPanel.value;
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-gradient">
    <!-- 상단 헤더 영역 -->
    <div class="px-8 flex items-center justify-between">
      <div class="text-white font-bold text-lg flex">
        <div v-html="kari_logo" pt-2></div>
      </div>

      <div class="flex justify-center pt-4 pb-2">
        <div class="toggle-container bg-gray-200 rounded-full p-1 flex">
          <button 
            @click="activeTab = 'dashboard'" 
            class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
            :class="activeTab === 'dashboard' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-600'">
            처리공정
          </button>
          <button 
            @click="activeTab = 'data'" 
            class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
            :class="activeTab === 'data' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-600'">
            운영데이터
          </button>
        </div>
      </div>
      
      <!-- 우측 시간 표시 -->
      <div class="text-gray-400 text-sm flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ new Date().toLocaleTimeString() }}
      </div>
    </div>

    <template v-if="activeTab === 'dashboard'">
      <KariProcess />
      <transition name="slide-left">
        <div v-if="showPanel" class="fixed left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-700 flex flex-col h-screen z-30 shadow-2xl">
          <KariSidePanel @close="showPanel = false" />
        </div>
      </transition>
    </template>

    <template v-else>
      <div class="flex flex-1 justify-center items-center w-full h-full">
        <KariDatacenter />
      </div>
    </template>

    <!-- 패널 토글 버튼 (레이어 방식에 맞게 위치 조정) -->
    <div 
      v-if="!showPanel"
      class="fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
      <button 
        @click="togglePanel" 
        class="bg-gray-800 hover:bg-gray-700 text-white rounded-r-full h-12 w-6 flex items-center justify-center focus:outline-none transition-all duration-300">
        <span class="text-bold text-xl">&gt;</span>
      </button>
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

/* 슬라이더 스타일 커스터마이징 */
input[type="range"] {
  -webkit-appearance: none;
  @apply bg-gray-600;
  height: 4px;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply bg-blue-500;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  @apply bg-blue-500;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
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

/* 맥동 효과 */
.pulsate {
  animation: fadeIn 0.8s ease-out forwards, pulsate 3s ease-in-out infinite;
  animation-delay: 0.5s;
  transform-origin: center;
}

@keyframes pulsate {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
}

/* 흐르는 효과 */
.flow {
  animation: fadeIn 0.8s ease-out forwards, flow 8s infinite alternate;
  animation-delay: 0.75s;
}

@keyframes flow {
  0% {
    filter: hue-rotate(0deg) brightness(1);
  }
  50% {
    filter: hue-rotate(15deg) brightness(1.2);
  }
  100% {
    filter: hue-rotate(0deg) brightness(1);
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