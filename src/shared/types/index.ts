/**
 * 공통 타입 정의
 */

export interface Place {
  id: string;
  name: string;
  address: string;
  roadAddress?: string;
  lat: number;
  lng: number;
  category?: string;
  description?: string;
  createdAt: string;
}

export interface MapState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export interface SearchResult {
  address: string;
  roadAddress: string;
  lat: number;
  lng: number;
}
