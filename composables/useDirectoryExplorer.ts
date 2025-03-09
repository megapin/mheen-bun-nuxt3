import { useFileExplorerSingleton } from '~/composables/useFileExplorer'

export function useDirectoryExplorer() {
  // File Explorer 싱글톤에서 필요한 상태 가져오기
  const { currentPath, selectedFile, selectedDirectory } = useFileExplorerSingleton()
  
  // 디렉토리 내용 상태
  const directoryContents = ref({
    path: '',
    directories: [],
    files: []
  })
  
  // 로딩 상태
  const isLoading = ref(false)
  
  // 디렉토리 내용 가져오기
  const fetchDirectoryContents = async (path = null) => {
    if (!selectedDirectory.value) return

    isLoading.value = true
    
    try {
      // 경로 계산: 지정된 경로 또는 현재 경로와 선택된 디렉토리 조합
      const dirPath = path || `${currentPath.value}/${selectedDirectory.value}`
      
      const response = await fetch(`/api/files?path=${encodeURIComponent(dirPath)}`)
      if (!response.ok) {
        throw new Error('디렉토리 내용을 가져오는데 실패했습니다')
      }
      
      const data = await response.json()
      
      directoryContents.value = {
        path: dirPath,
        directories: data.directories || [],
        files: data.files || []
      }
    } catch (error) {
      console.error('디렉토리 내용 가져오기 오류:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  // 하위 디렉토리로 이동
  const navigateToSubDirectory = (dir) => {
    // 경로 계산: 현재 경로와 선택된 디렉토리, 그리고 클릭한 하위 디렉토리 조합
    const targetPath = `${currentPath.value}/${selectedDirectory.value}/${dir}`
    
    // 패스 정규화 (중복 슬래시 제거)
    const normalizedPath = targetPath.replace(/\/+/g, '/')
    
    // 상태 업데이트 및 이동
    currentPath.value = normalizedPath
    selectedDirectory.value = null
    selectedFile.value = null
    
    // FileExplorer의 내용 갱신 (FileExplorerSingleton의 fetchDirectoryContents 호출)
    const { fetchDirectoryContents: refreshExplorer } = useFileExplorerSingleton()
    refreshExplorer()
  }
  
  // 선택된 디렉토리가 변경될 때마다 내용 가져오기
  watch(selectedDirectory, async (newDir, oldDir) => {
    if (newDir) {
      await fetchDirectoryContents()
    } else {
      // 디렉토리 선택이 취소되면 내용 초기화
      directoryContents.value = {
        path: '',
        directories: [],
        files: []
      }
    }
  })
  
  // 현재 경로가 변경될 때도 선택된 디렉토리가 있으면 내용 갱신
  watch(currentPath, async () => {
    if (selectedDirectory.value) {
      await fetchDirectoryContents()
    }
  })

  return {
    directoryContents,
    isLoading,
    fetchDirectoryContents,
    navigateToSubDirectory
  }
}

// 싱글톤 인스턴스
let directoryExplorerInstance: ReturnType<typeof useDirectoryExplorer> | undefined

// 싱글톤 인스턴스 제공 함수
export function useDirectoryExplorerSingleton() {
  if (!directoryExplorerInstance) {
    directoryExplorerInstance = useDirectoryExplorer()
  }
  return directoryExplorerInstance
}