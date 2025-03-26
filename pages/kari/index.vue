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

import kari_logo from '/public/kari/svg/kari-logo.svg?raw'

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


</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-gradient">


    <!-- 상단 헤더 영역 -->
    <div class="px-8 flex items-center justify-between">
      <!-- 좌측 로고 또는 제목 -->
      <div class="text-white font-bold text-lg flex">

<!-- kari logo -->
<svg
   width=""
   height="50px"
   viewBox="0 0 91.248375 55.233017"
   version="1.1"
   id="svg1"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath46">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-357.36171,-810.54802)"
         id="path46" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath48">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(0,-2.5000001e-5)"
         id="path48" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath50">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-371.82791,-844.75012)"
         id="path50" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath52">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-357.36171,-810.54802)"
         id="path52" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath54">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-440.99061,-890.17182)"
         id="path54" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath56">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-246.78381,-872.31672)"
         id="path56" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath58">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-248.47101,-885.80082)"
         id="path58" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath60">
      <path
         d="M 0,1024 H 1280 V 0 H 0 Z"
         transform="translate(-291.87711,-790.28022)"
         id="path60" />
    </clipPath>
  </defs>
  <g
     id="layer1"
     transform="translate(-59.266669,-120.9146)">
    <path
       id="path45"
       d="M 0,0 C 0,13.398 5.552,25.518 14.466,34.202 V 61.769 H -0.011 V 0 Z"
       style="fill:#8ee14c;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,121.01262,163.89024)"
       clip-path="url(#clipPath46)" />
    <path
       id="path47"
       d="m 435.682,775.803 h -14.477 v 96.514 h 14.477 z"
       style="fill:#3fb465;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,-5.0566483,449.83355)"
       clip-path="url(#clipPath48)" />
    <path
       id="path49"
       d="m 0,0 v -34.202 h 0.011 c 0,18.36 14.937,33.297 33.297,33.297 V 13.572 C 20.364,13.572 8.613,8.39 0,0"
       style="fill:#61bd9b;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,126.11597,151.8245)"
       clip-path="url(#clipPath50)" />
    <path
       id="path51"
       d="M 0,0 H -0.011 V -34.745 H 14.466 V 0 34.202 C 5.552,25.518 0,13.398 0,0"
       style="fill:#3fb465;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,121.01262,163.89024)"
       clip-path="url(#clipPath52)" />
    <path
       id="path53"
       d="m 0,0 c 0,-6.663 -5.401,-12.064 -12.064,-12.064 -6.663,0 -12.064,5.401 -12.064,12.064 0,6.663 5.401,12.064 12.064,12.064 C -5.401,12.064 0,6.663 0,0"
       style="fill:#8ee14c;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,150.51503,135.80073)"
       clip-path="url(#clipPath54)" />
    <path
       id="path55"
       d="M 0,0 H -18.127 L -49.973,-42.26 V 0 H -64.45 v -96.514 h 14.477 v 42.261 l 31.846,-42.261 H 0 l -36.364,48.257 z"
       style="fill:#5b91cc;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,82.003192,142.09961)"
       clip-path="url(#clipPath56)" />
    <path
       id="path57"
       d="m 0,0 -2.299,1.76 c 18.727,24.464 45.986,40.053 76.755,43.895 30.762,3.84 61.38,-4.515 86.217,-23.529 l -1.759,-2.299 C 134.683,38.376 104.816,46.529 74.815,42.782 44.822,39.037 18.252,23.844 0,0"
       style="fill:#16f4ff;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,82.598399,137.34272)"
       clip-path="url(#clipPath58)" />
    <path
       id="path59"
       d="m 0,0 c -18.656,0 -33.78,15.124 -33.78,33.78 0,18.656 15.124,33.78 33.78,33.78 18.656,0 33.78,-15.124 33.78,-33.78 C 33.78,15.124 18.656,0 0,0 M 34.504,82.036 V 67.503 C 25.742,76.466 13.524,82.036 0,82.036 c -26.651,0 -48.257,-21.605 -48.257,-48.256 0,-26.652 21.606,-48.257 48.257,-48.257 13.524,0 25.742,5.57 34.504,14.534 v -14.534 h 14.477 v 96.513 z"
       style="fill:#5b91cc;fill-opacity:1;fill-rule:nonzero;stroke:none"
       transform="matrix(0.35277776,0,0,-0.35277776,97.911106,171.04026)"
       clip-path="url(#clipPath60)" />
  </g>
</svg>


        <!-- <div v-html="kari_logo" pt-2></div> -->
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