import { useMediaQuery } from './useMediaQuery';
import { breakpoints, type DeviceType } from '@/shared/config/design-system';

/**
 * 현재 디바이스 타입을 반환하는 훅
 *
 * @returns 디바이스 타입 정보 객체
 *
 * @example
 * const device = useDevice();
 * if (device.isMobile) {
 *   // 모바일 전용 로직
 * }
 * if (device.isDesktop) {
 *   // 데스크탑 전용 로직
 * }
 */
export function useDevice() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  // 현재 디바이스 타입 결정
  let deviceType: DeviceType = 'mobile';
  if (isDesktop) deviceType = 'desktop';
  else if (isTablet) deviceType = 'tablet';

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
  } as const;
}

/**
 * Tailwind CSS 브레이크포인트를 감지하는 훅
 *
 * @returns 각 브레이크포인트 매칭 여부
 *
 * @example
 * const breakpoint = useBreakpoint();
 * if (breakpoint.md) {
 *   // md 이상일 때
 * }
 * if (!breakpoint.lg) {
 *   // lg 미만일 때
 * }
 */
export function useBreakpoint() {
  const sm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
  const md = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const lg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const xl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  const xxl = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`);

  return {
    sm,
    md,
    lg,
    xl,
    '2xl': xxl,
  } as const;
}

/**
 * 화면 방향(가로/세로)을 감지하는 훅
 *
 * @returns 화면 방향 정보
 *
 * @example
 * const orientation = useOrientation();
 * if (orientation.isPortrait) {
 *   // 세로 모드
 * }
 */
export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return {
    isPortrait,
    isLandscape,
    orientation: isPortrait ? ('portrait' as const) : ('landscape' as const),
  };
}

/**
 * 터치 디바이스 여부를 감지하는 훅
 *
 * @returns 터치 디바이스 여부
 *
 * @example
 * const isTouchDevice = useTouchDevice();
 * if (isTouchDevice) {
 *   // 터치 인터랙션 활성화
 * }
 */
export function useTouchDevice(): boolean {
  // hover를 지원하지 않는 디바이스 = 터치 디바이스
  const cannotHover = useMediaQuery('(hover: none)');
  const hasCoarsePointer = useMediaQuery('(pointer: coarse)');

  return cannotHover || hasCoarsePointer;
}
