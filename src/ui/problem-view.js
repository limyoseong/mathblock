import katex from 'katex';
import { gradeSolution } from '../grading/grader.js';
import { workspaceToTree } from '../workspace/adapter.js';
import { resetWorkspace, setupWorkspace } from '../workspace/setup.js';
import { recordAttempt } from '../utils/storage.js';
import { getBlockColour } from '../blocks/definitions.js';
import { renderResultPanel } from './result-panel.js';

let workspace = null;

export function renderProblemView(container, problem, nextProblem) {
  container.innerHTML = `
    <main class="app-shell problem-shell">
      <header class="topbar compact">
        <a class="back-link" href="#list">목록으로</a>
        <div>
          <p class="eyebrow">${problem.subject}</p>
          <h1 data-problem-katex></h1>
        </div>
      </header>
      <section class="work-area">
        <div class="workspace-panel">
          <div id="blocklyArea"></div>
          <div id="blocklyDiv"></div>
        </div>
        <aside class="side-panel">
          <div class="actions">
            <button id="runButton" type="button">실행</button>
            <button id="retryButton" type="button">다시 도전</button>
            ${nextProblem ? `<a class="button-link" id="nextButton" href="#problem/${nextProblem.id}" hidden>다음 문제</a>` : ''}
          </div>
          <div id="resultPanel"></div>
        </aside>
      </section>
    </main>
  `;

  katex.render(problem.katex, container.querySelector('[data-problem-katex]'), { throwOnError: false });

  const blocklyDiv = container.querySelector('#blocklyDiv');
  workspace = setupWorkspace(blocklyDiv, problem);
  renderResultPanel(container.querySelector('#resultPanel'), null, '', problem);

  container.querySelector('#runButton').addEventListener('click', () => run(problem, container));
  container.querySelector('#retryButton').addEventListener('click', () => {
    resetWorkspace(workspace, problem);
    renderResultPanel(container.querySelector('#resultPanel'), null, '', problem);
  });
}

function run(problem, container) {
  resetBlockHighlights();
  const { tree, disconnectedCount } = workspaceToTree(workspace, problem.solutionTree);
  const result = gradeSolution(tree, problem);
  const warning = disconnectedCount > 0 ? '연결되지 않은 블록이 있습니다. 채점에서는 연결된 풀이만 확인합니다.' : '';

  if (tree) {
    recordAttempt(problem.id, result.correct);
  }

  if (!result.correct && result.comparison.firstDivergence?.userNode?.blockId) {
    const block = workspace.getBlockById(result.comparison.firstDivergence.userNode.blockId);
    block?.setColour('#dc2626');
    block?.select();
  }

  renderResultPanel(container.querySelector('#resultPanel'), result, warning, problem);

  const nextButton = container.querySelector('#nextButton');
  if (nextButton) {
    nextButton.hidden = !result.correct;
  }
}

function resetBlockHighlights() {
  workspace.getAllBlocks(false).forEach((block) => {
    block.setColour(getBlockColour(block.type));
  });
}
