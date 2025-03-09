<script setup lang="ts">
const {
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
  getFileIcon,
  getFileExtension,
} = useFileExplorer()

const {
  selectedDirectory,
  directoryContents,
  isLoading: isLoadingDirectory,
  selectDirectory,
  navigateToSelected,
  clearDirectorySelection
} = useDirectoryExplorer({
  currentPath,
  navigateTo,
  selectedFile
})

const { 
  panelWidth: leftPanelWidth,
  isDragging, 
  startDrag 
} = useResizablePanel({
  initialWidth: 350,
  minWidth: 200,
  maxWidthPercent: 0.7
})

// 비디오 재생 오류 상태
const videoPlayError = ref(false)

const handleFileSelection = (file) => {
  clearDirectorySelection()
  selectFile(file)
}

// 이미지 확대 상태 관리
const isImageFullscreen = ref(false)
const fullscreenImage = ref<string | null>(null)
const fullscreenImageTitle = ref<string | null>(null)
const imageOriginalPos = ref({ file: '', path: '' })

// 이미지 더블클릭 핸들러
const handleImageDoubleClick = (file, path) => {
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
    fullscreenImage.value = path ? `/${path}/${file}` : getFilePath(file)
  }
}

// 확대된 이미지 닫기
const closeFullscreen = () => {
  isImageFullscreen.value = false
}

// ESC 키 이벤트로 확대 모드 종료
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e) =>{
  if (e.key === 'Escape' && isImageFullscreen.value) {
    closeFullscreen()
  }
}
const navigateToSubDirectory = (dir: string) => {
  // 현재 선택된 디렉토리와 이동하려는 디렉토리 조합
  const targetPath = selectedDirectory.value
    ? `${currentPath.value}/${selectedDirectory.value}/${dir}`
    : `${currentPath.value}/${dir}`
  
  // 패스 정규화 (중복 슬래시 제거)
  const normalizedPath = targetPath.replace(/\/+/g, '/')
  
  // 현재 경로 설정 및 디렉토리 내용 가져오기
  currentPath.value = normalizedPath
  fetchDirectoryContents()
  
  // 선택 상태 초기화
  selectedDirectory.value = null
  selectedFile.value = null
}

// 삭제 확인 상태
const isDeleteConfirmOpen = ref(false)
const fileToDelete = ref({ file: '', path: '' })

// 파일 삭제 확인 모달 열기
const confirmDeleteFile = (file: string, path: string = '') => {
  fileToDelete.value = { file, path }
  isDeleteConfirmOpen.value = true
}

// 파일 삭제 실행
const deleteFile = async () => {
  try {
    const filePath = fileToDelete.value.path 
      ? `${fileToDelete.value.path}/${fileToDelete.value.file}`
      : `${currentPath.value}/${fileToDelete.value.file}`
    
    const response = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('파일 삭제 실패')
    }
    
    // 삭제 성공 시 액션
    if (isImageFullscreen.value && fileToDelete.value.file === imageOriginalPos.value.file) {
      closeFullscreen()
    }
    
    if (selectedFile.value === fileToDelete.value.file) {
      selectedFile.value = null
    }
    
    // 디렉토리 내용 새로고침
    if (fileToDelete.value.path) {
      // 미리보기에서 삭제한 경우 해당 디렉토리 내용 새로고침
      const selectedDirPath = `${currentPath.value}/${selectedDirectory.value}`
      if (selectedDirPath === fileToDelete.value.path) {
        selectDirectory(selectedDirectory.value!)
      }
    } else {
      // 메인 뷰에서 삭제한 경우 현재 디렉토리 내용 새로고침
      fetchDirectoryContents()
    }
    
    // 알림 표시
    alert(`"${fileToDelete.value.file}" 파일이 삭제되었습니다.`)
  } catch (error) {
    console.error('파일 삭제 오류:', error)
    alert('파일 삭제 중 오류가 발생했습니다.')
  } finally {
    isDeleteConfirmOpen.value = false
  }
}

