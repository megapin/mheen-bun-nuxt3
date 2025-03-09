export function useFileUploader() {
  // 현재 경로는 필요 시 주입받을 수 있음
  const currentPath = inject('currentPath', ref(''))
  
  // 업로드 관련 상태
  const isUploadModalOpen = ref(false)
  const uploadPath = ref('')
  
  // 성공/에러 콜백 (이벤트 대체)
  const onSuccess = ref<((result: any) => void) | null>(null)
  const onError = ref<((error: Error) => void) | null>(null)
  
  // 업로드 모달 열기
  const openUploadModal = (path: string = '', successCallback = null, errorCallback = null) => {
    uploadPath.value = path || currentPath.value
    isUploadModalOpen.value = true
    onSuccess.value = successCallback
    onError.value = errorCallback
  }
  
  // 업로드 성공 핸들러
  const handleUploadComplete = (result: any) => {
    // 성공 콜백 실행
    if (onSuccess.value && typeof onSuccess.value === 'function') {
      onSuccess.value(result)
    }
    
    // 모달 닫기
    closeUploadModal()
  }
  
  // 업로드 오류 핸들러
  const handleUploadError = (error: Error) => {
    console.error('파일 업로드 오류:', error)
    
    // 에러 콜백 실행
    if (onError.value && typeof onError.value === 'function') {
      onError.value(error)
    }
  }
  
  // 업로드 모달 닫기
  const closeUploadModal = () => {
    isUploadModalOpen.value = false
    onSuccess.value = null
    onError.value = null
  }

  return {
    isUploadModalOpen,
    uploadPath,
    openUploadModal,
    handleUploadComplete,
    handleUploadError,
    closeUploadModal
  }
}

// 싱글톤으로 사용하기 위한 전역 인스턴스
let fileUploaderInstance: ReturnType<typeof useFileUploader> | undefined

// 싱글톤 인스턴스 제공 함수
export function useFileUploaderSingleton() {
  if (!fileUploaderInstance) {
    fileUploaderInstance = useFileUploader()
  }
  return fileUploaderInstance
}