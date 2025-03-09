export function useFileIcons() {  
  // function getFileIcon(filename: string): string {
  //   const extension = filename.split('.').pop()?.toLowerCase() || ''
  //   const iconMap = {
  //     jpg: 'icons/image.svg',
  //     jpeg: 'icons/image.svg',
  //     png: 'icons/image.svg',
  //     gif: 'icons/image.svg',
  //     svg: 'icons/image.svg',
  //     webp: 'icons/image.svg',
  //     bmp: 'icons/image.svg',
  //     pdf: 'icons/pdf.svg',
  //     doc: 'icons/word.svg',
  //     docx: 'icons/word.svg',
  //     xls: 'icons/excel.svg',
  //     xlsx: 'icons/excel.svg',
  //     mp4: 'icons/video.svg',
  //     webm: 'icons/video.svg',
  //     ogg: 'icons/video.svg',
  //     mov: 'icons/video.svg',
  //     avi: 'icons/video.svg',
  //     wmv: 'icons/video.svg',
  //     flv: 'icons/video.svg',
  //     mkv: 'icons/video.svg',
  //     html: 'icons/html.svg',
  //     htm: 'icons/html.svg',
  //     css: 'icons/code.svg',
  //     js: 'icons/code.svg',
  //     ts: 'icons/code.svg',
  //     jsx: 'icons/code.svg',
  //     tsx: 'icons/code.svg',
  //     json: 'icons/code.svg',
  //     xml: 'icons/code.svg',
  //     zip: 'icons/archive.svg',
  //     tar: 'icons/archive.svg',
  //     gz: 'icons/archive.svg',
  //     default: 'icons/file.svg'
  //   }
  //   return iconMap[extension] || iconMap.default
  // }
  

  function getFileIcon(filename: string): string {
    // 파일 확장자 추출
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    // 확장자별 아이콘 반환
    switch (extension) {
      // 이미지
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'webp':
      case 'bmp':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
      
      // 문서
      case 'pdf':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-pdf" viewBox="0 0 24 24" fill="none" stroke="#D50000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      
      case 'doc':
      case 'docx':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-word" viewBox="0 0 24 24" fill="none" stroke="#2B579A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      
      case 'xls':
      case 'xlsx':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-excel" viewBox="0 0 24 24" fill="none" stroke="#217346" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      
      // 비디오
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'wmv':
      case 'flv':
      case 'mkv':
      case 'webm':
      case 'ogg':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-video" viewBox="0 0 24 24" fill="none" stroke="#FF3D00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`;
      
      // 코드
      case 'js':
      case 'ts':
      case 'json':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-code" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
      
      case 'html':
      case 'css':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-html" viewBox="0 0 24 24" fill="none" stroke="#00ACC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
      
      // 압축 파일
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
      case 'gz':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-archive" viewBox="0 0 24 24" fill="none" stroke="#795548" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8"></path><path d="M1 3h22v5H1z"></path><path d="M10 12h4"></path></svg>`;
      
      // 기본 파일
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
    }
  }

  return {
    getFileIcon
  }
}