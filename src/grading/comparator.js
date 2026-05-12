export function compareTrees(userTree, solutionTree) {
  if (!userTree) {
    return {
      match: false,
      score: 0,
      firstDivergence: { nodeIndex: 1, message: '블록을 배치해 주세요.' },
      missingBlocks: true,
      extraBlocks: false,
      solutionTree: firstSolution(solutionTree),
    };
  }

  const candidates = asArray(solutionTree).map((tree) => compareSingleTree(userTree, tree));
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0];
}

function compareSingleTree(userTree, solutionTree) {
  const userNodes = flatten(userTree);
  const solutionNodes = flatten(solutionTree);
  let score = 0;

  for (let index = 0; index < Math.max(userNodes.length, solutionNodes.length); index += 1) {
    const userNode = userNodes[index];
    const expectedNode = solutionNodes[index];
    const nodeIndex = index + 1;

    if (!userNode) {
      return {
        match: false,
        score,
        firstDivergence: {
          nodeIndex,
          userNode: null,
          expectedNode,
          message: `${nodeIndex}번째 단계부터 블록이 빠졌습니다.`,
        },
        missingBlocks: true,
        extraBlocks: false,
        solutionTree,
      };
    }

    if (!expectedNode) {
      return {
        match: false,
        score,
        firstDivergence: {
          nodeIndex,
          userNode,
          expectedNode: null,
          message: `${nodeIndex}번째 단계에 불필요한 블록이 추가되었습니다.`,
        },
        missingBlocks: false,
        extraBlocks: true,
        solutionTree,
      };
    }

    if (!sameNode(userNode, expectedNode)) {
      return {
        match: false,
        score,
        firstDivergence: {
          nodeIndex,
          userNode,
          expectedNode,
          message: `${nodeIndex}번째 단계에서 ${label(expectedNode.type)} 대신 ${label(userNode.type)} 블록을 사용했습니다.`,
        },
        missingBlocks: false,
        extraBlocks: false,
        solutionTree,
      };
    }

    score += 1;
  }

  return {
    match: true,
    score,
    firstDivergence: null,
    missingBlocks: false,
    extraBlocks: false,
    solutionTree,
  };
}

function sameNode(userNode, expectedNode) {
  return userNode.type === expectedNode.type && sameParams(userNode.params ?? {}, expectedNode.params ?? {});
}

function sameParams(userParams, expectedParams) {
  const expectedEntries = Object.entries(expectedParams);
  return expectedEntries.every(([key, value]) => String(userParams[key]) === String(value));
}

export function flatten(tree) {
  if (!tree) return [];
  return [tree, ...(tree.children ?? []).flatMap((child) => flatten(child))];
}

function asArray(value) {
  return Array.isArray(value) ? value : [value];
}

function firstSolution(value) {
  return Array.isArray(value) ? value[0] : value;
}

function label(type) {
  const labels = {
    definite_integral: '적분',
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
