import katex from 'katex';
import * as Blockly from 'blockly';
import { setBlockOptions } from '../blocks/definitions.js';
import { flatten } from '../grading/comparator.js';
import { createSolutionState } from '../workspace/setup.js';

export function renderResultPanel(container, result, warning, problem) {
  if (!result) {
    container.innerHTML = '<p class="muted">블록을 채운 뒤 실행해 보세요.</p>';
    return;
  }

  const statusClass = result.correct ? 'correct' : 'wrong';
  const title = result.correct ? '정답!' : '오답';
  const diagnosis = result.comparison.firstDivergence?.message ?? '모든 단계가 모범 풀이와 일치합니다.';

  container.innerHTML = `
    <section class="result ${statusClass}">
      <div class="result-head">
        <strong>${title}</strong>
        <span>내 답: ${renderMath(result.userAnswer)} / 정답: ${renderMath(result.expectedAnswer)}</span>
      </div>
      ${warning ? `<p class="warning">${escapeHtml(warning)}</p>` : ''}
      <p>${escapeHtml(diagnosis)}</p>
      <div class="solution-view">
        <div>
          <h3>모범 풀이</h3>
          ${renderSolutionTree(result.solutionTree)}
        </div>
      </div>
    </section>
  `;

  mountSolutionWorkspace(container, result.solutionTree, problem);
}

export function renderSolutionTree(tree) {
  const outputs = flatten(tree);
  return `
    <div class="solution-block-layout">
      <div class="solution-workspace" data-solution-workspace></div>
      <ol class="step-notes">
        ${outputs.map((node) => `
          <li>
            <span class="step-label">${escapeHtml(label(node.type))}</span>
            <div class="step-math">${renderMath(node.expectedOutput ?? '')}</div>
          </li>
        `).join('')}
      </ol>
    </div>
  `;
}

function mountSolutionWorkspace(container, solutionTree, problem) {
  const target = container.querySelector('[data-solution-workspace]');
  if (!target || !problem) return;

  setBlockOptions(problem.blockOptions);
  const workspace = Blockly.inject(target, {
    readOnly: true,
    scrollbars: false,
    zoom: { controls: false, wheel: false, startScale: 0.75 },
    renderer: 'zelos',
  });
  Blockly.serialization.workspaces.load(createSolutionState(solutionTree, problem.blockOptions), workspace);
  workspace.resizeContents();
}

function label(type) {
  const labels = {
    definite_integral: '풀이 시작',
    complete_square: '완전제곱식',
    geometry_area: '도형 넓이',
    trig_substitution: '삼각치환',
    formula_lookup: '공식 적용',
    set_parts: '부분적분 설정',
    integrate_by_parts: '부분 적분법',
    transform_integrand: '식 변형',
    evaluate_bounds: '구간 대입',
    substitute: '치환',
    apply_power_rule: '거듭제곱 공식',
    simplify: '정리',
    add: '더하기',
    multiply: '곱하기',
    number_input: '숫자',
    variable: '변수',
  };
  return labels[type] ?? type;
}

function renderMath(value) {
  const str = String(value ?? '');
  if (!str) return '';
  if (str.includes('\\') || str.includes('^') || str.includes('_') || str.includes('{')) {
    try {
      return katex.renderToString(str, { throwOnError: false, displayMode: false });
    } catch {
      return escapeHtml(str);
    }
  }
  return escapeHtml(str);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
