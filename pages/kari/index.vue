<script setup>
onMounted(() => {
  // 현재 시간 업데이트
  function updateDateTime() {
      const now = new Date();
      const dateTimeStr = now.toLocaleString('ko-KR');
      document.getElementById('dateTime').textContent = dateTimeStr;
  }

  // 초기 설정
  let systemRunning = true;

  // 시스템 상태 업데이트 함수
  function updateSystem() {
      if (!systemRunning) return;

      // 탱크 수위 랜덤 변동
      const sourceTankLevel = 70 + Math.floor(Math.random() * 20);
      const cleanTankLevel = 60 + Math.floor(Math.random() * 25);

      document.getElementById('sourceTankLevel').textContent = `수위: ${sourceTankLevel}%`;
      document.getElementById('cleanTankLevel').textContent = `수위: ${cleanTankLevel}%`;

      // 탱크 수위 시각화 업데이트
      const sourceTankHeight = (sourceTankLevel * 0.6);
      const cleanTankHeight = (cleanTankLevel * 0.7);

      document.getElementById('sourceTankWater').setAttribute('height', sourceTankHeight);
      document.getElementById('sourceTankWater').setAttribute('y', -sourceTankHeight);

      document.getElementById('cleanTankWater').setAttribute('height', cleanTankHeight);
      document.getElementById('cleanTankWater').setAttribute('y', -cleanTankHeight);

      // 교반기 RPM 업데이트
      const mixerRpm = 55 + Math.floor(Math.random() * 10);
      document.getElementById('mixerStatus').textContent = `RPM: ${mixerRpm}`;
      document.getElementById('mixerStatusCard').textContent = mixerRpm > 50 ? '정상' : '경고';

      // 처리량 업데이트
      const flowRate = 115 + Math.floor(Math.random() * 15);
      document.getElementById('flowRate').textContent = `${flowRate} L/분`;

      // 정화율 업데이트
      const purificationRate1 = 82 + Math.floor(Math.random() * 8);
      const purificationRate2 = 95 + Math.floor(Math.random() * 5);
      document.getElementById('purificationRate1').textContent = `${purificationRate1}%`;
      document.getElementById('purificationRate2').textContent = `${purificationRate2}%`;

      // pH 값 업데이트
      const ph = (7 + (Math.random() * 0.5)).toFixed(1);
      document.getElementById('phValue').textContent = ph;

      // 가끔 알람 표시 (5% 확률)
      if (Math.random() < 0.05) {
          document.getElementById('alarm1').style.display = 'block';
          setTimeout(() => {
              document.getElementById('alarm1').style.display = 'none';
          }, 5000);
      }
  }

  // 이벤트 리스너 설정
  function startSystem() {
      systemRunning = true;
      document.getElementById('systemStatus').textContent = '정상 가동 중';
      document.getElementById('systemStatus').style.color = '#0078d7';

      // 모든 파이프 flow 활성화
      document.querySelectorAll('.water-flow').forEach(flow => {
          flow.style.display = 'block';
      });
  }

  function stopSystem() {
      systemRunning = false;
      document.getElementById('systemStatus').textContent = '정지됨';
      document.getElementById('systemStatus').style.color = '#666';

      // 모든 파이프 flow 비활성화
      document.querySelectorAll('.water-flow').forEach(flow => {
          flow.style.display = 'none';
      });
  }

  function emergencyStop() {
      systemRunning = false;
      document.getElementById('systemStatus').textContent = '비상 정지';
      document.getElementById('systemStatus').style.color = 'red';

      // 모든 파이프 flow 비활성화
      document.querySelectorAll('.water-flow').forEach(flow => {
          flow.style.display = 'none';
      });

      // 알람 표시
      document.getElementById('alarm1').style.display = 'block';
  }

  document.getElementById('startBtn').addEventListener('click', startSystem);
  document.getElementById('stopBtn').addEventListener('click', stopSystem);
  document.getElementById('emergencyBtn').addEventListener('click', emergencyStop);

  // SVG 버튼에도 이벤트 연결
  document.getElementById('panelStartBtn').addEventListener('click', startSystem);
  document.getElementById('panelStopBtn').addEventListener('click', stopSystem);

  // 초기화 및 주기적 업데이트
  updateDateTime();
  setInterval(updateDateTime, 1000);
  updateSystem();
  setInterval(updateSystem, 2000);
})
</script>

