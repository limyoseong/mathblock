import { describe, expect, it } from 'vitest';
import { gradeSolution } from '../grading/grader.js';

const problem = {
  expectedAnswer: 'x^2 + C',
  solutionTree: {
    type: 'definite_integral',
    expectedOutput: 'x^2 + C',
    children: [{ type: 'simplify', expectedOutput: 'x^2 + C', children: [] }],
  },
};

describe('gradeSolution', () => {
  it('marks a matching solution correct', () => {
    expect(gradeSolution(problem.solutionTree, problem).correct).toBe(true);
  });

  it('returns model data for an incorrect solution', () => {
    const result = gradeSolution({ type: 'definite_integral', children: [] }, problem);
    expect(result.correct).toBe(false);
    expect(result.expectedAnswer).toBe('x^2 + C');
    expect(result.solutionTree).toBe(problem.solutionTree);
  });
});
