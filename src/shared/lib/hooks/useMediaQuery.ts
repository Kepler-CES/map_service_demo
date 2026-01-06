import { useEffect, useState } from 'react';

/**
 * CSS 미디어 쿼리를 감지하는 훅
 *
 * @param query - CSS 미디어 쿼리 문자열 (예: '(min-width: 768px)')
 * @returns 미디어 쿼리 매칭 여부
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  // 초기값: SSR 또는 window가 없는 환경에서는 false
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // window가 없는 환경 (SSR)에서는 실행하지 않음
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // 초기 상태 설정
    setMatches(mediaQuery.matches);

    // 미디어 쿼리 변경 감지
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 이벤트 리스너 등록
    // Safari < 14 호환성을 위해 addEventListener 사용
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // 구형 브라우저 대응
      mediaQuery.addListener(handler);
    }

    // 클린업
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

/**
 * 특정 최소 너비 이상인지 감지하는 훅
 *
 * @param minWidth - 최소 너비 (px)
 * @returns 화면이 최소 너비 이상인지 여부
 *
 * @example
 * const isDesktop = useMinWidth(768);
 */
export function useMinWidth(minWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px)`);
}

/**
 * 특정 최대 너비 이하인지 감지하는 훅
 *
 * @param maxWidth - 최대 너비 (px)
 * @returns 화면이 최대 너비 이하인지 여부
 *
 * @example
 * const isMobile = useMaxWidth(767);
 */
export function useMaxWidth(maxWidth: number): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px)`);
}

/**
 * 특정 너비 범위 내에 있는지 감지하는 훅
 *
 * @param minWidth - 최소 너비 (px)
 * @param maxWidth - 최대 너비 (px)
 * @returns 화면이 범위 내에 있는지 여부
 *
 * @example
 * const isTablet = useWidthRange(768, 1023);
 */
export function useWidthRange(minWidth: number, maxWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`);
}
