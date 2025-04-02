<script setup>
// 데이터 정의
const treatedWaterData = reactive({
  volume: ref(4200), // 용량 (L)
  temperature: ref(34.7), // 온도 (°C)
  salinity: ref(6.3), // 염도 (%)
  pH: ref(7.4), // pH
  nickelContent: ref(42) // Ni 함량 (ppm)
});

// 최대값 및 임계값 정의
const thresholds = {
  volume: { max: 5000, warning: 4500, critical: 4800 },
  temperature: { min: 30, max: 45, optimal: { min: 32, max: 38 } },
  salinity: { min: 2, max: 15, optimal: { min: 5, max: 10 } },
  pH: { min: 6, max: 9, optimal: { min: 7, max: 8 } },
  nickelContent: { min: 0, max: 100, warning: 60, critical: 80 }
};

// 측정항목 정의
const metrics = [
  {
    id: 'volume',
    label: '① 용량',
    value: computed(() => treatedWaterData.volume),
    format: (val) => Number(val).toFixed(0),
    unit: 'L',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    iconColor: 'text-amber-300'
  },
  {
    id: 'temperature',
    label: '② 온도',
    value: computed(() => treatedWaterData.temperature),
    format: (val) => Number(val).toFixed(1),
    unit: '°C',
    icon: 'M7 16.2V10a2 2 0 012-2h6a2 2 0 012 2v6.2a4 4 0 11-10 0z M12 12v3',
    iconColor: 'text-amber-300'
  },
  {
    id: 'salinity',
    label: '③ 염도',
    value: computed(() => treatedWaterData.salinity),
    format: (val) => Number(val).toFixed(1),
    unit: '%',
    icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
    iconColor: 'text-amber-300'
  },
  {
    id: 'pH',
    label: '④ pH',
    value: computed(() => treatedWaterData.pH),
    format: (val) => Number(val).toFixed(1),
    unit: '',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    iconColor: 'text-amber-300'
  },
  {
    id: 'nickelContent',
    label: '⑤ Ni 함량',
    value: computed(() => treatedWaterData.nickelContent),
    format: (val) => Number(val).toFixed(0),
    unit: 'ppm',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconColor: 'text-amber-300'
  }
];

// 상태에 따른 색상 클래스 반환 함수
const getStatusColor = (value, type) => {
  const t = thresholds[type];
  // value가 ref 객체일 수 있으므로 실제 값 추출
  const actualValue = Number(value);
  
  switch(type) {
    case 'volume':
      return actualValue > t.critical ? 'red' : actualValue > t.warning ? 'yellow' : 'green';
    case 'temperature':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? 'green' : 
             (actualValue < t.min || actualValue > t.max) ? 'red' : 'yellow';
    case 'salinity':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? 'green' : 
             (actualValue < t.min || actualValue > t.max) ? 'red' : 'yellow';
    case 'pH':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? 'green' : 
             (actualValue < t.min || actualValue > t.max) ? 'red' : 'yellow';
    case 'nickelContent':
      return actualValue > t.critical ? 'red' : actualValue > t.warning ? 'yellow' : 'green';
    default:
      return 'blue';
  }
};

// 프로그레스 바 퍼센트 계산 함수
const calculatePercent = (value, type) => {
  const t = thresholds[type];
  // value가 ref 객체일 수 있으므로 실제 값 추출
  const actualValue = Number(value);
  
  switch(type) {
    case 'volume':
      return (actualValue / t.max) * 100;
    case 'temperature':
      return ((actualValue - t.min) / (t.max - t.min)) * 100;
    case 'salinity':
      return ((actualValue - t.min) / (t.max - t.min)) * 100;
    case 'pH':
      return ((actualValue - t.min) / (t.max - t.min)) * 100;
    case 'nickelContent':
      return (actualValue / t.max) * 100;
    default:
      return 50;
  }
};

// 상태 텍스트 계산 함수
const getStatusText = (value, type) => {
  const t = thresholds[type];
  // value가 ref 객체일 수 있으므로 실제 값 추출
  const actualValue = Number(value);
  
  switch(type) {
    case 'volume':
      return actualValue > t.critical ? '위험' : actualValue > t.warning ? '주의' : '정상';
    case 'temperature':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? '최적' : 
             (actualValue < t.min) ? '과냉' : (actualValue > t.max) ? '과열' : 
             (actualValue < t.optimal.min) ? '낮음' : '높음';
    case 'salinity':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? '최적' : 
             (actualValue < t.min) ? '저농도' : (actualValue > t.max) ? '고농도' : 
             (actualValue < t.optimal.min) ? '낮음' : '높음';
    case 'pH':
      return (actualValue >= t.optimal.min && actualValue <= t.optimal.max) ? '최적' : 
             (actualValue < t.min) ? '강산성' : (actualValue > t.max) ? '강알칼리성' : 
             (actualValue < t.optimal.min) ? '산성' : '알칼리성';
    case 'nickelContent':
      return actualValue > t.critical ? '위험' : actualValue > t.warning ? '주의' : '안전';
    default:
      return '정상';
  }
};

// 애니메이션 표시 여부 결정
const shouldAnimate = (value, type) => {
  const t = thresholds[type];
  // value가 ref 객체일 수 있으므로 실제 값 추출
  const actualValue = Number(value);
  
  switch(type) {
    case 'volume':
      return actualValue > t.warning;
    case 'temperature':
      return actualValue > t.optimal.max || actualValue < t.optimal.min;
    case 'salinity':
      return actualValue > t.optimal.max || actualValue < t.optimal.min;
    case 'pH':
      return actualValue > t.optimal.max || actualValue < t.optimal.min;
    case 'nickelContent':
      return actualValue > t.warning;
    default:
      return false;
  }
};

