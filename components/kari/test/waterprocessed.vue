<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// 폐수 처리 데이터
const processingData = reactive({
  // 기준 데이터
  dailyCapacity: 5000, // 1일 폐수 처리 용량 (톤)
  hourlyCapacity: 210, // 시간당 폐수 처리 용량 (톤)
  
  // 출력물 데이터
  recycledWater: 4120, // 재활용수 출수량 (톤)
  waterHyacinth: 62, // 물망초 생산량 (kg)
  desalinator: 156, // 탈염제 생산량 (kg)
  deodorizer: 98, // 탈취제 생산량 (kg)
  dyeRemover: 115, // 염색폐수 색도/중금속 제거제 생산량 (kg)
  metalExtractor: 67, // 유가금속 추출제 생산량 (kg)
  ammoniaRemover: 203 // 수질정화용 암모니아성 질소 제거제 생산량 (kg)
});

// 처리량 항목별 정의
const processedItems = reactive([
  {
    id: 'recycledWater',
    label: '재활용수 출수량',
    shortName: '재활용수',
    value: processingData.recycledWater,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: '#0284c7', // sky-600
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    iconClass: 'ri-water-flash-line',
    textColor: 'text-sky-600',
    dailyPercentage: computed(() => (processingData.recycledWater / processingData.dailyCapacity) * 100),
    hourlyPercentage: computed(() => (processingData.recycledWater / 24 / processingData.hourlyCapacity) * 100)
  },
  {
    id: 'waterHyacinth',
    label: '물망초 생산량',
    shortName: '물망초',
    value: processingData.waterHyacinth,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#059669', // emerald-600
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconClass: 'ri-plant-line',
    textColor: 'text-emerald-600',
    dailyPercentage: computed(() => (processingData.waterHyacinth / (processingData.dailyCapacity * 0.02)) * 100),
    hourlyPercentage: computed(() => (processingData.waterHyacinth / 24 / (processingData.hourlyCapacity * 0.02)) * 100)
  },
  {
    id: 'desalinator',
    label: '탈염제 생산량',
    shortName: '탈염제',
    value: processingData.desalinator,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#0d9488', // teal-600
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconClass: 'ri-drop-line',
    textColor: 'text-teal-600',
    dailyPercentage: computed(() => (processingData.desalinator / (processingData.dailyCapacity * 0.04)) * 100),
    hourlyPercentage: computed(() => (processingData.desalinator / 24 / (processingData.hourlyCapacity * 0.04)) * 100)
  },
  {
    id: 'deodorizer',
    label: '탈취제 생산량',
    shortName: '탈취제',
    value: processingData.deodorizer,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#4f46e5', // indigo-600
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconClass: 'ri-filter-line',
    textColor: 'text-indigo-600',
    dailyPercentage: computed(() => (processingData.deodorizer / (processingData.dailyCapacity * 0.025)) * 100),
    hourlyPercentage: computed(() => (processingData.deodorizer / 24 / (processingData.hourlyCapacity * 0.025)) * 100)
  },
  {
    id: 'dyeRemover',
    label: '염색폐수 색도/중금속 제거제 생산량',
    shortName: '색도/중금속 제거제',
    value: processingData.dyeRemover,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#7c3aed', // violet-600
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    iconClass: 'ri-palette-line',
    textColor: 'text-violet-600',
    dailyPercentage: computed(() => (processingData.dyeRemover / (processingData.dailyCapacity * 0.03)) * 100),
    hourlyPercentage: computed(() => (processingData.dyeRemover / 24 / (processingData.hourlyCapacity * 0.03)) * 100)
  },
  {
    id: 'metalExtractor',
    label: '유가금속 추출제 생산량',
    shortName: '유가금속 추출제',
    value: processingData.metalExtractor,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#d97706', // amber-600
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconClass: 'ri-copper-coin-line',
    textColor: 'text-amber-600',
    dailyPercentage: computed(() => (processingData.metalExtractor / (processingData.dailyCapacity * 0.015)) * 100),
    hourlyPercentage: computed(() => (processingData.metalExtractor / 24 / (processingData.hourlyCapacity * 0.015)) * 100)
  },
  {
    id: 'ammoniaRemover',
    label: '수질정화용 암모니아성 질소 제거제 생산량',
    shortName: '암모니아성 질소 제거제',
    value: processingData.ammoniaRemover,
    format: (val) => Number(val).toFixed(0),
    unit: 'kg',
    color: '#0ea5e9', // sky-500
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    iconClass: 'ri-test-tube-line',
    textColor: 'text-sky-600',
    dailyPercentage: computed(() => (processingData.ammoniaRemover / (processingData.dailyCapacity * 0.05)) * 100),
    hourlyPercentage: computed(() => (processingData.ammoniaRemover / 24 / (processingData.hourlyCapacity * 0.05)) * 100)
  }
]);

