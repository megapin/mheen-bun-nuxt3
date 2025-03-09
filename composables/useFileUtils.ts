export function useFileUtils() {
    function getFileIcon(filename: string): string {
      const extension = getFileExtension(filename)
      
      // 확장자에 따른 아이콘 반환 로직
      return 'default-icon'
    }
    
    function getFileExtension(filename: string): string {
      return filename.split('.').pop()?.toLowerCase() || ''
    }
    
    function getFilePath(path: string, file: string): string {
      return `/${path}${path ? '/' : ''}${file}`
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
    
    function getFileType(filename: string): string {
      if (isImage(filename)) return 'image'
      if (isPDF(filename)) return 'pdf'
      if (isVideo(filename)) return 'video'
      // ...기타 타입...
      return 'file'
    }
    
    return {
      getFileIcon,
      getFileExtension,
      getFilePath,
      isImage,
      isPDF,
      isVideo,
      getFileType
    }
  }