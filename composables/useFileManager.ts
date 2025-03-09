export function useFileManager() {
  // 현재 경로는 필요 시 주입받을 수 있음
  const currentPath = inject('currentPath', ref(''))
  
  // 파일 삭제 관련 상태
  const isDeleteConfirmOpen = ref(false)
  const fileToDelete = ref({ file: '', path: '' })
  
  // 성공/에러 콜백 (이벤트 대체)
  const onSuccess = ref<((file: { file: string, path: string }) => void) | null>(null)
  const onError = ref<((error: Error) => void) | null>(null)
  
  // 파일 삭제 확인 모달 열기
  const confirmDeleteFile = (file: string, path: string = '', successCallback = null, errorCallback = null) => {
    fileToDelete.value = { file, path }
    isDeleteConfirmOpen.value = true
    onSuccess.value = successCallback
    onError.value = errorCallback
  }
  
  // 파일 삭제 실행
  const deleteFile = async () => {
    try {
      const filePath = fileToDelete.value.path 
        ? `${fileToDelete.value.path}/${fileToDelete.value.file}`
        : `${currentPath.value}/${fileToDelete.value.file}`
      
      const response = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('파일 삭제 실패')
      }
      
      // 성공 콜백 실행
      if (onSuccess.value && typeof onSuccess.value === 'function') {
        onSuccess.value(fileToDelete.value)
      }
      
      return true
    } catch (error) {
      console.error('파일 삭제 오류:', error)
      
      // 에러 콜백 실행
      if (onError.value && typeof onError.value === 'function') {
        onError.value(error as Error)
      }
      
      return false
    } finally {
      isDeleteConfirmOpen.value = false
      fileToDelete.value = { file: '', path: '' }
      onSuccess.value = null
      onError.value = null
    }
  }
  
  // 삭제 취소
  const cancelDelete = () => {
    isDeleteConfirmOpen.value = false
    fileToDelete.value = { file: '', path: '' }
    onSuccess.value = null
    onError.value = null
  }

  return {
    isDeleteConfirmOpen,
    fileToDelete,
    confirmDeleteFile,
    deleteFile,
    cancelDelete
  }
}

// 싱글톤으로 사용하기 위한 전역 인스턴스
let fileManagerInstance: ReturnType<typeof useFileManager> | undefined

// 싱글톤 인스턴스 제공 함수
export function useFileManagerSingleton() {
  if (!fileManagerInstance) {
    fileManagerInstance = useFileManager()
  }
  return fileManagerInstance
}