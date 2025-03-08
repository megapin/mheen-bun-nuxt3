interface ResizeOptions {
  minWidth?: number;
  maxWidthPercent?: number;
  initialWidth?: number;
}

export function useResizablePanel(options: ResizeOptions = {}) {
  const {
    minWidth = 200,
    maxWidthPercent = 0.7,
    initialWidth = 350
  } = options
  
  const panelWidth = ref(initialWidth)
  const isDragging = ref(false)
  
  function startDrag(): void {
    isDragging.value = true
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    // 드래그 중에 텍스트 선택 방지
    document.body.style.userSelect = 'none'
  }
  
  function onDrag(e: MouseEvent): void {
    if (isDragging.value) {
      // 새로운 패널 너비 계산 (최소값과 최대값 제한)
      const maxWidth = window.innerWidth * maxWidthPercent
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX))
      panelWidth.value = newWidth
    }
  }
  
  function stopDrag(): void {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.body.style.userSelect = ''
  }
  
  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  onUnmounted(() => {
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  })
  
  return {
    panelWidth,
    isDragging,
    startDrag
  }
}