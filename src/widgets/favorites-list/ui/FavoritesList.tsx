/**
 * 관심 목록 위젯
 */
import { useFavoritesStore } from '@/entities/place/model/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

interface FavoritesListProps {
  onPlaceClick?: (lat: number, lng: number) => void;
}

export const FavoritesList = ({ onPlaceClick }: FavoritesListProps) => {
  const { favorites, removeFavorite } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>관심 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            관심 장소를 추가해보세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>관심 목록 ({favorites.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {favorites.map((place) => (
          <div
            key={place.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
            onClick={() => onPlaceClick?.(place.lat, place.lng)}
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{place.name}</h4>
              <p className="text-xs text-muted-foreground truncate">
                {place.address}
              </p>
              {place.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {place.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(place.id);
              }}
              className="ml-2 flex-shrink-0"
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
