// types/apiTypes.ts

export type UserRole = 'OWNER' | 'CW' | 'M';

export interface User {
  id: number;
  user_id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface House {
  id: number;
  address: string;
  region: string;
  size: string;
  floor: string;
  status: 'available' | 'matched';
  created_at: string;
}

export interface HouseNeed {
  id: number;
  careworker_id: number;
  region: string;
  size: string;
  floor: string;
  created_at: string;
}

export interface Matching {
  id: number;
  house_id: number;
  careworker_id: number;
  status: 'pending' | 'rejected' | 'completed';
  created_at: string;
}

export interface Review {
  id: number;
  author_id: number;
  target_id: number;
  target_type: 'house' | 'matching' | 'user' | 'careworker';
  content: string;
  created_at: string;
}
