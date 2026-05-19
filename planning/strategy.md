# 웹 기초완성 구현 전략

## 프로젝트 구조
```
webCore/
├── index.html
├── css/
│   ├── reset.css       # 브라우저 기본 스타일 초기화
│   ├── variables.css   # CSS 변수 (색상, 폰트, 간격)
│   └── style.css       # 전체 스타일
├── js/
│   ├── darkmode.js     # 다크모드 + LocalStorage
│   ├── nav.js          # 햄버거 메뉴, 스크롤 시 헤더 변경
│   ├── scroll.js       # 부드러운 스크롤, 스크롤 탑 버튼, 스크롤 애니메이션
│   ├── github.js       # GitHub API 연동 + 상태 처리
│   └── form.js         # Contact 폼 유효성 검사
├── images/
└── docs/
```

---

## 학습 방법론

### 추천 학습 사이클
각 개념마다 이 3단계를 반복한다:

`① 개념 이해 → ② 직접 구현 → ③ 정리/아카이빙`

### 구체적인 방법

**① 개념 이해**
- Claude에게 "왜 이게 필요한지"부터 물어보기
- 코드 먼저 받지 말고, 개념과 흐름을 먼저 이해

**② 직접 구현**
- 본인이 먼저 코드를 써보고, 막히면 힌트 요청
- 완성 코드를 받아도 반드시 한 줄씩 설명 듣기

**③ 정리/아카이빙**
- `planning/learning/` 폴더에 개념별 학습 노트 저장
- "내가 배운 것"을 내 말로 요약

### 학습 순서

| 단계 | 개념 | 구현 |
|------|------|------|
| 1 | 시맨틱 HTML이란? | HTML 뼈대 작성 |
| 2 | CSS 변수 / 모바일 퍼스트란? | reset.css + variables.css |
| 3 | Flexbox vs Grid | nav + 카드 레이아웃 |
| 4 | DOM 조작 / 이벤트란? | 햄버거 메뉴, 다크모드 |
| 5 | IntersectionObserver란? | 스크롤 애니메이션 |
| 6 | fetch / async/await란? | GitHub API 연동 |
| 7 | 상태 관리 패턴이란? | 로딩/에러/빈 상태 UI |
| 8 | 폼 UX 원칙이란? | 유효성 검사 |

### 아카이빙 구조

```
planning/
├── strategy.md
└── learning/
    ├── 01_html.md
    ├── 02_css.md
    ├── 03_dom_event.md
    └── ...
```

---

## 구현 순서

### 1단계 — HTML 뼈대
- 시맨틱 태그로 전체 섹션 구성 (header, main, section, footer)
- Hero / About / Skills / Projects / Contact / Footer 마크업
- 모든 script는 `defer` 속성

### 2단계 — CSS (모바일 퍼스트)
- CSS 변수로 라이트/다크 테마 토큰 정의
- 모바일 기본 → 768px → 1024px 미디어쿼리 순서
- Flexbox: 네비, Hero, Skills / Grid: Projects 카드

### 3단계 — JavaScript (핵심 인터랙션)
- 다크모드: LocalStorage 읽어서 초기 상태 복원 → 토글 클릭 시 class 전환 + 저장
- 햄버거 메뉴: 클릭 시 nav open/close class 토글
- 스크롤 탑 버튼: scroll 이벤트 → 300px 이상이면 버튼 표시
- 스크롤 애니메이션: IntersectionObserver로 섹션 진입 감지 → visible class 추가

### 4단계 — GitHub API
- `fetch` + `async/await`로 repos 목록 호출
- 로딩 / 성공 / 에러 / 빈 상태 4가지 UI 분기 처리
- 403 에러 시 "다시 시도" 버튼 표시

### 5단계 — 폼 유효성 검사
- 필수값 비었을 때 에러 메시지 출력
- 이메일 정규식 검사
- 통과 시 성공 메시지 출력

---

## 핵심 제약 사항
- `var` 금지 → `const` / `let` 사용
- `onclick` 금지 → `addEventListener` 사용
- 인라인 스타일 금지 → CSS class 토글 방식
- React / jQuery / Bootstrap 금지 → 순수 Vanilla JS
- 허용 외부 리소스: Google Fonts, Font Awesome

---

## 변경 히스토리

| 날짜 | 내용 |
|------|------|
| 2026-05-14 | 초기 전략 수립 |
| 2026-05-14 | 학습 방법론 섹션 추가 |
| 2026-05-14 | 학습 루틴 확정 — ① 개념이해 → ② 직접구현 → ③ 아카이빙, 학습 순서 8단계 정의 |
