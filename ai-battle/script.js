let running = false;
let timerId = null;

const state = {
  1: { score: 90, power: 1.2 },
  4: { score: 90, power: 1.0 }
};

const logs = [
  "ChatGPT: 戦略を再構築中…",
  "Copilot: コード最適化完了",
  "Codex: アルゴリズム強化",
  "Claude: 論理解析中…",
  "Base44: パターン推定を更新",
  "MetaAI: 推論フローを再調整",
  "Gemini: データ収集中…"
];

function addLog(text) {
  const box = document.getElementById("logBox");
  const p = document.createElement("p");
  const stamp = new Date().toLocaleTimeString("ja-JP", { hour12: false });
  p.textContent = `[${stamp}] ${text}`;
  box.prepend(p);
}

function randomLog() {
  const text = logs[Math.floor(Math.random() * logs.length)];
  addLog(text);
}

function draw() {
  [1, 4].forEach((team) => {
    document.getElementById(`score${team}`).textContent = state[team].score;
    const width = Math.max(0, Math.min(100, (state[team].score / 120) * 100));
    document.getElementById(`hp${team}`).style.width = `${width}%`;
  });
}

function updateScore() {
  if (!running) return;

  const delta1 = Math.floor(Math.random() * 3 * state[1].power);
  const delta4 = Math.floor(Math.random() * 3 * state[4].power);

  state[1].score += delta1;
  state[4].score += delta4;
  draw();

  if (state[1].score >= 120 || state[4].score >= 120) {
    running = false;
    clearInterval(timerId);
    announceWinner(state[1].score > state[4].score ? "Team OpenAI" : "Team Claude");
  }
}

function boost(team) {
  state[team].score += 5;
  draw();
  addLog(`審査員がチーム${team}を強化🔥 (+5)`);
}

function startBattle() {
  if (running) return;
  running = true;
  addLog("⚔️ バトル開始！");

  timerId = setInterval(() => {
    updateScore();
    randomLog();
  }, 1000);
}

function resetBattle() {
  running = false;
  clearInterval(timerId);
  state[1].score = 90;
  state[4].score = 90;
  draw();
  addLog("↺ バトルをリセットしました");
}

function announceWinner(name) {
  addLog(`🏆 勝者: ${name}`);
  document.body.classList.add("flash");
  setTimeout(() => document.body.classList.remove("flash"), 1000);
  alert(`勝者は ${name}！`);
}

draw();
