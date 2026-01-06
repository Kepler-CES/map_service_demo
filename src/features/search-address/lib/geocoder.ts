/**
 * 주소 검색 (지오코딩) 유틸리티
 */
import type { SearchResult } from '@/shared/types';

export const searchAddress = (
  address: string
): Promise<SearchResult | null> => {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps) {
      reject(new Error('네이버 지도 API가 로드되지 않았습니다.'));
      return;
    }

    const geocoder = new naver.maps.Service.Geocoder();

    geocoder.addressToCoord(address, (status, response) => {
      if (status !== naver.maps.Service.GeocodeStatus.OK) {
        resolve(null);
        return;
      }

      if (!response.v2 || !response.v2.addresses || response.v2.addresses.length === 0) {
        resolve(null);
        return;
      }

      const result = response.v2.addresses[0];
      resolve({
        address: result.jibunAddress,
        roadAddress: result.roadAddress,
        lat: parseFloat(result.y),
        lng: parseFloat(result.x),
      });
    });
  });
};
