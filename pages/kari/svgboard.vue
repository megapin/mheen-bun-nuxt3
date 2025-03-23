<script setup>
import { useResizeSvg } from '~/composables/useResizeSvg'
import kari_00 from '/public/kari/svg/kari_00.svg?raw'
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


const svgMap = {
  kari_01, kari_02, kari_03, kari_04, kari_05, 
  kari_06, kari_07, kari_08, kari_09, kari_10,
  kari_11, kari_12, kari_13, kari_14, kari_15, kari_16,
  pipe_01, pipe_02, pipe_03, pipe_04, pipe_05,
  pipe_06, pipe_07, pipe_08, pipe_09,
};

// 패널 표시 여부 상태
const showPanel = ref(false);
const activeTab = ref('dashboard');

// 패널 토글 함수
const togglePanel = () => showPanel.value = !showPanel.value;

// 각 이미지의 위치 상태 추가
const images = ref([
  { id: 'kari_01', size: 'w-[20rem]', x: -702, y: 13, isDragging: false, label: '염폐수 저장조', description: '고농도 염폐수를 저장하는 탱크로, 초기 처리 전 유입된 폐수를 보관합니다.' },
  { id: 'kari_02', size: 'w-[22rem]', x: -398, y: -168, isDragging: false, label: '중금속 제거 공정', description: '폐수 내 중금속 이온을 제거하는 공정으로, 선택적 흡착제와 화학적 침전 방식을 활용합니다.' },
  { id: 'kari_03', size: 'w-[18rem]', x: -122, y: -273, isDragging: false, label: '농축 공정', description: '염분 농도를 높이기 위한 공정으로, 증발 과정을 통해 수분을 제거합니다.' },
  { id: 'kari_04', size: 'w-[12rem]', x: 162, y: -374, isDragging: false, label: '순수 활성화 공정', description: '처리된 물을 활성화하는 단계로, 미네랄 균형과 pH를 최적화합니다.' },
  { id: 'kari_05', size: 'w-[12rem]', x: 483, y: -323, isDragging: false, label: '처리수 저장조', description: '정화 과정을 거친 처리수를 임시 보관하는 저장조입니다.' },
  { id: 'kari_06', size: 'w-[18rem]', x: -211, y: 187, isDragging: false, label: '결정 성장 공정', description: '염 결정을 형성하고 성장시키는 공정으로, 정밀한 온도와 압력 제어가 필요합니다.' },
  { id: 'kari_07', size: 'w-[10rem]', x: 47, y: 25, isDragging: false, label: '결정 여과 공정', description: '생성된 결정을 분리하고 정제하는 단계로, 다단계 필터링 시스템을 적용합니다.' },
  { id: 'kari_08', size: 'w-[8rem]', x: 231, y: -66, isDragging: false, label: '물망초', description: '수질 정화에 도움이 되는 특수 배양 식물로, 생물학적 정화 기능을 제공합니다.' },
  { id: 'kari_09', size: 'w-[8rem]', x: 703, y: -100, isDragging: false, label: '탈염제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_11', size: 'w-[8rem]', x: 536, y: 12, isDragging: false, label: '탈취제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_12', size: 'w-[8rem]', x: 366, y: 126, isDragging: false, label: '염색 폐수처리 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_13', size: 'w-[8rem]', x: 199, y: 247, isDragging: false, label: '유가금속 추출제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_10', size: 'w-[8rem]', x: 853, y: 5, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_14', size: 'w-[8rem]', x: 686, y: 121, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_15', size: 'w-[8rem]', x: 516, y: 225, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_16', size: 'w-[8rem]', x: 348, y: 352, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },

  // { id: 'pipe_01', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-01', description: '' },
  // { id: 'pipe_02', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-02', description: '' },
  // { id: 'pipe_03', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-03', description: '' },
  // { id: 'pipe_04', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-04', description: '' },
  // { id: 'pipe_05', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-05', description: '' },
  // { id: 'pipe_06', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-06', description: '' },
  // { id: 'pipe_07', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-07', description: '' },
  // { id: 'pipe_08', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-08', description: '' },
  // { id: 'pipe_09', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-09', description: '' },
]);

// 선택된 이미지 정보
const selectedImage = ref(null);

// 이미지 선택 함수
const selectImage = (image) => selectedImage.value = image;

// 드래그 시작할 때 이미지 선택
const handleStartDrag = (event, image) => {
  selectImage(image);
  startDrag(event, image);
};

// 드래그 관련 상태 및 함수
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



// 파이프라인 연결 정의를 더 상세하게 정의
const pipelines = ref([
  { 
    id: 'pipe-01-02',
    startId: 'kari_01',
    endId: 'kari_02',
    color: '#3b82f6',
    width: 6,
    animated: true,
    flow: 'forward',
    isometric: true,
    elevation: 0.4,
    type: 'water',
    liquid: true,
    markers: true
  },
  { 
    id: 'pipe-02-03',
    startId: 'kari_02',
    endId: 'kari_03',
    color: '#3b82f6',
    width: 5,
    animated: true,
    flow: 'forward',
    isometric: true,
    elevation: 0.3,
    type: 'water',
    liquid: true
  },
  // 다른 파이프라인 정의...
  { 
    id: 'pipe-06-07',
    startId: 'kari_06',
    endId: 'kari_07',
    color: '#f59e0b',
    width: 5,
    animated: true,
    flow: 'forward',
    isometric: true,
    elevation: 0.3,
    type: 'chemical',
    liquid: true
  },
  // 가스 파이프라인 예시
  { 
    id: 'pipe-07-08',
    startId: 'kari_07',
    endId: 'kari_08',
    width: 4,
    animated: true,
    flow: 'forward',
    isometric: true,
    elevation: 0.25,
    type: 'gas',
    liquid: true
  }
]);

// 파이프라인 위치 계산
const pipelineConnections = computed(() => {
  return pipelines.value.map(pipe => {
    // 시작 요소 찾기
    const startItem = items.value.find(item => item.id === pipe.startId);
    // 종료 요소 찾기
    const endItem = items.value.find(item => item.id === pipe.endId);

    if (!startItem || !endItem) return null;

    // SVG 요소의 중앙점을 계산하여 연결점으로 사용
    return {
      id: pipe.id,
      start: {
        x: startItem.x,
        y: startItem.y
      },
      end: {
        x: endItem.x,
        y: endItem.y
      },
      color: pipe.color,
      width: pipe.width,
      animated: pipe.animated,
      flow: pipe.flow
    };
  }).filter(Boolean); // null 값 필터링
});
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-gradient">


    <!-- 상단 헤더 영역 -->
    <div class="px-8 flex items-center justify-between">
      <!-- 좌측 로고 또는 제목 -->
      <div class="text-white font-bold text-lg flex items-center">
        <!-- <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg> -->
        KARI Corp.
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
      <div class="relative h-full w-full flex items-center justify-center">
        <!-- 파이프라인 레이어 (SVG 요소 아래에 배치) -->
        <!-- <div class="absolute inset-0 pointer-events-none">
          <KariIsometricPipeline
            v-for="pipe in pipelineConnections"
            :key="pipe.id"
            :start="pipe.start"
            :end="pipe.end"
            :color="pipe.color"
            :width="pipe.width"
            :animated="pipe.animated"
            :flow="pipe.flow"
          />
        </div> -->
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
      
      <!-- 패널 오버레이 배경 (패널이 표시될 때 배경을 어둡게 처리) -->
      <!-- <div 
        v-if="showPanel" 
        class="fixed inset-0 bg-black bg-opacity-30 z-20"></div> -->

      <!-- 좌측 정보 패널 (이제 오버레이로 표시) -->
      <transition name="slide-left">
        <div v-if="showPanel" class="fixed left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-700 flex flex-col h-screen z-30 shadow-2xl">
          <div class="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-white">공정 정보</h2>
            <button 
              @click="togglePanel" 
              class="text-gray-400 hover:text-white focus:outline-none bg-transparent">X</button>
          </div>
          
          <!-- 이미지 목록 -->
          <div class="flex-1 overflow-auto">
            <div 
              v-for="image in items" 
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
        </div>
      </transition>
      
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

      <!-- 모바일 크기 조절 버튼 (작은 화면에서도 크기 조절 가능) -->
      <div 
        v-if="selectedImage" 
        class="fixed bottom-4 right-4 z-50 lg:hidden">
        <div class="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
          <div class="text-white text-sm mb-2">{{ selectedImage.label }} 크기 조절</div>
          <div class="flex space-x-2">
            <button 
              @click="currentSizeValue = Math.max(8, currentSizeValue - 2)" 
              class="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center">
              <span>-</span>
            </button>
            <div class="bg-gray-700 text-white w-12 h-8 rounded flex items-center justify-center">
              {{ currentSizeValue }}
            </div>
            <button 
              @click="currentSizeValue = Math.min(36, currentSizeValue + 2)" 
              class="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-1 justify-center items-center w-full h-full">
        <KariDatacenter />
      </div>
    </template>
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

/* 파이프라인 관련 스타일 추가 */
.pipeline-glow {
  filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.7));
}

.pipeline-active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.7));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.9));
  }
}
</style>