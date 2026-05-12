import { describe, expect, it } from 'vitest';
import { createToolbox } from '../blocks/toolbox.js';
import { problems } from '../data/problems.js';
import { createPrefilledState } from '../workspace/setup.js';
import { renderSolutionTree } from '../ui/result-panel.js';

describe('AGENTS.md revision requirements', () => {
  it('uses PDF-derived problem metadata with per-problem block options', () => {
    expect(problems).toHaveLength(5);
    expect(problems.every((problem) => problem.source?.pdf && problem.source?.solutionPage)).toBe(true);
    expect(problems.every((problem) => problem.blockOptions && Object.keys(problem.blockOptions).length > 0)).toBe(true);
  });

  it('separates toolbox blocks into formula, operation, and problem-specific categories', () => {
    const toolbox = createToolbox(['definite_integral', 'substitute', 'variable'], {
      variable: { names: ['x'] },
    });

    expect(toolbox.contents.map((category) => category.name)).toEqual(['공식 블록', '연산 블록', '이 문제 블록']);
  });

  it('creates a partial prefilled workspace state from solutionTree flags', () => {
    const state = createPrefilledState(problems[0]);
    const serialized = JSON.stringify(state);

    expect(serialized).toContain('"type":"definite_integral"');
    expect(serialized).not.toContain('"type":"geometry_area"');
  });

  it('renders model solutions as a Blockly workspace container', () => {
    expect(renderSolutionTree(problems[0].solutionTree)).toContain('solution-workspace');
  });
});
