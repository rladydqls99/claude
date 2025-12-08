# Next.js FSD Starter Skill

Claude Code 스킬로 제공되는 Next.js + FSD (Feature-Sliced Design) 아키텍처 프로젝트 생성 도구입니다.

## 개요

이 스킬은 프로덕션 환경에서 사용 가능한 Next.js 프로젝트를 FSD 아키텍처 기반으로 신속하게 생성할 수 있도록 지원합니다. 최신 개발 도구와 모범 사례가 사전 구성되어 있어, 프로젝트 초기 설정에 소요되는 시간을 크게 절약할 수 있습니다.

## 주요 기능

### 기술 스택

- **Next.js** (최신 버전, App Router)
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 우선 스타일링
- **ESLint** (flat config) - FSD 규칙 포함
- **Prettier** - 코드 포맷팅
- **Husky** - Git 커밋 전 린트 자동화
- **pnpm** - 빠른 패키지 매니저

### 포함된 라이브러리

- **date-fns** - 날짜 처리
- **zustand** - 상태 관리
- **es-toolkit** - 현대적인 lodash 대안
- **react-hook-form** - 폼 처리
- **tw-animate-css** - Tailwind 애니메이션
- **lucide-react** - 아이콘
- **@radix-ui** - 헤드리스 UI 컴포넌트
- **tailwind-merge** & **clsx** - 클래스 병합

## FSD 아키텍처

### 레이어 구조

이 스킬은 Feature-Sliced Design 아키텍처를 따르며, 다음과 같은 계층 구조를 가집니다:

| 레이어 | 목적 | 임포트 규칙 |
|--------|------|------------|
| `views/` | 페이지 레벨 컴포넌트 | widgets, features, entities, shared 임포트 가능 |
| `widgets/` | 복잡한 UI 블록 | features, entities, shared 임포트 가능 |
| `features/` | 사용자 인터랙션 | entities, shared 임포트 가능 |
| `entities/` | 비즈니스 엔티티 | shared만 임포트 가능 |
| `shared/` | 재사용 가능한 유틸리티 | 다른 레이어 임포트 불가 |

### 슬라이스 내부 구조

각 슬라이스는 다음과 같은 일관된 내부 구조를 가집니다:

```
<slice-name>/
├── index.ts      # Public API (배럴 파일)
├── api/          # API 호출, 서버 액션
├── model/        # 타입, 검증 스키마, 기본값
├── ui/           # React 컴포넌트
├── lib/          # 유틸리티, 커스텀 훅
└── config/       # 슬라이스별 설정
```

## 사용 방법

### Claude Code에서 스킬 사용

```bash
# 스킬 실행
/skill nextjs-fsd-starter
```

또는 자연어로 요청:

```
"Next.js FSD 프로젝트 생성해줘"
"FSD 아키텍처로 Next.js 프로젝트 시작하고 싶어"
```

### 생성 프로세스

스킬은 자동으로 다음 작업을 수행합니다:

1. Next.js 프로젝트 생성
2. 필요한 의존성 설치
3. FSD 디렉토리 구조 생성
4. ESLint, Prettier 설정 적용
5. Husky 및 lint-staged 설정
6. tsconfig.json 경로 별칭 구성
7. 글로벌 스타일 적용 (라이트/다크 모드 지원)
8. React Compiler 활성화

## 프로젝트 구조 예시

```
src/
├── app/                 # Next.js App Router
├── views/               # 페이지 컴포넌트
├── widgets/             # 복합 위젯
├── features/            # 기능 단위
├── entities/            # 비즈니스 엔티티
└── shared/              # 공유 리소스
    ├── api/            # API 유틸리티
    ├── config/         # 전역 설정
    ├── lib/            # 유틸리티 함수
    ├── model/          # 공유 타입
    └── ui/             # 공통 UI 컴포넌트
```

## 주요 설정 파일

### ESLint 설정

- FSD 아키텍처 규칙 강제
- React Compiler 플러그인 포함
- Next.js, React Hooks 규칙 적용

### Prettier 설정

- Tailwind CSS 클래스 자동 정렬
- 일관된 코드 포맷팅

### Husky

- 커밋 전 자동 린트 및 포맷팅
- 코드 품질 유지

## 경로 별칭

프로젝트는 다음 경로 별칭을 사용합니다:

```typescript
{
  "@/*": "./src/*",
  "@shared": "./src/shared",
  "@shared/server": "./src/shared/server",
  "@entities/*": "./src/entities/*",
  "@features/*": "./src/features/*",
  "@widgets/*": "./src/widgets/*",
  "@views/*": "./src/views/*"
}
```

## 생성 후 작업

프로젝트 생성 후 다음 명령어로 확인:

```bash
# 린트 검사
pnpm lint

# 포맷팅 검사
pnpm format:check

# 전체 포맷팅 적용
pnpm format

# 개발 서버 실행
pnpm dev
```

## 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- SKILL.md - 상세한 설정 가이드

## 라이센스

이 스킬은 Claude Code 사용자를 위한 도구이며, 생성된 프로젝트는 사용자가 자유롭게 사용할 수 있습니다.
