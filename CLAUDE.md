## Project

MathBlock — 편입 수학 블록 풀이 웹앱.

- **GitHub**: https://github.com/limyoseong/mathblock
- **기술 스택**: Vite + vanilla JS + Blockly + KaTeX (React 없음)
- **설계 문서**: DESIGN.md (전체 설계), PRD.md (MVP 범위)
- **이슈 트래커**: GitHub Issues에 6개 이슈가 등록되어 있음. `gh issue list`로 확인 가능
  - #1 프로젝트 세팅 + 블록 에디터 (시작점)
  - #2 채점 + 모범 풀이 (#1 이후)
  - #3 실수 진단 (#2 이후)
  - #4 문제 목록 + 진도 관리 (#1 이후)
  - #5 콘텐츠 제작 (#1 이후)
  - #6 Vercel 배포 (전부 끝난 후)
- **구현 시작**: Issue #1부터 순서대로. 각 이슈의 Acceptance criteria를 충족하면 다음으로.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
