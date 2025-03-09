<script setup lang="ts">
const {
  currentPath,
  fetchDirectoryContents,
  selectedFile,
  selectedDirectory
} = useFileExplorerSingleton()

const { 
  panelWidth: leftPanelWidth,
  isDragging, 
  startDrag 
} = useResizablePanel({
  initialWidth: 350,
  minWidth: 200,
  maxWidthPercent: 0.7
})

const { openUploadModal } = useFileUploaderSingleton()
const { isImageFullscreen } = useImageViewerSingleton()

// 현재 경로 주입 (useFileManager에서 사용)
provide('currentPath', currentPath)

// 업로드 버튼 클릭 핸들러
const handleUploadButtonClick = () => {
  const path = selectedDirectory.value
    ? `${currentPath.value}/${selectedDirectory.value}`
    : currentPath.value
    
  openUploadModal(path, 
    (result) => {
      if (selectedDirectory.value) {
        const { fetchDirectoryContents: refreshDirectory } = useDirectoryExplorerSingleton()
        refreshDirectory()
      } else {
        fetchDirectoryContents()
      }
    },
    (error) => alert(`업로드 실패: ${error}`)
  )
}

onMounted(() => {
  fetchDirectoryContents()
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col">
    <div class="flex-1 flex overflow-hidden relative">
      <!-- 왼쪽: 파일 및 디렉토리 목록 -->
      <div class="flex-shrink-0 overflow-hidden bg-gray-50" :style="{ width: `${leftPanelWidth}px` }">
        <FileExplorer />
      </div>
      
      <!-- 리사이즈 핸들 -->
      <div
        class="w-px bg-gray-300 hover:bg-blue-500 cursor-col-resize z-10 relative"
        @mousedown="startDrag">
        <!-- 드래그 핸들 -->
        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-16 flex items-center justify-center">
          <div class="h-8 w-0.5 bg-gray-400 mx-0.5"></div>
        </div>
      </div>
      
      <!-- 오른쪽: 파일/디렉토리 미리보기 영역 -->
      <div class="flex-1 bg-white overflow-hidden flex flex-col relative">
        <div class="absolute top-3 right-4 z-20 flex gap-2">
          <a 
            @click="handleUploadButtonClick" 
            class="cursor-pointer px-3 py-1 bg-green-500 text-white rounded flex items-center shadow-md hover:bg-green-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            파일 업로드
          </a>
        </div>

        <!-- 더블클릭 시 확대된 이미지 보기 (오른쪽 영역 내에서) -->
        <!-- 확대된 이미지 뷰어 (전체 화면 오버레이) -->
        <FullscreenImageViewer 
          :onDeleteSuccess="(deletedFile) => {
            if (selectedFile === deletedFile.file) selectedFile = null;
            fetchDirectoryContents();
          }" />
        
        <!-- 디렉토리 미리보기 -->
        <div v-if="selectedDirectory && !isImageFullscreen" class="flex-1 flex flex-col overflow-hidden">
          <DirectoryPreview />
        </div>
        
        <!-- 파일 미리보기 -->
        <div v-else-if="selectedFile" class="flex-1 flex flex-col overflow-hidden">
          <FilePreview 
            :file="selectedFile" 
            :path="currentPath" 
            @delete-success="(deletedFile) => {
              if (selectedFile === deletedFile.file) selectedFile = null;
              fetchDirectoryContents();
            }"
            @delete-error="(error) => alert('파일 삭제 중 오류가 발생했습니다.')" />
        </div>
        
        <!-- 아무것도 선택되지 않은 경우 -->
        <div v-else="!isImageFullscreen" class="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 italic">
          <p>미리보기할 파일이나 폴더를 선택하세요</p>
        </div>
      </div>
    </div>

    <DeleteConfirmModal />

    <UploadModal />

  </div>
</template>
