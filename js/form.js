const form = document.querySelector('#contact-form');

const showError = (inputId, message) => {
  const input = document.querySelector(`#${inputId}`);
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-msg')) {
    error = document.createElement('span');
    error.className = 'error-msg';
    input.after(error);
  }
  error.textContent = message;
};

const clearError = (inputId) => {
  const input = document.querySelector(`#${inputId}`);
  const error = input.nextElementSibling;
  if (error && error.classList.contains('error-msg')) {
    error.textContent = '';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) { showError('name', '이름을 입력해주세요.'); valid = false; }
  else clearError('name');

  if (!email) { showError('email', '이메일을 입력해주세요.'); valid = false; }
  else if (!emailRegex.test(email)) { showError('email', '올바른 이메일 형식이 아닙니다.'); valid = false; }
  else clearError('email');

  if (!message) { showError('message', '메시지를 입력해주세요.'); valid = false; }
  else clearError('message');

  if (valid) {
    form.innerHTML = '<p class="success-msg">메시지가 전송되었습니다. 감사합니다!</p>';
  }
});
