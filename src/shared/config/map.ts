/**
 * 네이버 지도 설정
 */

export const MAP_CONFIG = {
  // 네이버 지도 API 키 (환경 변수에서 가져오거나 직접 설정)
  clientId: import.meta.env.VITE_NAVER_MAP_CLIENT_ID || "",

  // 기본 지도 옵션
  defaultCenter: {
    lat: 37.5665,
    lng: 126.978,
  },

  defaultZoom: 15,
  minZoom: 6,
  maxZoom: 21,

  // 지도 스크립트 URL
  scriptUrl: "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=",
} as const;

export type MapConfig = typeof MAP_CONFIG;
