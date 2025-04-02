<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// 제품 생산량 데이터
const productionData = reactive({
  desalinator: 156, // 탈염제 생산량 (톤)
  deodorizer: 98, // 탈취제 생산량 (톤)
  dyeRemover: 115, // 염색폐수 색도/중금속 제거제 생산량 (톤)
  metalExtractor: 67, // 유가금속 추출제 생산량 (톤)
  ammoniaRemover: 203 // 수질정화용 암모니아성 질소 제거제 생산량 (톤)
});

// 월간 목표치
const targets = {
  desalinator: 180,
  deodorizer: 120,
  dyeRemover: 150,
  metalExtractor: 80,
  ammoniaRemover: 220
};

// 아이콘 및 색상 정의
const products = [
  {
    id: 'desalinator',
    label: '탈염제',
    value: productionData.desalinator,
    target: targets.desalinator,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: 'teal',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    iconClass: 'ri-drop-line',
    get percentage() { return (productionData.desalinator / targets.desalinator) * 100; }
  },
  {
    id: 'deodorizer',
    label: '탈취제',
    value: productionData.deodorizer,
    target: targets.deodorizer,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    iconClass: 'ri-filter-line',
    get percentage() { return (productionData.deodorizer / targets.deodorizer) * 100; }
  },
  {
    id: 'dyeRemover',
    label: '염색폐수 색도/중금속 제거제',
    value: productionData.dyeRemover,
    target: targets.dyeRemover,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: 'violet',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    iconClass: 'ri-palette-line',
    get percentage() { return (productionData.dyeRemover / targets.dyeRemover) * 100; }
  },
  {
    id: 'metalExtractor',
    label: '유가금속 추출제',
    value: productionData.metalExtractor,
    target: targets.metalExtractor,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    iconClass: 'ri-copper-coin-line',
    get percentage() { return (productionData.metalExtractor / targets.metalExtractor) * 100; }
  },
  {
    id: 'ammoniaRemover',
    label: '수질정화용 암모니아성 질소 제거제',
    value: productionData.ammoniaRemover,
    target: targets.ammoniaRemover,
    format: (val) => Number(val).toFixed(0),
    unit: '톤',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    iconClass: 'ri-water-flash-line',
    get percentage() { return (productionData.ammoniaRemover / targets.ammoniaRemover) * 100; }
  }
];

// 전체 생산 달성률
const totalPercentage = computed(() => {
  // 각 제품 생산량 합계
  const totalCurrent = productionData.desalinator +
                      productionData.deodorizer +
                      productionData.dyeRemover +
                      productionData.metalExtractor +
                      productionData.ammoniaRemover;
  
  // 각 제품 목표치 합계
  const totalTarget = targets.desalinator +
                     targets.deodorizer +
                     targets.dyeRemover +
                     targets.metalExtractor +
                     targets.ammoniaRemover;
  
  return (totalCurrent / totalTarget) * 100;
});

// 총 생산량
const totalProduction = computed(() => {
  return Math.round(productionData.desalinator +
         productionData.deodorizer +
         productionData.dyeRemover +
         productionData.metalExtractor +
         productionData.ammoniaRemover);
});

// 가장 성과가 좋은 제품 ID
const bestPerformer = computed(() => {
  return products.reduce((best, current) => {
    return (current.percentage.value > best.percentage.value) ? current : best;
  }, products[0]);
});

// 성과가 가장 낮은 제품 ID
const worstPerformer = computed(() => {
  return products.reduce((worst, current) => {
    return (current.percentage.value < worst.percentage.value) ? current : worst;
  }, products[0]);
});

// 데이터 업데이트를 위한 타이머 설정
onMounted(() => {
  // 실제 환경에서는 API 호출 등으로 대체
  const interval = setInterval(() => {
    // 약간의 변동성 추가 (생산량은 보통 점진적으로 증가)
    productionData.desalinator = Math.min(targets.desalinator * 1.2, productionData.desalinator + (Math.random() * 2));
    productionData.deodorizer = Math.min(targets.deodorizer * 1.2, productionData.deodorizer + (Math.random() * 1.5));
    productionData.dyeRemover = Math.min(targets.dyeRemover * 1.2, productionData.dyeRemover + (Math.random() * 1.8));
    productionData.metalExtractor = Math.min(targets.metalExtractor * 1.2, productionData.metalExtractor + (Math.random() * 1));
    productionData.ammoniaRemover = Math.min(targets.ammoniaRemover * 1.2, productionData.ammoniaRemover + (Math.random() * 2.2));
  }, 5000);
  
  onUnmounted(() => clearInterval(interval));
});
</script>

