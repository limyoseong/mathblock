const labels = {
  definite_integral: '풀이 시작',
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

const categories = [
  {
    name: '공식 블록',
    colour: '#2563eb',
    types: ['definite_integral', 'formula_lookup', 'integrate_by_parts', 'apply_power_rule', 'geometry_area', 'trig_substitution'],
  },
  {
    name: '연산 블록',
    colour: '#16a34a',
    types: ['complete_square', 'set_parts', 'transform_integrand', 'evaluate_bounds', 'substitute', 'multiply', 'add', 'simplify'],
  },
  {
    name: '이 문제 블록',
    colour: '#dc2626',
    types: ['number_input', 'variable'],
  },
];

export function createToolbox(availableBlocks, blockOptions = {}) {
  return {
    kind: 'categoryToolbox',
    contents: categories.map((category) => ({
      kind: 'category',
      name: category.name,
      colour: category.colour,
      contents: category.types
        .filter((type) => availableBlocks.includes(type))
        .map((type) => ({
          kind: 'block',
          type,
          fields: defaultFields(type, blockOptions),
          extraState: { label: labels[type] },
        })),
    })),
  };
}

export function defaultFields(type, blockOptions = {}) {
  const options = blockOptions[type] ?? {};
  if (type === 'complete_square') {
    return { EXPRESSION: first(options.expressions, '3+2x-x^2'), RESULT: second(options.expressions, '4-(x-1)^2') };
  }
  if (type === 'geometry_area') return { SHAPE: first(options.shapes, '반원'), RADIUS: first(options.radius, '2') };
  if (type === 'trig_substitution') return { VARIABLE: first(options.variables, 'x-1'), EXPRESSION: first(options.expressions, '2sinθ') };
  if (type === 'formula_lookup') return { FORMULA: first(options.formulas, '공식') };
  if (type === 'set_parts') return { U: first(options.u, 'lnx'), DV: first(options.dv, 'dx') };
  if (type === 'transform_integrand') return { EXPRESSION: first(options.expressions, '식 변형') };
  if (type === 'evaluate_bounds') return { FROM: first(options.from, '0'), TO: first(options.to, '1') };
  if (type === 'multiply') return { COEFFICIENT: first(options.coefficients, '2') };
  if (type === 'apply_power_rule') return { BASE: first(options.bases, 'x'), POWER: first(options.powers, '1') };
  if (type === 'substitute') {
    return { VARIABLE: first(options.variables, 'x'), FROM: first(options.from, '0'), TO: first(options.to, '1') };
  }
  if (type === 'number_input') return { VALUE: first(options.values, '1') };
  if (type === 'variable') return { NAME: first(options.names, 'x') };
  return {};
}

function first(values, fallback) {
  return values?.[0] ?? fallback;
}

function second(values, fallback) {
  return values?.[1] ?? fallback;
}
