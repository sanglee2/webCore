# 03. Flexbox vs Grid

## ① 개념 — 왜 필요한가?

CSS 레이아웃의 두 핵심 도구. 해결하는 차원이 다르다:

- **Flexbox** — 1차원 (가로 또는 세로 한 방향)
- **Grid** — 2차원 (행과 열 동시 제어)

### 언제 무엇을 쓰나?
| 상황 | 선택 |
|------|------|
| 메뉴, 버튼 한 줄 정렬 | Flexbox |
| 카드/그리드 목록 | Grid |
| 수직 가운데 정렬 | Flexbox |
| 복잡한 2차원 레이아웃 | Grid |

---

## ② 구현 — 핵심 코드

### Flexbox — nav 정렬
```css
nav {
  display: flex;
  align-items: center;            /* 세로 가운데 */
  justify-content: space-between; /* 가로 양 끝 배치 */
}
```
결과: `[로고] -------- [메뉴] -------- [🌙]`

### justify-content 주요 값
```
flex-start   : [A][B][C]
center       :    [A][B][C]
flex-end     :          [A][B][C]
space-between: [A]   [B]   [C]
space-around :  [A]  [B]  [C]
```

### 모바일 퍼스트 반응형 (Flexbox)
```css
.nav-links { display: none; }          /* 모바일: 숨김 */

@media (min-width: 768px) {
  .nav-links { display: flex; }        /* 태블릿+: 표시 */
  .hamburger { display: none; }        /* 태블릿+: 햄버거 숨김 */
}
```

### Grid — Projects 카드
```css
.project-grid {
  display: grid;
  grid-template-columns: 1fr;          /* 모바일: 1열 */
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* 태블릿: 2열 */
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr); /* 데스크톱: 3열 */
  }
}
```

### 1fr이란?
- `fr` = fraction (비율 단위)
- `repeat(3, 1fr)` = 사용 가능한 너비를 균등하게 3등분
- `px`와 달리 컨테이너 크기에 맞게 자동 조절

---

## ③ 내가 배운 것 (요약)

- Flexbox는 "한 줄 정렬", Grid는 "표 만들기"로 역할을 나눈다
- `justify-content: space-between`으로 nav 양 끝 정렬을 쉽게 구현한다
- `1fr`은 남은 공간을 비율로 나누는 단위, px처럼 고정값이 아니다
- 모바일 퍼스트는 기본을 모바일로 짜고 `min-width`로 큰 화면을 추가한다
