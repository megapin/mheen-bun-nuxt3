<script setup lang="ts">
import { useFileManagerSingleton } from '~/composables/useFileManager'

// 싱글톤 인스턴스 사용
const { isDeleteConfirmOpen, fileToDelete, deleteFile, cancelDelete } = useFileManagerSingleton()

// 이제 props는 필요 없음 (파일매니저에서 상태 관리)
// 이벤트 emit도 필요 없음 (파일매니저에서 콜백 처리)
</script>

<template>
  <div v-if="isDeleteConfirmOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg shadow-xl w-96 overflow-hidden" @click.stop>
      <div class="p-5">
        <h3 class="text-lg font-semibold mb-2">파일 삭제 확인</h3>
        <p class="text-gray-600">정말 <span class="font-medium text-red-500">"{{ fileToDelete.file }}"</span> 파일을 삭제하시겠습니까?</p>
        <p class="text-sm text-gray-500 mt-2">이 작업은 되돌릴 수 없습니다.</p>
      </div>
      <div class="flex items-center justify-end px-5 py-3 bg-gray-50 border-t border-gray-100">
        <button 
          @click="cancelDelete" 
          class="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 mr-2">
          취소
        </button>
        <button 
          @click="deleteFile" 
          class="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>