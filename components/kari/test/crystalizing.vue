<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// 생산 데이터
const productionData = reactive({
  dailyCapacity: 100, // 일일 최대 생산 가능 용량 (kg)
  currentTotal: 62, // 현재까지 생산된 총량 (kg)
  targetProduction: 80, // 일일 목표 생산량 (kg)
  hourlyAverage: 2.6, // 시간당 평균 생산량 (kg)
  processEfficiency: 87, // 공정 효율 (%)
  
  // 시간별 데이터 (최근 24시간)
  hourlyData: [
    19, 18, 17, 20, 21, 23, 25, 27, 30, 33, 
    35, 38, 42, 45, 47, 49, 52, 55, 57, 59, 
    61, 62, 62, 62
  ],
  
  // 날짜별 데이터 (최근 14일)
  dailyData: [
    38, 42, 45, 48, 51, 53, 56, 58, 60, 62, 
    64, 65, 67, 69
  ]
});

// 차트 데이터 포맷팅
const chartData = computed(() => {
  const hourLabels = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i);
    hourLabels.push(d.getHours() + ':00');
  }
  
  return {
    hourly: {
      labels: hourLabels,
      values: productionData.hourlyData
    },
    daily: {
      labels: Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (13 - i));
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      values: productionData.dailyData
    }
  };
});

// 목표 달성률
const completionRate = computed(() => {
  return (productionData.currentTotal / productionData.targetProduction) * 100;
});

// 남은 생산량
const remainingProduction = computed(() => {
  return Math.max(0, productionData.targetProduction - productionData.currentTotal);
});

