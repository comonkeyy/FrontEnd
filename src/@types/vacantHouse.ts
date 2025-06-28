// 통합 인터페이스
export interface VacantHouseData {
  id?: string; // 등록 시에는 없고, 조회 시에는 있음
  name?: string; // MyPage에서 사용
  address: string;
  detailAddress?: string; // 옵셔널로 추가
  size: string; // area -> size
  floor?: string; // floorCount -> floor
  region?: string; // 옵셔널로 추가
  description: string;
  images: string[]; // 단일 image → 배열 images로 변경
  status?: '매칭대기' | '매칭완료';
  registeredDate?: string;
}
