# Issue #5: 나머지 4문제 콘텐츠 제작

**Type**: HITL (어떤 문제를 쓸지 사람이 결정해야 함)
**Label**: ready-for-agent

## Parent

PRD.md - MathBlock 최소 수직 슬라이스

## What to build

적분(기초) 문제 4개를 추가로 선정하고, 각 문제의 solutionTree 데이터를 만든다. Issue #1에서 하드코딩한 1문제와 합쳐 총 5문제가 된다.

각 문제에 필요한 데이터:
- `id`: 고유 식별자
- `title`: 문제 제목
- `katex`: KaTeX 수식 문자열
- `expectedAnswer`: 정답 문자열
- `availableBlocks`: 사용 가능한 블록 타입 목록
- `solutionTree`: 모범 풀이 트리 (각 노드에 type, prefilled, params, expectedOutput, children)

난이도 1단계 기준: 각 문제에서 어떤 블록이 미리 배치(prefilled: true)되고, 어떤 블록을 사용자가 채워야 하는지(prefilled: false) 설계. 사용자가 채울 블록은 2~3개.

열린 질문: 정적분, 부정적분, 치환적분 중 어떤 유형을 포함할지. 다양한 유형을 섞어 블록 코딩의 표현력을 검증하는 것이 좋다.

## Acceptance criteria

- [ ] 4개의 추가 문제 데이터가 solutionTree 스키마를 따른다
- [ ] 5문제 모두 서로 다른 적분 유형 또는 패턴을 다룬다
- [ ] 각 문제의 prefilled/non-prefilled 블록 구분이 명확하다
- [ ] 모든 문제가 기존 8종 블록으로 풀이 표현 가능하다 (부족하면 블록 추가 정의)
- [ ] 5문제 모두 블록 배치 → 채점 → 실수 진단이 정상 동작한다

## Blocked by

- Issue #1 (프로젝트 세팅 + 블록 에디터) — 블록 정의가 있어야 문제 데이터를 만들 수 있음
