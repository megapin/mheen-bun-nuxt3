<script setup lang="ts">
// 파일 탐색기 Composable
const {
  currentPath,
  directories,
  files,
  selectedFile,
  fetchDirectoryContents,
  navigateTo,
  goToParent,
  selectFile,
  isImage,
  isPDF,
  isVideo,
  getFileType,
  getFilePath,
  getFileIcon,
  getFileExtension,
} = useFileExplorer()

// 리사이징 관련 Composable
const { 
  panelWidth: leftPanelWidth,  // 이름 변경 (alias)
  isDragging, 
  startDrag 
} = useResizablePanel({
  initialWidth: 350,
  minWidth: 200,
  maxWidthPercent: 0.7
})

// 컴포넌트 마운트 시 초기 데이터 로드
onMounted(() => {
  fetchDirectoryContents()
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col">
    <div class="flex-1 flex overflow-hidden relative">
      <!-- 왼쪽: 파일 및 디렉토리 목록 -->
      <div class="flex flex-col overflow-hidden bg-gray-50" :style="{ width: `${leftPanelWidth}px` }">
        <div class="flex flex-col h-full">
          <!-- 상단 네비게이션 영역 -->
          <div class="p-2.5 px-4 flex items-center bg-gray-100 rounded">
            <button 
              @click="goToParent" 
              :disabled="currentPath === ''"
              class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              상위 폴더로
            </button>
            <span class="ml-2.5 font-mono text-sm bg-white px-2.5 py-1 rounded border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
              / {{ currentPath }}
            </span>
          </div>
          
          <!-- 통합된 파일/디렉토리 섹션 -->
          <div class="pl-4 flex-1 flex flex-col min-h-0">
            <ul class="list-none p-0 m-0 flex-1 overflow-y-auto border border-gray-100 rounded">
              <!-- 상위 디렉토리로 이동하는 항목 (현재 경로가 있을 때만 표시) -->
              <li 
                v-if="currentPath !== ''"
                @dblclick="goToParent" 
                class="cursor-pointer px-2.5 py-1.5 border-b border-gray-100 flex items-center hover:bg-gray-200 transition-colors bg-gray-50"
              >
              <div class="w-6 h-6 mr-2 text-blue-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </div>
                <span>../</span>
              </li>
              
              <!-- 디렉토리 목록 -->
              <li 
                v-for="dir in directories" 
                :key="dir" 
                @dblclick="navigateTo(dir)" 
                class="cursor-pointer px-2.5 py-1.5 border-b border-gray-100 flex items-center hover:bg-gray-200 transition-colors"
              >
                <div class="w-6 h-6 mr-2 text-blue-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <span class="truncate w-full" :title="dir">{{ dir }}</span>
              </li>
              
              <!-- 파일 목록 -->
              <li 
                v-for="file in files" 
                :key="file" 
                @click="selectFile(file)" 
                class="py-1.5 cursor-pointer px-2.5 border-b border-gray-100 flex items-center hover:bg-gray-200 transition-colors"
                :class="{ 'bg-blue-200 border-l-3 border-l-blue-500': selectedFile === file }"
              >
                <!-- 아이콘과 확장자가 겹치는 컨테이너 -->
                <div class="relative w-6 h-6 flex-shrink-0 mr-2">
                  <!-- 아이콘 -->
                  <div class="w-6 h-6" v-html="getFileIcon(file)"></div>
                  
                  <!-- 확장자 배지 - 아이콘 위에 겹치게 표시 -->
                  <div class="absolute -bottom-1 -right-1 bg-gray-100 text-[10px] px-1 rounded-sm font-medium border border-gray-200 leading-tight shadow-sm">
                    {{ getFileExtension(file) }}
                  </div>
                </div>
                
                <span class="truncate w-full" :title="file">{{ file }}</span>
              </li>

              <!-- 아무 내용이 없을 경우 표시할 메시지 -->
              <li v-if="directories.length === 0 && files.length === 0 && currentPath === ''" class="px-2.5 py-4 text-center text-gray-500 italic">
                내용이 없습니다
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 리사이즈 핸들 -->
      <div
        class="w-0.5 bg-gray-300 hover:bg-blue-500 cursor-col-resize z-10 relative"
        @mousedown="startDrag"
      >
        <!-- 드래그 핸들 표시 -->
        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-16 flex items-center justify-center">
          <div class="h-8 w-0.5 bg-gray-400 mx-0.5"></div>
        </div>
      </div>
      
      <!-- 오른쪽: 파일 미리보기 영역 -->
      <div class="flex-1 bg-white overflow-hidden flex flex-col">
        <div v-if="selectedFile" class="flex-1 flex flex-col overflow-hidden">
          <h3 class="pl-4 border-b border-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
            {{ selectedFile }}
          </h3>
          
          <!-- 이미지 미리보기 -->
          <div v-if="isImage(selectedFile)" class="flex-1 flex items-center justify-center overflow-auto bg-gray-50 rounded p-4">
            <img :src="getFilePath(selectedFile)" :alt="selectedFile" class="max-w-full max-h-90vh object-contain shadow-sm" />
          </div>
          
          <!-- 비디오 미리보기 -->
          <div v-else-if="isVideo(selectedFile)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded p-4">
            <video 
              controls
              controlsList="nodownload"
              preload="metadata"
              class="max-w-full max-h-90vh"
            >
              <source :src="getFilePath(selectedFile)" :type="`video/${selectedFile.split('.').pop().toLowerCase()}`">
              <p>브라우저가 비디오를 지원하지 않거나 비디오 형식이 호환되지 않습니다.</p>
            </video>
            <p v-if="videoPlayError" class="absolute bottom-4 text-red-500 bg-white/80 px-4 py-2 rounded">
              비디오 재생 중 오류가 발생했습니다. 다른 브라우저나 미디어 플레이어에서 열어보세요.
            </p>
          </div>
          
          <!-- PDF 미리보기 -->
          <div v-else-if="isPDF(selectedFile)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded">
            <embed 
              :src="getFilePath(selectedFile)" 
              type="application/pdf" 
              class="w-full h-full" 
              alt="pdf-viewer"
            />
          </div>
          
          <!-- 기타 파일 정보 -->
          <div v-else class="flex-1 flex flex-col items-center justify-center bg-gray-50 p-5 rounded">
            <p>이 파일 형식은 미리보기를 지원하지 않습니다.</p>
            <p class="mt-2 text-gray-500">파일 경로: {{ getFilePath(selectedFile) }}</p>
            <a 
              :href="getFilePath(selectedFile)" 
              target="_blank" 
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              브라우저에서 열기
            </a>
          </div>
        </div>
        <div v-else class="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 italic">
          <p>미리보기할 파일을 선택하세요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
video:focus {
  outline: none;
}

:deep(.icon-image) {
  color: #4CAF50;
}

:deep(.icon-pdf) {
  color: #D50000;
}

:deep(.icon-video) {
  color: #FF3D00;
}

:deep(.icon-file) {
  color: #607D8B;
}

:deep(.icon-archive) {
  color: #795548;
}

:deep(.icon-word) {
  color: #2B579A;
}

:deep(.icon-excel) {
  color: #217346;
}

:deep(.icon-code) {
  color: #FFC107;
}

:deep(.icon-html) {
  color: #00ACC1;
}
</style>