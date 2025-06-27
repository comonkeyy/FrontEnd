// 통합 인터페이스
interface VacantHouseData {
  id: string;
  name: string;
  address: string;
  detailAddress?: string; // 옵셔널로 추가
  area: string; // size 대신 area 사용 (단위 없음)
  floorCount?: string; // 옵셔널로 추가
  region?: string; // 옵셔널로 추가
  description: string;
  images: string[]; // 단일 image → 배열 images로 변경
  status: '매칭대기' | '매칭완료';
  registeredDate: string;
}