# 지도 서비스 - UjuFunding

네이버 지도 API를 활용한 관심 장소 관리 웹 애플리케이션입니다.

## 주요 기능

- 🗺️ 네이버 지도 뷰어
- 🔍 도로명/지번 주소 검색
- 📍 지도에 마커 표시
- ⭐ 관심 장소 저장 및 관리
- 📱 반응형 디자인 (모바일/데스크톱)

## 기술 스택

- **Frontend Framework**: React 19.2.0 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (with persist middleware)
- **Routing**: React Router Dom
- **Styling**: Tailwind CSS + Radix UI
- **HTTP Client**: Axios
- **Architecture**: FSD (Feature-Sliced Design)
- **Map Service**: Naver Maps API

## 프로젝트 구조 (FSD 아키텍처)

```
src/
├── app/                    # 애플리케이션 레이어
│   ├── providers/          # Router, Context 등
│   ├── styles/             # 전역 스타일
│   └── App.tsx             # 메인 App 컴포넌트
├── pages/                  # 페이지 레이어
│   └── map/                # 지도 페이지
├── widgets/                # 위젯 레이어
│   ├── map-viewer/         # 지도 뷰어 위젯
│   ├── search-bar/         # 검색바 위젯
│   └── favorites-list/     # 관심목록 위젯
├── features/               # 기능 레이어
│   ├── search-address/     # 주소 검색 기능
│   ├── add-favorite/       # 관심 장소 추가 기능
│   └── map-controls/       # 지도 컨트롤 기능
├── entities/               # 엔티티 레이어
│   ├── place/              # 장소 엔티티
│   └── marker/             # 마커 엔티티
└── shared/                 # 공유 레이어
    ├── ui/                 # 공통 UI 컴포넌트
    ├── lib/                # 유틸리티, 훅
    ├── api/                # API 클라이언트
    ├── config/             # 설정 파일
    └── types/              # 타입 정의
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 네이버 지도 API 키 발급

1. [Naver Cloud Platform](https://www.ncloud.com/product/applicationService/maps)에 접속
2. Maps > Web Dynamic Map 서비스 신청
3. Client ID 발급

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_NAVER_MAP_CLIENT_ID=your_client_id_here
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 5. 빌드

```bash
npm run build
```

## 주요 기능 사용법

### 주소 검색

1. 상단 검색바에 도로명 주소 또는 지번 주소 입력
2. 검색 버튼 클릭 또는 Enter 키 입력
3. 해당 위치로 지도 이동 및 마커 표시

### 관심 장소 추가

1. 원하는 위치로 지도 이동
2. 우측 하단의 "관심 추가" 버튼 클릭
3. 관심 목록에 현재 위치 저장

### 관심 장소 관리

- 우측 사이드바에서 저장된 관심 장소 목록 확인
- 장소 클릭 시 해당 위치로 지도 이동
- 휴지통 아이콘 클릭으로 장소 삭제
- 데이터는 브라우저 localStorage에 자동 저장

## 반응형 디자인

- **데스크톱**: 지도와 관심 목록을 좌우로 배치
- **모바일**: 하단 토글 버튼으로 목록 표시/숨김

## 개발 가이드

### 새 페이지 추가

`src/pages/` 디렉토리에 새 페이지 추가 후 `src/app/providers/router.tsx`에 라우트 등록

### 새 위젯 추가

`src/widgets/` 디렉토리에 위젯 컴포넌트 추가

### 새 기능 추가

`src/features/` 디렉토리에 기능 모듈 추가

### UI 컴포넌트 추가

`src/shared/ui/` 디렉토리에 공통 컴포넌트 추가

## 라이센스

MIT

## 기여

프로젝트 개선을 위한 이슈와 PR은 언제나 환영합니다!
