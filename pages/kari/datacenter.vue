<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const selectedImg = ref<string>('jinseong-isometric-05.jpg')
const units = ref(Array(8).fill(0).map((_, i) => `jinseong-isometric-0${i + 1}.jpg`))

const activeTab = ref<string>('dashboard')

// 실시간 데이터 업데이트를 위한 상태와 함수들
const cpuUsage = ref(Math.floor(Math.random() * 40) + 30) // 30% ~ 70% 사이
const memoryUsage = ref(Math.floor(Math.random() * 50) + 30) // 30% ~ 80% 사이
const networkSpeed = ref(Math.floor(Math.random() * 50) + 25) // 25 ~ 75MB/s 사이
const temperature = ref(Math.floor(Math.random() * 15) + 55) // 55 ~ 70°C 사이
const processorLoad = ref(Array(24).fill(0).map(() => Math.floor(Math.random() * 100)))
const networkTraffic = ref(Array(20).fill(0).map(() => ({ 
  in: Math.floor(Math.random() * 100),
  out: Math.floor(Math.random() * 50)
})))
const serverStatus = ref([
  { name: 'Server-A', status: 'online', uptime: '45d 12h', load: Math.random() * 40 + 30 },
  { name: 'Server-B', status: 'online', uptime: '32d 5h', load: Math.random() * 40 + 20 },
  { name: 'Server-C', status: 'maintenance', uptime: '8h 23m', load: Math.random() * 10 + 5 },
  { name: 'Server-D', status: 'online', uptime: '12d 3h', load: Math.random() * 40 + 40 },
])
const alertLogs = ref([
  { time: '09:45:12', type: 'warning', message: 'CPU temperature rising on Server-B' },
  { time: '08:32:05', type: 'info', message: 'System update completed successfully' },
  { time: '07:15:44', type: 'error', message: 'Network connection lost on Node 5' },
  { time: '06:50:29', type: 'warning', message: 'Memory usage above 75% threshold' },
])

