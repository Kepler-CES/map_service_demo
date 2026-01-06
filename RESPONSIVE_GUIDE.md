# 반응형 디자인 시스템 사용 가이드

## 개요

이 프로젝트의 반응형 디자인 시스템은 3가지 주요 레이어로 구성됩니다:

1. **디자인 시스템 정의** (`src/shared/config/design-system.ts`)
2. **반응형 훅** (`src/shared/lib/hooks/`)
3. **반응형 컴포넌트** (`src/shared/ui/responsive.tsx`)

---

## 1. 반응형 훅 사용법

### useDevice - 현재 디바이스 타입 감지

```tsx
import { useDevice } from '@/shared/lib/hooks';

function MyComponent() {
  const device = useDevice();

  // boolean 체크
  if (device.isMobile) {
    return <MobileLayout />;
  }

  if (device.isDesktop) {
    return <DesktopLayout />;
  }

  // 또는 deviceType 사용
  const padding = device.deviceType === 'mobile' ? 'p-4' : 'p-8';

  return <div className={padding}>Content</div>;
}
```

### useMediaQuery - 커스텀 미디어 쿼리

```tsx
import { useMediaQuery } from '@/shared/lib/hooks';

function MyComponent() {
  // 기본 사용
  const isWide = useMediaQuery('(min-width: 1200px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isPrint = useMediaQuery('print');

  return <div>{isWide ? 'Wide Screen' : 'Narrow Screen'}</div>;
}
```

### useBreakpoint - Tailwind 브레이크포인트 감지

```tsx
import { useBreakpoint } from '@/shared/lib/hooks';

function MyComponent() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      {breakpoint.md && <p>768px 이상</p>}
      {breakpoint.lg && <p>1024px 이상</p>}
      {!breakpoint.md && <p>모바일</p>}
    </div>
  );
}
```

---

## 2. 반응형 컴포넌트 사용법

### MobileOnly, DesktopOnly - 조건부 렌더링

```tsx
import { MobileOnly, DesktopOnly, NotMobile } from '@/shared/ui/responsive';

function MyComponent() {
  return (
    <>
      {/* 모바일에서만 표시 */}
      <MobileOnly>
        <BottomSheet>
          <SearchResults />
        </BottomSheet>
      </MobileOnly>

      {/* 데스크탑에서만 표시 */}
      <DesktopOnly>
        <Sidebar>
          <SearchResults />
        </Sidebar>
      </DesktopOnly>

      {/* 태블릿 + 데스크탑 */}
      <NotMobile>
        <AdvancedFeatures />
      </NotMobile>
    </>
  );
}
```

### ResponsiveRender - 디바이스별 다른 컴포넌트

```tsx
import { ResponsiveRender } from '@/shared/ui/responsive';

function MyComponent() {
  return (
    <ResponsiveRender
      mobile={<BottomSheet>{content}</BottomSheet>}
      desktop={<Sidebar>{content}</Sidebar>}
    />
  );
}
```

---

## 3. 유틸리티 함수 사용법

### responsive() - 반응형 클래스 생성

```tsx
import { responsive } from '@/shared/lib/utils';

function MyComponent() {
  const className = responsive({
    mobile: 'flex-col p-4 text-sm',
    tablet: 'flex-row p-6 text-base',
    desktop: 'flex-row p-8 text-lg',
  });

  return <div className={className}>Content</div>;
}
```

---

## 4. 기존 코드 리팩토링 예시

### Before: 기존 MapPage.tsx

