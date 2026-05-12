# Issue #6: Vercel 배포

**Type**: AFK
**Label**: ready-for-agent

## Parent

PRD.md - MathBlock 최소 수직 슬라이스

## What to build

완성된 앱을 인터넷에서 접속할 수 있도록 배포한다. URL을 친구에게 공유하면 설치나 회원가입 없이 바로 쓸 수 있는 상태.

작업 내용:
- git 저장소 초기화 및 GitHub 저장소 생성
- Vercel 무료 플랜으로 프로젝트 연결
- git push 시 자동 배포(CI/CD) 설정
- 배포된 URL 확인 및 동작 테스트

## Acceptance criteria

- [ ] GitHub 저장소가 존재하고 최신 코드가 push 되어 있다
- [ ] Vercel에 프로젝트가 연결되어 있다
- [ ] 배포된 URL에서 앱이 정상 동작한다 (문제 목록 → 풀이 → 채점 → 실수 진단)
- [ ] git push 시 자동으로 재배포된다

## Blocked by

- Issue #1 (프로젝트 세팅 + 블록 에디터)
- Issue #2 (채점 + 모범 풀이 표시)
- Issue #3 (실수 진단)
- Issue #4 (문제 목록 + 진도 관리)
- Issue #5 (나머지 4문제 콘텐츠 제작)
