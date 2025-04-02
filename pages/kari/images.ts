// 01 염폐수 저장조 위치: -719, -4 
// 02 중금속 제거 공정 위치: -471, -257 
// 03 농축 공정 위치: -193, -396 
// 04 순수 활성화 공정 위치: 195, -396 
// 05 처리수 저장조 위치: 581, -371 
// 06 결정 성장 공정 위치: -268, 127 
// 07 결정 여과 공정 위치: 24, -69 
// 08 물망초 위치: 240, -132 
// 09 탈염제 반응조 위치: 765, -54 
// 11 탈취제 반응조 위치: 547, 47 
// 12 염색 폐수처리 반응조 위치: 327, 148 
// 13 유가금속 추출제 반응조 위치: 91, 253 
// 10 보관조 위치: 912, 58 
// 14 보관조 위치: 700, 169 
// 15 보관조 위치: 482, 265
// 16 보관조 위치: 254, 374

// 각 이미지의 위치 상태 추가
export const images = [
  { id: 'kari_01', size: 'w-[20rem]', x: -702, y: 13, isDragging: false, label: '염폐수 저장조', description: '고농도 염폐수를 저장하는 탱크로, 초기 처리 전 유입된 폐수를 보관합니다.' },
  { id: 'kari_02', size: 'w-[20rem]', x: -398, y: -168, isDragging: false, label: '중금속 제거 공정', description: '폐수 내 중금속 이온을 제거하는 공정으로, 선택적 흡착제와 화학적 침전 방식을 활용합니다.' },
  { id: 'kari_03', size: 'w-[18rem]', x: -122, y: -273, isDragging: false, label: '농축 공정', description: '염분 농도를 높이기 위한 공정으로, 증발 과정을 통해 수분을 제거합니다.' },
  { id: 'kari_04', size: 'w-[12rem]', x: 162, y: -374, isDragging: false, label: '순수 활성화 공정', description: '처리된 물을 활성화하는 단계로, 미네랄 균형과 pH를 최적화합니다.' },
  { id: 'kari_05', size: 'w-[12rem]', x: 483, y: -323, isDragging: false, label: '처리수 저장조', description: '정화 과정을 거친 처리수를 임시 보관하는 저장조입니다.' },
  { id: 'kari_06', size: 'w-[18rem]', x: -211, y: 187, isDragging: false, label: '결정 성장 공정', description: '염 결정을 형성하고 성장시키는 공정으로, 정밀한 온도와 압력 제어가 필요합니다.' },
  { id: 'kari_07', size: 'w-[10rem]', x: 47, y: 25, isDragging: false, label: '결정 여과 공정', description: '생성된 결정을 분리하고 정제하는 단계로, 다단계 필터링 시스템을 적용합니다.' },
  { id: 'kari_08', size: 'w-[8rem]', x: 231, y: -66, isDragging: false, label: '물망초', description: '수질 정화에 도움이 되는 특수 배양 식물로, 생물학적 정화 기능을 제공합니다.' },
  { id: 'kari_09', size: 'w-[8rem]', x: 703, y: -100, isDragging: false, label: '탈염제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_11', size: 'w-[8rem]', x: 536, y: 12, isDragging: false, label: '탈취제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_12', size: 'w-[8rem]', x: 366, y: 126, isDragging: false, label: '염색 폐수처리 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_13', size: 'w-[8rem]', x: 199, y: 247, isDragging: false, label: '유가금속 추출제 반응조', description: '이온 교환 방식을 통해 잔여 염분을 제거하는 반응조입니다.' },
  { id: 'kari_10', size: 'w-[8rem]', x: 853, y: 5, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_14', size: 'w-[8rem]', x: 686, y: 121, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_15', size: 'w-[8rem]', x: 516, y: 225, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },
  { id: 'kari_16', size: 'w-[8rem]', x: 348, y: 352, isDragging: false, label: '보관조', description: '최종 정제된 물과 추출된 미네랄을 안전하게 보관하는 시설입니다.' },

  // { id: 'pipe_01', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-01', description: '' },
  // { id: 'pipe_02', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-02', description: '' },
  // { id: 'pipe_03', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-03', description: '' },
  // { id: 'pipe_04', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-04', description: '' },
  // { id: 'pipe_05', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-05', description: '' },
  // { id: 'pipe_06', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-06', description: '' },
  // { id: 'pipe_07', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-07', description: '' },
  // { id: 'pipe_08', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-08', description: '' },
  // { id: 'pipe_09', size: 'w-[4rem]', x: 400, y: 352, isDragging: false, label: 'p-09', description: '' },
];