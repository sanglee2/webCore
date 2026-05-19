# 06. fetch / async/await

## ① 개념 — 왜 필요한가?

JS는 기본적으로 한 줄씩 순서대로 실행된다. 서버 요청처럼 시간이 걸리는 작업을 동기로 처리하면 브라우저 전체가 멈춘다.
비동기 처리로 요청을 보내놓고 다른 작업을 계속하다가, 응답이 오면 그때 처리한다.

### async/await vs .then()
```js
// .then() — 중첩될수록 복잡
fetch(url).then(res => res.json()).then(data => ...).catch(err => ...);

// async/await — 동기 코드처럼 읽힘 (권장)
const getData = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (err) { ... }
};
```
- `async` — 비동기 함수 선언
- `await` — 완료될 때까지 대기 (async 함수 안에서만 사용 가능)
- `try/catch` — 에러 처리

---

## ② 구현 — 핵심 코드

### fetch 주의사항
```js
const res = await fetch(url);
if (!res.ok) throw new Error(res.status); // 직접 체크 필수
const data = await res.json(); // 응답을 JS 객체로 변환 (이것도 비동기)
```
- `fetch`는 404, 403도 에러로 throw하지 않는다 → `!res.ok`로 직접 체크해야 catch로 넘어감
- `.json()`도 비동기라 `await` 필요

### 4가지 상태 처리
```js
const renderProjects = async () => {
  container.innerHTML = '<p>Loading...</p>';     // ① 로딩

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);    // ② 에러 (403, 404 등)

    const repos = await res.json();

    if (repos.length === 0) {
      container.innerHTML = '<p>표시할 프로젝트가 없습니다.</p>'; // ③ 빈 상태
      return;
    }

    container.innerHTML = `...카드 렌더링...`;   // ④ 성공

  } catch (err) {
    container.innerHTML = `
      <p>프로젝트를 불러올 수 없습니다.</p>
      <button id="retry">다시 시도</button>
    `;
    document.querySelector('#retry').addEventListener('click', renderProjects);
  }
};
```

### 구조분해 할당 + map + join
```js
repos.map(({ name, description, html_url, language }) => `
  <a href="${html_url}">${name}</a>
`).join('')
```
- `{ name, description }` — 객체에서 필요한 키만 꺼냄 (구조분해 할당)
- `.map()` — 배열 각 항목을 HTML 문자열로 변환한 새 배열 반환
- `.join('')` — 배열을 하나의 문자열로 합침 (없으면 쉼표 붙음)

---

## ③ 내가 배운 것 (요약)

- 비동기 처리가 없으면 API 응답 기다리는 동안 브라우저 전체가 멈춘다
- `fetch`는 404/403도 에러로 throw하지 않아서 `!res.ok` 체크가 필수다
- `async/await`는 `.then()` 체인보다 읽기 쉽고 에러 처리가 직관적이다
- API 연동 시 로딩/성공/에러/빈 상태 4가지를 항상 처리해야 한다
- `map().join('')`으로 배열 데이터를 HTML 문자열로 변환해서 렌더링한다
