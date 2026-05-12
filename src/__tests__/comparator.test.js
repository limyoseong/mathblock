import { describe, expect, it } from 'vitest';
import { compareTrees } from '../grading/comparator.js';

const solution = {
  type: 'definite_integral',
  children: [
    {
      type: 'multiply',
      params: { coefficient: '2' },
      children: [{ type: 'apply_power_rule', params: { base: 'x', power: '1' }, children: [] }],
    },
    { type: 'simplify', children: [] },
  ],
};

describe('compareTrees', () => {
  it('passes a matching tree', () => {
    expect(compareTrees(solution, solution).match).toBe(true);
  });

  it('finds the first middle divergence', () => {
    const result = compareTrees({
      ...solution,
      children: [
        { type: 'multiply', params: { coefficient: '3' }, children: [] },
      ],
    }, solution);

    expect(result.match).toBe(false);
    expect(result.firstDivergence.nodeIndex).toBe(2);
  });

  it('detects missing blocks', () => {
    const result = compareTrees({ type: 'definite_integral', children: [] }, solution);
    expect(result.missingBlocks).toBe(true);
    expect(result.firstDivergence.message).toContain('빠졌습니다');
  });

  it('detects extra blocks', () => {
    const result = compareTrees({
      ...solution,
      children: [...solution.children, { type: 'simplify', children: [] }],
    }, solution);
    expect(result.extraBlocks).toBe(true);
  });

  it('selects the most similar route when multiple solutions exist', () => {
    const alternative = { type: 'definite_integral', children: [{ type: 'variable', params: { name: 'x' }, children: [] }] };
    const result = compareTrees(solution, [alternative, solution]);
    expect(result.match).toBe(true);
    expect(result.solutionTree).toBe(solution);
  });
});