<template>
  <title>물 정화 스마트팩토리 대시보드 - 아이소메트릭</title>
  <div class="dashboard">
    <div class="header">
        <h1>물 정화 스마트팩토리 대시보드</h1>
        <div class="date-time" id="dateTime">2025-03-04 12:30:45</div>
    </div>

    <div class="controls">
        <button id="startBtn">시스템 가동</button>
        <button id="stopBtn">시스템 정지</button>
        <button id="emergencyBtn">비상 정지</button>
    </div>

    <div class="system-container">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" id="systemSvg">
            <!-- 그리드 (바닥) -->
            <g class="grid">
                <defs>
                    <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="0.5"/>
                    </pattern>
                    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <rect width="80" height="80" fill="url(#smallGrid)"/>
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d0d0d0" stroke-width="1"/>
                    </pattern>
                </defs>
                <rect width="1200" height="800" fill="url(#grid)" />
            </g>

            <!-- 아이소메트릭 변환 그룹 -->
            <g transform="translate(600, 350)">
                <g class="isometric" transform="scale(1.2)">

                    <!-- 원수 탱크 (아이소메트릭) -->
                    <g class="equipment" id="sourceTank" transform="translate(-200, 0)">
                        <!-- 그림자 -->
                        <ellipse cx="0" cy="10" rx="45" ry="25" class="equipment-shadow" />

                        <!-- 탱크 바닥 -->
                        <ellipse cx="0" cy="0" rx="40" ry="20" class="tank-base" />

                        <!-- 탱크 옆면 -->
                        <rect x="-40" y="-80" width="80" height="80" rx="2" class="tank-side" />

                        <!-- 탱크 물 (내부) -->
                        <rect x="-38" y="-60" width="76" height="60" rx="1" class="water-inside" id="sourceTankWater" />

                        <!-- 탱크 상단 -->
                        <ellipse cx="0" cy="-80" rx="40" ry="20" class="tank-top" />

                        <!-- 라벨 -->
                        <text x="0" y="-100" class="tank-label">원수 탱크</text>
                        <text x="0" y="30" class="sensor-value" id="sourceTankLevel">수위: 80%</text>
                    </g>

                    <!-- 파이프라인 1 (두꺼운 파이프) -->
                    <path d="M -160 -30 C -120 -30, -80 -40, -40 -40" class="pipe" id="pipe1" />
                    <path d="M -160 -30 C -120 -30, -80 -40, -40 -40" class="pipe water-flow" id="flow1" />

                    <!-- 정화기 1 (1차 정화) -->
                    <g class="equipment" id="purifier1" transform="translate(0, -40)">
                        <!-- 그림자 -->
                        <ellipse cx="0" cy="110" rx="35" ry="20" class="equipment-shadow" />

                        <!-- 정화기 본체 -->
                        <rect x="-30" y="0" width="60" height="100" rx="5" class="purifier" />
                        <circle cx="0" cy="50" r="20" fill="#a0d8ef" />
                        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#d9d9d9" stroke="#666" stroke-width="1" />
                        <ellipse cx="0" cy="100" rx="30" ry="15" fill="#d9d9d9" stroke="#666" stroke-width="1" />

                        <!-- 라벨 -->
                        <text x="0" y="-10" class="equipment-label">1차 정화기</text>
                        <text x="0" y="130" class="sensor-value" id="purifier1Status">상태: 정상</text>
                    </g>

                    <!-- 파이프라인 2 (두꺼운 파이프) -->
                    <path d="M 30 10 C 70 10, 110 0, 150 0" class="pipe" id="pipe2" />
                    <path d="M 30 10 C 70 10, 110 0, 150 0" class="pipe water-flow" id="flow2" />

                    <!-- 교반기 -->
                    <g class="equipment" id="mixer" transform="translate(180, 0)">
                        <!-- 그림자 -->
                        <ellipse cx="0" cy="110" rx="35" ry="20" class="equipment-shadow" />

                        <!-- 교반기 본체 -->
                        <rect x="-30" y="0" width="60" height="100" rx="5" class="mixer" />
                        <line x1="-15" y1="35" x2="15" y2="65" stroke="#666" stroke-width="3" />
                        <line x1="-15" y1="65" x2="15" y2="35" stroke="#666" stroke-width="3" />
                        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#f0f0f0" stroke="#666" stroke-width="1" />
                        <ellipse cx="0" cy="100" rx="30" ry="15" fill="#f0f0f0" stroke="#666" stroke-width="1" />

                        <!-- 라벨 -->
                        <text x="0" y="-10" class="equipment-label">교반기</text>
                        <text x="0" y="130" class="sensor-value" id="mixerStatus">RPM: 60</text>
                    </g>

                    <!-- 파이프라인 3 (두꺼운 파이프) -->
                    <path d="M 210 10 C 250 10, 290 -40, 330 -40" class="pipe" id="pipe3" />
                    <path d="M 210 10 C 250 10, 290 -40, 330 -40" class="pipe water-flow" id="flow3" />

                    <!-- 정화기 2 (2차 정화) -->
                    <g class="equipment" id="purifier2" transform="translate(360, -40)">
                        <!-- 그림자 -->
                        <ellipse cx="0" cy="110" rx="35" ry="20" class="equipment-shadow" />

                        <!-- 정화기 본체 -->
                        <rect x="-30" y="0" width="60" height="100" rx="5" class="purifier" />
                        <circle cx="0" cy="50" r="20" fill="#c8e6f5" />
                        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#d9d9d9" stroke="#666" stroke-width="1" />
                        <ellipse cx="0" cy="100" rx="30" ry="15" fill="#d9d9d9" stroke="#666" stroke-width="1" />

                        <!-- 라벨 -->
                        <text x="0" y="-10" class="equipment-label">2차 정화기</text>
                        <text x="0" y="130" class="sensor-value" id="purifier2Status">상태: 정상</text>
                    </g>

                    <!-- 파이프라인 4 (두꺼운 파이프) -->
                    <path d="M 390 10 C 430 10, 470 -40, 510 -40 C 530 -40, 540 -80, 540 -120" class="pipe" id="pipe4" />
                    <path d="M 390 10 C 430 10, 470 -40, 510 -40 C 530 -40, 540 -80, 540 -120" class="pipe water-flow" id="flow4" />

                    <!-- 정화수 탱크 (아이소메트릭) -->
                    <g class="equipment" id="cleanTank" transform="translate(540, -160)">
                        <!-- 그림자 -->
                        <ellipse cx="0" cy="10" rx="45" ry="25" class="equipment-shadow" />

                        <!-- 탱크 바닥 -->
                        <ellipse cx="0" cy="0" rx="40" ry="20" class="tank-base" />

                        <!-- 탱크 옆면 -->
                        <rect x="-40" y="-80" width="80" height="80" rx="2" class="tank-side" />

                        <!-- 탱크 물 (내부) -->
                        <rect x="-38" y="-70" width="76" height="70" rx="1" class="water-inside" id="cleanTankWater" />

                        <!-- 탱크 상단 -->
                        <ellipse cx="0" cy="-80" rx="40" ry="20" class="tank-top" />

                        <!-- 라벨 -->
                        <text x="0" y="-100" class="tank-label">정화수 탱크</text>
                        <text x="0" y="30" class="sensor-value" id="cleanTankLevel">수위: 65%</text>
                    </g>

                    <!-- 센서 표시 -->
                    <circle cx="-120" cy="-30" r="5" fill="red" id="sensor1" />
                    <circle cx="90" cy="0" r="5" fill="green" id="sensor2" />
                    <circle cx="270" cy="-20" r="5" fill="green" id="sensor3" />
                    <circle cx="540" cy="-140" r="5" fill="green" id="sensor4" />

                    <!-- 알람 표시 (숨김 상태로 시작) -->
                    <circle cx="-120" cy="-30" r="10" class="alarm" id="alarm1" style="display: none" />

                    <!-- 제어 패널 -->
                    <g class="control-panel" transform="translate(-300, 200)">
                        <rect x="-40" y="-40" width="80" height="80" rx="5" class="control-panel" />
                        <text x="0" y="-50" class="equipment-label">제어 패널</text>
                        <circle cx="0" cy="-20" r="10" class="button" fill="#4CAF50" id="panelStartBtn" />
                        <text x="0" y="-17" class="button-label">ON</text>
                        <circle cx="0" cy="20" r="10" class="button" fill="#F44336" id="panelStopBtn" />
                        <text x="0" y="23" class="button-label">OFF</text>
                    </g>
                </g>
            </g>
        </svg>
    </div>

    <div class="status-panel">
        <div class="status-card">
            <h3>시스템 상태</h3>
            <div class="value" id="systemStatus">정상 가동 중</div>
        </div>
        <div class="status-card">
            <h3>처리량</h3>
            <div class="value" id="flowRate">120 L/분</div>
        </div>
        <div class="status-card">
            <h3>1차 정화율</h3>
            <div class="value" id="purificationRate1">85%</div>
        </div>
        <div class="status-card">
            <h3>2차 정화율</h3>
            <div class="value" id="purificationRate2">98%</div>
        </div>
        <div class="status-card">
            <h3>교반기 상태</h3>
            <div class="value" id="mixerStatusCard">정상</div>
        </div>
        <div class="status-card">
            <h3>정화수 pH</h3>
            <div class="value" id="phValue">7.2</div>
        </div>
    </div>
  </div>
