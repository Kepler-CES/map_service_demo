/**
 * 지도 뷰어 위젯
 */
import { useEffect, useRef } from 'react';
import { useMapStore } from '@/entities/marker/model/store';
import { useFavoritesStore } from '@/entities/place/model/store';
import { useNaverMapScript } from '@/shared/lib/hooks/useNaverMap';
import { MAP_CONFIG } from '@/shared/config/map';
import type { Place } from '@/shared/types';

/**
 * 관심목록 마커 아이콘 HTML 생성
 */
const createMarkerIconContent = (): string => {
  return `
    <div style="
      background-color: #ef4444;
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `;
};

/**
 * 정보창 콘텐츠 HTML 생성
 */
const createInfoWindowContent = (place: Place): string => {
  return `
    <div style="
      padding: 10px 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      min-width: 200px;
    ">
      <h4 style="
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
      ">${place.name}</h4>
      <p style="
        margin: 0;
        font-size: 12px;
        color: #6b7280;
        line-height: 1.4;
      ">${place.address}</p>
      ${
        place.description
          ? `<p style="
            margin: 8px 0 0 0;
            font-size: 12px;
            color: #374151;
            line-height: 1.4;
          ">${place.description}</p>`
          : ''
      }
    </div>
  `;
};

export const MapViewer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const favoriteMarkersRef = useRef<naver.maps.Marker[]>([]);
  const { isLoaded, error } = useNaverMapScript();
  const { setMapInstance, center, zoom, mapInstance } = useMapStore();
  const { favorites } = useFavoritesStore();

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);
    setMapInstance(map);

    return () => {
      setMapInstance(null);
    };
  }, [isLoaded, setMapInstance, center.lat, center.lng, zoom]);

  // 관심목록 마커 표시
  useEffect(() => {
    if (!mapInstance || !isLoaded) return;

    // 기존 관심목록 마커 제거
    favoriteMarkersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    favoriteMarkersRef.current = [];

    // 새로운 관심목록 마커 추가
    favorites.forEach((place) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map: mapInstance,
        title: place.name,
        icon: {
          content: createMarkerIconContent(),
          size: new naver.maps.Size(30, 30),
          anchor: new naver.maps.Point(15, 30),
        },
      });

      // 정보창 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: createInfoWindowContent(place),
      });

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapInstance, marker);
        }
      });

      favoriteMarkersRef.current.push(marker);
    });

    return () => {
      // cleanup
      favoriteMarkersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      favoriteMarkersRef.current = [];
    };
  }, [mapInstance, isLoaded, favorites]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <p className="text-destructive">
          지도를 로드하는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <p className="text-muted-foreground">지도를 불러오는 중...</p>
      </div>
    );
  }

  return <div ref={mapRef} className="map-container" />;
};
