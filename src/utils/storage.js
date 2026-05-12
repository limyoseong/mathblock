const STORAGE_KEY = 'mathblock-progress';

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function getProblemProgress(problemId) {
  const progress = loadProgress();
  return progress[problemId] ?? { solved: false, attempts: 0 };
}

export function recordAttempt(problemId, solved) {
  const progress = loadProgress();
  const current = progress[problemId] ?? { solved: false, attempts: 0 };
  progress[problemId] = {
    solved: current.solved || solved,
    attempts: current.attempts + 1,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress[problemId];
}
