// import { ref, onMounted, onUnmounted } from 'vue'

export interface DraggableItem {
  id: string;
  x: number;
  y: number;
  isDragging: boolean;
}

export function useDraggable<T extends DraggableItem>(initialItems: T[]) {
  const items = ref<T[]>(initialItems);
  const dragOffset = ref({ x: 0, y: 0 });

  const startDrag = (event: MouseEvent, item: T) => {
    const index = items.value.findIndex(i => i.id === item.id);
    if (index !== -1) {
      // 현재 드래그 중인 아이템을 맨 위로 표시하기 위해 z-index 조정을 위한 플래그
      items.value[index].isDragging = true;
      
      // 마우스 위치와 아이템 위치의 차이 계산
      dragOffset.value = {
        x: event.clientX - items.value[index].x,
        y: event.clientY - items.value[index].y
      };
      
      // 마우스 이동 및 마우스 업 이벤트 리스너 등록
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', endDrag);
    }
  };

  const handleDrag = (event: MouseEvent) => {
    // 드래그 중인 아이템 찾기
    const index = items.value.findIndex(item => item.isDragging);
    if (index !== -1) {
      // 새 위치 계산
      items.value[index] = {
        ...items.value[index],
        x: event.clientX - dragOffset.value.x,
        y: event.clientY - dragOffset.value.y
      };
    }
  };

  const endDrag = () => {
    // 드래그 상태 초기화
    items.value = items.value.map(item => ({
      ...item,
      isDragging: false
    }));
    
    // 이벤트 리스너 제거
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
  };

  onMounted(() => {
    // 드래그 이벤트가 페이지 밖으로 나갔을 때도 처리
    document.addEventListener('mouseleave', endDrag);
  });

  onUnmounted(() => {
    // 이벤트 리스너 정리
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
    document.removeEventListener('mouseleave', endDrag);
  });

  return {
    items,
    startDrag,
    endDrag
  };
}