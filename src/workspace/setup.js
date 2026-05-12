import * as Blockly from 'blockly';
import { setBlockOptions } from '../blocks/definitions.js';
import { createToolbox } from '../blocks/toolbox.js';
import { getPrimarySolution } from '../data/problems.js';

export function setupWorkspace(container, problem) {
  setBlockOptions(problem.blockOptions);
  const workspace = Blockly.inject(container, {
    toolbox: createToolbox(problem.availableBlocks, problem.blockOptions),
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.3, minScale: 0.6 },
    renderer: 'zelos',
  });

  loadPrefilledBlocks(workspace, problem);
  return workspace;
}

export function loadPrefilledBlocks(workspace, problem) {
  workspace.clear();
  setBlockOptions(problem.blockOptions);
  Blockly.serialization.workspaces.load(createPrefilledState(problem), workspace);
  lockPrefilledBlocks(workspace);
}

export function createPrefilledState(problem) {
  const solution = getPrimarySolution(problem);
  return {
    blocks: {
      languageVersion: 0,
      blocks: [treeToBlockState(solution, problem.blockOptions, { prefilledOnly: true, x: 40, y: 40 })],
    },
  };
}

export function createSolutionState(solutionTree, blockOptions = {}) {
  return {
    blocks: {
      languageVersion: 0,
      blocks: [treeToBlockState(solutionTree, blockOptions, { prefilledOnly: false, x: 20, y: 20 })],
    },
  };
}

export function resetWorkspace(workspace, problem) {
  loadPrefilledBlocks(workspace, problem);
}

function treeToBlockState(node, blockOptions, options) {
  const block = {
    type: node.type,
    id: node.blockId,
    fields: paramsToFields(node.type, node.params ?? {}, blockOptions),
  };

  if (options.x !== undefined) block.x = options.x;
  if (options.y !== undefined) block.y = options.y;

  const visibleChildren = (node.children ?? []).filter((child) => !options.prefilledOnly || child.prefilled !== false);
  const nested = visibleChildren.filter((child) => hasNestedInput(node.type));
  const stack = visibleChildren.filter((child) => !hasNestedInput(node.type));

  if (nested.length) {
    block.inputs = nested.reduce((inputs, child, index) => {
      inputs[inputName(node.type, index)] = { block: treeToBlockState(child, blockOptions, { ...options, x: undefined, y: undefined }) };
      return inputs;
    }, {});
  }

  const sequential = stack.map((child) => treeToBlockState(child, blockOptions, { ...options, x: undefined, y: undefined }));
  if (sequential.length) {
    block.inputs = block.inputs ?? {};
    block.inputs.STEPS = { block: linkStack(sequential) };
  }

  return block;
}

function linkStack(blocks) {
  const [first, ...rest] = blocks;
  let cursor = first;
  rest.forEach((block) => {
    cursor.next = { block };
    cursor = block;
  });
  return first;
}

function hasNestedInput(type) {
  return ['definite_integral', 'multiply', 'add'].includes(type);
}

function inputName(type, index) {
  if (type === 'add') return index === 0 ? 'LEFT' : 'RIGHT';
  return 'STEPS';
}

function lockPrefilledBlocks(workspace) {
  workspace.getAllBlocks(false).forEach((block) => {
    block.setDeletable(false);
    block.setMovable(false);
  });
}

function paramsToFields(type, params, blockOptions) {
  if (type === 'complete_square') return { EXPRESSION: params.expression, RESULT: params.result };
  if (type === 'geometry_area') return { SHAPE: params.shape, RADIUS: params.radius };
  if (type === 'trig_substitution') return { VARIABLE: params.variable, EXPRESSION: params.expression };
  if (type === 'formula_lookup') return { FORMULA: params.formula };
  if (type === 'set_parts') return { U: params.u, DV: params.dv };
  if (type === 'transform_integrand') return { EXPRESSION: params.expression };
  if (type === 'evaluate_bounds') return { FROM: params.from, TO: params.to };
  if (type === 'substitute') return { VARIABLE: params.variable, FROM: params.from, TO: params.to };
  if (type === 'apply_power_rule') return { BASE: params.base, POWER: params.power };
  if (type === 'multiply') return { COEFFICIENT: params.coefficient ?? blockOptions.multiply?.coefficients?.[0] };
  if (type === 'number_input') return { VALUE: params.value };
  if (type === 'variable') return { NAME: params.name };
  return {};
}
