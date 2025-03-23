export function useResizeSvg(svgElement: Ref<SVGElement | null>) {
  const width = ref(0)
  const height = ref(0)
  
  const updateSize = () => {
    if (!svgElement.value) return
    
    width.value = window.innerWidth
    height.value = window.innerHeight
    
    // Update SVG viewBox or other attributes
    svgElement.value.setAttribute('viewBox', `0 0 ${width.value} ${height.value}`)
    svgElement.value.setAttribute('width', `${width.value}px`)
    svgElement.value.setAttribute('height', `${height.value}px`)
  }
  
  onMounted(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })
  
  return { width, height, updateSize }
}