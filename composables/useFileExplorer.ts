interface FileApiResponse {
  directories: string[];
  files: string[];
  error?: string;
}

export function useFileExplorer() {
  const currentPath = ref('kari')
  const directories = ref<string[]>([])
  const files = ref<string[]>([])
  const selectedFile = ref<string | null>(null)
  
  async function fetchDirectoryContents(): Promise<void> {
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(currentPath.value)}`)
      const data: FileApiResponse = await response.json()
      
      directories.value = data.directories || []
      files.value = data.files || []
      
      // Clear selected file when changing directories
      selectedFile.value = null
    } catch (error) {
      console.error('Error fetching directory contents:', error)
    }
  }
  
  function navigateTo(dir: string): void {
    if (currentPath.value) {
      currentPath.value += '/' + dir
    } else {
      currentPath.value = dir
    }
    fetchDirectoryContents()
  }
  
  function goToParent(): void {
    if (!currentPath.value) return
    
    const parts = currentPath.value.split('/')
    parts.pop()
    currentPath.value = parts.join('/')
    fetchDirectoryContents()
  }
  
  function selectFile(file: string): void {
    selectedFile.value = file
    // if (selectedDirectory && selectedFile.value) {
      // selectedDirectory.value = null
    // }
  }
  
  function isImage(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }
  
  function isPDF(filename: string): boolean {
    return filename.toLowerCase().endsWith('.pdf')
  }
  
  function isVideo(filename: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv']
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }
  
  function getFileType(filename: string): 'image' | 'video' | 'pdf' | 'other' {
    if (isImage(filename)) return 'image'
    if (isVideo(filename)) return 'video'
    if (isPDF(filename)) return 'pdf'
    return 'other'
  }
  
  function getFilePath(filename: string): string {
    if (currentPath.value) {
      return `/${currentPath.value}/${filename}`
    }
    return `/${filename}`
  }

  // 파일 확장자 추출 함수
  function getFileExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return extension.length > 5 ? extension.substring(0, 5) + '...' : extension;
  }

  const { getFileIcon } = useFileIcons();
  
  // 초기 데이터 로드
  fetchDirectoryContents()
  
  return {
    currentPath,
    directories,
    files,
    selectedFile,
    fetchDirectoryContents,
    navigateTo,
    goToParent,
    selectFile,
    isImage,
    isPDF,
    isVideo,
    getFileType,
    getFilePath,
    getFileExtension,
    getFileIcon,
  }
}