```tsx
export const MapPage = () => {
  const [showFavoritesSidebar, setShowFavoritesSidebar] = useState(true);

  return (
    <div className="h-full flex flex-col">
      <header className="border-b bg-background">
        <div className="container-responsive py-3 md:py-4">
          {/* 데스크탑 전용 토글 버튼 */}
          <Button
            onClick={() => setShowFavoritesSidebar(!showFavoritesSidebar)}
            className="hidden md:flex"
          >
            {showFavoritesSidebar ? '목록 숨기기' : '목록 보기'}
          </Button>

          {/* 검색 결과 - 데스크탑에서만 */}
          {searchResults.length > 0 && (
            <div className="hidden md:block mt-4 rounded-lg border">
              <SearchResults results={searchResults} />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* 데스크탑: 사이드바 */}
        <Sidebar
          isOpen={showFavoritesSidebar}
          onClose={() => setShowFavoritesSidebar(false)}
        >
          <FavoritesList />
        </Sidebar>
      </main>

      {/* 모바일: Bottom Sheet */}
      {searchResults.length > 0 && (
        <BottomSheet title="검색 결과">
          <SearchResults results={searchResults} />
        </BottomSheet>
      )}
    </div>
  );
};
```

### After: 새로운 반응형 시스템 적용

```tsx
import { useDevice, useBreakpoint } from '@/shared/lib/hooks';
import { MobileOnly, DesktopOnly, ResponsiveRender } from '@/shared/ui/responsive';
import { responsive } from '@/shared/lib/utils';
import { spacing, typography } from '@/shared/config/design-system';

export const MapPage = () => {
  const device = useDevice();
  const breakpoint = useBreakpoint();
  const [showFavoritesSidebar, setShowFavoritesSidebar] = useState(true);

  // 디바이스별 스타일
  const headerClassName = responsive({
    mobile: 'py-3',
    desktop: 'py-4',
  });

  return (
    <div className="h-full flex flex-col">
      <header className={`border-b bg-background ${headerClassName}`}>
        <div className={spacing.container.responsive}>
          {/* 데스크탑 전용 토글 버튼 - 더 명확한 방법 */}
          <DesktopOnly>
            <Button onClick={() => setShowFavoritesSidebar(!showFavoritesSidebar)}>
              {showFavoritesSidebar ? '목록 숨기기' : '목록 보기'}
            </Button>
          </DesktopOnly>

          {/* 검색 결과 - 데스크탑에서만 */}
          {searchResults.length > 0 && (
            <DesktopOnly>
              <div className="mt-4 rounded-lg border">
                <SearchResults results={searchResults} />
              </div>
            </DesktopOnly>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* 데스크탑: 사이드바만 렌더링 */}
        <DesktopOnly>
          <Sidebar
            isOpen={showFavoritesSidebar}
            onClose={() => setShowFavoritesSidebar(false)}
          >
            <FavoritesList />
          </Sidebar>
        </DesktopOnly>
      </main>

      {/* 모바일: Bottom Sheet만 렌더링 */}
      {searchResults.length > 0 && (
        <MobileOnly>
          <BottomSheet title="검색 결과">
            <SearchResults results={searchResults} />
          </BottomSheet>
        </MobileOnly>
      )}

      {/* 또는 ResponsiveRender 사용 */}
      {searchResults.length > 0 && (
        <ResponsiveRender
          mobile={
            <BottomSheet title="검색 결과">
              <SearchResults results={searchResults} />
            </BottomSheet>
          }
          desktop={
            <div className="mt-4 rounded-lg border">
              <SearchResults results={searchResults} />
            </div>
          }
        />
      )}
    </div>
  );
};
```

---

## 5. 실전 패턴

### 패턴 1: 조건부 로직

```tsx
// ❌ 나쁜 방법: 반복되는 className 조건
<div className={`p-4 ${device.isMobile ? 'flex-col' : 'flex-row'} ${device.isMobile ? 'gap-2' : 'gap-4'}`}>

// ✅ 좋은 방법: responsive 함수 사용
<div className={responsive({
  mobile: 'p-4 flex-col gap-2',
  desktop: 'p-4 flex-row gap-4'
})}>
```

### 패턴 2: 조건부 렌더링

