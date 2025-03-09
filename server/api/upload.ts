import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData) {
      return {
        error: '파일이 없습니다',
        success: false
      }
    }
    
    // 업로드 경로 가져오기
    const pathField = formData.find(field => field.name === 'path')
    const uploadPath = pathField ? pathField.data.toString() : ''
    
    if (!uploadPath) {
      return {
        error: '업로드 경로가 필요합니다',
        success: false
      }
    }
    
    // 기본 디렉토리 설정 (public 폴더를 기본 경로로 사용)
    const baseDir = path.resolve(process.cwd(), 'public')
    const targetDir = path.join(baseDir, uploadPath)
    
    // 보안 체크: public 디렉토리 외부 접근 방지
    if (!targetDir.startsWith(baseDir)) {
      return {
        error: '접근이 거부되었습니다',
        success: false
      }
    }
    
    // 디렉토리가 존재하는지 확인하고, 없으면 생성
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
    }
    
    const uploadedFiles = []
    
    // 업로드된 파일 처리
    for (const field of formData) {
      if (field.name === 'files' && field.filename) {
        const filePath = path.join(targetDir, field.filename)
        await writeFile(filePath, new Uint8Array(field.data))
        uploadedFiles.push(field.filename)
      }
    }
    
    if (uploadedFiles.length === 0) {
      return {
        error: '업로드할 파일이 없습니다',
        success: false
      }
    }
    
    return {
      success: true,
      message: `${uploadedFiles.length}개의 파일이 업로드되었습니다`,
      files: uploadedFiles
    }
  } catch (error) {
    console.error('파일 업로드 오류:', error)
    return {
      error: '파일 업로드 중 오류가 발생했습니다',
      details: (error as Error).message,
      success: false
    }
  }
})