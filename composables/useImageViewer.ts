export function useImageViewer() {
  // 이미지 확대 상태 관리
  const isImageFullscreen = ref(false)
  const fullscreenImage = ref<string | null>(null)
  const fullscreenImageTitle = ref<string | null>(null)
  const imageOriginalPos = ref({ file: '', path: '' })

  // 이미지 더블클릭 핸들러
  const handleImageDoubleClick = (file: string, path: string, getFilePath?: (file: string) => string) => {
    // 확대 모드 토글
    if (isImageFullscreen.value && imageOriginalPos.value.file === file) {
      // 이미 확대된 같은 이미지면 원래 크기로 복귀
      isImageFullscreen.value = false
    } else {
      // 새로운 이미지 확대
      isImageFullscreen.value = true
      fullscreenImageTitle.value = file
      imageOriginalPos.value = { file, path }
      // 이미지 경로 설정
      fullscreenImage.value = path ? `/${path}/${file}` : getFilePath ? getFilePath(file) : `/${file}`
    }
  }

  // 확대된 이미지 닫기
  const closeFullscreen = () => {
    isImageFullscreen.value = false
  }

  // ESC 키 이벤트로 확대 모드 종료
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isImageFullscreen.value) {
      closeFullscreen()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    isImageFullscreen,
    fullscreenImage,
    fullscreenImageTitle,
    imageOriginalPos,
    handleImageDoubleClick,
    closeFullscreen
  }
}

// 싱글톤 패턴 적용 (선택 사항)
let imageViewerInstance: ReturnType<typeof useImageViewer> | undefined

export function useImageViewerSingleton() {
  if (!imageViewerInstance) {
    imageViewerInstance = useImageViewer()
  }
  return imageViewerInstance
}