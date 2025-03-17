<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

// const selectedImg = ref<string>('jinseong-isometric-05.jpg')
const selectedImg = ref<string>('/kari/svg/yw-01')
const units = ref(Array(8).fill(0).map((_, i) => `jinseong-isometric-0${i + 1}.jpg`))

const activeTab = ref<string>('dashboard')

// 실시간 데이터 업데이트를 위한 상태와 함수들
const filterEfficiency = ref(Math.floor(Math.random() * 40) + 50) // 50% ~ 90% 사이
const tankCapacity = ref(Math.floor(Math.random() * 50) + 30) // 30% ~ 80% 사이
const flowRate = ref(Math.floor(Math.random() * 50) + 25) // 25 ~ 75 m³/hr 사이
const pHLevel = ref(Math.random() * 2 + 6) // 6.0 ~ 8.0 사이
const treatmentStages = ref(Array(24).fill(0).map(() => Math.floor(Math.random() * 100)))
const waterQuality = ref(Array(20).fill(0).map(() => ({ 
  inflow: Math.floor(Math.random() * 100),
  outflow: Math.floor(Math.random() * 50)
})))
const pumpStatus = ref([
  { name: '주처리펌프-A', status: 'online', uptime: '45d 12h', load: Math.random() * 40 + 30 },
  { name: '침전조펌프-B', status: 'online', uptime: '32d 5h', load: Math.random() * 40 + 20 },
  { name: '약품투입기-C', status: 'maintenance', uptime: '8h 23m', load: Math.random() * 10 + 5 },
  { name: '배출펌프-D', status: 'online', uptime: '12d 3h', load: Math.random() * 40 + 40 },
])
const alertLogs = ref([
  { time: '09:45:12', type: 'warning', message: 'pH 수치 상승 - 침전조-B' },
  { time: '08:32:05', type: 'info', message: '약품 자동 투입 완료' },
  { time: '07:15:44', type: 'error', message: '폭기조 산소 농도 감소 - 구역 5' },
  { time: '06:50:29', type: 'warning', message: '오염물질 농도 75% 임계값 초과' },
])

// 실시간 데이터 업데이트 인터벌
let updateInterval: number | null = null
const startDataUpdates = () => {
  updateInterval = window.setInterval(() => {
    // 필터 효율성 업데이트 (부드러운 변동)
    filterEfficiency.value = Math.max(40, Math.min(95, filterEfficiency.value + (Math.random() * 10 - 5)))
    
    // 탱크 용량 업데이트
    tankCapacity.value = Math.max(25, Math.min(90, tankCapacity.value + (Math.random() * 8 - 4)))
    
    // 유량 속도 업데이트
    flowRate.value = Math.max(15, Math.min(80, flowRate.value + (Math.random() * 12 - 6)))
    
    // pH 레벨 업데이트
    pHLevel.value = Math.max(6, Math.min(8, pHLevel.value + (Math.random() * 0.2 - 0.1)))
    
    // 처리 단계 업데이트
    treatmentStages.value = treatmentStages.value.map(val => 
      Math.max(5, Math.min(95, val + (Math.random() * 20 - 10)))
    )
    
    // 수질 업데이트 - 새 데이터 추가, 오래된 데이터 제거
    waterQuality.value.shift()
    waterQuality.value.push({
      inflow: Math.floor(Math.random() * 100),
      outflow: Math.floor(Math.random() * 50)
    })
    
    // 펌프 상태 업데이트
    pumpStatus.value = pumpStatus.value.map(pump => ({
      ...pump,
      load: Math.max(5, Math.min(95, Number(pump.load) + (Math.random() * 10 - 5)))
    }))
    
    // 1% 확률로 새 알림 추가
    if (Math.random() < 0.01) {
      const types = ['info', 'warning', 'error']
      const messages = [
        'pH 수치 변동 감지',
        '오염물질 농도 임계값 도달',
        '산소 농도 부족 감지',
        '약품 보충 필요',
        '탱크 용량 경고'
      ]
      
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      
      alertLogs.value.unshift({
        time: `${hours}:${minutes}:${seconds}`,
        type: types[Math.floor(Math.random() * types.length)],
        message: `${messages[Math.floor(Math.random() * messages.length)]} - ${pumpStatus.value[Math.floor(Math.random() * pumpStatus.value.length)].name}`
      })
      
      // 최대 로그 수 제한
      if (alertLogs.value.length > 8) {
        alertLogs.value.pop()
      }
    }
  }, 1500)
}

