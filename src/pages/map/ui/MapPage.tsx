/**
 * 지도 페이지
 */
import { useMapStore } from '@/entities/marker/model/store';
import { useFavoritesStore } from '@/entities/place/model/store';
import {
  reverseGeocode,
  searchAddress,
} from '@/features/search-address/lib/geocoder';
import { spacing, zIndex } from '@/shared/config/design-system';
import { responsive } from '@/shared/lib/utils';
import type { SearchResult } from '@/shared/types';
import { BottomSheet, Sidebar } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';
import { DesktopOnly, MobileOnly } from '@/shared/ui/responsive';
import { FavoritesList } from '@/widgets/favorites-list/ui/FavoritesList';
import { MapViewer } from '@/widgets/map-viewer/ui/MapViewer';
import { SearchBar } from '@/widgets/search-bar/ui/SearchBar';
import { SearchResults } from '@/widgets/search-results/ui/SearchResults';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';

export const MapPage = () => {
  const { mapInstance, setCenter, addMarker, clearMarkers } = useMapStore();
  const { addFavorite } = useFavoritesStore();
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [showFavoritesSidebar, setShowFavoritesSidebar] = useState(true);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const results = await searchAddress(query);

      if (results.length === 0) {
        setSearchError('주소를 찾을 수 없습니다.');
        return;
      }

      setSearchResults(results);
      setShowSearchResults(true); // 검색 결과 표시

      // 검색 결과가 1개인 경우 자동으로 선택
      if (results.length === 1) {
        handleResultSelect(results[0]);
      }
    } catch (error) {
      setSearchError('검색 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
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

    // 검색 결과는 유지하고 접기만 함 (모바일)
    // 데스크탑에서는 그대로 유지
  };

  const handleCloseSearchResults = () => {
    setSearchResults([]);
    setShowSearchResults(true);
  };

  const handlePlaceClick = (lat: number, lng: number) => {
    setCenter(lat, lng);
    if (mapInstance) {
      mapInstance.panTo(new naver.maps.LatLng(lat, lng));
    }
  };

  const handleAddFavorite = async () => {
    if (!mapInstance) return;

    const center = mapInstance.getCenter();
    const lat = center.lat();
    const lng = center.lng();

    try {
      // 역지오코딩으로 주소 가져오기
      const result = await reverseGeocode(lat, lng);

      const newPlace = {
        id: Date.now().toString(),
        name: result?.roadAddress || result?.address || '새로운 장소',
        address: result?.address || `위도: ${lat}, 경도: ${lng}`,
        roadAddress: result?.roadAddress,
        lat,
        lng,
        createdAt: new Date().toISOString(),
      };

      addFavorite(newPlace);
    } catch (error) {
      console.error('역지오코딩 실패:', error);
      // 실패 시 기본값으로 저장
      const newPlace = {
        id: Date.now().toString(),
        name: '새로운 장소',
        address: `위도: ${lat}, 경도: ${lng}`,
        lat,
        lng,
        createdAt: new Date().toISOString(),
      };
      addFavorite(newPlace);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* 헤더 - 모바일: 컴팩트, 데스크탑: 검색 + 토글 버튼 */}
      <header className="border-b bg-background flex-shrink-0">
        <div
          className={`${spacing.container.responsive} ${responsive({
            mobile: 'py-3',
            desktop: 'py-4',
          })}`}
        >
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            {/* 데스크탑 전용 토글 버튼 */}
            <DesktopOnly>
              <Button
                variant="outline"
                onClick={() => setShowFavoritesSidebar(!showFavoritesSidebar)}
              >
                {showFavoritesSidebar ? '목록 숨기기' : '목록 보기'}
              </Button>
            </DesktopOnly>
          </div>

          {/* 검색 상태 메시지 */}
          {isSearching && (
            <p className="text-sm text-muted-foreground mt-2">검색 중...</p>
          )}
          {searchError && (
            <p className="text-sm text-destructive mt-2">{searchError}</p>
          )}

          {/* 데스크탑: 검색 결과를 헤더 아래 표시 */}
          {searchResults.length > 0 && (
            <DesktopOnly>
              <div className="mt-4 rounded-lg border bg-card">
                {/* 헤더: 접기/펼치기 + 닫기 */}
                <div className="flex items-center justify-between p-3 border-b">
                  <button
                    onClick={() => setShowSearchResults(!showSearchResults)}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <span className="font-semibold text-sm">
                      검색 결과 ({searchResults.length}개)
                    </span>
                    {showSearchResults ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseSearchResults}
                    className="h-8 w-8 p-0"
                  >
                    <Cross2Icon className="h-4 w-4" />
                  </Button>
                </div>

                {/* 검색 결과 목록 */}
                {showSearchResults && (
                  <div className="max-h-80 overflow-y-auto">
                    <SearchResults
                      results={searchResults}
                      onResultSelect={handleResultSelect}
                    />
                  </div>
                )}
              </div>
            </DesktopOnly>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 - 지도 + 사이드바 */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* 지도 영역 */}
        <div className="flex-1 relative">
          <MapViewer />

          {/* 플로팅 버튼 - 모바일: bottom sheet 위에 표시 */}
          <Button
            onClick={handleAddFavorite}
            className={`absolute right-4 ${responsive({
              mobile: 'bottom-20',
              desktop: 'bottom-4',
            })}`}
            style={{ zIndex: zIndex.popover }}
            size="lg"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            관심 추가
          </Button>
        </div>

        {/* 데스크탑: 관심 목록 사이드바 */}
        <DesktopOnly>
          <Sidebar
            title="관심 목록"
            isOpen={showFavoritesSidebar}
            onClose={() => setShowFavoritesSidebar(false)}
          >
            <FavoritesList onPlaceClick={handlePlaceClick} />
          </Sidebar>
        </DesktopOnly>
      </main>

      {/* 모바일: 검색 결과 Bottom Sheet */}
      <MobileOnly>
        {searchResults.length > 0 && (
          <BottomSheet
            title="검색 결과"
            defaultExpanded={true}
            onClose={handleCloseSearchResults}
          >
            <SearchResults
              results={searchResults}
              onResultSelect={handleResultSelect}
            />
          </BottomSheet>
        )}
      </MobileOnly>

      {/* 모바일: 관심 목록 Bottom Sheet (검색 결과가 없을 때만 표시) */}
      <MobileOnly>
        {searchResults.length === 0 && (
          <BottomSheet title="관심 목록" defaultExpanded={false}>
            <div className="p-4">
              <FavoritesList onPlaceClick={handlePlaceClick} />
            </div>
          </BottomSheet>
        )}
      </MobileOnly>
    </div>
  );
};
