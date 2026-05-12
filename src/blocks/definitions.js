import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

const colours = {
  definite_integral: 225,
  complete_square: 180,
  geometry_area: 210,
  trig_substitution: 260,
  formula_lookup: 165,
  set_parts: 275,
  integrate_by_parts: 300,
  transform_integrand: 190,
  evaluate_bounds: 45,
  substitute: 275,
  apply_power_rule: 165,
  simplify: 120,
  add: 20,
  multiply: 45,
  number_input: 330,
  variable: 300,
};

const dynamicTypes = Object.keys(colours);
let currentBlockOptions = {};

export function setBlockOptions(blockOptions = {}) {
  currentBlockOptions = blockOptions;
}

export function getBlockColour(type) {
  return colours[type] ?? 225;
}

export function registerBlocks() {
  dynamicTypes.forEach((type) => {
    Blockly.Blocks[type] = {
      init() {
        buildBlock(this, type);
      },
    };
    javascriptGenerator.forBlock[type] = () => '';
  });
}

function buildBlock(block, type) {
  block.setColour(getBlockColour(type));
  block.setTooltip(tooltip(type));

  if (type === 'definite_integral') {
    block.appendStatementInput('STEPS').appendField('풀이 시작');
    return;
  }

  if (type === 'complete_square') {
    block.appendDummyInput()
      .appendField('완전제곱식')
      .appendField(dropdown(type, 'expressions', '3+2x-x^2'), 'EXPRESSION')
      .appendField('→')
      .appendField(dropdown(type, 'expressions', '4-(x-1)^2'), 'RESULT');
  } else if (type === 'geometry_area') {
    block.appendDummyInput()
      .appendField('도형 넓이')
      .appendField(dropdown(type, 'shapes', '반원'), 'SHAPE')
      .appendField('반지름')
      .appendField(dropdown(type, 'radius', '2'), 'RADIUS');
  } else if (type === 'trig_substitution') {
    block.appendDummyInput()
      .appendField('삼각치환')
      .appendField(dropdown(type, 'variables', 'x-1'), 'VARIABLE')
      .appendField('=')
      .appendField(dropdown(type, 'expressions', '2sinθ'), 'EXPRESSION');
  } else if (type === 'formula_lookup') {
    block.appendDummyInput()
      .appendField('공식 적용')
      .appendField(dropdown(type, 'formulas', '공식'), 'FORMULA');
  } else if (type === 'set_parts') {
    block.appendDummyInput()
      .appendField('부분적분 설정 u=')
      .appendField(dropdown(type, 'u', 'lnx'), 'U')
      .appendField('dv=')
      .appendField(dropdown(type, 'dv', 'dx'), 'DV');
  } else if (type === 'integrate_by_parts') {
    block.appendDummyInput().appendField('부분 적분법 적용');
  } else if (type === 'transform_integrand') {
    block.appendDummyInput()
      .appendField('식 변형')
      .appendField(dropdown(type, 'expressions', '식 변형'), 'EXPRESSION');
  } else if (type === 'evaluate_bounds') {
    block.appendDummyInput()
      .appendField('구간 대입')
      .appendField(dropdown(type, 'from', '0'), 'FROM')
      .appendField('→')
      .appendField(dropdown(type, 'to', '1'), 'TO');
  } else if (type === 'substitute') {
    block.appendDummyInput()
      .appendField('치환')
      .appendField(dropdown(type, 'variables', 'x'), 'VARIABLE')
      .appendField('=')
      .appendField(dropdown(type, 'from', '0'), 'FROM')
      .appendField('에서')
      .appendField(dropdown(type, 'to', '1'), 'TO');
  } else if (type === 'apply_power_rule') {
    block.appendDummyInput()
      .appendField('거듭제곱 공식')
      .appendField(dropdown(type, 'bases', 'x'), 'BASE')
      .appendField('^')
      .appendField(dropdown(type, 'powers', '1'), 'POWER');
  } else if (type === 'simplify') {
    block.appendDummyInput().appendField('정리하기');
  } else if (type === 'add') {
    block.appendStatementInput('LEFT').appendField('더하기 왼쪽');
    block.appendStatementInput('RIGHT').appendField('오른쪽');
  } else if (type === 'multiply') {
    block.appendStatementInput('STEPS')
      .appendField('계수')
      .appendField(dropdown(type, 'coefficients', '2'), 'COEFFICIENT')
      .appendField('곱하기');
  } else if (type === 'number_input') {
    block.appendDummyInput().appendField('숫자').appendField(dropdown(type, 'values', '1'), 'VALUE');
  } else if (type === 'variable') {
    block.appendDummyInput().appendField('변수').appendField(dropdown(type, 'names', 'x'), 'NAME');
  }

  block.setPreviousStatement(true);
  block.setNextStatement(true);
}

function dropdown(type, optionKey, fallback) {
  const values = currentBlockOptions[type]?.[optionKey] ?? [fallback];
  const normalized = values.length ? values : [fallback];
  return new Blockly.FieldDropdown(normalized.map((value) => [String(value), String(value)]));
}

function tooltip(type) {
  const tooltips = {
    definite_integral: '풀이의 시작 블록입니다.',
    complete_square: '근호 안 식을 완전제곱식으로 바꿉니다.',
    geometry_area: '정적분을 도형의 넓이로 해석합니다.',
    trig_substitution: '삼각치환을 적용합니다.',
    formula_lookup: '표준 적분 공식을 적용합니다.',
    set_parts: '부분적분에서 u와 dv를 정합니다.',
    integrate_by_parts: '부분 적분법을 전개합니다.',
    transform_integrand: '적분하기 쉬운 형태로 식을 바꿉니다.',
    evaluate_bounds: '정적분 구간 값을 대입합니다.',
    substitute: '값이나 변수를 대입합니다.',
    apply_power_rule: 'x^n 적분 규칙을 적용합니다.',
    simplify: '계산식을 정리합니다.',
    add: '두 풀이 항을 더합니다.',
    multiply: '상수 계수를 곱합니다.',
    number_input: '문제에 필요한 숫자 값입니다.',
    variable: '문제에 필요한 변수입니다.',
  };
  return tooltips[type] ?? '';
}
