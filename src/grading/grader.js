import { compareTrees, flatten } from './comparator.js';

export function gradeSolution(userTree, problem) {
  const comparison = compareTrees(userTree, problem.solutionTree);
  const userAnswer = comparison.match ? comparison.solutionTree.expectedOutput : inferUserAnswer(userTree);
  const correct = comparison.match && normalize(userAnswer) === normalize(problem.expectedAnswer);

  return {
    correct,
    userAnswer: userAnswer || '풀이 미완성',
    expectedAnswer: problem.expectedAnswer,
    comparison,
    solutionTree: comparison.solutionTree,
  };
}

function inferUserAnswer(userTree) {
  if (!userTree) return '';
  const lastMatchedNode = flatten(userTree).at(-1);
  return lastMatchedNode?.expectedOutput ?? '';
}

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, '').toLowerCase();
}
