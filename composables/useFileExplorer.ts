export function useFileExplorer() {
  // 현재 경로
  const currentPath = ref('kari')
  
  // 선택된 파일/디렉토리
  const selectedFile = ref<string | null>(null)
  const selectedDirectory = ref<string | null>(null)
  
  // 파일 및 디렉토리 목록
  const directories = ref([])
  const files = ref([])
  
  // 디렉토리 내용 
  const directoryContents = ref({
    path: '',
    directories: [],
    files: []
  })
  
  // 로딩 상태
  const isLoading = ref(false)
  const isLoadingDirectory = ref(false)
  
  // 루트 경로 여부
  const isRoot = computed(() => currentPath.value === 'kari')
  
  // 디렉토리 내용 가져오기
  const fetchDirectoryContents = async () => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(currentPath.value)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch directory contents')
      }
      
      const data = await response.json()
      directories.value = data.directories || []
      files.value = data.files || []
    } catch (error) {
      console.error('디렉토리 내용 가져오기 오류:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  // 디렉토리 선택
  const selectDirectory = async (dir: string): Promise<void> => {
    selectedDirectory.value = dir;
    selectedFile.value = null;
    
    // DirectoryExplorer 싱글톤의 fetchDirectoryContents 명시적 호출
    const { fetchDirectoryContents: fetchDirContents } = useDirectoryExplorerSingleton();
    await fetchDirContents();
  }
  
  // 특정 디렉토리로 이동
  const navigateTo = (dir: string): void => {
    // 이전에 선택된 파일이나 디렉토리 초기화
    selectedFile.value = null
    selectedDirectory.value = null
    
    // 경로 업데이트
    currentPath.value = `${currentPath.value}/${dir}`.replace(/\/+/g, '/')
    
    // 디렉토리 내용 가져오기
    fetchDirectoryContents()
  }
  
  // 서브 디렉토리로 이동
  const navigateToSubDirectory = (dir: string): void => {
    // 현재 선택된 디렉토리와 이동하려는 디렉토리 조합
    const targetPath = selectedDirectory.value
      ? `${currentPath.value}/${selectedDirectory.value}/${dir}`
      : `${currentPath.value}/${dir}`
    
    // 패스 정규화 (중복 슬래시 제거)
    const normalizedPath = targetPath.replace(/\/+/g, '/')
    
    // 현재 경로 설정 및 디렉토리 내용 가져오기
    currentPath.value = normalizedPath
    selectedDirectory.value = null
    selectedFile.value = null
    fetchDirectoryContents()
  }
  
  // 상위 디렉토리로 이동
  const goToParent = () => {
    // 루트 경로인 경우 이동하지 않음
    if (isRoot.value) {
      return
    }
    
    // 이전에 선택된 파일이나 디렉토리 초기화
    selectedFile.value = null
    selectedDirectory.value = null
    
    // 상위 경로로 이동
    const pathParts = currentPath.value.split('/')
    pathParts.pop()  // 마지막 디렉토리 제거
    currentPath.value = pathParts.join('/') || 'kari'
    
    // 디렉토리 내용 가져오기
    fetchDirectoryContents()
  }
  
  // 파일 선택
  interface File {
    name: string;
    path: string;
  }

  const selectFile = (file: string): void => {
    selectedFile.value = file
    selectedDirectory.value = null
  }
  
  // 디렉토리 선택 취소
  const clearDirectorySelection = () => {
    selectedDirectory.value = null
  }
  
  return {
    currentPath,
    directories,
    files,
    selectedFile,
    selectedDirectory,
    directoryContents,
    isLoading,
    isLoadingDirectory,
    isRoot,
    fetchDirectoryContents,
    navigateTo,
    navigateToSubDirectory,
    goToParent,
    selectFile,
    selectDirectory,
    clearDirectorySelection
  }
}

// 싱글톤으로 사용하기 위한 전역 인스턴스
let fileExplorerInstance: ReturnType<typeof useFileExplorer> | undefined

// 싱글톤 인스턴스 제공 함수
export function useFileExplorerSingleton() {
  if (!fileExplorerInstance) {
    fileExplorerInstance = useFileExplorer()
  }
  return fileExplorerInstance
}