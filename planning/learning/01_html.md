# 01. 시맨틱 HTML

## ① 개념 — 왜 필요한가?

HTML 태그는 두 종류가 있다:
- `<div>`, `<span>` — 의미 없음, 레이아웃 용도
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` — 의미 있음 (시맨틱)

겉으로 보이는 결과는 같지만 시맨틱 태그를 쓰는 이유:
1. **검색엔진(SEO)** — Google이 `<main>`을 보고 핵심 내용 파악
2. **접근성** — 스크린리더가 `<nav>`를 보고 메뉴로 바로 이동 가능
3. **가독성** — 코드만 봐도 구조 파악 즉시 가능

## ② 구현 — 이번 프로젝트 구조

```html
<!DOCTYPE html>            ← HTML5 문서 선언
<html lang="ko">           ← 언어 설정 (스크린리더, 검색엔진용)
  <head>
    <meta charset="UTF-8"> ← 한글 깨짐 방지
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ↑ 모바일에서 기기 너비에 맞게 렌더링. 없으면 PC 화면을 축소해서 보여줌
  </head>
  <body>
    <header>               ← 로고 + 네비게이션
      <nav> ... </nav>
    </header>

    <main>                 ← 페이지 핵심 콘텐츠
      <section id="hero">     ← 메인 비주얼
      <section id="about">    ← 소개
      <section id="skills">   ← 기술 스택
      <section id="projects"> ← GitHub 연동
      <section id="contact">  ← 폼
    </main>

    <footer> ... </footer> ← 하단 정보
  </body>
</html>
```

### CSS 연결
```html
<link rel="stylesheet" href="css/reset.css" />
<link rel="stylesheet" href="css/variables.css" />
<link rel="stylesheet" href="css/style.css" />
```
- `href`는 `index.html` 기준 상대경로
- 순서 중요: reset → variables → style (아래 파일이 위를 덮어씀)

### JS 연결
```html
<script src="js/darkmode.js" defer></script>
```
- `defer` — HTML 다 파싱한 후에 JS 실행
- defer 없으면 DOM이 그려지기 전에 JS가 실행되어 요소를 못 찾는 오류 발생

### 앵커 링크
```html
<a href="#hero">Home</a>   ← # + section id로 해당 섹션으로 이동
<section id="hero">        ← id가 앵커 링크의 목적지
```

## ③ 내가 배운 것 (요약)

- 시맨틱 태그는 "보여주기용"이 아니라 SEO와 접근성을 위한 것
- `viewport` 메타태그가 없으면 모바일 반응형이 작동 안 함
- `defer`는 DOM이 준비된 후 JS를 실행시키기 위한 필수 속성
- CSS는 순서가 중요하고, JS는 역할별로 파일을 분리하는 것이 유지보수에 좋다