// 예상 완료 시간
const estimatedCompletion = computed(() => {
  if (productionData.currentTotal >= productionData.targetProduction) {
    return '목표 달성 완료';
  }
  
  const remaining = remainingProduction.value;
  const hoursRemaining = remaining / productionData.hourlyAverage;
  
  const now = new Date();
  const completion = new Date(now.getTime() + hoursRemaining * 60 * 60 * 1000);
  
  return completion.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

// 차트 표시 모드
const chartMode = ref('hourly'); // 'hourly' 또는 'daily'

// 데이터 시뮬레이션을 위한 타이머
let updateInterval;

// 현재 시간
const currentTime = ref(new Date().toLocaleTimeString());

onMounted(() => {
  // 실시간 데이터 업데이트 시뮬레이션
  updateInterval = setInterval(() => {
    // 현재 시간 업데이트
    currentTime.value = new Date().toLocaleTimeString();
    
    // 생산량 증가 시뮬레이션 (목표량까지만)
    if (productionData.currentTotal < productionData.targetProduction) {
      const increase = (Math.random() * 0.5) + 0.1;
      productionData.currentTotal = Math.min(
        productionData.targetProduction,
        productionData.currentTotal + increase
      );
      
      // 마지막 시간의 데이터 업데이트
      productionData.hourlyData[productionData.hourlyData.length - 1] = productionData.currentTotal;
    }
    
    // 공정 효율 변동 시뮬레이션
    productionData.processEfficiency = Math.min(
      100,
      productionData.processEfficiency + (Math.random() * 2 - 1)
    );
    
    // 시간당 평균 업데이트
    productionData.hourlyAverage = productionData.currentTotal / 24;
  }, 3000);
  
  // 현재 시간 업데이트
  // setInterval(() => {
  //   currentTime.value = new Date().toLocaleTimeString();
  // }, 1000);
});

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>

<template>
  <div class="rounded-xl overflow-hidden shadow-lg" style="background: linear-gradient(135deg, #0f2c61 0%, #144d36 100%);">
    <!-- 헤더 섹션 -->
    <div class="px-6 pt-5 pb-4">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-bold text-white flex items-center">
            <span class="relative">
              물망초 생산량
              <span class="absolute -bottom-1 left-0 w-10 h-1 bg-green-400 rounded-full"></span>
            </span>
          </h3>
          <p class="text-sm text-blue-100 opacity-80 mt-1.5">결정여과 공정 후 생산된 물망초</p>
        </div>
        
        <!-- 차트 전환 버튼 -->
        <!-- <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg flex text-xs p-0.5">
          <button 
            @click="chartMode = 'hourly'" 
            :class="[
              'px-2.5 py-1 rounded-md transition-all duration-200',
              chartMode === 'hourly' ? 'bg-green-500 text-white shadow-sm' : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
            ]"
          >
            시간별
          </button>
          <button 
            @click="chartMode = 'daily'" 
            :class="[
              'px-2.5 py-1 rounded-md transition-all duration-200 ml-1',
              chartMode === 'daily' ? 'bg-green-500 text-white shadow-sm' : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
            ]"
          >
            일별
          </button>
        </div> -->
      </div>
      
      <!-- 주요 지표 카드 -->
      <div class="grid grid-cols-3 gap-3 mt-5">
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-blue-100 uppercase tracking-wider">현재 생산량</p>
              <h4 class="text-xl font-bold text-white mt-1">{{ productionData.currentTotal.toFixed(1) }}kg</h4>
              <p class="text-xs text-blue-100 opacity-70 mt-1">목표: {{ productionData.targetProduction }}kg</p>
            </div>
            <div class="w-10 h-10 bg-green-500 bg-opacity-20 text-green-400 rounded-lg flex items-center justify-center">
              <i class="ri-plant-line text-xl"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-blue-100 uppercase tracking-wider">시간당 평균</p>
              <h4 class="text-xl font-bold text-white mt-1">{{ productionData.hourlyAverage.toFixed(1) }}kg</h4>
              <p class="text-xs text-blue-100 opacity-70 mt-1">남은 양: {{ remainingProduction.toFixed(1) }}kg</p>
            </div>
            <div class="w-10 h-10 bg-blue-500 bg-opacity-20 text-blue-300 rounded-lg flex items-center justify-center">
              <i class="ri-time-line text-xl"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-blue-100 uppercase tracking-wider">공정 효율</p>
              <h4 class="text-xl font-bold text-white mt-1">{{ Math.round(productionData.processEfficiency) }}%</h4>
              <p class="text-xs text-blue-100 opacity-70 mt-1">예상 완료: {{ estimatedCompletion }}</p>
            </div>
            <div class="w-10 h-10 bg-purple-500 bg-opacity-20 text-purple-300 rounded-lg flex items-center justify-center">
              <i class="ri-dashboard-line text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 차트 섹션 -->
    <div class="px-6 pt-2 pb-4">
      <!-- 목표 달성률 표시 -->
      <div class="mb-5">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-white">목표 달성률</span>
          <span class="text-sm font-bold text-white">{{ Math.round(completionRate) }}%</span>
        </div>
        <div class="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500 ease-out"
            :class="{
              'bg-green-400': completionRate >= 90,
              'bg-blue-400': completionRate >= 70 && completionRate < 90,
              'bg-yellow-400': completionRate >= 50 && completionRate < 70,
              'bg-red-400': completionRate < 50
            }"
            :style="{width: `${Math.min(100, completionRate)}%`}"
          ></div>
        </div>
      </div>
      
      <!-- 차트 영역 -->
      <div class="h-56 relative">
        <!-- 부드러운 채워진 선 차트 -->
        <div class="h-full w-full relative">
          <!-- 실제 차트는 여기에 SVG로 구현 -->
          <svg class="w-full h-full">
            <!-- X축, Y축 라인 -->
            <line x1="0" y1="220" x2="100%" y2="220" stroke="rgba(255,255,255,0.2)" />
            <line x1="0" y1="0" x2="0" y2="220" stroke="rgba(255,255,255,0.2)" />
            
            <!-- 데이터 포인트 영역 -->
            <path 
              :d="
                'M' + 
                chartMode === 'hourly' 
                  ? chartData.hourly.values.map((val, i) => 
                    `${(i/(chartData.hourly.values.length-1))*100}% ${(1-(val/80))*180}`)
                  : chartData.daily.values.map((val, i) => 
                    `${(i/(chartData.daily.values.length-1))*100}% ${(1-(val/80))*180}`)
              "
              stroke="url(#chartGradient)"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            
            <!-- 채우기 영역 -->
            <path 
              :d="
                'M' + 
                (chartMode === 'hourly' 
                  ? chartData.hourly.values.map((val, i) => 
                    `${(i/(chartData.hourly.values.length-1))*100}% ${(1-(val/80))*180}`).join(' L')
                  : chartData.daily.values.map((val, i) => 
                    `${(i/(chartData.daily.values.length-1))*100}% ${(1-(val/80))*180}`).join(' L')) +
                ' L100% 220 L0 220 Z'
              "
              fill="url(#areaGradient)"
              opacity="0.3"
            />
            
            <!-- 데이터 포인트 -->
            <g>
              <circle 
                v-for="(val, i) in (chartMode === 'hourly' ? chartData.hourly.values : chartData.daily.values)"
                :key="`point-${i}`"
                :cx="`${(i/((chartMode === 'hourly' ? chartData.hourly.values.length : chartData.daily.values.length)-1))*100}%`"
                :cy="`${(1-(val/80))*180}`"
                r="4"
                fill="#4ade80"
                stroke="white"
                stroke-width="2"
              />
            </g>
            
            <!-- 그라디언트 정의 -->
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#10b981" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
          
          <!-- 차트 라벨 -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-blue-100 opacity-70">
            <span v-for="(label, i) in (chartMode === 'hourly' ? 
              [chartData.hourly.labels[0], chartData.hourly.labels[8], chartData.hourly.labels[16], chartData.hourly.labels[23]] : 
              [chartData.daily.labels[0], chartData.daily.labels[4], chartData.daily.labels[9], chartData.daily.labels[13]])" 
              :key="`label-${i}`"
            >
              {{ label }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 범례 -->
      <div class="flex items-center justify-center mt-3 space-x-4">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-1.5"></div>
          <span class="text-xs text-blue-100">{{ chartMode === 'hourly' ? '시간당 생산량' : '일별 생산량' }}</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-green-400 mr-1.5"></div>
          <span class="text-xs text-blue-100">측정 포인트</span>
        </div>
      </div>
    </div>
    
    <!-- 푸터 섹션 -->
    <div class="px-6 py-3 bg-black bg-opacity-20 backdrop-blur-sm flex justify-between items-center">
      <div class="flex items-center text-xs text-blue-100 opacity-70">
        <span class="flex items-center mr-4">
          <i class="ri-refresh-line mr-1.5"></i>
          3초마다 갱신
        </span>
        <span>최종 업데이트: {{ currentTime }}</span>
      </div>
      <div class="flex items-center text-xs">
        <div class="w-2 h-2 rounded-full bg-green-400 mr-1.5 animate-pulse"></div>
        <span class="text-blue-100">생산 데이터 모니터링 중</span>
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

/* 페이드인/아웃 트랜지션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 애니메이션 효과 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 차트 스타일링 */
svg {
  overflow: visible;
}

path {
  transition: d 0.7s ease;
}

circle {
  transition: cx 0.7s ease, cy 0.7s ease;
}
</style>