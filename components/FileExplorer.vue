<script setup lang="ts">
const {
  currentPath,
  directories,
  files,
  selectedDirectory,
  selectedFile,
  isRoot,
  goToParent,
  navigateTo,
  selectDirectory,
  selectFile,
  clearDirectorySelection
} = useFileExplorerSingleton()

// 파일 유틸리티 함수
const { getFileIcon, getFileExtension } = useFileUtils()

// 파일 선택 핸들러
const handleFileClick = (file) => {
  clearDirectorySelection()
  selectFile(file)
}

// 디렉토리 선택 핸들러
const handleDirectoryClick = (dir) => {
  selectDirectory(dir)
}

// 디렉토리 이동 핸들러
const handleDirectoryDoubleClick = (dir) => {
  navigateTo(dir)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- 상단 네비게이션 영역 -->
    <div class="p-2.5 flex items-center bg-gray-100 b b-b-solid b-gray-200">
      <button 
        @click="goToParent" 
        :disabled="isRoot"
        class="p-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
        상위 폴더로
      </button>
      <span class="ml-2 font-mono text-sm bg-white px-2.5 py-1 rounded truncate flex-1">
        /{{ currentPath }}
      </span>
    </div>
    
    <!-- 통합된 파일/디렉토리 섹션 -->
    <div class="pt-4 flex-1 flex flex-col min-h-0">
      <ul class="list-none p-0 m-0 flex-1 overflow-y-auto">
        <!-- 상위 디렉토리로 이동하는 항목 (루트가 아닐 때만 표시) -->
        <li 
          v-if="!isRoot"
          @dblclick="goToParent" 
          class="select-none cursor-pointer px-2.5 py-1.5 flex items-center hover:bg-gray-200 transition-colors bg-gray-50">
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
          @click="handleDirectoryClick(dir)"
          @dblclick="handleDirectoryDoubleClick(dir)" 
          class="select-none cursor-pointer px-2.5 py-1.5 flex items-center hover:bg-gray-200 transition-colors"
          :class="{ 'bg-blue-200 border-l-3 border-l-blue-500': selectedDirectory === dir }">
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
          @click="handleFileClick(file)"
          class="py-1.5 cursor-pointer px-2.5 border-b border-gray-100 flex items-center hover:bg-gray-200 transition-colors select-none"
          :class="{ 'bg-blue-200 border-l-3 border-l-blue-500': selectedFile === file }">
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
        <li v-if="directories.length === 0 && files.length === 0" class="px-2.5 py-4 text-center text-gray-500 italic">
          내용이 없습니다
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 아이콘 스타일 확장 */
:deep(.icon-image),
:deep(.icon-pdf),
:deep(.icon-video),
:deep(.icon-file),
:deep(.icon-archive),
:deep(.icon-word),
:deep(.icon-excel),
:deep(.icon-code),
:deep(.icon-html) {
  width: 100%;
  height: 100%;
}

:deep(.icon-image) {color: #4CAF50;}
:deep(.icon-pdf) {color: #D50000;}
:deep(.icon-video) {color: #FF3D00;}
:deep(.icon-file) {color: #607D8B;}
:deep(.icon-archive) {color: #795548;}
:deep(.icon-word) {color: #2B579A;}
:deep(.icon-excel) {color: #217346;}
:deep(.icon-code) {color: #FFC107;}
:deep(.icon-html) {color: #00ACC1;}
</style>