// 처리 효율 평균 계산
const averageEfficiency = computed(() => {
  const sum = processedItems.reduce((acc, item) => acc + item.dailyPercentage.value, 0);
  return sum / processedItems.length;
});

// 최고 효율 항목 찾기
const bestItem = computed(() => {
  return processedItems.reduce((best, current) => {
    return current.dailyPercentage.value > best.dailyPercentage.value ? current : best;
  }, processedItems[0]);
});

// 최저 효율 항목 찾기
const worstItem = computed(() => {
  return processedItems.reduce((worst, current) => {
    return current.dailyPercentage.value < worst.dailyPercentage.value ? current : worst;
  }, processedItems[0]);
});

// 지난 24시간 처리량 대비 백분율 계산
const totalDailyPercentage = computed(() => {
  return (processingData.recycledWater / processingData.dailyCapacity) * 100;
});

// 현재 뷰 모드
const viewMode = ref('daily'); // 'daily' 또는 'hourly'

// 현재 시간 가져오기
const currentTime = ref(new Date().toLocaleTimeString());

// 업데이트 간격 변수
let updateInterval;

// 컴포넌트 마운트 시 데이터 업데이트 시작
onMounted(() => {
  updateInterval = setInterval(() => {
    // 데이터 변동 시뮬레이션
    processingData.recycledWater = Math.min(processingData.dailyCapacity * 0.95, 
      processingData.recycledWater + (Math.random() * 20 - 5));
    processingData.waterHyacinth = Math.min(processingData.dailyCapacity * 0.02 * 1.1, 
      processingData.waterHyacinth + (Math.random() * 2 - 0.5));
    processingData.desalinator = Math.min(processingData.dailyCapacity * 0.04 * 1.1, 
      processingData.desalinator + (Math.random() * 3 - 0.7));
    processingData.deodorizer = Math.min(processingData.dailyCapacity * 0.025 * 1.1, 
      processingData.deodorizer + (Math.random() * 2 - 0.5));
    processingData.dyeRemover = Math.min(processingData.dailyCapacity * 0.03 * 1.1, 
      processingData.dyeRemover + (Math.random() * 2.5 - 0.5));
    processingData.metalExtractor = Math.min(processingData.dailyCapacity * 0.015 * 1.1, 
      processingData.metalExtractor + (Math.random() * 1.5 - 0.3));
    processingData.ammoniaRemover = Math.min(processingData.dailyCapacity * 0.05 * 1.1, 
      processingData.ammoniaRemover + (Math.random() * 4 - 1));
      
    // 각 항목의 값 업데이트
    processedItems[0].value = processingData.recycledWater;
    processedItems[1].value = processingData.waterHyacinth;
    processedItems[2].value = processingData.desalinator;
    processedItems[3].value = processingData.deodorizer;
    processedItems[4].value = processingData.dyeRemover;
    processedItems[5].value = processingData.metalExtractor;
    processedItems[6].value = processingData.ammoniaRemover;
    
    // 현재 시간 업데이트
    currentTime.value = new Date().toLocaleTimeString();
  }, 5000);
});

// 컴포넌트 언마운트 시 타이머 정리
onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>

