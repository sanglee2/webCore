# 02. CSS 변수 / 모바일 퍼스트

## ① 개념 — 왜 필요한가?

### reset.css
브라우저마다 HTML 태그에 자동으로 적용하는 기본 스타일이 다르다.
reset.css는 이를 전부 0으로 초기화해서 모든 브라우저에서 동일한 출발점을 만든다.

### CSS 변수 (Custom Properties)
색상/수치를 한 곳에서 관리하기 위해 사용.
다크모드처럼 테마 전환이 필요할 때 변수값만 바꾸면 전체가 바뀐다.

### 모바일 퍼스트
작은 화면을 기본으로 짜고, `min-width` 미디어쿼리로 큰 화면을 추가하는 방식.
전체 트래픽의 60% 이상이 모바일이고, 제약이 많은 환경을 먼저 해결하는 게 더 견고한 설계다.

---

## ② 구현 — 핵심 코드

### box-sizing: border-box
```css
*, *::before, *::after {
  box-sizing: border-box; /* padding/border를 width 안에 포함 */
  margin: 0;
  padding: 0;
}
```
- `content-box`(기본값): width 200px + padding 20px = 실제 240px
- `border-box`: width 200px 안에 padding 포함 = 항상 200px

### img 기본 처리
```css
img {
  max-width: 100%;   /* 부모를 넘치지 않게 */
  display: block;    /* inline 기본값이 만드는 아래 여백 제거 */
}
```

### CSS 변수 정의 및 다크모드 전환
```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}

[data-theme='dark'] {
  --color-bg: #0f172a;   /* 덮어씌우기만 하면 전체 테마 전환 */
  --color-text: #f1f5f9;
}
```
- JS에서 `document.documentElement.setAttribute('data-theme', 'dark')` 한 줄로 전환

### rem vs px
```css
--font-size-base: 1rem; /* 1rem = 브라우저 기본값(보통 16px) */
```
- px: 고정값, 사용자 브라우저 설정 무시
- rem: 브라우저 기본값 기준 비율, 접근성에 유리

### 모바일 퍼스트 미디어쿼리
```css
/* 기본 = 모바일 */
.nav-links { display: none; }

/* 태블릿 이상에서 추가 */
@media (min-width: 768px) {
  .nav-links { display: flex; }
}
```

---

## ③ 내가 배운 것 (요약)

- `box-sizing: border-box`는 레이아웃 계산을 예측 가능하게 만드는 필수 설정
- CSS 변수는 다크모드처럼 테마가 있을 때 진짜 힘을 발휘한다
- `rem`은 사용자 접근성을 고려한 단위, `px`는 고정이 필요한 곳에만 쓴다
- 모바일 퍼스트는 `max-width`가 아닌 `min-width`로 미디어쿼리를 작성한다
