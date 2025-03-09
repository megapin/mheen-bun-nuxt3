<script setup lang="ts">
const props = defineProps({
  file: {
    type: String,
    required: true
  },
  path: {
    type: String,
    default: ''
  }
});

// const emit = defineEmits(['double-click']);
const emit = defineEmits(['delete-success', 'delete-error']);

// 비디오 재생 오류 상태
const videoPlayError = ref(false);

// 파일 관련 유틸리티 함수
const { getFilePath, isImage, isPDF, isVideo } = useFileUtils();

// 파일 매니저를 통한 삭제 기능
const { confirmDeleteFile } = useFileManagerSingleton();

// 이미지 뷰어 기능
const { handleImageDoubleClick } = useImageViewerSingleton();

// 삭제 버튼 클릭 핸들러
const handleDeleteClick = () => {
  confirmDeleteFile(props.file, props.path, 
    // 성공 콜백
    (deletedFile) => {
      emit('delete-success', deletedFile);
    },
    // 에러 콜백
    (error) => {
      emit('delete-error', error);
    }
  );
};

// 이미지 더블클릭 핸들러
const onImageDoubleClick = () => {
  if (isImage(props.file)) {
    handleImageDoubleClick(props.file, props.path, getFilePath);
  }
};
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- 헤더 -->
    <div class="px-4 py-3 flex gap-2 items-center border-b border-gray-200">
      <div class="font-medium">{{ file }}</div>
      <!-- 다운로드 버튼 -->
      <a 
        :href="getFilePath(path, file)" 
        download
        class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
        title="다운로드">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        다운로드
      </a>
      <!-- 삭제 버튼 추가 -->
      <a
        @click="handleDeleteClick"
        class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center cursor-pointer"
        title="삭제">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1.5">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        삭제
      </a>
    </div>
    
    <!-- 이미지 미리보기 -->
    <div v-if="isImage(file)" class="flex-1 flex items-center justify-center overflow-auto bg-gray-50 rounded p-4">
      <img 
        :src="`/${path}/${file}`" 
        :alt="file" 
        class="max-w-full max-h-90vh object-contain shadow-sm cursor-pointer" 
        @dblclick="onImageDoubleClick" />
    </div>
    
    <!-- 비디오 미리보기 -->
    <div v-else-if="isVideo(file)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded p-4">
      <video 
        controls
        controlsList="nodownload"
        preload="metadata"
        class="max-w-full max-h-90vh"
        @error="videoPlayError = true">
        <source :src="getFilePath(path, file)" :type="`video/${file.split('.').pop().toLowerCase()}`">
        <p>브라우저가 비디오를 지원하지 않거나 비디오 형식이 호환되지 않습니다.</p>
      </video>
      <p v-if="videoPlayError" class="absolute bottom-4 text-red-500 bg-white/80 px-4 py-2 rounded">
        비디오 재생 중 오류가 발생했습니다. 다른 브라우저나 미디어 플레이어에서 열어보세요.
      </p>
    </div>
    
    <!-- PDF 미리보기 -->
    <div v-else-if="isPDF(file)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded">
      <embed 
        :src="getFilePath(path, file)" 
        type="application/pdf" 
        class="w-full h-full" 
        alt="pdf-viewer" />
    </div>
    
    <!-- 기타 파일 정보 -->
    <div v-else class="flex-1 flex flex-col items-center justify-center bg-gray-50 p-5 rounded">
      <p>이 파일 형식은 미리보기를 지원하지 않습니다.</p>
      <p class="mt-2 text-gray-500">파일 경로: {{ getFilePath(path, file) }}</p>
      <a 
        :href="getFilePath(path, file)" 
        target="_blank" 
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        브라우저에서 열기
      </a>
    </div>
  </div>
</template>

<style scoped>
video:focus {
  outline: none;
}
</style>