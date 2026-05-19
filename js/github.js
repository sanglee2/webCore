const USERNAME = 'sanglee2';
const container = document.querySelector('#projects');

// ① 상태 정의 — 가능한 상태값을 한 곳에서 관리
const STATE = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
};

// ② 상태 → UI 매핑 — 상태별 HTML을 한 곳에서 정의
const render = (state, data = null) => {
  const views = {
    [STATE.LOADING]: () => `<p>Loading...</p>`,

    [STATE.EMPTY]: () => `<p>표시할 프로젝트가 없습니다.</p>`,

    [STATE.ERROR]: () => `
      <p>프로젝트를 불러올 수 없습니다.</p>
      <button id="retry">다시 시도</button>
    `,

    [STATE.SUCCESS]: () => `
      <div class="project-grid">
        ${data.map(({ name, description, html_url, language }) => `
          <a class="project-card" href="${html_url}" target="_blank" rel="noopener">
            <h3>${name}</h3>
            <p>${description || '설명 없음'}</p>
            <span>${language || ''}</span>
          </a>
        `).join('')}
      </div>
    `,
  };

  container.innerHTML = `<h2>Projects</h2>` + views[state]();

  // 에러 상태일 때만 다시 시도 버튼 이벤트 등록
  if (state === STATE.ERROR) {
    document.querySelector('#retry').addEventListener('click', fetchProjects);
  }
};

// ③ 비동기 로직 — 상태 변경만 담당, UI는 render()에 위임
const fetchProjects = async () => {
  render(STATE.LOADING);

  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    if (!res.ok) throw new Error(res.status);

    const repos = await res.json();

    if (repos.length === 0) {
      render(STATE.EMPTY);
      return;
    }

    render(STATE.SUCCESS, repos);

  } catch (err) {
    render(STATE.ERROR);
  }
};

fetchProjects();