// 실시간 데이터 업데이트 인터벌
let updateInterval: number | null = null
const startDataUpdates = () => {
  updateInterval = window.setInterval(() => {
    // CPU 사용량 업데이트 (부드러운 변동)
    cpuUsage.value = Math.max(20, Math.min(85, cpuUsage.value + (Math.random() * 10 - 5)))
    
    // 메모리 사용량 업데이트
    memoryUsage.value = Math.max(25, Math.min(90, memoryUsage.value + (Math.random() * 8 - 4)))
    
    // 네트워크 속도 업데이트
    networkSpeed.value = Math.max(15, Math.min(80, networkSpeed.value + (Math.random() * 12 - 6)))
    
    // 온도 업데이트
    temperature.value = Math.max(50, Math.min(75, temperature.value + (Math.random() * 2 - 1)))
    
    // 프로세서 로드 업데이트
    processorLoad.value = processorLoad.value.map(val => 
      Math.max(5, Math.min(95, val + (Math.random() * 20 - 10)))
    )
    
    // 네트워크 트래픽 업데이트 - 새 데이터 추가, 오래된 데이터 제거
    networkTraffic.value.shift()
    networkTraffic.value.push({
      in: Math.floor(Math.random() * 100),
      out: Math.floor(Math.random() * 50)
    })
    
    // 서버 상태 업데이트
    serverStatus.value = serverStatus.value.map(server => ({
      ...server,
      load: Math.max(5, Math.min(95, Number(server.load) + (Math.random() * 10 - 5)))
    }))
    
    // 1% 확률로 새 알림 추가
    if (Math.random() < 0.01) {
      const types = ['info', 'warning', 'error']
      const messages = [
        'CPU temperature rising',
        'Memory usage threshold reached',
        'Network latency detected',
        'System update available',
        'Storage capacity warning'
      ]
      
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      
      alertLogs.value.unshift({
        time: `${hours}:${minutes}:${seconds}`,
        type: types[Math.floor(Math.random() * types.length)],
        message: `${messages[Math.floor(Math.random() * messages.length)]} on ${serverStatus.value[Math.floor(Math.random() * serverStatus.value.length)].name}`
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

onMounted(() => {
  startDataUpdates()
})

onUnmounted(() => {
  if (updateInterval !== null) {
    clearInterval(updateInterval)
  }
})
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-gray-900">
    <!-- 상단 헤더 영역 -->
    <div class="w-full bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md py-3 px-4 flex items-center justify-between">
      <!-- 좌측 로고 또는 제목 -->
      <div class="text-white font-bold text-lg flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        KARI Monitor
      </div>
      
      <!-- 중앙 토글 탭 -->
      <!-- <div class="toggle-tabs bg-gray-800 border border-gray-700 rounded flex">
        <button 
          @click="toggleTab('dashboard')" 
          class="px-6 py-2 text-sm font-medium transition-all duration-200 relative flex items-center"
          :class="activeTab === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-gray-200'">
          <span class="mr-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </span>
          Dashboard
          <div v-if="activeTab === 'dashboard'" class="active-indicator"></div>
        </button>
        <button 
          @click="toggleTab('data')" 
          class="px-6 py-2 text-sm font-medium transition-all duration-200 relative flex items-center"
          :class="activeTab === 'data' ? 'text-white' : 'text-gray-400 hover:text-gray-200'">
          <span class="mr-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
            </svg>
          </span>
          Data Center
          <div v-if="activeTab === 'data'" class="active-indicator"></div>
        </button>
      </div> -->
      
      <!-- 우측 시간 표시 -->
      <div class="text-gray-400 text-sm flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ new Date().toLocaleTimeString() }}
      </div>
    </div>

    <!-- 콘텐츠 영역 - 트랜지션 적용 -->
    <div class="content-container flex-1 overflow-hidden relative">
      <transition name="slide">
        <div v-if="activeTab === 'dashboard'" key="dashboard" class="absolute inset-0 flex justify-center items-center bg-gray-800">
          <div class="relative dashboard-container">
            <!-- 이미지 위에 오버레이 효과 -->
            <div class="overlay-grid"></div>
            
            <!-- 대시보드 이미지 -->
            <img 
              :src="`/kari/downloaded/units/${selectedImg}`" 
              class="w-full h-full object-contain z-10 relative dashboard-image" />
              
            <!-- 대시보드 장식 요소들 -->
            <div class="absolute top-4 left-4 bg-black bg-opacity-50 text-cyan-400 p-2 rounded text-xs border border-cyan-800 z-20 flex items-center">
              <span class="mr-1 w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
              SYSTEM ACTIVE
            </div>
            
            <div class="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded text-xs border border-gray-700 z-20">
              ID: KSP-{{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}}
            </div>
          </div>
        </div>

        <div v-else key="datacenter" class="absolute inset-0 overflow-auto p-4 bg-gray-800 flex flex-col gap-4">
          <!-- Top Row: Key Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- CPU Usage -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">CPU Usage</div>
              <div class="text-2xl font-bold text-white">{{ cpuUsage.toFixed(1) }}%</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${cpuUsage}%`, backgroundColor: cpuUsage > 70 ? '#ef4444' : cpuUsage > 50 ? '#f59e0b' : '#22c55e'}" 
                  :class="cpuUsage > 70 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-green-500">{{ (cpuUsage * 0.85).toFixed(1) }}%</span> avg over 24hrs
              </div>
            </div>
            
            <!-- Memory Usage -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">Memory Usage</div>
              <div class="text-2xl font-bold text-white">{{ memoryUsage.toFixed(1) }}%</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${memoryUsage}%`, backgroundColor: memoryUsage > 80 ? '#ef4444' : memoryUsage > 60 ? '#f59e0b' : '#22c55e'}"
                  :class="memoryUsage > 80 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-green-500">{{ (memoryUsage * 0.92).toFixed(1) }}GB</span> / 64GB
              </div>
            </div>
            
            <!-- Network -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">Network</div>
              <div class="text-2xl font-bold text-white">{{ networkSpeed.toFixed(1) }} MB/s</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full bg-blue-500 rounded-full" :style="{width: `${networkSpeed/100*100}%`}"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span><span class="text-blue-500">↑</span> {{ (networkSpeed * 0.4).toFixed(1) }} MB/s</span>
                <span><span class="text-green-500">↓</span> {{ (networkSpeed * 0.6).toFixed(1) }} MB/s</span>
              </div>
            </div>
            
            <!-- Temperature -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="text-xs text-gray-500 uppercase mb-1">System Temperature</div>
              <div class="text-2xl font-bold text-white">{{ temperature.toFixed(1) }}°C</div>
              <div class="mt-2 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full rounded-full" 
                  :style="{width: `${(temperature-40)/40*100}%`, backgroundColor: temperature > 65 ? '#ef4444' : temperature > 60 ? '#f59e0b' : '#22c55e'}"
                  :class="temperature > 65 ? 'animate-pulse' : ''"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                <span class="text-yellow-500">+{{ ((temperature - 54) * 0.3).toFixed(1) }}°</span> from yesterday
              </div>
            </div>
          </div>
          
          <!-- Middle Row: Charts -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Processor Load Chart -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-white">Processor Load History</h3>
                <div class="text-xs text-gray-500">Last 24 hours</div>
              </div>
              
              <div class="h-40 flex items-end">
                <div v-for="(load, i) in processorLoad" :key="i" class="flex-1 h-full flex items-end mx-0.5">
                  <div :style="{height: `${load}%`}" 
                    :class="`rounded-t ${load > 80 ? 'bg-red-500' : load > 60 ? 'bg-yellow-500' : 'bg-green-500'}`">
                  </div>
                </div>
              </div>
              
              <div class="flex justify-between mt-2 text-xs text-gray-500">
                <div>00:00</div>
                <div>06:00</div>
                <div>12:00</div>
                <div>18:00</div>
                <div>24:00</div>
              </div>
            </div>
            
            <!-- Network Traffic Chart -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-white">Network Traffic</h3>
                <div class="text-xs text-gray-500">Real-time</div>
              </div>
              
              <div class="h-40 relative flex items-end">
                <!-- Input Traffic Area -->
                <svg class="absolute inset-0 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    :d="`M0,100 ${networkTraffic.map((point, i) => `L${i * (100 / (networkTraffic.length - 1))},${100 - point.in}`).join(' ')} V100 H0 Z`"
                    fill="rgba(59, 130, 246, 0.5)"
                  ></path>
                </svg>
                
                <!-- Output Traffic Area -->
                <svg class="absolute inset-0 z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    :d="`M0,100 ${networkTraffic.map((point, i) => `L${i * (100 / (networkTraffic.length - 1))},${100 - point.out}`).join(' ')} V100 H0 Z`"
                    fill="rgba(34, 197, 94, 0.5)"
                  ></path>
                </svg>
                
                <!-- Input Traffic Line -->
                <svg class="absolute inset-0 z-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    :d="`M0,${100 - networkTraffic[0].in} ${networkTraffic.map((point, i) => `L${i * (100 / (networkTraffic.length - 1))},${100 - point.in}`).join(' ')}`"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-width="0.5"
                  ></path>
                </svg>
                
                <!-- Output Traffic Line -->
                <svg class="absolute inset-0 z-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    :d="`M0,${100 - networkTraffic[0].out} ${networkTraffic.map((point, i) => `L${i * (100 / (networkTraffic.length - 1))},${100 - point.out}`).join(' ')}`"
                    fill="none"
                    stroke="#22c55e"
                    stroke-width="0.5"
                  ></path>
                </svg>
              </div>
              
              <div class="flex justify-between mt-4 text-xs">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span class="text-gray-400">Input</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span class="text-gray-400">Output</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Row: Server Status & Logs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Server Status -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
              <h3 class="font-medium text-white mb-4">Server Status</h3>
              
              <div class="grid gap-3">
                <div v-for="server in serverStatus" :key="server.name" class="flex items-center justify-between p-2 rounded-lg bg-gray-800 border border-gray-700">
                  <div class="flex items-center">
                    <div class="h-2 w-2 rounded-full mr-2" 
                      :class="server.status === 'online' ? 'bg-green-500' : server.status === 'maintenance' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'"></div>
                    <div class="font-medium text-white">{{ server.name }}</div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-xs text-gray-500 mr-4">{{ server.uptime }}</div>
                    <div class="w-24 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div class="h-full rounded-full"
                        :style="{width: `${server.load}%`, backgroundColor: server.load > 75 ? '#ef4444' : server.load > 50 ? '#f59e0b' : '#22c55e'}"></div>
                    </div>
                    <div class="text-xs text-gray-500 ml-2">{{ Math.floor(server.load) }}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Alert Logs -->
            <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg overflow-hidden">
              <h3 class="font-medium text-white mb-4">System Alerts</h3>
              
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
</style>