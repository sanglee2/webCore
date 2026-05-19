# 04. DOM 조작 / 이벤트

## ① 개념 — 왜 필요한가?

### DOM이란?
브라우저가 HTML을 읽어서 만든 트리 구조의 객체.
JS는 HTML 파일을 직접 수정하는 게 아니라 이 DOM 트리를 조작해서 화면을 바꾼다.

### 이벤트란?
사용자의 모든 행동(클릭, 스크롤, 입력...)이 이벤트로 발생한다.
`addEventListener`로 감지해서 반응한다.

왜 `onclick` 속성 대신 `addEventListener`를 쓰는가?
- HTML과 JS의 역할 분리
- 한 요소에 여러 이벤트 등록 가능

### 핵심 패턴
```
사용자 이벤트 → 상태 변경 → DOM 업데이트 → CSS 반응
     클릭      dark/light    data-theme 설정   변수 전환
```

---

## ② 구현 — 핵심 코드

### DOM 요소 찾기
```js
const btn = document.querySelector('.dark-toggle'); // CSS 선택자로 첫 번째 요소
const items = document.querySelectorAll('section'); // 일치하는 모든 요소 (NodeList)
```

### darkmode.js 흐름
```js
// 1. 저장된 테마 복원 (페이지 로드 시)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// 2. 클릭 시 테마 전환
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark'; // 삼항연산자
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next); // 브라우저에 저장
});
```
- `document.documentElement` = `<html>` 태그
- `localStorage` = 브라우저를 닫아도 유지되는 저장소

### nav.js — classList.toggle
```js
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open'); // 있으면 제거, 없으면 추가
});
```

toggle 없이 직접 구현하면:
```js
if (navLinks.classList.contains('open')) {
  navLinks.classList.remove('open');
} else {
  navLinks.classList.add('open');
}
```
toggle 한 줄이 위 전체를 대체한다.

### classList 주요 메서드
```js
el.classList.add('open')       // 클래스 추가
el.classList.remove('open')    // 클래스 제거
el.classList.toggle('open')    // 있으면 제거, 없으면 추가
el.classList.contains('open')  // 포함 여부 확인 (true/false)
```

---

## ③ 내가 배운 것 (요약)

- DOM은 HTML을 JS가 조작할 수 있게 변환한 트리 구조다
- JS는 DOM의 클래스를 추가/제거해서 화면을 바꾼다 (직접 스타일 건드리지 않음)
- `addEventListener`는 HTML과 JS를 분리하기 위해 `onclick` 대신 사용한다
- `classList.toggle`은 열림/닫힘 토글 패턴을 한 줄로 구현한다
- `localStorage`는 브라우저를 닫아도 유지되는 저장소다
