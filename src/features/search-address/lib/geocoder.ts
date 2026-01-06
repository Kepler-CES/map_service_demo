/**
 * 주소 검색 (지오코딩) 유틸리티
 */
import type { SearchResult } from '@/shared/types';

export const searchAddress = (address: string): Promise<SearchResult[]> => {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps) {
      reject(new Error('네이버 지도 API가 로드되지 않았습니다.'));
      return;
    }

    if (!window.naver.maps.Service) {
      reject(new Error('네이버 지도 Geocoder 서비스가 로드되지 않았습니다.'));
      return;
    }

    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK || !response) {
          resolve([]);
          return;
        }

        if (
          !response.v2 ||
          !response.v2.addresses ||
          response.v2.addresses.length === 0
        ) {
          resolve([]);
          return;
        }

        const results = response.v2.addresses.map((item) => ({
          address: item.jibunAddress,
          roadAddress: item.roadAddress,
          lat: parseFloat(item.y),
          lng: parseFloat(item.x),
        }));

        resolve(results);
      },
    );
  });
};

/**
 * 역지오코딩 (위경도 -> 주소 변환)
 */
export const reverseGeocode = (
  lat: number,
  lng: number,
): Promise<SearchResult | null> => {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps) {
      reject(new Error('네이버 지도 API가 로드되지 않았습니다.'));
      return;
    }

    if (!window.naver.maps.Service) {
      reject(new Error('네이버 지도 Geocoder 서비스가 로드되지 않았습니다.'));
      return;
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lng),
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK || !response) {
          resolve(null);
          return;
        }

        if (
          !response.v2 ||
          !response.v2.results ||
          response.v2.results.length === 0
        ) {
          resolve(null);
          return;
        }

        // 지번 주소와 도로명 주소 찾기
        let jibunAddress = '';
        let roadAddress = '';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.v2.results.forEach((result: any) => {
          if (result.name === 'addr' && result.region) {
            // 지번 주소 구성
            const { area1, area2, area3, area4 } = result.region;
            jibunAddress = `${area1.name} ${area2.name} ${area3.name} ${area4.name}`;
            if (result.land) {
              jibunAddress += ` ${result.land.number1}`;
              if (result.land.number2) {
                jibunAddress += `-${result.land.number2}`;
              }
            }
          } else if (result.name === 'roadaddr' && result.land) {
            // 도로명 주소
            roadAddress = result.land.addition0?.value || '';
          }
        });

        resolve({
          address: jibunAddress || '주소를 찾을 수 없습니다',
          roadAddress: roadAddress || '',
          lat,
          lng,
        });
      },
    );
  });
};
