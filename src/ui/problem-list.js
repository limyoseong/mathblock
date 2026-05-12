import katex from 'katex';
import { problems } from '../data/problems.js';
import { getProblemProgress } from '../utils/storage.js';

export function renderProblemList(container) {
  const groups = groupBySubject(problems);
  container.innerHTML = `
    <main class="app-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">MathBlock</p>
          <h1>과목별 블록 풀이</h1>
        </div>
      </header>
      <section class="subject-list" aria-label="과목별 문제 목록">
        ${groups.map(renderSubjectSection).join('')}
      </section>
    </main>
  `;

  problems.forEach((problem) => {
    katex.render(problem.katex, container.querySelector(`[data-katex="${problem.id}"]`), { throwOnError: false });
  });
}

function groupBySubject(items) {
  const map = new Map();
  items.forEach((problem) => {
    if (!map.has(problem.subject)) map.set(problem.subject, []);
    map.get(problem.subject).push(problem);
  });
  return [...map.entries()].map(([subject, subjectProblems]) => ({ subject, problems: subjectProblems }));
}

function renderSubjectSection(group) {
  const solved = group.problems.filter((problem) => getProblemProgress(problem.id).solved).length;
  return `
    <section class="subject-section">
      <div class="subject-head">
        <h2>${group.subject}</h2>
        <span>${solved}/${group.problems.length} 완료</span>
      </div>
      <div class="problem-list">
        ${group.problems.map((problem) => renderCard(problem)).join('')}
      </div>
    </section>
  `;
}

function renderCard(problem) {
  const progress = getProblemProgress(problem.id);
  return `
    <a class="problem-card" href="#problem/${problem.id}">
      <span class="status ${progress.solved ? 'done' : ''}">${progress.solved ? '완료' : '미완료'}</span>
      <strong data-katex="${problem.id}"></strong>
      <small>${problem.source.problemNumber}번 · 시도 ${progress.attempts}회</small>
    </a>
  `;
}