<template>
  <div class="w-1/2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
    <!-- 카드 헤더 - Behance 스타일 헤더 -->
    <div class="px-6 py-5 border-b border-gray-100">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-xl font-bold text-gray-900 flex items-center">
            <span class="relative">
              폐수 처리량 대비 자원화 현황
              <span class="absolute -bottom-1 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
            </span>
          </h3>
          <p class="text-sm text-gray-500 mt-1.5">원자재에서 생산품으로의 자원화 효율성</p>
        </div>
        
        <!-- 토글 버튼 -->
        <!-- <div class="bg-gray-100 rounded-lg flex text-sm p-0.5">
          <button 
            @click="viewMode = 'daily'" 
            :class="[
              'px-3 py-1.5 rounded-md transition-all duration-200',
              viewMode === 'daily' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            일간
          </button>
          <button 
            @click="viewMode = 'hourly'" 
            :class="[
              'px-3 py-1.5 rounded-md transition-all duration-200',
              viewMode === 'hourly' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            시간당
          </button>
        </div> -->
      </div>
      
      <!-- 요약 정보 카드 -->
      <div class="grid grid-cols-4 gap-4 mt-5">
        <div class="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-blue-500 uppercase tracking-wider">처리 용량</p>
              <h4 class="text-xl font-bold text-gray-900 mt-1">{{ processingData?.dailyCapacity.toLocaleString() }}톤</h4>
              <p class="text-xs text-gray-500 mt-1">일일 기준</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 text-blue-500 rounded-lg flex items-center justify-center">
              <i class="ri-water-percent-line text-xl"></i>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-green-500 uppercase tracking-wider">시간당</p>
              <h4 class="text-xl font-bold text-gray-900 mt-1">{{ processingData?.hourlyCapacity.toLocaleString() }}톤</h4>
              <p class="text-xs text-gray-500 mt-1">시간당 처리량</p>
            </div>
            <div class="w-10 h-10 bg-green-100 text-green-500 rounded-lg flex items-center justify-center">
              <i class="ri-time-line text-xl"></i>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-purple-500 uppercase tracking-wider">평균 효율</p>
              <h4 class="text-xl font-bold text-gray-900 mt-1">{{ Math.round(averageEfficiency) }}%</h4>
              <p class="text-xs text-gray-500 mt-1">전체 자원화 대비</p>
            </div>
            <div class="w-10 h-10 bg-purple-100 text-purple-500 rounded-lg flex items-center justify-center">
              <i class="ri-bar-chart-line text-xl"></i>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-amber-500 uppercase tracking-wider">최고 효율</p>
              <h4 class="text-xl font-bold text-gray-900 mt-1">{{ bestItem?.shortName }}</h4>
              <p class="text-xs text-gray-500 mt-1">{{ Math.round(bestItem?.dailyPercentage) }}% 달성</p>
            </div>
            <div class="w-10 h-10 bg-amber-100 text-amber-500 rounded-lg flex items-center justify-center">
              <i class="ri-award-line text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 차트 영역 -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-gray-800">자원화 항목별 처리 효율</h4>
        <span class="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{{ viewMode === 'daily' ? '일간 데이터' : '시간당 데이터' }}</span>
      </div>
      
      <!-- 항목별 차트 -->
      <div class="space-y-5">
        <div v-for="item in processedItems" :key="item.id" class="group">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center">
              <div 
                class="w-3 h-3 rounded-full mr-2"
                :style="{ backgroundColor: item.color }"
              ></div>
              <span class="text-sm font-medium text-gray-700">{{ item.label }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-800">{{ item.format(item.value) }}{{ item.unit }}</span>
              <span 
                class="text-xs py-0.5 px-1.5 rounded"
                :class="{
                  'bg-green-100 text-green-700': (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) >= 90,
                  'bg-blue-100 text-blue-700': (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) >= 70 && (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) < 90,
                  'bg-amber-100 text-amber-700': (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) >= 50 && (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) < 70,
                  'bg-red-100 text-red-700': (viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) < 50
                }"
              >
                {{ Math.round(viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) }}%
              </span>
            </div>
          </div>
          <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full transition-all duration-700 ease-out"
              :style="{
                width: `${Math.min(100, viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value)}%`,
                backgroundColor: item.color
              }"
            ></div>
          </div>
          
          <!-- 호버 시 추가 정보 -->
          <div class="mt-1 grid grid-cols-3 gap-2 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
            <div class="text-xs text-gray-500">
              <span class="inline-block w-2 h-2 bg-gray-300 rounded-full mr-1"></span>
              목표: {{ viewMode === 'daily' ? (processingData.dailyCapacity * (item.id === 'recycledWater' ? 1 : item.id === 'waterHyacinth' ? 0.02 : item.id === 'desalinator' ? 0.04 : item.id === 'deodorizer' ? 0.025 : item.id === 'dyeRemover' ? 0.03 : item.id === 'metalExtractor' ? 0.015 : 0.05)).toFixed(0) : (processingData.hourlyCapacity * (item.id === 'recycledWater' ? 1 : item.id === 'waterHyacinth' ? 0.02 : item.id === 'desalinator' ? 0.04 : item.id === 'deodorizer' ? 0.025 : item.id === 'dyeRemover' ? 0.03 : item.id === 'metalExtractor' ? 0.015 : 0.05)).toFixed(0) }}{{ item.unit }}
            </div>
            <div class="text-xs text-gray-500">
              <span class="inline-block w-2 h-2 rounded-full mr-1" :style="{ backgroundColor: item.color }"></span>
              현재: {{ item.format(item.value) }}{{ item.unit }}
            </div>
            <div class="text-xs text-gray-500">
              <span class="inline-block w-2 h-2 bg-blue-300 rounded-full mr-1"></span>
              효율: {{ Math.round(viewMode === 'daily' ? item.dailyPercentage.value : item.hourlyPercentage.value) }}%
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 카드 푸터 -->
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
      <div class="flex items-center text-xs text-gray-500">
        <span class="flex items-center text-blue-500 mr-4">
          <i class="ri-refresh-line mr-1.5"></i>
          매 5초마다 갱신
        </span>
        <span>최종 업데이트: {{ currentTime }}</span>
      </div>
      <div class="flex items-center text-xs">
        <div class="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
        <span class="text-gray-600">실시간 데이터 수신 중</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';

/* 부드러운 전환 효과 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 그룹 호버 효과를 위한 스타일 */
.group:hover {
  background-color: rgba(249, 250, 251, 0.5);
  border-radius: 0.5rem;
}

/* 원형 프로그레스 바 애니메이션 */
svg circle:nth-child(2) {
  transition: stroke-dashoffset 1s ease-in-out;
}

/* 바 차트 애니메이션 */
.h-full {
  transition: width 1s ease-out;
}
</style>