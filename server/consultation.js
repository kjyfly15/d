const db = require('./database');

// AI 상담 응답 생성 (실제로는 AI API를 사용할 수 있음)
function generateConsultation(type, question, userInfo) {
  const responses = {
    saju: [
      `${userInfo.username}님의 사주를 봤을 때, ${question}에 대한 답은 긍정적입니다. 현재 운세가 상승하는 시기이니 자신감을 가지고 도전하세요.`,
      `사주 팔자를 보니 ${question}과 관련하여 조심스러운 접근이 필요합니다. 서두르지 말고 천천히 준비하는 것이 좋겠습니다.`,
      `당신의 사주에는 재물운이 강하게 나타나고 있습니다. ${question}에 대해 재정적인 측면에서 좋은 기회가 올 수 있습니다.`,
    ],
    worry: [
      `${question}에 대한 고민은 많은 사람들이 겪는 일입니다. 현재 상황을 객관적으로 바라보고, 작은 것부터 하나씩 해결해 나가세요.`,
      `당신의 고민을 듣고 보니, 스스로에게 너무 많은 압박을 주고 있는 것 같습니다. 잠시 쉬어가며 마음을 정리하는 시간을 가져보세요.`,
      `이 고민은 당신이 성장하기 위한 과정입니다. ${question}에 대해 다른 사람의 조언을 구하고, 여러 관점에서 생각해보세요.`,
    ],
    tarot: [
      `타로 카드를 펼쳐보니 '별' 카드가 나왔습니다. ${question}에 대한 희망과 긍정적인 에너지가 느껴집니다. 당신의 소원이 이루어질 것입니다.`,
      `'탑' 카드가 나타났습니다. ${question}과 관련하여 예상치 못한 변화가 있을 수 있습니다. 하지만 이는 더 나은 미래를 위한 과정입니다.`,
      `'연인' 카드가 보입니다. ${question}에 대해 중요한 선택의 시기가 왔습니다. 마음의 소리에 귀 기울이세요.`,
    ],
    dream: [
      `${question}라는 꿈은 당신의 무의식이 보내는 메시지입니다. 새로운 시작이나 변화를 암시하는 것으로 해석됩니다.`,
      `이 꿈은 당신이 현재 겪고 있는 스트레스나 불안을 반영하는 것 같습니다. 휴식이 필요한 시기입니다.`,
      `꿈 해몽상 ${question}는 길몽입니다. 가까운 미래에 좋은 일이 생길 징조입니다.`,
    ],
  };

  const typeResponses = responses[type] || responses.worry;
  const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];

  return randomResponse;
}

// 상담 저장
function saveConsultation(userId, type, question, answer) {
  const stmt = db.prepare('INSERT INTO consultations (user_id, type, question, answer) VALUES (?, ?, ?, ?)');
  const result = stmt.run(userId, type, question, answer);
  return result.lastInsertRowid;
}

// 사용자의 상담 이력 조회
function getConsultationHistory(userId, limit = 10) {
  const stmt = db.prepare(`
    SELECT id, type, question, answer, created_at
    FROM consultations
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `);
  return stmt.all(userId, limit);
}

module.exports = { generateConsultation, saveConsultation, getConsultationHistory };
