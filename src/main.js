import 'katex/dist/katex.min.css';
import * as Blockly from 'blockly';
import { registerBlocks } from './blocks/definitions.js';
import { getProblem, problems } from './data/problems.js';
import { renderProblemList } from './ui/problem-list.js';
import { renderProblemView } from './ui/problem-view.js';
import './styles.css';

registerBlocks();
Blockly.setLocale({});

const app = document.querySelector('#app');

function route() {
  const hash = window.location.hash || '#list';
  if (hash.startsWith('#problem/')) {
    const problemId = hash.replace('#problem/', '');
    const problem = getProblem(problemId);
    const index = problems.findIndex((item) => item.id === problem.id);
    renderProblemView(app, problem, problems[index + 1]);
    return;
  }

  renderProblemList(app);
}

window.addEventListener('hashchange', route);
route();
