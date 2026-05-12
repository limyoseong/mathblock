export const problems = [
  {
    id: 'pdf-102-circle-area',
    title: '102. \\int_{-1}^{1}\\sqrt{3+2x-x^2}\\,dx 의 값을 구하시오.',
    subject: '미적분과 급수 - 삼각치환 적분',
    katex: '\\int_{-1}^{1}\\sqrt{3+2x-x^2}\\,dx',
    expectedAnswer: '\\pi',
    source: {
      pdf: '한아름 익힘책.pdf',
      solutionPdf: '한아름 익힘책_정답 및 해설.pdf',
      solutionPage: 21,
      problemNumber: '102',
    },
    availableBlocks: ['definite_integral', 'complete_square', 'geometry_area', 'trig_substitution', 'simplify', 'variable'],
    blockOptions: {
      complete_square: { expressions: ['3+2x-x^2', '4-(x-1)^2'] },
      geometry_area: { shapes: ['반원', '사분원'], radius: ['2'] },
      trig_substitution: { variables: ['x-1'], expressions: ['2sinθ'] },
      variable: { names: ['x', 'θ'] },
    },
    solutionTree: {
      type: 'definite_integral',
      prefilled: true,
      expectedOutput: '\\pi',
      children: [
        {
          type: 'complete_square',
          prefilled: true,
          params: { expression: '3+2x-x^2', result: '4-(x-1)^2' },
          expectedOutput: '\\int_{-1}^{1}\\sqrt{4-(x-1)^2}\\,dx',
          children: [],
        },
        {
          type: 'geometry_area',
          prefilled: false,
          params: { shape: '반원', radius: '2' },
          expectedOutput: '반지름 2인 반원의 넓이',
          children: [],
        },
        {
          type: 'simplify',
          prefilled: true,
          expectedOutput: '\\frac{4\\pi}{4}=\\pi',
          children: [],
        },
      ],
    },
  },
  {
    id: 'pdf-103-inverse-trig',
    title: '103. \\int\\left(\\frac{1}{2\\sqrt{1-x^2}}-\\frac{3}{1+x^2}\\right)dx 를 구하시오.',
    subject: '미적분과 급수 - 역삼각함수 적분',
    katex: '\\int\\left(\\frac{1}{2\\sqrt{1-x^2}}-\\frac{3}{1+x^2}\\right)dx',
    expectedAnswer: '2\\sin^{-1}x-3\\tan^{-1}x+C',
    source: {
      pdf: '한아름 익힘책.pdf',
      solutionPdf: '한아름 익힘책_정답 및 해설.pdf',
      solutionPage: 21,
      problemNumber: '103',
    },
    availableBlocks: ['definite_integral', 'formula_lookup', 'multiply', 'add', 'simplify', 'variable'],
    blockOptions: {
      formula_lookup: {
        formulas: ['\\int\\frac{1}{\\sqrt{1-x^2}}dx=\\sin^{-1}x', '\\int\\frac{1}{1+x^2}dx=\\tan^{-1}x'],
      },
      multiply: { coefficients: ['1/2', '-3'] },
      variable: { names: ['x', 'C'] },
    },
    solutionTree: {
      type: 'definite_integral',
      prefilled: true,
      expectedOutput: '2\\sin^{-1}x-3\\tan^{-1}x+C',
      children: [
        {
          type: 'add',
          prefilled: true,
          expectedOutput: '\\frac{1}{2}\\int\\frac{dx}{\\sqrt{1-x^2}}-3\\int\\frac{dx}{1+x^2}',
          children: [
            {
              type: 'formula_lookup',
              prefilled: false,
              params: { formula: '\\int\\frac{1}{\\sqrt{1-x^2}}dx=\\sin^{-1}x' },
              expectedOutput: '2\\sin^{-1}x',
              children: [],
            },
            {
              type: 'formula_lookup',
              prefilled: false,
              params: { formula: '\\int\\frac{1}{1+x^2}dx=\\tan^{-1}x' },
              expectedOutput: '-3\\tan^{-1}x',
              children: [],
            },
          ],
        },
        {
          type: 'simplify',
          prefilled: true,
          expectedOutput: '2\\sin^{-1}x-3\\tan^{-1}x+C',
          children: [],
        },
      ],
    },
  },
  {
    id: 'pdf-117-parts-x2lnx',
    title: '117. \\int_{1}^{e}x^2\\ln x\\,dx 의 값을 구하시오.',
    subject: '미적분과 급수 - 부분 적분법',
    katex: '\\int_{1}^{e}x^2\\ln x\\,dx',
    expectedAnswer: '\\frac{2e^3}{9}+\\frac{1}{9}',
    source: {
      pdf: '한아름 익힘책.pdf',
      solutionPdf: '한아름 익힘책_정답 및 해설.pdf',
      solutionPage: 24,
      problemNumber: '117',
    },
    availableBlocks: ['definite_integral', 'set_parts', 'integrate_by_parts', 'evaluate_bounds', 'simplify', 'variable'],
    blockOptions: {
      set_parts: { u: ['lnx'], dv: ['x^2dx'] },
      evaluate_bounds: { from: ['1'], to: ['e'] },
      variable: { names: ['x', 'e'] },
    },
    solutionTree: {
      type: 'definite_integral',
      prefilled: true,
      expectedOutput: '\\frac{2e^3}{9}+\\frac{1}{9}',
      children: [
        {
          type: 'set_parts',
          prefilled: false,
          params: { u: 'lnx', dv: 'x^2dx' },
          expectedOutput: 'u=\\ln x,\\quad dv=x^2dx',
          children: [],
        },
        {
          type: 'integrate_by_parts',
          prefilled: true,
          expectedOutput: '\\left[\\frac{1}{3}x^3\\ln x\\right]_1^e-\\frac{1}{3}\\int_1^e x^2dx',
          children: [],
        },
        {
          type: 'evaluate_bounds',
          prefilled: false,
          params: { from: '1', to: 'e' },
          expectedOutput: '\\frac{1}{3}e^3-\\frac{1}{9}(e^3-1)',
          children: [],
        },
        {
          type: 'simplify',
          prefilled: true,
          expectedOutput: '\\frac{2e^3}{9}+\\frac{1}{9}',
          children: [],
        },
      ],
    },
  },
  {
    id: 'pdf-118-parts-lnx-square',
    title: '118. \\int_{1}^{e}(\\ln x)^2\\,dx 의 값을 구하시오.',
    subject: '미적분과 급수 - 부분 적분법',
    katex: '\\int_{1}^{e}(\\ln x)^2\\,dx',
    expectedAnswer: 'e-2',
    source: {
      pdf: '한아름 익힘책.pdf',
      solutionPdf: '한아름 익힘책_정답 및 해설.pdf',
      solutionPage: 24,
      problemNumber: '118',
    },
    availableBlocks: ['definite_integral', 'set_parts', 'integrate_by_parts', 'evaluate_bounds', 'simplify', 'variable'],
    blockOptions: {
      set_parts: { u: ['(lnx)^2', 'lnx'], dv: ['dx'] },
      evaluate_bounds: { from: ['1'], to: ['e'] },
      variable: { names: ['x', 'e'] },
    },
    solutionTree: {
      type: 'definite_integral',
      prefilled: true,
      expectedOutput: 'e-2',
      children: [
        {
          type: 'set_parts',
          prefilled: false,
          params: { u: '(lnx)^2', dv: 'dx' },
          expectedOutput: "f=(\\ln x)^2,\\quad g'=1",
          children: [],
        },
        {
          type: 'integrate_by_parts',
          prefilled: true,
          expectedOutput: '[x(\\ln x)^2]_1^e-2\\int_1^e\\ln x\\,dx',
          children: [],
        },
        {
          type: 'set_parts',
          prefilled: false,
          params: { u: 'lnx', dv: 'dx' },
          expectedOutput: "f=\\ln x,\\quad g'=1",
          children: [],
        },
        {
          type: 'evaluate_bounds',
          prefilled: true,
          params: { from: '1', to: 'e' },
          expectedOutput: 'e-2[x\\ln x-x]_1^e',
          children: [],
        },
        {
          type: 'simplify',
          prefilled: true,
          expectedOutput: 'e-2',
          children: [],
        },
      ],
    },
  },
  {
    id: 'pdf-119-parts-arctan',
    title: '119. \\int_{0}^{\\sqrt3}x\\tan^{-1}x\\,dx 의 값을 구하시오.',
    subject: '미적분과 급수 - 부분 적분법',
    katex: '\\int_{0}^{\\sqrt3}x\\tan^{-1}x\\,dx',
    expectedAnswer: '\\frac{\\pi}{3}-\\frac{\\sqrt3}{2}',
    source: {
      pdf: '한아름 익힘책.pdf',
      solutionPdf: '한아름 익힘책_정답 및 해설.pdf',
      solutionPage: 24,
      problemNumber: '119',
    },
    availableBlocks: ['definite_integral', 'set_parts', 'integrate_by_parts', 'transform_integrand', 'evaluate_bounds', 'simplify', 'variable'],
    blockOptions: {
      set_parts: { u: ['tan^-1x'], dv: ['x dx'] },
      transform_integrand: { expressions: ['x^2/(1+x^2)=1-1/(1+x^2)'] },
      evaluate_bounds: { from: ['0'], to: ['sqrt3'] },
      variable: { names: ['x'] },
    },
    solutionTree: {
      type: 'definite_integral',
      prefilled: true,
      expectedOutput: '\\frac{\\pi}{3}-\\frac{\\sqrt3}{2}',
      children: [
        {
          type: 'set_parts',
          prefilled: false,
          params: { u: 'tan^-1x', dv: 'x dx' },
          expectedOutput: "u=\\tan^{-1}x,\\quad dv=x\\,dx",
          children: [],
        },
        {
          type: 'integrate_by_parts',
          prefilled: true,
          expectedOutput: '\\left[\\frac{1}{2}x^2\\tan^{-1}x\\right]_0^{\\sqrt3}-\\frac{1}{2}\\int_0^{\\sqrt3}\\frac{x^2}{1+x^2}dx',
          children: [],
        },
        {
          type: 'transform_integrand',
          prefilled: false,
          params: { expression: 'x^2/(1+x^2)=1-1/(1+x^2)' },
          expectedOutput: '\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}',
          children: [],
        },
        {
          type: 'evaluate_bounds',
          prefilled: true,
          params: { from: '0', to: 'sqrt3' },
          expectedOutput: '\\frac{\\pi}{2}-\\frac{1}{2}(\\sqrt3-\\frac{\\pi}{3})',
          children: [],
        },
        {
          type: 'simplify',
          prefilled: true,
          expectedOutput: '\\frac{\\pi}{3}-\\frac{\\sqrt3}{2}',
          children: [],
        },
      ],
    },
  },
];

export function getProblem(problemId) {
  return problems.find((problem) => problem.id === problemId) ?? problems[0];
}

export function getPrimarySolution(problem) {
  return Array.isArray(problem.solutionTree) ? problem.solutionTree[0] : problem.solutionTree;
}
