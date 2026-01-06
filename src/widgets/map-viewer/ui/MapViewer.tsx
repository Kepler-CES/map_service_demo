/**
 * 지도 뷰어 위젯
 */
import { useEffect, useRef } from 'react';
import { useMapStore } from '@/entities/marker/model/store';
import { useNaverMapScript } from '@/shared/lib/hooks/useNaverMap';
import { MAP_CONFIG } from '@/shared/config/map';

export const MapViewer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, error } = useNaverMapScript();
  const { setMapInstance, center, zoom } = useMapStore();

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <p className="text-destructive">지도를 로드하는 중 오류가 발생했습니다.</p>
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
