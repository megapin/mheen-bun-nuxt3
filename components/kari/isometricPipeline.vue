<script setup>
import { computed, ref, onMounted, watch } from 'vue';

const props = defineProps({
  start: {
    type: Object,
    required: true
  },
  end: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  width: {
    type: Number,
    default: 4
  },
  animated: {
    type: Boolean,
    default: false
  },
  flow: {
    type: String,
    default: 'forward'
  },
  dashArray: {
    type: String,
    default: ''
  },
  isometric: {
    type: Boolean,
    default: true
  },
  elevation: {
    type: Number,
    default: 0.3  // 아이소메트릭 고도 비율
  },
  markers: {
    type: Boolean,
    default: false
  },
  liquid: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'default' // 'water', 'chemical', 'gas', 'default'
  }
});

// 경로 계산을 위한 좌표
const adjustedStartX = ref(props.start.x);
const adjustedStartY = ref(props.start.y);
const adjustedEndX = ref(props.end.x);
const adjustedEndY = ref(props.end.y);

// 아이소메트릭 높이와 중간점 계산
const midPoints = computed(() => {
  const dx = adjustedEndX.value - adjustedStartX.value;
  const dy = adjustedEndY.value - adjustedStartY.value;
  
  // 아이소메트릭이 아닌 경우 직선 경로 사용
  if (!props.isometric) {
    return [
      { x: adjustedStartX.value, y: adjustedStartY.value },
      { x: adjustedEndX.value, y: adjustedEndY.value }
    ];
  }
  
  const distance = Math.sqrt(dx * dx + dy * dy);
  const isometricHeight = distance * props.elevation; // 아이소메트릭 효과의 높이

  // 거리에 따른 중간점 계산
  return [
    { x: adjustedStartX.value, y: adjustedStartY.value },
    { x: adjustedStartX.value + dx/4, y: adjustedStartY.value + dy/4 - isometricHeight/2 },
    { x: adjustedStartX.value + dx/2, y: adjustedStartY.value + dy/2 - isometricHeight },
    { x: adjustedStartX.value + dx*3/4, y: adjustedStartY.value + dy*3/4 - isometricHeight/2 },
    { x: adjustedEndX.value, y: adjustedEndY.value }
  ];
});

// SVG 경로 문자열 생성
const pathD = computed(() => {
  const points = midPoints.value;
  
  if (!props.isometric) {
    return `M${points[0].x},${points[0].y} L${points[1].x},${points[1].y}`;
  }
  
  return `M${points[0].x},${points[0].y} 
          C${points[1].x},${points[1].y} 
           ${points[2].x},${points[2].y} 
           ${points[2].x},${points[2].y} 
          S${points[3].x},${points[3].y} 
           ${points[4].x},${points[4].y}`;
});

// 파이프 유형에 따른 스타일 계산
const pipeStyle = computed(() => {
  switch(props.type) {
    case 'water':
      return { 
        color: props.color || '#3b82f6',
        dashArray: props.dashArray || '',
        opacity: props.liquid ? 0.8 : 1,
        glow: props.liquid ? '0 0 5px rgba(59, 130, 246, 0.7)' : 'none'
      };
    case 'chemical':
      return { 
        color: props.color || '#10b981',
        dashArray: props.dashArray || '5,3',
        opacity: props.liquid ? 0.85 : 1,
        glow: props.liquid ? '0 0 5px rgba(16, 185, 129, 0.7)' : 'none'
      };
    case 'gas':
      return { 
        color: props.color || '#f59e0b',
        dashArray: props.dashArray || '2,2',
        opacity: props.liquid ? 0.7 : 1,
        glow: props.liquid ? '0 0 5px rgba(245, 158, 11, 0.5)' : 'none'
      };
    default:
      return { 
        color: props.color,
        dashArray: props.dashArray,
        opacity: 1,
        glow: 'none'
      };
  }
});

// 애니메이션을 위한 CSS 클래스
const animationClass = computed(() => {
  if (!props.animated) return '';
  
  return props.flow === 'forward' ? 'flow-animation-forward' :
         props.flow === 'backward' ? 'flow-animation-backward' : '';
});

// 좌표 업데이트 감시
watch(() => props.start, (newVal) => {
  adjustedStartX.value = newVal.x;
  adjustedStartY.value = newVal.y;
}, { deep: true });

watch(() => props.end, (newVal) => {
  adjustedEndX.value = newVal.x;
  adjustedEndY.value = newVal.y;
}, { deep: true });
</script>

<template>
  <svg 
    class="absolute top-0 left-0 w-full h-full pointer-events-none"
    style="overflow: visible;"
  >
    <!-- 파이프 그림자 효과 -->
    <path
      v-if="liquid"
      :d="pathD"
      :stroke="pipeStyle.color"
      :stroke-width="width + 2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-dasharray="pipeStyle.dashArray"
      :style="{ 
        filter: `drop-shadow(${pipeStyle.glow})`,
        opacity: 0.3 
      }"
    />
    
    <!-- 파이프 기본 선 -->
    <path
      :d="pathD"
      :stroke="pipeStyle.color"
      :stroke-width="width"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-dasharray="pipeStyle.dashArray"
      :style="{ opacity: pipeStyle.opacity }"
    />
    
    <!-- 애니메이션 효과가 있는 파이프 -->
    <path
      v-if="animated"
      :d="pathD"
      :stroke="pipeStyle.color"
      :stroke-width="width - 1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="5,10"
      :class="animationClass"
      :style="{ opacity: liquid ? 0.9 : 0.7 }"
    />
    
    <!-- 시작점 마커 -->
    <circle
      v-if="markers"
      :cx="adjustedStartX"
      :cy="adjustedStartY"
      :r="width"
      :fill="pipeStyle.color"
      stroke="white"
      stroke-width="1"
    />
    
    <!-- 종료점 마커 -->
    <circle
      v-if="markers"
      :cx="adjustedEndX"
      :cy="adjustedEndY"
      :r="width"
      :fill="pipeStyle.color"
      stroke="white"
      stroke-width="1"
    />
  </svg>
</template>

<style scoped>
.flow-animation-forward {
  stroke-dashoffset: 0;
  animation: dash 20s linear infinite;
}

.flow-animation-backward {
  stroke-dashoffset: 0;
  animation: dash-reverse 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -200;
  }
}

@keyframes dash-reverse {
  to {
    stroke-dashoffset: 200;
  }
}
</style>