<template>
  <div class="w-1/4 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
    <!-- 카드 헤더 -->
    <div class="px-6 pt-5 pb-4">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold text-gray-800">
            폐수 자원화 제품 생산량
          </h3>
          <p class="text-sm text-gray-500 mt-0.5">월간 생산 현황</p>
        </div>
        <div class="flex items-center">
          <div class="w-12 h-12 relative flex items-center justify-center">
            <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" stroke-width="2"></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                :stroke="totalPercentage > 90 ? '#10b981' : totalPercentage > 70 ? '#0ea5e9' : '#f59e0b'"
                stroke-width="2"
                stroke-dasharray="100"
                :stroke-dashoffset="100 - totalPercentage"
                stroke-linecap="round"
              ></circle>
            </svg>
            <div class="absolute text-sm font-semibold" :class="totalPercentage > 90 ? 'text-emerald-600' : totalPercentage > 70 ? 'text-sky-600' : 'text-amber-600'">
              {{ Math.round(totalPercentage) }}%
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-3 gap-2 mt-3">
        <div class="rounded-lg bg-gray-50 p-2 flex flex-col items-center">
          <div class="text-xs text-gray-500">총 생산량</div>
          <div class="font-bold text-gray-800 mt-1">{{ totalProduction }}톤</div>
        </div>
        <div class="rounded-lg bg-gradient-to-r from-emerald-50 to-white p-2 flex flex-col items-center">
          <div class="text-xs text-emerald-700">최고 실적</div>
          <div class="font-bold text-emerald-800 mt-1">{{ bestPerformer.label }}</div>
        </div>
        <div class="rounded-lg bg-gradient-to-r from-amber-50 to-white p-2 flex flex-col items-center">
          <div class="text-xs text-amber-700">저조 실적</div>
          <div class="font-bold text-amber-800 mt-1">{{ worstPerformer.label }}</div>
        </div>
      </div>
    </div>
    
    <!-- 구분선 -->
    <div class="px-6">
      <div class="h-px bg-gray-100"></div>
    </div>
    
    <!-- 카드 본문 - 생산량 목록 -->
    <div class="px-6 py-4 space-y-3">
      <div v-for="product in products" :key="product.id" class="flex items-start">
        <div :class="[product.bgColor, 'rounded-lg p-2 w-10 h-10 flex items-center justify-center']">
          <i :class="[product.iconClass, product.textColor, 'text-lg']"></i>
        </div>
        
        <div class="ml-3 flex-grow">
          <div class="flex items-center justify-between mb-1">
            <div class="text-sm font-medium text-gray-700">{{ product.label }}</div>
            <div class="flex items-baseline">
              <span class="font-semibold text-gray-800">{{ product.format(product.value) }}</span>
              <span class="text-xs ml-1 text-gray-500">/{{ product.target }}{{ product.unit }}</span>
            </div>
          </div>
          
          <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-500 ease-out"
              :class="{
                'bg-emerald-500': product.percentage >= 90,
                'bg-sky-500': product.percentage >= 70 && product.percentage < 90,
                'bg-amber-500': product.percentage >= 50 && product.percentage < 70,
                'bg-red-500': product.percentage < 50
              }"
              :style="{width: `${Math.min(100, product.percentage)}%`}"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 카드 푸터 -->
    <div class="px-6 py-3 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
      <div>마지막 업데이트: {{ new Date().toLocaleTimeString() }}</div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
        </svg>
        <span>매일 06:00 기준 업데이트</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css';

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 원형 프로그레스 바 애니메이션 */
svg circle:nth-child(2) {
  transition: stroke-dashoffset 1s ease-in-out;
}
</style>