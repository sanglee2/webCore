# 05. IntersectionObserver

## ① 개념 — 왜 필요한가?

스크롤 애니메이션을 만들려면 "요소가 화면에 보이는 순간"을 감지해야 한다.

### 예전 방식 (scroll 이벤트) — 성능 문제
```js
window.addEventListener('scroll', () => {
  // 스크롤할 때마다 (1초에 수십~수백번) 모든 요소 위치 계산
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
});
```

### IntersectionObserver — 뷰포트 진입 시에만 실행
| | scroll 이벤트 | IntersectionObserver |
|--|--|--|
| 실행 시점 | 스크롤할 때마다 | 요소가 뷰포트에 진입/이탈할 때만 |
| 성능 | 나쁨 | 좋음 (브라우저 최적화) |

### threshold
- `0` — 1px이라도 보이면 실행
- `0.1` — 10% 보일 때 실행
- `1` — 100% 완전히 보일 때 실행

---

## ② 구현 — 핵심 코드

### 스크롤 탑 버튼
```js
// JS로 DOM 요소 직접 생성
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.className = 'scroll-top';
document.body.appendChild(scrollTopBtn); // body 마지막에 추가

// 300px 이상 스크롤 시 버튼 표시
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
  else scrollTopBtn.classList.remove('visible');
});

// 클릭 시 맨 위로 부드럽게 이동
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

### IntersectionObserver
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {        // 뷰포트에 들어왔을 때
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });               // 10% 보일 때 실행

document.querySelectorAll('section').forEach(s => observer.observe(s));
```
- `entries` — 상태가 바뀐 요소들의 배열
- `entry.isIntersecting` — true면 뷰포트 진입
- `entry.target` — 실제 DOM 요소

### CSS — 애니메이션 연결
```css
section {
  opacity: 0;
  transform: translateY(30px);  /* 30px 아래에서 시작 */
  transition: opacity 0.6s ease, transform 0.6s ease;
}
section.visible {
  opacity: 1;
  transform: translateY(0);     /* 제자리로 올라오며 나타남 */
}
```
JS가 `visible` 클래스를 추가하는 순간 CSS transition이 자동으로 작동.

---

## ③ 내가 배운 것 (요약)

- IntersectionObserver는 scroll 이벤트보다 성능이 좋고 코드가 간결하다
- `threshold`로 얼마나 보여야 콜백을 실행할지 조절할 수 있다
- JS는 클래스만 추가하고, 실제 애니메이션은 CSS transition이 담당한다
- `createElement` + `appendChild`로 HTML 없이 JS로만 DOM 요소를 만들 수 있다
- `querySelector`는 첫 번째 하나, `querySelectorAll`은 일치하는 전부를 반환한다
