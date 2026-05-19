# 08. 폼 UX 원칙 / 유효성 검사

## ① 개념 — 왜 필요한가?

서버에서도 검증하지만 클라이언트에서 먼저 검사하면:
- 서버 요청 없이 즉시 피드백
- 불필요한 서버 부하 감소

### 좋은 폼 UX 3가지 원칙
1. **언제**: submit 시점 또는 입력 중 실시간
2. **어디에**: alert 팝업 ❌ → 해당 필드 바로 아래 ✅
3. **성공도 명확하게**: 제출 성공 시 확인 메시지 표시

---

## ② 구현 — 핵심 코드

### e.preventDefault()
```js
form.addEventListener('submit', (e) => {
  e.preventDefault(); // 브라우저 기본 동작(페이지 새로고침) 차단
});
```

### .trim() — 공백 입력 방지
```js
const name = document.querySelector('#name').value.trim();
// "   " 같이 공백만 입력해도 빈 값으로 처리
```

### 에러 메시지 — input 바로 아래 삽입
```js
const showError = (inputId, message) => {
  const input = document.querySelector(`#${inputId}`);
  let error = input.nextElementSibling; // 바로 다음 형제 요소 확인

  if (!error || !error.classList.contains('error-msg')) {
    error = document.createElement('span');
    error.className = 'error-msg';
    input.after(error); // input 바로 다음에 삽입
  }
  error.textContent = message;
};
```
- `nextElementSibling` — 이미 에러 span이 있는지 확인, 없을 때만 생성
- `input.after()` — input 바로 다음 위치에 삽입

### valid 플래그 패턴
```js
let valid = true;

if (!name) { showError('name', '이름을 입력해주세요.'); valid = false; }
else clearError('name');

// 이메일 — 2단계 검사
if (!email) { showError('email', '이메일을 입력해주세요.'); valid = false; }
else if (!emailRegex.test(email)) { showError('email', '올바른 이메일 형식이 아닙니다.'); valid = false; }
else clearError('email');

if (valid) {
  form.innerHTML = '<p class="success-msg">전송되었습니다!</p>';
}
```
- 각 필드를 독립적으로 검사 → 에러 메시지 동시에 여러 개 표시 가능
- `valid = false`로 표시 후 모든 필드 검사 완료 후 한 번에 판단

### 이메일 정규식
```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// abc    @  domain  .  com
```

---

## ③ 내가 배운 것 (요약)

- `e.preventDefault()`가 없으면 submit 시 페이지가 새로고침된다
- `.trim()`으로 공백만 입력한 경우도 빈 값으로 처리한다
- 에러 메시지는 alert 대신 해당 필드 바로 아래에 표시하는 게 UX에 좋다
- `valid` 플래그로 모든 필드를 검사한 뒤 한 번에 제출 여부를 결정한다
- 성공 시 폼을 성공 메시지로 교체해서 중복 제출을 방지한다
