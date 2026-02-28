const express = require('express');
const cors = require('cors');
const { generateConsultation, saveConsultation, getConsultationHistory } = require('./consultation');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 상담 요청
app.post('/api/consult', (req, res) => {
  const { type, question } = req.body;

  if (!type || !question) {
    return res.status(400).json({ error: '상담 유형과 질문을 입력해주세요.' });
  }

  const answer = generateConsultation(type, question);
  const consultationId = saveConsultation(type, question, answer);

  res.json({ consultationId, answer });
});

// 상담 이력 조회
app.get('/api/history', (req, res) => {
  const history = getConsultationHistory();
  res.json(history);
});

// 서버 상태 확인
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
