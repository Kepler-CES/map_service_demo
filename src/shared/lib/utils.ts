import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DeviceType } from '@/shared/config/design-system';

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 반응형 클래스 생성 헬퍼
 */
type ResponsiveClasses = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  base?: string;
};

/**
 * 디바이스별 클래스를 하나의 문자열로 병합
 *
 * @param classes - 디바이스별 클래스 객체
 * @returns Tailwind 반응형 클래스 문자열
 *
 * @example
 * responsive({
 *   mobile: 'flex-col p-4',
 *   desktop: 'flex-row p-8'
 * })
 * // 결과: 'flex-col p-4 md:flex-row md:p-8'
 */
export function responsive(classes: ResponsiveClasses): string {
  const { mobile, tablet, desktop, base } = classes;

  return cn(
    base,
    mobile, // 기본값 (모바일)
    tablet && `md:${tablet}`,
    desktop && `lg:${desktop}`,
  );
}

/**
 * 조건부 반응형 클래스 생성
 *
 * @param deviceType - 현재 디바이스 타입
 * @param classes - 디바이스별 클래스 객체
 * @returns 현재 디바이스에 맞는 클래스
 *
 * @example
 * const device = useDevice();
 * const className = conditionalResponsive(device.deviceType, {
 *   mobile: 'p-4',
 *   desktop: 'p-8'
 * });
 */
export function conditionalResponsive(
  deviceType: DeviceType,
  classes: ResponsiveClasses,
): string {
  switch (deviceType) {
    case 'mobile':
      return classes.mobile || classes.base || '';
    case 'tablet':
      return classes.tablet || classes.mobile || classes.base || '';
    case 'desktop':
      return classes.desktop || classes.tablet || classes.base || '';
    default:
      return classes.base || '';
  }
}
