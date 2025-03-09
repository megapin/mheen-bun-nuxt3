<script setup lang="ts">
import { useFileUploaderSingleton } from '~/composables/useFileUploader'

// 싱글톤 인스턴스 사용
const { 
  isUploadModalOpen, 
  uploadPath, 
  handleUploadComplete, 
  handleUploadError, 
  closeUploadModal 
} = useFileUploaderSingleton()
</script>

<template>
  <div v-if="isUploadModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg shadow-xl w-[500px] max-w-full overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold">파일 업로드</h3>
        <button
          @click="closeUploadModal"
          class="p-1 rounded hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <div class="mb-4">
          <p class="text-sm text-gray-500 mb-1">업로드 위치:</p>
          <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded font-mono text-sm truncate">
            /{{ uploadPath }}
          </div>
        </div>
        
        <!-- 업로드 컴포넌트 -->
        <FileUploader 
          :path="uploadPath"
          @upload-complete="handleUploadComplete"
          @upload-error="handleUploadError"
        />
      </div>
      
      <div class="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-200">
        <button 
          @click="closeUploadModal" 
          class="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-200">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>