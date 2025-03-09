<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  allowedTypes: {
    type: String,
    default: '*'
  }
})

const emit = defineEmits(['upload-complete', 'upload-error'])

const isDragging = ref(false)
const isUploading = ref(false)
const files = ref<FileList | null>(null)
const uploadProgress = ref(0)
const uploadError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files) {
    files.value = event.dataTransfer.files
    await uploadFiles()
  }
}

const handleFileSelect = async () => {
  if (fileInput.value?.files) {
    files.value = fileInput.value.files
    await uploadFiles()
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const uploadFiles = async () => {
  if (!files.value || files.value.length === 0) return
  
  isUploading.value = true
  uploadError.value = ''
  uploadProgress.value = 0
  
  try {
    const formData = new FormData()
    
    // 파일들을 FormData에 추가
    for (let i = 0; i < files.value.length; i++) {
      formData.append('files', files.value[i])
    }
    
    // 업로드 경로 추가
    formData.append('path', props.path)
    
    // 업로드 API 호출
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      // 업로드 진행상황 추적을 위한 설정
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        uploadProgress.value = percentCompleted
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '파일 업로드에 실패했습니다')
    }
    
    const result = await response.json()
    
    // 업로드 완료 이벤트 발생
    emit('upload-complete', {
      files: Array.from(files.value).map(f => f.name),
      result
    })
    
    // 초기화
    files.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (error) {
    console.error('파일 업로드 오류:', error)
    uploadError.value = error.message || '파일 업로드 중 오류가 발생했습니다'
    emit('upload-error', uploadError.value)
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="w-full">
    <!-- 파일 선택기 숨김 -->
    <input
      ref="fileInput"
      type="file"
      multiple
      :accept="allowedTypes"
      @change="handleFileSelect"
      class="hidden"
    />
    
    <!-- 드래그 앤 드롭 영역 -->
    <div
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
      class="cursor-pointer border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors"
      :class="{
        'border-gray-300 hover:border-blue-400': !isDragging && !isUploading,
        'border-blue-500 bg-blue-50': isDragging,
        'border-gray-300 bg-gray-100': isUploading,
        'bg-red-50 border-red-400': uploadError
      }"
    >
      <!-- 업로드 중 표시 -->
      <div v-if="isUploading" class="w-full">
        <div class="flex items-center justify-center mb-3">
          <svg class="animate-spin h-6 w-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm font-medium">업로드 중...</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
        <div class="text-xs text-center mt-1 text-gray-500">{{ uploadProgress }}%</div>
      </div>
      
      <!-- 업로드 오류 표시 -->
      <div v-else-if="uploadError" class="text-center">
        <svg class="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-2 text-sm text-red-600">{{ uploadError }}</p>
        <p class="mt-1 text-xs text-gray-500">다시 시도하려면 클릭하세요</p>
      </div>
      
      <!-- 기본 상태 -->
      <div v-else class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="mt-2 text-sm text-gray-500">파일을 드래그하여 업로드하거나</p>
        <p class="mt-1 text-xs text-gray-400">클릭하여 파일을 선택하세요</p>
      </div>
    </div>
  </div>
</template>