// 태그 전환 함수
const toggleTab = (tab: string) => {
  activeTab.value = tab
}

// 부드러운 SVG 곡선 경로 생성 함수
const createSmoothPath = (points) => {
  if (points.length < 2) return '';
  
  let path = '';
  // 첫 번째 포인트로 시작
  const firstPoint = points[0];
  path += `L${firstPoint[0]},${firstPoint[1]}`;
  
  // 각 포인트 쌍에 대해 베지어 곡선 생성
  for (let i = 1; i < points.length; i++) {
    const curr = points[i];
    const prev = points[i-1];
    
    // 제어점 계산
    const cp1x = prev[0] + (curr[0] - prev[0]) / 3;
    const cp1y = prev[1];
    const cp2x = prev[0] + (curr[0] - prev[0]) * 2 / 3;
    const cp2y = curr[1];
    
    // 쿠빅 베지어 곡선 추가
    path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr[0]},${curr[1]}`;
  }
  
  return path;
};

// 각 이미지의 위치 상태 추가
const imagePositions = ref([
  { id: 'kari_01', x: 0, y: 0, isDragging: false },
  { id: 'kari_02', x: 100, y: 100, isDragging: false },
  { id: 'kari_03', x: 200, y: 200, isDragging: false },
  { id: 'kari_04', x: 400, y: 100, isDragging: false },
  { id: 'kari_05', x: 500, y: 20, isDragging: false },
  { id: 'kari_06', x: 600, y: 50, isDragging: false },
  { id: 'kari_07', x: -600, y: 100, isDragging: false },
  { id: 'kari_08', x: -500, y: -500, isDragging: false },
  { id: 'kari_09', x: -300, y: -300, isDragging: false },
  { id: 'kari_10', x: -100, y: -100, isDragging: false },
]);

// 드래그 관련 상태 및 함수
const dragOffset = ref({ x: 0, y: 0 });

const startDrag = (event, image) => {
  const index = imagePositions.value.findIndex(img => img.id === image.id);
  if (index !== -1) {
    // 현재 드래그 중인 이미지를 맨 위로 표시하기 위해 z-index 조정을 위한 플래그
    imagePositions.value[index].isDragging = true;
    
    // 마우스 위치와 이미지 위치의 차이 계산
    dragOffset.value = {
      x: event.clientX - imagePositions.value[index].x,
      y: event.clientY - imagePositions.value[index].y
    };
    
    // 마우스 이동 및 마우스 업 이벤트 리스너 등록
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', endDrag);
  }
};

const handleDrag = (event) => {
  // 드래그 중인 이미지 찾기
  const index = imagePositions.value.findIndex(img => img.isDragging);
  if (index !== -1) {
    // 새 위치 계산
    imagePositions.value[index].x = event.clientX - dragOffset.value.x;
    imagePositions.value[index].y = event.clientY - dragOffset.value.y;
  }
};

const endDrag = () => {
  // 드래그 상태 초기화
  imagePositions.value = imagePositions.value.map(img => ({
    ...img,
    isDragging: false
  }));
  
  // 이벤트 리스너 제거
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', endDrag);
};

onMounted(() => {
  startDataUpdates()
  
  // 드래그 이벤트가 페이지 밖으로 나갔을 때도 처리
  document.addEventListener('mouseleave', endDrag);
})

onUnmounted(() => {
  if (updateInterval !== null) {
    clearInterval(updateInterval)
  }

  // 이벤트 리스너 정리
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', endDrag);
  document.removeEventListener('mouseleave', endDrag);
})
</script>

<template>
  <div class="overflow-auto h-screen w-screen flex flex-col overflow-hidden bg-gray-900">
    <!-- 상단 헤더 영역 -->
    <div class="w-full bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md py-3 px-4 flex items-center justify-between">
      <!-- 좌측 로고 또는 제목 -->
      <div class="text-white font-bold text-lg flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        KARI
      </div>

      <div class="w-full flex justify-center pt-4 pb-2">
        <div class="toggle-container bg-gray-200 rounded-full p-1 flex">
          <button 
            @click="toggleTab('dashboard')" 
            class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
            :class="activeTab === 'dashboard' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-300'">
            처리공정
          </button>
          <button 
            @click="toggleTab('data')" 
            class="b-none toggle-button py-1.5 px-6 rounded-full font-medium text-sm transition-all duration-200"
            :class="activeTab === 'data' ? 'bg-black fw-600 text-gray-200 shadow-sm' : 'text-gray-300'">
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

    <!-- 콘텐츠 영역 - 트랜지션 적용 -->
    <!-- <div class="content-container flex-1 overflow-hidden relative"> -->
    <div class="flex-1 overflow-auto relative">
      <transition name="slide">
        <div v-if="activeTab === 'dashboard'" key="dashboard" class="absolute inset-0 flex justify-center items-center bg-gray-800">
          <!-- <div class="relative dashboard-container"> -->
          <!-- 대시보드 장식 요소들 (기존 코드 유지) -->
          <div class="absolute top-4 left-4 bg-black bg-opacity-50 text-cyan-400 p-2 rounded text-xs border border-cyan-800 z-20 flex items-center">
            <span class="mr-1 w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
            정화 시스템 가동중
          </div>
          
          <div class="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded text-xs border border-gray-700 z-20">
            시설ID: WTP-{{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}}
          </div>
          <div class="relative">
            <!-- 이미지 위에 오버레이 효과 -->
            <div class="overlay-grid"></div>
            
            <!-- 이미지들을 드래그 가능하게 수정 -->
            <div 
              v-for="image in imagePositions" 
              :key="image.id" 
              class="absolute cursor-move z-10"
              :class="{ 'z-50': image.isDragging }"
              :style="{ 
                left: `${image.x}px`, 
                top: `${image.y}px`, 
                transform: image.isDragging ? 'scale(1.02)' : 'scale(1)',
                transition: image.isDragging ? 'none' : 'transform 0.1s ease'
              }"
              @mousedown="(e) => startDrag(e, image)"
            >
              <div v-if="image.id === 'kari_01'" v-html="kari_01" class="w-[20rem]"></div>
              <div v-else-if="image.id === 'kari_02'" v-html="kari_02" class="w-[30rem]"></div>
              <div v-else-if="image.id === 'kari_03'" v-html="kari_03" class="w-[23rem]"></div>
              <div v-else-if="image.id === 'kari_04'" v-html="kari_04" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_05'" v-html="kari_05" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_06'" v-html="kari_06" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_07'" v-html="kari_07" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_08'" v-html="kari_08" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_09'" v-html="kari_09" class="w-[15rem]"></div>
              <div v-else-if="image.id === 'kari_10'" v-html="kari_10" class="w-[15rem]"></div>
            </div>
            
          </div>
        </div>

        <div v-else key="datacenter" class="absolute inset-0 overflow-auto p-4 bg-gray-800 flex flex-col gap-4">
          <!-- Top Row: Key Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- 필터 효율성 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">필터 효율성</div>
              <div class="text-2xl font-bold text-white">{{ filterEfficiency.toFixed(1) }}%</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${filterEfficiency}%`, backgroundColor: filterEfficiency > 70 ? '#22c55e' : filterEfficiency > 50 ? '#f59e0b' : '#ef4444'}" 
                  :class="filterEfficiency < 50 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-green-500">{{ (filterEfficiency * 0.85).toFixed(1) }}%</span> 24시간 평균
              </div>
            </div>
            
            <!-- 탱크 용량 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">탱크 용량</div>
              <div class="text-2xl font-bold text-white">{{ tankCapacity.toFixed(1) }}%</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${tankCapacity}%`, backgroundColor: tankCapacity > 80 ? '#ef4444' : tankCapacity > 60 ? '#f59e0b' : '#22c55e'}"
                  :class="tankCapacity > 80 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-green-500">{{ (tankCapacity * 0.92).toFixed(1) }}m³</span> / 5000m³
              </div>
            </div>
            
            <!-- 유량 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">유량</div>
              <div class="text-2xl font-bold text-white">{{ flowRate.toFixed(1) }} m³/hr</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full bg-blue-500 rounded-full" :style="{width: `${flowRate/100*100}%`}"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span><span class="text-blue-500">↑</span> {{ (flowRate * 0.4).toFixed(1) }} 유입</span>
                <span><span class="text-green-500">↓</span> {{ (flowRate * 0.6).toFixed(1) }} 배출</span>
              </div>
            </div>
            
            <!-- pH 레벨 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">pH 레벨</div>
              <div class="text-2xl font-bold text-white">{{ pHLevel.toFixed(1) }}</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${(pHLevel - 5) * 40}%`, backgroundColor: pHLevel > 7.5 ? '#ef4444' : pHLevel < 6.5 ? '#f59e0b' : '#22c55e'}"
                  :class="pHLevel > 7.8 || pHLevel < 6.2 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-yellow-500">{{ pHLevel > 7 ? '+' : '-' }}{{ Math.abs((pHLevel - 7) * 0.3).toFixed(1) }}</span> 최적 수치 대비
              </div>
            </div>
          </div>
          
          <!-- Middle Row: Charts -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 처리 단계 차트 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-white">처리 단계 효율</h3>
                <div class="text-xs text-gray-500">최근 24시간</div>
              </div>
              
              <div class="h-40 relative">
                <!-- Y축 눈금 -->
                <div class="absolute inset-y-0 left-0 flex flex-col justify-between pr-2 text-xs text-gray-500 z-10">
                  <div>100%</div>
                  <div>50%</div>
                  <div>0%</div>
                </div>
                
                <!-- 차트 영역 -->
                <div class="absolute inset-0 left-8 right-0 flex items-end">
                  <div v-for="(load, i) in treatmentStages" :key="i" class="flex-1 h-full flex items-end mx-0.5">
                    <div :style="{height: `${load}%`}" 
                      :class="`w-full rounded-t ${load > 80 ? 'bg-green-500' : load > 60 ? 'bg-yellow-500' : 'bg-red-500'}`">
                    </div>
                  </div>
                </div>
                
                <!-- 참조선 -->
                <!-- <div class="absolute left-8 right-0 top-0 border-t border-dashed border-gray-600 z-5"></div>
                <div class="absolute left-8 right-0 top-1/2 border-t border-dashed border-gray-600 z-5"></div>
                <div class="absolute left-8 right-0 bottom-0 border-t border-dashed border-gray-600 z-5"></div> -->
              </div>
              
              <!-- 시간 표시 -->
              <div class="flex justify-between mt-2 text-xs text-gray-500 pl-8">
                <div>00:00</div>
                <div>06:00</div>
                <div>12:00</div>
                <div>18:00</div>
                <div>24:00</div>
              </div>
            </div>
            
            <!-- 수질 차트 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-white">수질 오염도</h3>
                <div class="text-xs text-gray-500">실시간</div>
              </div>
              
              <div class="h-40 relative">
                <!-- Y축 눈금 -->
                <div class="absolute inset-y-0 left-0 flex flex-col justify-between pr-2 text-xs text-gray-500 z-40">
                  <div>100%</div>
                  <div>50%</div>
                  <div>0%</div>
                </div>
                
                <!-- 차트 영역 -->
                <div class="absolute inset-0 left-8 right-0">
                  <!-- 유입 오염도 영역 -->
                  <svg class="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      :d="`
                        M0,${100 - waterQuality[0].inflow} 
                        ${createSmoothPath(waterQuality.map((point, i) => [i * (100 / (waterQuality.length - 1)), 100 - point.inflow]))}
                        V100 H0 Z
                      `"
                      fill="rgba(239, 68, 68, 0.3)"
                    ></path>
                  </svg>
                  
                  <!-- 배출 오염도 영역 -->
                  <svg class="absolute inset-0 w-full h-full z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      :d="`
                        M0,${100 - waterQuality[0].outflow} 
                        ${createSmoothPath(waterQuality.map((point, i) => [i * (100 / (waterQuality.length - 1)), 100 - point.outflow]))}
                        V100 H0 Z
                      `"
                      fill="rgba(34, 197, 94, 0.3)"
                    ></path>
                  </svg>
                  
                  <!-- 참조선 -->
                  <!-- <div class="absolute inset-x-0 top-0 border-t border-dashed border-gray-600 z-5"></div>
                  <div class="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-600 z-5"></div>
                  <div class="absolute inset-x-0 bottom-0 border-t border-dashed border-gray-600 z-5"></div> -->
                </div>
              </div>
              
              <!-- 범례 -->
              <div class="flex justify-between mt-4 text-xs">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-red-500 mr-1 opacity-60"></div>
                  <span class="text-gray-400">유입 오염도</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-green-500 mr-1 opacity-60"></div>
                  <span class="text-gray-400">배출 오염도</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Row: Pump Status & Logs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 펌프 상태 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <h3 class="font-medium text-white mb-4">펌프 상태</h3>
              
              <div class="grid gap-3">
                <div v-for="pump in pumpStatus" :key="pump.name" class="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-700">
                  <div class="flex items-center">
                    <div class="h-2 w-2 rounded-full mr-2" 
                      :class="pump.status === 'online' ? 'bg-green-500' : pump.status === 'maintenance' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'"></div>
                    <div class="font-medium text-white">{{ pump.name }}</div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-xs text-gray-500 mr-4">{{ pump.uptime }}</div>
                    <div class="w-24 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div class="h-full rounded-full"
                        :style="{width: `${pump.load}%`, backgroundColor: pump.load > 75 ? '#ef4444' : pump.load > 50 ? '#f59e0b' : '#22c55e'}"></div>
                    </div>
                    <div class="text-xs text-gray-500 ml-2">{{ Math.floor(pump.load) }}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 경고 알림 -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg overflow-hidden">
              <h3 class="font-medium text-white mb-4">시스템 알림</h3>
              
              <div class="space-y-2 overflow-hidden" style="max-height: 200px;">
                <div v-for="(log, index) in alertLogs" :key="index" 
                  class="flex p-2 rounded border border-gray-700 text-xs"
                  :class="{'bg-red-900 bg-opacity-20 border-red-800': log.type === 'error', 
                          'bg-yellow-900 bg-opacity-20 border-yellow-800': log.type === 'warning',
                          'bg-blue-900 bg-opacity-20 border-blue-800': log.type === 'info',
                          'animate-pulse': index === 0}">
                  <div class="text-gray-400 mr-2">{{ log.time }}</div>
                  <div :class="{'text-red-400': log.type === 'error', 
                              'text-yellow-400': log.type === 'warning',
                              'text-blue-400': log.type === 'info'}">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.toggle-tabs {
  position: relative;
  overflow: hidden;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #3b82f6, #00c6ff);
}

