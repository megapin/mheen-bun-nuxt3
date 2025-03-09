<script setup lang="ts">
const props = defineProps({
  onDeleteSuccess: {
    type: Function,
    default: () => {}
  }
})

// 이미지 뷰어 상태 가져오기
const { 
  isImageFullscreen,
  fullscreenImage,
  fullscreenImageTitle,
  imageOriginalPos,
  closeFullscreen
} = useImageViewerSingleton()

// 파일 삭제 기능 가져오기
const { confirmDeleteFile } = useFileManagerSingleton()

// 이미지 삭제 핸들러
const handleDeleteClick = () => {
  confirmDeleteFile(
    imageOriginalPos.value.file, 
    imageOriginalPos.value.path,
    // 성공 콜백
    (deletedFile) => {
      // 이미지 닫기
      closeFullscreen()
      
      // 상위 컴포넌트에 삭제 성공 알림
      if (props.onDeleteSuccess) {
        props.onDeleteSuccess(deletedFile)
      }
    },
    // 에러 콜백
    (error) => {
      alert('파일 삭제 중 오류가 발생했습니다.')
    }
  )
}
</script>

<template>
  <!-- 더블클릭 시 확대된 이미지 보기 (오른쪽 영역 내에서) -->
  <Teleport to="body">
    <div 
      v-if="isImageFullscreen" 
      class="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      <!-- 확대 모드 헤더 -->
      <div class="flex items-center justify-between px-4 py-3 bg-gray-800 text-white border-b border-gray-700">
        <div class="font-medium truncate">{{ fullscreenImageTitle }}</div>
        <div class="flex items-center space-x-2">
          <!-- 다운로드 버튼 -->
          <a 
            :href="fullscreenImage" 
            download
            class="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center"
            title="다운로드"
            @click.stop>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            다운로드
          </a>
          <!-- 삭제 버튼 -->
          <a 
            @click.stop="handleDeleteClick"
            class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 flex items-center"
            title="삭제">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            삭제
          </a>
          <!-- 닫기 버튼 -->
          <a 
            @click="closeFullscreen" 
            class="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 rounded-full"
            title="닫기">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
        </div>
      </div>
      <!-- 확대된 이미지 -->
      <div 
        class="flex-1 flex items-center justify-center overflow-auto bg-gray-900 p-4"
        @click="closeFullscreen">
        <img 
          :src="fullscreenImage" 
          :alt="fullscreenImageTitle"
          class="max-w-full max-h-full object-contain shadow-lg cursor-zoom-out"/>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 확대/축소 애니메이션 효과 */
.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: all 0.3s ease;
}
.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}
</style>