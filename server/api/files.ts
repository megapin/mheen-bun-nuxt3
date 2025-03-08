import { defineEventHandler, getQuery, H3Event } from 'h3'
import fs from 'fs'
import path from 'path'

interface FileResponse {
  directories: string[];
  files: string[];
  error?: string;
}

export default defineEventHandler(async (event: H3Event): Promise<FileResponse> => {
  try {
    // query 파라미터 'path' 가져오기
    const query = getQuery(event)
    const directoryPath = query.path || ''
    
    // public 디렉토리 경로 설정
    const publicDir = path.resolve(process.cwd(), 'public')
    const targetPath = path.join(publicDir, directoryPath.toString())
    
    // 보안 체크: public 디렉토리 외부 접근 방지
    if (!targetPath.startsWith(publicDir)) {
      return {
        error: '접근이 거부되었습니다',
        directories: [],
        files: []
      }
    }
    
    // 경로 존재 여부 확인
    if (!fs.existsSync(targetPath)) {
      return {
        error: '경로를 찾을 수 없습니다',
        directories: [],
        files: []
      }
    }
    
    // 디렉토리 내용 읽기
    const items = fs.readdirSync(targetPath, { withFileTypes: true })
    
    // 디렉토리와 파일 분리
    const directories: string[] = []
    const files: string[] = []
    
    for (const item of items) {
      if (item.isDirectory()) {
        directories.push(item.name)
      } else if (item.isFile()) {
        files.push(item.name)
      }
    }
    
    return {
      directories: directories.sort(),
      files: files.sort()
    }
  } catch (error) {
    console.error('디렉토리 읽기 오류:', error)
    return {
      error: '디렉토리 읽기 실패',
      directories: [],
      files: []
    }
  }
})