```tsx
// ❌ 나쁜 방법: Tailwind 클래스로만 숨기기
<div className="hidden md:block">
  <HeavyComponent /> {/* 모바일에서도 렌더링됨 */}
</div>

// ✅ 좋은 방법: 아예 렌더링하지 않기
<DesktopOnly>
  <HeavyComponent /> {/* 모바일에서는 렌더링 안됨 */}
</DesktopOnly>
```

### 패턴 3: 디바이스별 동작

```tsx
function SearchComponent() {
  const device = useDevice();

  const handleSearch = (query: string) => {
    // 공통 로직
    performSearch(query);

    // 디바이스별 로직
    if (device.isMobile) {
      openBottomSheet();
    } else {
      openSidebar();
    }
  };

  return <SearchBar onSearch={handleSearch} />;
}
```

---

## 6. 디자인 시스템 토큰 사용

```tsx
import {
  spacing,
  typography,
  zIndex,
  touchTarget,
  animation,
} from '@/shared/config/design-system';

function MyComponent() {
  return (
    <div
      className={spacing.container.responsive}
      style={{ zIndex: zIndex.modal }}
    >
      <h1 className={typography.heading.h1.responsive}>Title</h1>
      <button className={touchTarget.button.responsive}>Click</button>
    </div>
  );
}
```

---

## 7. 마이그레이션 체크리스트

기존 컴포넌트를 새로운 시스템으로 마이그레이션할 때:

- [ ] `hidden md:block` → `<DesktopOnly>` 또는 `<MobileOnly>` 변경
- [ ] `useMediaQuery` 직접 구현 → `useDevice` 훅 사용
- [ ] 반복되는 반응형 클래스 → `responsive()` 함수로 추출
- [ ] 하드코딩된 브레이크포인트 → `breakpoints` 상수 사용
- [ ] 인라인 스타일 z-index → `zIndex` 상수 사용
- [ ] 불필요한 렌더링 최적화: CSS 숨김 → 조건부 렌더링

---

## 8. 성능 최적화 팁

### 1. 조건부 렌더링으로 번들 크기 줄이기

```tsx
// ✅ 모바일에서 데스크탑 전용 컴포넌트를 로드하지 않음
<DesktopOnly>
  <HeavyDesktopDashboard />
</DesktopOnly>
```

### 2. 코드 스플리팅

```tsx
import { lazy, Suspense } from 'react';
import { DesktopOnly } from '@/shared/ui/responsive';

const HeavyDesktopComponent = lazy(() => import('./HeavyDesktopComponent'));

function MyComponent() {
  return (
    <DesktopOnly>
      <Suspense fallback={<Loading />}>
        <HeavyDesktopComponent />
      </Suspense>
    </DesktopOnly>
  );
}
```

---

## 9. 테스트

```tsx
import { render, screen } from '@testing-library/react';
import { useDevice } from '@/shared/lib/hooks';

// Mock useDevice hook
jest.mock('@/shared/lib/hooks', () => ({
  useDevice: jest.fn(),
}));

test('shows mobile view on mobile', () => {
  (useDevice as jest.Mock).mockReturnValue({
    isMobile: true,
    isDesktop: false,
    deviceType: 'mobile',
  });

  render(<MyComponent />);
  expect(screen.getByText('Mobile View')).toBeInTheDocument();
});
```

---

## 요약

| 기존 방식 | 새로운 방식 | 장점 |
|---------|----------|-----|
| `className="hidden md:block"` | `<DesktopOnly>` | 더 명확, 불필요한 렌더링 방지 |
| `useMediaQuery('(min-width: 768px)')` | `useDevice()` | 타입 안전, 재사용 가능 |
| 반복되는 반응형 클래스 | `responsive()` 함수 | DRY 원칙, 유지보수 쉬움 |
| 하드코딩된 값 | 디자인 시스템 토큰 | 일관성, 변경 용이 |

이 시스템을 사용하면:
- ✅ 코드 가독성 향상
- ✅ 유지보수 쉬움
- ✅ 타입 안전성
- ✅ 성능 최적화
- ✅ 일관된 디자인
