<script setup lang="ts">
// FileExplorer 싱글톤에서 필요한 상태 가져오기
const { selectedDirectory } = useFileExplorerSingleton()

// DirectoryExplorer 싱글톤에서 필요한 상태와 메서드 가져오기
const { 
  directoryContents, 
  isLoading, 
  navigateToSubDirectory,
  fetchDirectoryContents
} = useDirectoryExplorerSingleton()

// 파일 유틸리티 함수
const { isImage, getFileIcon, getFileExtension } = useFileUtils()

// 파일 매니저를 통한 삭제 기능
const { confirmDeleteFile } = useFileManagerSingleton()

// 이미지 뷰어 기능
const { handleImageDoubleClick } = useImageViewerSingleton()

// 디렉토리 더블클릭 핸들러
const handleDirectoryDoubleClick = (dir) => {
  navigateToSubDirectory(dir)
}

// 이미지 더블클릭 이벤트 핸들러
const onImageDoubleClick = (file) => {
  if (isImage(file)) {
    handleImageDoubleClick(file, directoryContents.value.path)
  }
}

// 파일 삭제 핸들러
const handleDeleteClick = (file) => {
  confirmDeleteFile(file, directoryContents.value.path, 
    // 성공 콜백
    () => {
      // 디렉토리 내용 새로고침
      fetchDirectoryContents()
    },
    // 에러 콜백
    (error) => {
      alert('파일 삭제 중 오류가 발생했습니다.')
    }
  )
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- 디렉토리 제목 -->
    <div class="px-4 py-4 flex items-center border border-b-solid border-gray-200">
      <div class="font-medium">
        {{ selectedDirectory }}
      </div>
    </div>
    
    <!-- 디렉토리 내용 그리드 -->
    <div class="flex-1 p-4 overflow-auto bg-gray-50">
      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div class="animate-spin rounded-full h-24 w-24 b b-solid b-4 b-blue-500"></div>
      </div>
      
      <!-- 4:3 비율 그리드 -->
      <div v-else-if="directoryContents.directories.length > 0 || directoryContents.files.length > 0" 
        class="flex flex-wrap gap-4 justify-start content-start p-2">
        <!-- 디렉토리 아이템 -->
        <div
          v-for="dir in directoryContents.directories" 
          :key="dir" 
          @dblclick="handleDirectoryDoubleClick(dir)" 
          class="select-none cursor-pointer w-[200px] flex flex-col rounded shadow-sm overflow-hidden hover:shadow-md transition-all group">
          <!-- 4:3 비율 유지를 위한 컨테이너 -->
          <div class="h-[150px] bg-blue-50 overflow-hidden relative">
            <!-- 디렉토리 아이콘 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 w-16 h-16">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          <!-- 디렉토리 이름 -->
          <div class="px-2 py-1.5 bg-white">
            <div class="text-xs font-medium truncate" :title="dir">{{ dir }}</div>
          </div>
        </div>
        
        <!-- 파일 아이템 -->
        <div
          v-for="file in directoryContents.files"
          :key="file"
          class="w-[200px] flex flex-col rounded shadow-sm overflow-hidden hover:shadow-md transition-all group">
          <!-- 컨테이너 내용 -->
          <div class="h-[150px] bg-gray-50 overflow-hidden relative">
            <img 
              v-if="isImage(file)"
              :src="`/${directoryContents.path}/${file}`" 
              :alt="file" 
              class="absolute inset-0 w-full h-full object-cover"
              @error="$event.target.src = '/placeholder-image.png'" 
              @dblclick="onImageDoubleClick(file)" />
            
            <!-- 이미지가 아닌 파일은 아이콘으로 표시 -->
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center">
              <!-- 아이콘 -->
              <div class="w-16 h-16 relative mb-1" v-html="getFileIcon(file)"></div>
              
              <!-- 확장자 배지 -->
              <span class="bg-gray-100 text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm">
                {{ getFileExtension(file) }}
              </span>
            </div>
            
            <!-- 액션 버튼 그룹 (호버 시 표시) -->
            <div class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <!-- 다운로드 버튼 -->
              <a 
                :href="`/${directoryContents.path}/${file}`" 
                download
                class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-blue-100"
                title="다운로드"
                @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
              
              <!-- 삭제 버튼 -->
              <a
                @click.stop="handleDeleteClick(file)"
                class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-red-100"
                title="삭제">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-red-500">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- 파일 이름 영역 -->
          <div class="flex px-2 py-1.5 bg-white border-t border-gray-100">
            <div class="text-xs font-medium truncate" :title="file">{{ file }}</div>
          </div>
        </div>
      </div>
      
      <!-- 내용이 없는 경우 -->
      <div 
        v-else
        class="col-span-full text-center text-gray-500 italic p-8">
        디렉토리가 비어있습니다
      </div>
    </div>
  </div>
</template>
