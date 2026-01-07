/**
 * 컴포넌트 테스트 페이지
 */
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { spacing } from '@/shared/config/design-system';
import { PlusIcon, Cross2Icon, HeartIcon } from '@radix-ui/react-icons';

export const ComponentsPage = () => {
  const { deviceType, isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div className={`min-h-screen w-full overflow-y-auto bg-gray-50 ${spacing.container.responsive} py-8 pb-16`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            컴포넌트 테스트 페이지
          </h1>
          <div className="flex gap-2 text-sm">
            <span className="font-semibold">현재 디바이스:</span>
            <span className="capitalize">{deviceType}</span>
            <span className="text-gray-400">
              ({isMobile && '모바일'}{isTablet && '태블릿'}{isDesktop && '데스크탑'})
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            화면 크기를 조절하면서 Input 컴포넌트의 크기 변화를 확인해보세요.
          </div>
        </div>

        {/* Input 컴포넌트 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Input 컴포넌트
          </h2>

          {/* 기본 Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              기본 Input
            </label>
            <Input placeholder="텍스트를 입력하세요" />
            <p className="text-xs text-gray-500">
              모바일: h-8(32px), text-xs(12px) / 데스크탑: h-10(40px), text-sm(14px)
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Input
            </label>
            <Input type="email" placeholder="email@example.com" />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password Input
            </label>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </div>

          {/* Number Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number Input
            </label>
            <Input type="number" placeholder="0" />
          </div>

          {/* Disabled Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Disabled Input
            </label>
            <Input placeholder="비활성화된 입력" disabled />
          </div>

          {/* Value가 있는 Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Value가 있는 Input
            </label>
            <Input defaultValue="입력된 값" />
          </div>
        </div>

        {/* Button 컴포넌트 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Button 컴포넌트
          </h2>

          {/* Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Icon Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button size="icon" variant="default">
                <PlusIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Cross2Icon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <HeartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Buttons with Icons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Buttons with Icons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              <Button variant="outline">
                <HeartIcon className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="destructive">
                <Cross2Icon className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Disabled State
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Default</Button>
              <Button variant="outline" disabled>
                Outline
              </Button>
              <Button variant="secondary" disabled>
                Secondary
              </Button>
            </div>
          </div>

          {/* Loading State (예시) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Button Combinations
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="outline">
                Small Outline
              </Button>
              <Button size="lg" variant="secondary">
                Large Secondary
              </Button>
              <Button size="sm" variant="destructive">
                Small Destructive
              </Button>
            </div>
          </div>
        </div>

        {/* 반응형 그리드 레이아웃 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            그리드 레이아웃 (반응형)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <Input placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                전화번호
              </label>
              <Input type="tel" placeholder="010-1234-5678" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <Input placeholder="서울시 강남구..." />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            모바일: 1열 / 태블릿 이상: 2열로 변경됩니다
          </p>
        </div>

        {/* 디바이스 정보 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            현재 브레이크포인트 정보
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <div>모바일: 0px ~ 767px</div>
            <div>태블릿: 768px ~ 1023px</div>
            <div>데스크탑: 1024px 이상</div>
          </div>
        </div>
      </div>
    </div>
  );
};
