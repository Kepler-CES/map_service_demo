/**
 * BottomSheet 컴포넌트
 * 모바일에서는 하단에서 올라오는 시트, 데스크탑에서는 일반 컨테이너
 */
import { cn } from '@/shared/lib/utils';
import { useState, type ReactNode } from 'react';
import { Button } from './button';
import { Cross2Icon } from '@radix-ui/react-icons';

interface BottomSheetProps {
  children: ReactNode;
  title: string;
  defaultExpanded?: boolean;
  className?: string;
  onClose?: () => void;
}

export const BottomSheet = ({
  children,
  title,
  defaultExpanded = false,
  className,
  onClose,
}: BottomSheetProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        // 모바일: 하단 고정, 드래그 가능한 시트
        'fixed bottom-0 left-0 right-0 z-[100]',
        'bg-background border-t shadow-lg',
        'transition-transform duration-300 ease-out',
        // 데스크탑: 일반 컨테이너로 표시하지 않음 (숨김)
        'md:hidden',
        className,
      )}
      style={{
        transform: isExpanded
          ? 'translateY(0)'
          : 'translateY(calc(100% - 60px))',
      }}
    >
      {/* 드래그 핸들 & 헤더 */}
      <div className="py-3 px-4 flex flex-col gap-2">
        {/* 드래그 인디케이터 - 중앙 배치 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full touch-manipulation active:opacity-70"
        >
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
        </button>

        {/* 타이틀과 닫기 버튼 */}
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold text-sm">{title}</span>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div
        className={cn(
          'overflow-y-auto scroll-smooth',
          'max-h-[70vh]', // 화면의 70%까지만 차지
          'safe-area-inset-bottom', // iOS Safe Area 대응
        )}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 데스크탑용 사이드바 컴포넌트
 */
interface SidebarProps {
  children: ReactNode;
  title: string;
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
}

export const Sidebar = ({
  children,
  title,
  className,
  onClose,
  isOpen = true,
}: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside
      className={cn(
        // 모바일: 숨김
        'hidden md:flex md:flex-col',
        // 데스크탑: 사이드바
        'w-96 border-l bg-background',
        'overflow-hidden',
        className,
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">{title}</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            닫기
          </Button>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </aside>
  );
};
