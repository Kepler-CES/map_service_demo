/**
 * 네이버 지도 로드 및 초기화 훅
 */
import { useEffect, useState } from 'react';
import { MAP_CONFIG } from '@/shared/config/map';

export const useNaverMapScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 이미 로드되어 있는 경우
    if (window.naver && window.naver.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'naver-map-script';

    // 이미 스크립트 태그가 있는 경우
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `${MAP_CONFIG.scriptUrl}${MAP_CONFIG.clientId}`;
    script.async = true;

    // 디버깅 정보 출력
    console.log('🗺️ 네이버 지도 로드 시도');
    console.log('Client ID:', MAP_CONFIG.clientId);
    console.log('Script URL:', script.src);
    console.log('Current URL:', window.location.href);

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError(new Error('네이버 지도 스크립트 로드 실패'));
    };

    document.head.appendChild(script);

    return () => {
      // cleanup 시 스크립트 제거는 하지 않음 (다른 컴포넌트에서 사용 중일 수 있음)
    };
  }, []);

  return { isLoaded, error };
};