.dashboard-container {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90%;
}

.dashboard-image {
  filter: brightness(0.9) contrast(1.1) saturate(0.8);
  mix-blend-mode: normal;
}

.overlay-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, rgba(30, 41, 59, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(30, 41, 59, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 5;
  pointer-events: none;
}

.content-container {
  position: relative;
}

/* 슬라이드 트랜지션 효과 정의 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(0, 200, 255, 0.5); }
  50% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.8); }
}

.button-glow {
  animation: glow 2s infinite;
}

/* 드래그 관련 스타일 추가 */
.dashboard-container {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90%;
  overflow: hidden;
}

/* 드래그 중인 요소에 시각적 피드백 추가 */
.dragging {
  cursor: grabbing !important;
  opacity: 0.9;
  filter: drop-shadow(0 0 10px rgba(0, 200, 255, 0.6));
}

/* 드래그 핸들에 커서 스타일 변경 */
.cursor-move {
  cursor: grab;
}

/* 가독성 향상을 위한 전역 스타일 */
:deep(h3) {
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

:deep(.text-gray-400) {
  color: rgba(156, 163, 175, 0.9); /* 약간 더 밝게 조정 */
}

:deep(.text-gray-500) {
  color: rgba(156, 163, 175, 0.8);
}

/* 그래프와 차트의 제목 강조 */
.font-medium {
  font-weight: 500;
}

/* 지표의 값 강조 */
.text-2xl, .text-3xl {
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* 야간 모드에 친화적인 밝은 색상 조정 */
.bg-gray-900 {
  background-color: rgba(17, 24, 39, 0.95);
}

/* 참조선 시인성 향상 */
.border-gray-600 {
  border-color: rgba(75, 85, 99, 0.4);
}

/* 테두리 강조 */
.border-gray-700 {
  border-color: rgba(55, 65, 81, 0.7);
}
</style>