// 전체 상태 평가
const overallStatus = computed(() => {
  const statuses = metrics.map(metric => getStatusColor(metric.value.value, metric.id));
  
  if (statuses.includes('red')) return 'red';
  if (statuses.includes('yellow')) return 'yellow';
  return 'green';
});

// 데이터 업데이트를 위한 타이머 설정
onMounted(() => {
  // 실제 환경에서는 API 호출 등으로 대체
  const interval = setInterval(() => {
    // 약간의 변동성 추가
    treatedWaterData.volume = Math.max(3000, Math.min(5000, treatedWaterData.volume + (Math.random() * 200 - 100)));
    treatedWaterData.temperature = Math.max(30, Math.min(45, treatedWaterData.temperature + (Math.random() * 1 - 0.5)));
    treatedWaterData.salinity = Math.max(2, Math.min(15, treatedWaterData.salinity + (Math.random() * 1 - 0.5)));
    treatedWaterData.pH = Math.max(6, Math.min(9, treatedWaterData.pH + (Math.random() * 0.2 - 0.1)));
    treatedWaterData.nickelContent = Math.max(0, Math.min(100, treatedWaterData.nickelContent + (Math.random() * 8 - 4)));
  }, 5000);
  
  onUnmounted(() => clearInterval(interval));
});
</script>

<template>
  <!-- <div class="w-1/4 bg-gradient-to-br from-red-900 to-rose-800 rounded-xl border border-red-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div class="relative px-4 py-3 border-b border-red-700/40 bg-gradient-to-b from-red-900/90 to-rose-900/80"> -->
  <div class="w-1/4 rounded-xl border border-red-700 shadow-lg  bg-gradient-to-b from-rose-800/80 to-red-900/80 hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div class="relative px-4 py-3 border-b border-red-700/40">

      <!-- 배경 효과 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl opacity-40"></div>
        <div class="absolute top-5 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <!-- 헤더 내용 -->
      <div class="relative z-10 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold text-white flex items-center">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-300 mr-2"></span>
            처리수 상태
          </h3>
        </div>
        <div :class="{
          'px-2 py-1 rounded-full bg-green-500/30 text-green-300 border border-green-500/40': overallStatus === 'green',
          'px-2 py-1 rounded-full bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 animate-pulse': overallStatus === 'yellow',
          'px-2 py-1 rounded-full bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse': overallStatus === 'red'
        }">
          {{ overallStatus === 'green' ? '정상' : overallStatus === 'yellow' ? '주의' : '위험' }}
        </div>
      </div>
    </div>
    
    <!-- 카드 본문 - 측정값 표시 -->
    <!-- <div class="p-4 space-y-3.5 bg-gradient-to-b from-red-900/70 to-rose-800/80"> -->
    <div class="p-4 space-y-3.5">
      <!-- v-for를 사용하여 각 측정 항목 렌더링 -->
      <div v-for="metric in metrics" :key="metric.id" class="flex items-center group">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-red-500/10 mr-3 group-hover:from-amber-500/30 group-hover:to-red-500/20 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="metric.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="metric.icon" />
          </svg>
        </div>
        
        <div class="flex-grow">
          <div class="flex justify-between items-center mb-1">
            <div class="text-amber-200 font-medium">{{ metric.label }}</div>
            <div class="flex items-baseline">
              <span class="text-sm font-semibold text-white">{{ metric.format(metric.value.value) }}</span>
              <span v-if="metric.unit" class="text-xs ml-1 text-amber-200/80">{{ metric.unit }}</span>
            </div>
          </div>
          <div class="relative h-2 bg-red-900/80 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              class="absolute top-0 left-0 h-full rounded-full shadow-sm"
              :class="{
                'bg-gradient-to-r from-green-400 to-green-500': getStatusColor(metric.value.value, metric.id) === 'green',
                'bg-gradient-to-r from-yellow-400 to-yellow-500': getStatusColor(metric.value.value, metric.id) === 'yellow',
                'bg-gradient-to-r from-red-400 to-red-500': getStatusColor(metric.value.value, metric.id) === 'red',
                'animate-pulse': shouldAnimate(metric.value.value, metric.id)
              }"
              :style="{width: `${calculatePercent(metric.value.value, metric.id)}%`}"
            ></div>
          </div>
        </div>
        
        <div 
          class="ml-3 text-xs px-1.5 py-0.5 rounded-md"
          :class="{
            'bg-green-500/30 text-green-300': getStatusColor(metric.value.value, metric.id) === 'green',
            'bg-yellow-500/30 text-yellow-300': getStatusColor(metric.value.value, metric.id) === 'yellow',
            'bg-red-500/30 text-red-300': getStatusColor(metric.value.value, metric.id) === 'red'
          }"
        >
          {{ getStatusText(metric.value.value, metric.id) }}
        </div>
      </div>
    </div>
    
    <!-- 카드 푸터 -->
    <div class="p-4 border-t border-red-700/30 flex justify-between items-center text-xs text-amber-200/70">
      <div ml-auto>마지막 업데이트: {{ new Date().toLocaleTimeString() }}</div>
      <!-- <div class="flex space-x-1.5">
        <div class="h-1.5 w-1.5 rounded-full bg-amber-500/50 animate-pulse delay-100"></div>
        <div class="h-1.5 w-1.5 rounded-full bg-amber-500/50 animate-pulse delay-200"></div>
        <div class="h-1.5 w-1.5 rounded-full bg-amber-500/50 animate-pulse delay-300"></div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-br {
  transition: all 0.3s ease;
}

.bg-gradient-to-br:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(159, 18, 57, 0.5);
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>