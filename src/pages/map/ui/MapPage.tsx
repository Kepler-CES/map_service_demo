/**
 * 지도 페이지
 */
import { useState } from 'react';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { SearchBar } from '@/widgets/search-bar/ui/SearchBar';
import { FavoritesList } from '@/widgets/favorites-list/ui/FavoritesList';
import { searchAddress } from '@/features/search-address/lib/geocoder';
import { useMapStore } from '@/entities/marker/model/store';
import { useFavoritesStore } from '@/entities/place/model/store';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

export const MapPage = () => {
  const { mapInstance, setCenter, addMarker, clearMarkers } = useMapStore();
  const { addFavorite } = useFavoritesStore();
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(true);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await searchAddress(query);

      if (!result) {
        setSearchError('주소를 찾을 수 없습니다.');
        return;
      }

      // 지도 중심 이동
      setCenter(result.lat, result.lng);
      if (mapInstance) {
        mapInstance.setCenter(new naver.maps.LatLng(result.lat, result.lng));

        // 기존 마커 제거
        clearMarkers();

        // 새 마커 추가
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(result.lat, result.lng),
          map: mapInstance,
        });

        addMarker(marker);
      }
    } catch (error) {
      setSearchError('검색 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaceClick = (lat: number, lng: number) => {
    setCenter(lat, lng);
    if (mapInstance) {
      mapInstance.panTo(new naver.maps.LatLng(lat, lng));
    }
  };

  const handleAddFavorite = () => {
    if (!mapInstance) return;

    const center = mapInstance.getCenter();
    const newPlace = {
      id: Date.now().toString(),
      name: '새로운 장소',
      address: `위도: ${center.lat()}, 경도: ${center.lng()}`,
      lat: center.lat(),
      lng: center.lng(),
      createdAt: new Date().toISOString(),
    };

    addFavorite(newPlace);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 헤더 */}
      <header className="border-b bg-background">
        <div className="container-responsive py-4">
          <h1 className="text-2xl font-bold mb-4">지도 서비스</h1>
          <div className="flex gap-2">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFavorites(!showFavorites)}
              className="hidden md:flex"
            >
              {showFavorites ? '목록 숨기기' : '목록 보기'}
            </Button>
          </div>
          {isSearching && (
            <p className="text-sm text-muted-foreground mt-2">검색 중...</p>
          )}
          {searchError && (
            <p className="text-sm text-destructive mt-2">{searchError}</p>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 지도 영역 */}
        <div className="flex-1 relative">
          <MapViewer />
          <Button
            onClick={handleAddFavorite}
            className="absolute bottom-4 right-4 z-10"
            size="lg"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            관심 추가
          </Button>
        </div>

        {/* 사이드바 - 관심 목록 */}
        {showFavorites && (
          <aside className="w-full md:w-80 lg:w-96 border-l bg-background overflow-y-auto p-4">
            <FavoritesList onPlaceClick={handlePlaceClick} />
          </aside>
        )}
      </main>

      {/* 모바일 하단 토글 버튼 */}
      <div className="md:hidden border-t p-2 bg-background">
        <Button
          variant="outline"
          onClick={() => setShowFavorites(!showFavorites)}
          className="w-full"
        >
          {showFavorites ? '목록 숨기기' : '목록 보기'}
        </Button>
      </div>
    </div>
  );
};
