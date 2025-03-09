interface DirectoryContent {
  path: string;
  directories: string[];
  files: string[];
}

export function useDirectoryExplorer(fileExplorer: {
  currentPath: Ref<string>;
  navigateTo: (dir: string) => void;
  selectedFile: Ref<string | null>;
}) {
  const { currentPath, navigateTo, selectedFile } = fileExplorer
  
  // 선택된 디렉토리 상태
  const selectedDirectory = ref<string | null>(null)
  
  // 선택된 디렉토리의 내용을 저장할 상태
  const directoryContents = ref<DirectoryContent>({
    path: '',
    directories: [],
    files: [],
  })
  
  // 디렉토리 로딩 상태
  const isLoading = ref(false)
  
  // 디렉토리 선택 함수
  async function selectDirectory(dir: string) {
    selectedDirectory.value = dir
    selectedFile.value = null // 파일 선택 초기화
    
    isLoading.value = true
    
    try {
      // 선택된 디렉토리 경로 구성
      const dirPath = currentPath.value 
        ? `${currentPath.value}/${dir}`
        : dir
        
      // API 호출로 디렉토리 내용 가져오기
      const response = await fetch(`/api/files?path=${encodeURIComponent(dirPath)}`)
      if (!response.ok) throw new Error('디렉토리 내용을 가져오는데 실패했습니다.')
      
      const data = await response.json()
      directoryContents.value = {
        path: dirPath,
        directories: data.directories || [],
        files: data.files || [],
      }
    } catch (error) {
      console.error('디렉토리 내용 로드 오류:', error)
      directoryContents.value = {
        path: currentPath.value ? `${currentPath.value}/${dir}` : dir,
        directories: [],
        files: [],
      }
    } finally {
      isLoading.value = false
    }
  }
  
  // 선택된 디렉토리로 이동하는 함수
  function navigateToSelected() {
    if (selectedDirectory.value) {
      navigateTo(selectedDirectory.value)
      selectedDirectory.value = null // 선택 초기화
      directoryContents.value = {
        path: '',
        directories: [],
        files: []
      }
    }
  }
  
  // 디렉토리 선택 초기화 함수
  function clearDirectorySelection() {
    selectedDirectory.value = null
    directoryContents.value = {
      path: '',
      directories: [],
      files: []
    }
  }
  
  return {
    selectedDirectory,
    directoryContents,
    isLoading,
    selectDirectory,
    navigateToSelected,
    clearDirectorySelection
  }
}