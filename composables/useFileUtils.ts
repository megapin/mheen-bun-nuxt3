export function useFileUtils() {
  const currentPath = inject('currentPath', ref(''))
  
  // 파일 경로 생성
  const getFilePath = (dirPath: string, file: string) => {
    if (dirPath) {
      return `/${dirPath}/${file}`
    } else {
      return `/${currentPath.value}/${file}`
    }
  }
  
  // 이미지 형식 확인
  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase()
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext || '')
  }
  
  // PDF 형식 확인
  const isPDF = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase()
    return ext === 'pdf'
  }
  
  // 비디오 형식 확인
  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase()
    return ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv'].includes(ext || '')
  }
  
  // 파일 확장자 추출
  const getFileExtension = (file: string) => {
    return file.split('.').pop()?.toLowerCase() || '?'
  }
  
  // 파일 타입에 따른 아이콘 클래스
  const getFileIcon = (file: string) => {
    const ext = getFileExtension(file)
    
    if (isImage(file)) {
      return '<svg class="icon-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
    }
    
    if (isPDF(file)) {
      return '<svg class="icon-pdf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
    }
    
    if (isVideo(file)) {
      return '<svg class="icon-video" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>'
    }
    
    // 기타 파일 타입에 대한 아이콘 정의...
    
    return '<svg class="icon-file" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>'
  }
  
  return {
    getFilePath,
    isImage,
    isPDF,
    isVideo,
    getFileExtension,
    getFileIcon
  }
}