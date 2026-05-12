import { describe, expect, it } from 'vitest';
import { workspaceToTree } from '../workspace/adapter.js';

describe('workspaceToTree', () => {
  it('converts serialized Blockly data into a solution tree', () => {
    const state = {
      blocks: {
        blocks: [
          {
            id: 'root',
            type: 'definite_integral',
            inputs: {
              STEPS: {
                block: {
                  id: 'multiply',
                  type: 'multiply',
                  fields: { COEFFICIENT: '2' },
                  inputs: {
                    STEPS: {
                      block: {
                        id: 'power',
                        type: 'apply_power_rule',
                        fields: { BASE: 'x', POWER: '1' },
                      },
                    },
                  },
                  next: { block: { id: 'simplify', type: 'simplify' } },
                },
              },
            },
          },
        ],
      },
    };

    const { tree, disconnectedCount } = workspaceToTree(state, { type: 'definite_integral' });

    expect(disconnectedCount).toBe(0);
    expect(tree).toEqual({
      blockId: 'root',
      type: 'definite_integral',
      params: {},
      children: [
        {
          blockId: 'multiply',
          type: 'multiply',
          params: { coefficient: '2' },
          children: [
            {
              blockId: 'power',
              type: 'apply_power_rule',
              params: { base: 'x', power: '1' },
              children: [],
            },
          ],
        },
        {
          blockId: 'simplify',
          type: 'simplify',
          params: {},
          children: [],
        },
      ],
    });
  });

  it('reports disconnected top-level blocks', () => {
    const state = {
      blocks: {
        blocks: [
          { id: 'root', type: 'definite_integral' },
          { id: 'loose', type: 'simplify' },
        ],
      },
    };

    expect(workspaceToTree(state, { type: 'definite_integral' }).disconnectedCount).toBe(1);
  });
});