// 삭제 취소
const cancelDelete = () => {
  isDeleteConfirmOpen.value = false
  fileToDelete.value = { file: '', path: '' }
}

// 업로드 관련 상태
const isUploadModalOpen = ref(false)
const uploadPath = computed(() => {
  if (selectedDirectory.value) {
    return `${currentPath.value}/${selectedDirectory.value}`
  }
  return currentPath.value
})

// 업로드 완료 핸들러
const handleUploadComplete = (result) => {
  isUploadModalOpen.value = false
  
  // 현재 보고 있는 디렉토리를 새로고침
  if (selectedDirectory.value) {
    selectDirectory(selectedDirectory.value)
  } else {
    fetchDirectoryContents()
  }
  
  // 업로드 완료 알림
  // alert(`${result.files.length}개의 파일이 업로드되었습니다.`)
}

// 업로드 오류 핸들러
const handleUploadError = (error) => {
  alert(`업로드 실패: ${error}`)
}
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col">
    <div class="flex-1 flex overflow-hidden relative">
      <!-- 왼쪽: 파일 및 디렉토리 목록 -->
      <div class="flex flex-col overflow-hidden bg-gray-50" :style="{ width: `${leftPanelWidth}px` }">
        <div class="flex flex-col h-full">
          <!-- 상단 네비게이션 영역 -->
          <div class="p-2.5 flex items-center bg-gray-100 b b-b-solid b-gray-200">
            <button 
              @click="goToParent" 
              :disabled="currentPath === 'kari'"
              class="p-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
              상위 폴더로
            </button>
            <span class="ml-2 font-mono text-sm bg-white px-2.5 py-1 rounded truncate flex-1">
              /{{ currentPath }}
            </span>
          </div>
          
          <!-- 통합된 파일/디렉토리 섹션 -->
          <div class="pt-4 flex-1 flex flex-col min-h-0">
            <ul class="list-none p-0 m-0 flex-1 overflow-y-auto">
              <!-- 상위 디렉토리로 이동하는 항목 (현재 경로가 있을 때만 표시) -->
              <li 
                v-if="currentPath !== 'kari'"
                @dblclick="goToParent" 
                class="select-none cursor-pointer px-2.5 py-1.5 flex items-center hover:bg-gray-200 transition-colors bg-gray-50">
                <div class="w-6 h-6 mr-2 text-blue-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </div>
                <span>../</span>
              </li>
              
              <!-- 디렉토리 목록 -->
              <li 
                v-for="dir in directories" 
                :key="dir" 
                @click="selectDirectory(dir)"
                @dblclick="navigateTo(dir)" 
                class="select-none cursor-pointer px-2.5 py-1.5 flex items-center hover:bg-gray-200 transition-colors"
                :class="{ 'bg-blue-200 border-l-3 border-l-blue-500': selectedDirectory === dir }">
                <div class="w-6 h-6 mr-2 text-blue-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <span class="truncate w-full" :title="dir">{{ dir }}</span>
              </li>
              
              <!-- 파일 목록 -->
              <li 
                v-for="file in files" 
                :key="file" 
                @click="handleFileSelection(file)"
                class="py-1.5 cursor-pointer px-2.5 border-b border-gray-100 flex items-center hover:bg-gray-200 transition-colors select-none"
                :class="{ 'bg-blue-200 border-l-3 border-l-blue-500': selectedFile === file }">
                <!-- 아이콘과 확장자가 겹치는 컨테이너 -->
                <div class="relative w-6 h-6 flex-shrink-0 mr-2">
                  <!-- 아이콘 -->
                  <div class="w-6 h-6" v-html="getFileIcon(file)"></div>
                  <!-- 확장자 배지 - 아이콘 위에 겹치게 표시 -->
                  <div class="absolute -bottom-1 -right-1 bg-gray-100 text-[10px] px-1 rounded-sm font-medium border border-gray-200 leading-tight shadow-sm">
                    {{ getFileExtension(file) }}
                  </div>
                </div>
                <span class="truncate w-full" :title="file">{{ file }}</span>
              </li>

              <!-- 아무 내용이 없을 경우 표시할 메시지 -->
              <li v-if="directories.length === 0 && files.length === 0 && currentPath === ''" class="px-2.5 py-4 text-center text-gray-500 italic">
                내용이 없습니다
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 리사이즈 핸들 -->
      <div
        class="w-px bg-gray-300 hover:bg-blue-500 cursor-col-resize z-10 relative"
        @mousedown="startDrag">
        <!-- 드래그 핸들 표시 -->
        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-16 flex items-center justify-center">
          <div class="h-8 w-0.5 bg-gray-400 mx-0.5"></div>
        </div>
      </div>
      
      <!-- 오른쪽: 파일/디렉토리 미리보기 영역 -->
      <div class="flex-1 bg-white overflow-hidden flex flex-col relative">

        <div class="absolute top-3 right-4 z-20 flex gap-2">
          <!-- 업로드 버튼 -->
          <a 
            @click="isUploadModalOpen = true" 
            class="cursor-pointer px-3 py-1 bg-green-500 text-white rounded flex items-center shadow-md hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            파일 업로드
          </a>
        </div>

        <!-- 확대된 이미지 보기 (오른쪽 영역 내에서) -->
        <div 
          v-if="isImageFullscreen" 
          class="absolute inset-0 z-10 bg-gray-900 flex flex-col">
          <!-- 확대 모드 헤더 -->
          <div class="flex items-center px-4 py-3 bg-gray-800 text-white border-b border-gray-700">
            <div class="font-medium truncate mr-2">{{ fullscreenImageTitle }}</div>
            <!-- 컨트롤 버튼 그룹 -->
            <div class="flex items-center space-x-2">
              <!-- 다운로드 버튼 -->
              <a 
                :href="fullscreenImage" 
                download
                class="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center"
                title="다운로드"
                @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                다운로드
              </a>
              <!-- 삭제 버튼 -->
              <a 
                @click.stop="confirmDeleteFile(imageOriginalPos.file, imageOriginalPos.path)"
                class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 flex items-center"
                title="삭제">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                삭제
              </a>
              <!-- 닫기 버튼 -->
              <a 
                @click="closeFullscreen" 
                class="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 rounded-full"
                title="닫기">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- 확대된 이미지 -->
          <div 
            class="flex-1 flex items-center justify-center overflow-auto bg-gray-900 p-4"
            @click="closeFullscreen">
            <img 
              :src="fullscreenImage" 
              :alt="fullscreenImageTitle"
              class="max-w-full max-h-full object-contain shadow-lg cursor-zoom-out"/>
          </div>
        </div>
        
        <!-- 디렉토리 미리보기 -->
        <div v-if="selectedDirectory && !isImageFullscreen" class="flex-1 flex flex-col overflow-hidden">
          <div class="px-4 py-4 flex items-center border border-b-solid border-gray-200">
            <div class="font-medium">
              {{ selectedDirectory }}
            </div>
            <!-- <button 
              @click="navigateToSelected" 
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 ml-2">
              이 폴더로 이동
            </button> -->
          </div>
          
          <!-- 디렉토리 내용 그리드 -->
          <div class="flex-1 p-4 overflow-auto bg-gray-50">
            <!-- 로딩 중 표시 -->
            <div v-if="isLoadingDirectory" class="flex items-center justify-center h-full">
              <div class="animate-spin rounded-full h-24 w-24 b-t-solid b-b-solid border-t-4 border-b-4 border-blue-500"></div>
            </div>
            
            <!-- 4:3 비율 그리드 -->
            <div v-else-if="directoryContents.directories.length > 0 || directoryContents.files.length > 0" 
              class="flex flex-wrap gap-4 justify-start content-start p-2">
              <!-- 디렉토리 아이템 -->
              <div
                v-for="dir in directoryContents.directories"
                :key="dir"
                class="select-none cursor-pointer w-[200px] flex flex-col rounded shadow-sm overflow-hidden hover:shadow-md transition-all group"
                @dblclick="navigateToSubDirectory(dir)">
                <!-- 4:3 비율 유지를 위한 컨테이너 -->
                <div class="h-[150px] bg-blue-50 overflow-hidden relative">
                  <!-- 디렉토리 아이콘 -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 w-16 h-16">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </div>
                <!-- 디렉토리 이름 -->
                <div class="px-2 py-1.5 bg-white">
                  <div class="text-xs font-medium truncate" :title="dir">{{ dir }}</div>
                </div>
              </div>
              <!-- 파일 아이템 -->
              <div
                v-for="file in directoryContents.files"
                :key="file"
                class="w-[200px] flex flex-col rounded shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <!-- 컨테이너 내용 -->
                <div class="h-[150px] bg-gray-50 overflow-hidden relative">
                  <img 
                    v-if="isImage(file)"
                    :src="`/${directoryContents.path}/${file}`" 
                    :alt="file" 
                    class="absolute inset-0 w-full h-full object-cover"
                    @error="$event.target.src = '/placeholder-image.png'" 
                    @dblclick="handleImageDoubleClick(file, directoryContents.path)" />
                  <!-- 이미지가 아닌 파일은 아이콘으로 표시 -->
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center">
                    <!-- 아이콘 -->
                    <div class="w-16 h-16 relative mb-1" v-html="getFileIcon(file)"></div>
                    
                    <!-- 확장자 배지 -->
                    <span class="bg-gray-100 text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm">
                      {{ getFileExtension(file) }}
                    </span>
                  </div>
                  <!-- 액션 버튼 그룹 (호버 시 표시) -->
                  <div class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <!-- 다운로드 버튼 -->
                    <a 
                      :href="`/${directoryContents.path}/${file}`" 
                      download
                      class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-blue-100"
                      title="다운로드"
                      @click.stop>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                    <!-- 삭제 버튼 -->
                    <a
                      @click.stop="confirmDeleteFile(file, directoryContents.path)"
                      class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-red-100"
                      title="삭제">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-red-500">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </a>
                  </div>
                </div>
                <!-- 파일 이름 영역 -->
                <div class="flex px-2 py-1.5 bg-white border-t border-gray-100">
                  <div class="text-xs font-medium truncate" :title="file">{{ file }}</div>
                </div>
              </div>
            </div>
            
            <!-- 내용이 없는 경우 -->
            <div 
              v-else
              class="col-span-full text-center text-gray-500 italic p-8">
              디렉토리가 비어있습니다
            </div>
          </div>
        </div>
        
        <!-- 파일 미리보기 -->
        <div v-else-if="selectedFile" class="flex-1 flex flex-col overflow-hidden">
          <div class="px-4 py-3 flex gap-2 items-center b border-b-solid border-gray-200">
            <div class="font-medium">
              {{ selectedFile }}
            </div>
            <a 
              :href="getFilePath(selectedFile)" 
              download
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
              title="다운로드">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              다운로드
            </a>
            <!-- 삭제 버튼 -->
            <a
              @click="confirmDeleteFile(selectedFile)"
              class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
              title="삭제">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1.5">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              삭제
            </a>
          </div>
          
          <div v-if="isImage(selectedFile)" class="flex-1 flex items-center justify-center overflow-auto bg-gray-50 rounded p-4">
            <img 
              :src="getFilePath(selectedFile)" 
              :alt="selectedFile" 
              class="max-w-full max-h-90vh object-contain shadow-sm cursor-pointer"
              @dblclick="handleImageDoubleClick(selectFile, null)" />
          </div>
          <div v-else-if="isVideo(selectedFile)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded p-4">
            <video 
              controls
              controlsList="nodownload"
              preload="metadata"
              class="max-w-full max-h-90vh"
              @error="videoPlayError = true">
              <source :src="getFilePath(selectedFile)" :type="`video/${selectedFile.split('.').pop().toLowerCase()}`">
              <p>브라우저가 비디오를 지원하지 않거나 비디오 형식이 호환되지 않습니다.</p>
            </video>
            <p v-if="videoPlayError" class="absolute bottom-4 text-red-500 bg-white/80 px-4 py-2 rounded">
              비디오 재생 중 오류가 발생했습니다. 다른 브라우저나 미디어 플레이어에서 열어보세요.
            </p>
          </div>
          <div v-else-if="isPDF(selectedFile)" class="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded">
            <embed 
              :src="getFilePath(selectedFile)" 
              type="application/pdf" 
              class="w-full h-full" 
              alt="pdf-viewer" />
          </div>
          <div v-else class="flex-1 flex flex-col items-center justify-center bg-gray-50 p-5 rounded">
            <p>이 파일 형식은 미리보기를 지원하지 않습니다.</p>
            <p class="mt-2 text-gray-500">파일 경로: {{ getFilePath(selectedFile) }}</p>
            <a 
              :href="getFilePath(selectedFile)" 
              target="_blank" 
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              브라우저에서 열기
            </a>
          </div>
        </div>
        <!-- <FileExplorerFilePreview
          v-else-if="selectedFile"
          :directory="selectedDirectory"
          :contents="directoryContents"
          :is-loading="isLoadingDirectory"
          :path="currentPath" /> -->
        
        <!-- 아무것도 선택되지 않은 경우 -->
        <div v-else-if="!isImageFullscreen" class="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 italic">
          <p>미리보기할 파일이나 폴더를 선택하세요</p>
        </div>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div v-if="isDeleteConfirmOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg shadow-xl w-96 overflow-hidden">
        <div class="p-5">
          <h3 class="text-lg font-semibold mb-2">파일 삭제 확인</h3>
          <p class="text-gray-600">정말 <span class="font-medium text-red-500">"{{ fileToDelete.file }}"</span> 파일을 삭제하시겠습니까?</p>
          <p class="text-sm text-gray-500 mt-2">이 작업은 되돌릴 수 없습니다.</p>
        </div>
        <div class="flex items-center justify-end px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button 
            @click="cancelDelete" 
            class="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 mr-2">
            취소
          </button>
          <button 
            @click="deleteFile" 
            class="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600">
            삭제
          </button>
        </div>
      </div>
    </div>

    <!-- 파일 업로드 모달 -->
    <div v-if="isUploadModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg shadow-xl w-[500px] max-w-full overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold">파일 업로드</h3>
          <button
            @click="isUploadModalOpen = false"
            class="p-1 rounded hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <div class="mb-4">
            <p class="text-sm text-gray-500 mb-1">업로드 위치:</p>
            <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded font-mono text-sm truncate">
              /{{ uploadPath }}
            </div>
          </div>
          
          <!-- 업로드 컴포넌트 -->
          <FileUploader 
            :path="uploadPath"
            @upload-complete="handleUploadComplete"
            @upload-error="handleUploadError"
          />
        </div>
        
        <div class="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button 
            @click="isUploadModalOpen = false" 
            class="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
video:focus {outline: none;}

/* 4:3 비율 유지를 위한 스타일 */
.aspect-4-3 {aspect-ratio: 4/3;}

:deep(.icon-image) {color: #4CAF50;}
:deep(.icon-pdf) {color: #D50000;}
:deep(.icon-video) {color: #FF3D00;}
:deep(.icon-file) {color: #607D8B;}
:deep(.icon-archive) {color: #795548;}
:deep(.icon-word) {color: #2B579A;}
:deep(.icon-excel) {color: #217346;}
:deep(.icon-code) {color: #FFC107;}
:deep(.icon-html) {color: #00ACC1;}

/* 아이콘 스타일 확장 */
:deep(.icon-image),
:deep(.icon-pdf),
:deep(.icon-video),
:deep(.icon-file),
:deep(.icon-archive),
:deep(.icon-word),
:deep(.icon-excel),
:deep(.icon-code),
:deep(.icon-html) {
  width: 100%;
  height: 100%;
}

/* 피일 아이템 호버 효과 */
.file-item:hover .file-name {
  background-color: #f0f9ff;
}

/* 확대/축소 애니메이션 효과 */
.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: all 0.3s ease;
}
.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}
</style>