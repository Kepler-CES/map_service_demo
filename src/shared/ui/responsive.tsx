import { type ReactNode } from 'react';
import { useDevice } from '@/shared/lib/hooks';

/**
 * Responsive Props
 */
interface ResponsiveProps {
  children: ReactNode;
  /** 모바일에서만 표시 */
  mobile?: boolean;
  /** 태블릿에서만 표시 */
  tablet?: boolean;
  /** 데스크탑에서만 표시 */
  desktop?: boolean;
}

/**
 * 특정 디바이스에서만 렌더링하는 컴포넌트
 *
 * @example
 * <Responsive mobile>
 *   <MobileNavigation />
 * </Responsive>
 *
 * <Responsive desktop>
 *   <DesktopSidebar />
 * </Responsive>
 */
export function Responsive({ children, mobile, tablet, desktop }: ResponsiveProps) {
  const device = useDevice();

  const shouldRender =
    (mobile && device.isMobile) ||
    (tablet && device.isTablet) ||
    (desktop && device.isDesktop);

  if (!shouldRender) return null;

  return <>{children}</>;
}

/**
 * ResponsiveRender Props
 */
interface ResponsiveRenderProps {
  /** 모바일에서 렌더링할 컴포넌트 */
  mobile?: ReactNode;
  /** 태블릿에서 렌더링할 컴포넌트 */
  tablet?: ReactNode;
  /** 데스크탑에서 렌더링할 컴포넌트 */
  desktop?: ReactNode;
  /** 기본 렌더링할 컴포넌트 (매칭되는 것이 없을 때) */
  fallback?: ReactNode;
}

/**
 * 디바이스별로 다른 컴포넌트를 렌더링하는 컴포넌트
 *
 * @example
 * <ResponsiveRender
 *   mobile={<MobileView />}
 *   desktop={<DesktopView />}
 * />
 *
 * // 또는 조건부 렌더링
 * <ResponsiveRender
 *   mobile={<BottomSheet>{content}</BottomSheet>}
 *   desktop={<Sidebar>{content}</Sidebar>}
 * />
 */
export function ResponsiveRender({ mobile, tablet, desktop, fallback }: ResponsiveRenderProps) {
  const device = useDevice();

  if (device.isMobile && mobile) return <>{mobile}</>;
  if (device.isTablet && tablet) return <>{tablet}</>;
  if (device.isDesktop && desktop) return <>{desktop}</>;

  return <>{fallback}</>;
}

/**
 * 모바일에서만 렌더링
 */
export function MobileOnly({ children }: { children: ReactNode }) {
  return <Responsive mobile>{children}</Responsive>;
}

/**
 * 태블릿에서만 렌더링
 */
export function TabletOnly({ children }: { children: ReactNode }) {
  return <Responsive tablet>{children}</Responsive>;
}

/**
 * 데스크탑에서만 렌더링
 */
export function DesktopOnly({ children }: { children: ReactNode }) {
  return <Responsive desktop>{children}</Responsive>;
}

/**
 * 모바일이 아닐 때만 렌더링 (태블릿 + 데스크탑)
 */
export function NotMobile({ children }: { children: ReactNode }) {
  return (
    <Responsive tablet desktop>
      {children}
    </Responsive>
  );
}

/**
 * 데스크탑이 아닐 때만 렌더링 (모바일 + 태블릿)
 */
export function NotDesktop({ children }: { children: ReactNode }) {
  return (
    <Responsive mobile tablet>
      {children}
    </Responsive>
  );
}
