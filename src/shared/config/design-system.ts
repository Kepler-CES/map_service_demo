/**
 * 디자인 시스템 - 반응형 디자인 토큰 및 브레이크포인트 정의
 */

/**
 * 브레이크포인트 (Tailwind CSS 기본값과 동기화)
 */
export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * 디바이스 타입
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * 브레이크포인트별 디바이스 타입 매핑
 */
export const deviceBreakpoints = {
  mobile: { min: breakpoints.mobile, max: breakpoints.md - 1 },
  tablet: { min: breakpoints.md, max: breakpoints.lg - 1 },
  desktop: { min: breakpoints.lg, max: Infinity },
} as const;

/**
 * 반응형 스페이싱 (모바일/데스크탑별)
 */
export const spacing = {
  container: {
    mobile: 'px-4',
    tablet: 'px-6',
    desktop: 'px-8',
    responsive: 'px-4 sm:px-6 lg:px-8',
  },
  section: {
    mobile: 'py-4',
    tablet: 'py-6',
    desktop: 'py-8',
    responsive: 'py-4 md:py-6 lg:py-8',
  },
  card: {
    mobile: 'p-4',
    tablet: 'p-6',
    desktop: 'p-8',
    responsive: 'p-4 md:p-6 lg:p-8',
  },
} as const;

/**
 * 반응형 타이포그래피
 */
export const typography = {
  heading: {
    h1: {
      mobile: 'text-2xl font-bold',
      desktop: 'text-4xl font-bold',
      responsive: 'text-2xl md:text-4xl font-bold',
    },
    h2: {
      mobile: 'text-xl font-semibold',
      desktop: 'text-3xl font-semibold',
      responsive: 'text-xl md:text-3xl font-semibold',
    },
    h3: {
      mobile: 'text-lg font-semibold',
      desktop: 'text-2xl font-semibold',
      responsive: 'text-lg md:text-2xl font-semibold',
    },
  },
  body: {
    large: 'text-base md:text-lg',
    base: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
  },
} as const;

/**
 * Z-index 레이어 (충돌 방지)
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  bottomSheet: 50,
  sidebar: 40,
} as const;

/**
 * 반응형 레이아웃 패턴
 */
export const layouts = {
  mapPage: {
    sidebar: {
      mobile: 'hidden',
      desktop: 'hidden md:flex md:w-96',
    },
    bottomSheet: {
      mobile: 'flex md:hidden',
      desktop: 'hidden',
    },
    mainContent: {
      mobile: 'w-full',
      desktop: 'md:w-[calc(100%-24rem)]',
    },
  },
} as const;

/**
 * 터치 최적화 크기
 */
export const touchTarget = {
  minSize: '44px', // iOS 권장 최소 터치 영역
  button: {
    mobile: 'min-h-[44px] min-w-[44px]',
    desktop: 'min-h-[36px] min-w-[36px]',
    responsive: 'min-h-[44px] md:min-h-[36px]',
  },
} as const;

/**
 * 애니메이션 듀레이션 (모바일에서는 더 짧게)
 */
export const animation = {
  duration: {
    mobile: '200ms',
    desktop: '300ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },
} as const;
