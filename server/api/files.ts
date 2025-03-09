import { defineEventHandler, getQuery, H3Event } from 'h3'
import fs from 'fs'
import path from 'path'
import { unlink } from 'fs/promises'

interface FileResponse {
  directories: string[];
  files: string[];
  error?: string;
  success?: boolean;
  message?: string;
}

export default defineEventHandler(async (event: H3Event): Promise<FileResponse | any> => {
  // query 파라미터 'path' 가져오기
  const query = getQuery(event)
  const filePath = query.path || ''
  
  // public 디렉토리 경로 설정
  const publicDir = path.resolve(process.cwd(), 'public')
  const targetPath = path.join(publicDir, filePath.toString())
  
  // 보안 체크: public 디렉토리 외부 접근 방지
  if (!targetPath.startsWith(publicDir)) {
    return {
      error: '접근이 거부되었습니다',
      directories: [],
      files: [],
      success: false
    }
  }
  
  // HTTP 메서드 확인
  const method = event.method
  
  // DELETE 요청 처리
  if (method === 'DELETE') {
    try {
      // 경로가 존재하는지 확인
      if (!fs.existsSync(targetPath)) {
        return {
          error: '파일을 찾을 수 없습니다',
          success: false
        }
      }
      
      // 파일인지 확인
      const stat = fs.statSync(targetPath)
      if (!stat.isFile()) {
        return {
          error: '삭제할 수 있는 파일이 아닙니다',
          success: false
        }
      }
      
      // 파일 삭제
      await unlink(targetPath)
      
      return {
        success: true,
        message: '파일이 성공적으로 삭제되었습니다'
      }
    } catch (error) {
      console.error('파일 삭제 오류:', error)
      return {
        error: '파일 삭제 실패',
        details: error.message,
        success: false
      }
    }
  } 
  
  // GET 요청 처리 (기존 코드)
  else if (method === 'GET') {
    try {
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
  }
  
  // 지원하지 않는 메서드
  else {
    return {
      error: '지원하지 않는 HTTP 메서드입니다',
      success: false
    }
  }
})