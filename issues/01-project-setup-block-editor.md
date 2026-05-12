# Issue #1: 프로젝트 세팅 + 블록 에디터 + 1문제 화면

**Type**: AFK
**Label**: ready-for-agent

## Parent

PRD.md - MathBlock 최소 수직 슬라이스

## What to build

Vite + vanilla JS 프로젝트를 초기화하고, Blockly와 KaTeX를 설치하여 적분 1문제를 블록으로 풀 수 있는 화면을 만든다.

화면 구성:
- 상단: KaTeX로 렌더링된 문제 (예: ∫ 2x dx)
- 좌측: Blockly 워크스페이스 — 일부 블록이 미리 배치되어 있고(prefilled), 사용자가 나머지 빈칸을 채움
- 우측 또는 하단: 사용 가능한 블록 목록(toolbox)에서 블록을 드래그하여 워크스페이스에 배치

커스텀 블록 8종을 Blockly에 등록한다: `definite_integral`, `substitute`, `apply_power_rule`, `simplify`, `add`, `multiply`, `number_input`, `variable`. 블록은 수직 스택 + 중첩(블록 안에 블록)으로 연결된다. 사용자 타이핑은 없고 블록 끼워넣기만.

문제 데이터는 PRD에 정의된 solutionTree 스키마(JSON)를 따른다. 1문제의 데이터를 하드코딩하여 포함한다.

기술 스택: Vite + vanilla JS (React 없음), `@blockly/blockly`, KaTeX. 블록 내부 수식은 유니코드 텍스트(예: "∫", "x^n") 사용 (KaTeX 블록 내 렌더링은 MVP 범위 밖).

## Acceptance criteria

- [ ] `npm run dev`로 로컬 개발 서버가 뜬다
- [ ] 브라우저에서 열면 적분 문제가 KaTeX로 렌더링되어 보인다
- [ ] Blockly 워크스페이스에 일부 블록이 미리 배치되어 있다 (prefilled)
- [ ] 툴박스에서 블록을 드래그하여 워크스페이스의 빈 위치에 끼워넣을 수 있다
- [ ] 블록을 잘못 놓았을 때 다시 빼거나 위치를 바꿀 수 있다
- [ ] 8종 커스텀 블록이 모두 정의되어 있고 드래그 가능하다

## Blocked by

None - can start immediately
