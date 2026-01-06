/**
 * 검색 결과 목록 컴포넌트
 */
import { Card, CardContent } from '@/shared/ui/card';
import type { SearchResult } from '@/shared/types';

interface SearchResultsProps {
  results: SearchResult[];
  onResultSelect: (result: SearchResult) => void;
}

export const SearchResults = ({
  results,
  onResultSelect,
}: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      <p className="text-sm font-medium mb-3">
        검색 결과 ({results.length}개)
      </p>
      {results.map((result, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:bg-accent transition-colors active:scale-[0.98]"
          onClick={() => onResultSelect(result)}
        >
          <CardContent className="p-3">
            <p className="font-medium text-sm">
              {result.roadAddress || result.address}
            </p>
            {result.roadAddress && result.address && (
              <p className="text-xs text-muted-foreground mt-1">
                지번: {result.address}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
