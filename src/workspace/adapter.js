const INPUT_ORDER = ['STEPS', 'INPUT', 'LEFT', 'RIGHT'];

export function workspaceToTree(workspaceOrState, solutionTree) {
  const state = typeof workspaceOrState?.getTopBlocks === 'function'
    ? workspaceToSerialization(workspaceOrState)
    : workspaceOrState;

  const blocks = state?.blocks?.blocks ?? [];
  const solutionRootTypes = new Set(asArray(solutionTree).map((tree) => tree.type));
  const roots = blocks.filter((block) => !block.next && solutionRootTypes.has(block.type));
  const fallbackRoots = blocks.filter((block) => !block.next);
  const rootBlock = roots[0] ?? fallbackRoots[0];
  const disconnectedCount = Math.max(0, fallbackRoots.length - (rootBlock ? 1 : 0));

  if (!rootBlock) {
    return { tree: null, disconnectedCount };
  }

  return {
    tree: convertBlock(rootBlock),
    disconnectedCount,
  };
}

function workspaceToSerialization(workspace) {
  const blocks = workspace.getTopBlocks(false).map((block) => serializeLiveBlock(block));
  return { blocks: { blocks } };
}

function serializeLiveBlock(block) {
  const record = {
    id: block.id,
    type: block.type,
    fields: {},
    inputs: {},
  };

  block.inputList.forEach((input) => {
    if (input.connection?.targetBlock()) {
      record.inputs[input.name] = { block: serializeLiveBlock(input.connection.targetBlock()) };
    }
  });

  block.inputList.forEach((input) => {
    input.fieldRow.forEach((field) => {
      if (field.name) {
        record.fields[field.name] = field.getValue();
      }
    });
  });

  if (block.getNextBlock()) {
    record.next = { block: serializeLiveBlock(block.getNextBlock()) };
  }

  return record;
}

function convertBlock(block) {
  const children = [];
  INPUT_ORDER.forEach((inputName) => {
    const inputBlock = block.inputs?.[inputName]?.block;
    if (inputBlock) {
      children.push(...convertStack(inputBlock));
    }
  });

  return {
    blockId: block.id,
    type: block.type,
    params: normalizeFields(block.type, block.fields ?? {}),
    children,
  };
}

function convertStack(block) {
  const nodes = [];
  let cursor = block;

  while (cursor) {
    nodes.push(convertBlock(cursor));
    cursor = cursor.next?.block;
  }

  return nodes;
}

function normalizeFields(type, fields) {
  if (type === 'complete_square') return { expression: String(fields.EXPRESSION ?? ''), result: String(fields.RESULT ?? '') };
  if (type === 'geometry_area') return { shape: String(fields.SHAPE ?? ''), radius: String(fields.RADIUS ?? '') };
  if (type === 'trig_substitution') return { variable: String(fields.VARIABLE ?? ''), expression: String(fields.EXPRESSION ?? '') };
  if (type === 'formula_lookup') return { formula: String(fields.FORMULA ?? '') };
  if (type === 'set_parts') return { u: String(fields.U ?? ''), dv: String(fields.DV ?? '') };
  if (type === 'transform_integrand') return { expression: String(fields.EXPRESSION ?? '') };
  if (type === 'evaluate_bounds') return { from: String(fields.FROM ?? ''), to: String(fields.TO ?? '') };
  if (type === 'multiply') return { coefficient: String(fields.COEFFICIENT ?? '2') };
  if (type === 'apply_power_rule') return { base: String(fields.BASE ?? 'x'), power: String(fields.POWER ?? '1') };
  if (type === 'substitute') {
    return {
      variable: String(fields.VARIABLE ?? 'x'),
      from: String(fields.FROM ?? '0'),
      to: String(fields.TO ?? '1'),
    };
  }
  if (type === 'number_input') return { value: String(fields.VALUE ?? '1') };
  if (type === 'variable') return { name: String(fields.NAME ?? 'x') };
  return {};
}

function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