</template>

<style>
body {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f8ff;
}
.dashboard {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 20px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}
.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
button {
    background-color: #0078d7;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #0069c0;
}
.system-container {
    position: relative;
    width: 100%;
    height: 700px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f7fbff;
}
.status-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 20px;
}
.status-card {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.value {
    font-size: 1.2em;
    font-weight: bold;
    color: #0078d7;
}

/* 아이소메트릭 변환 스타일 */
/* .isometric { */
/*     transform: rotateX(60deg) rotateZ(-45deg); */
/*     transform-style: preserve-3d; */
/* } */
.isometric {
    transform:
        rotateX(30deg)  /* x축 기울임 */
        rotateY(-45deg) /* y축 회전 */
        scale(0.866);   /* 왜곡 보정을 위한 스케일링 */
}

/* SVG 스타일 */
.tank-base {
    fill: #c0d6e4;
    stroke: #2c5c7a;
    stroke-width: 2;
}
.tank-top {
    fill: #e6f7ff;
    stroke: #2c5c7a;
    stroke-width: 2;
}
.tank-side {
    fill: #a3cbe6;
    stroke: #2c5c7a;
    stroke-width: 2;
}
.purifier {
    fill: #d9d9d9;
    stroke: #666;
    stroke-width: 2;
}
.mixer {
    fill: #f0f0f0;
    stroke: #666;
    stroke-width: 2;
}
.pipe {
    fill: none;
    stroke: #4a89dc;
    stroke-width: 12;
    stroke-linecap: round;
}
.water-flow {
    stroke: #4a89dc;
    stroke-dasharray: 15;
    animation: flow 2s linear infinite;
}
.water-inside {
    fill: #67b7dc;
    opacity: 0.8;
    transition: height 1s ease;
}
.alarm {
    fill: #ff4d4f;
    animation: blink 1s ease-in-out infinite alternate;
}
.equipment-shadow {
    fill: rgba(0, 0, 0, 0.1);
}

@keyframes flow {
    to {
        stroke-dashoffset: -30;
    }
}
@keyframes blink {
    from { opacity: 1; }
    to { opacity: 0.4; }
}
.tank-label, .equipment-label {
    font-size: 12px;
    fill: #333;
    text-anchor: middle;
}
.sensor-value {
    font-size: 10px;
    fill: #666;
    text-anchor: middle;
}
.grid line {
    stroke: #e0e0e0;
    stroke-width: 1;
}
.control-panel {
    fill: #e8e8e8;
    stroke: #666;
    stroke-width: 1;
}
.button {
    fill: #d0d0d0;
    stroke: #666;
    stroke-width: 1;
    cursor: pointer;
}
.button:hover {
    fill: #b8b8b8;
}
.button-label {
    font-size: 10px;
    fill: #333;
    text-anchor: middle;
    pointer-events: none;
}
</style>
