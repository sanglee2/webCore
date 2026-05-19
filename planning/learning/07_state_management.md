# 07. 상태 관리 패턴

## ① 개념 — 왜 필요한가?

상태(State)란 "현재 화면이 어떤 모습이어야 하는지를 결정하는 데이터"다.

상태 없이 코드를 짜면 여기저기서 DOM을 직접 건드리게 되고,
코드가 커질수록 어디서 무엇을 바꿨는지 추적이 불가능해진다.

### 핵심 패턴
```
이벤트 발생 → 상태 변경 → 화면 업데이트
```
상태 변경과 렌더링을 분리하면 각자 역할이 명확해진다.
React의 `useState`가 바로 이 패턴을 추상화한 것이다.

---

## ② 구현 — 핵심 코드

### 상태 정의
```js
const STATE = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
};
```
- 문자열 직접 사용 시 오타가 나도 에러 없음 → 객체로 정의해서 오타 방지
- 가능한 상태 종류를 한눈에 파악 가능

### 상태 → UI 매핑 (render 함수)
```js
const render = (state, data = null) => {
  const views = {
    [STATE.LOADING]: () => `<p>Loading...</p>`,
    [STATE.EMPTY]:   () => `<p>표시할 프로젝트가 없습니다.</p>`,
    [STATE.ERROR]:   () => `<p>에러</p><button id="retry">다시 시도</button>`,
    [STATE.SUCCESS]: () => `<div class="project-grid">...카드...</div>`,
  };
  container.innerHTML = `<h2>Projects</h2>` + views[state]();
};
```
- `views[state]()` — 상태값으로 해당 함수를 찾아 실행
- 새 상태 추가 시 여기에 한 줄만 추가

### 비동기 로직 — 상태 변경만 담당
```js
const fetchProjects = async () => {
  render(STATE.LOADING);                        // 상태 변경

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const repos = await res.json();

    if (repos.length === 0) { render(STATE.EMPTY); return; }
    render(STATE.SUCCESS, repos);               // 상태 변경

  } catch (err) {
    render(STATE.ERROR);                        // 상태 변경
  }
};
```
- fetchProjects는 "어떤 상태인지 판단"만 담당
- "어떻게 보여줄지"는 render()가 담당

### 다크모드도 같은 패턴
```
상태: 'light' | 'dark'
이벤트: 버튼 클릭
상태 변경: localStorage + data-theme 속성 업데이트
화면 업데이트: CSS 변수가 자동으로 전환
```

---

## ③ 내가 배운 것 (요약)

- 상태란 "화면이 어떻게 보여야 하는지를 결정하는 데이터"다
- 상태 변경과 렌더링을 분리하면 코드가 어디서 무엇을 하는지 명확해진다
- 문자열 상태값은 객체로 정의해서 오타를 방지한다
- 이 패턴이 React useState의 기반 개념이다
