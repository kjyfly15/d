const express = require('express');
const cors = require('cors');
const { signup, login, verifyToken } = require('./auth');
const { generateConsultation, saveConsultation, getConsultationHistory } = require('./consultation');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1'; // localhost만 허용

// CORS 설정: localhost에서만 접근 허용
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// 회원가입
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '사용자명과 비밀번호를 입력해주세요.' });
  }

  const result = signup(username, password);
  if (result.success) {
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } else {
    return res.status(400).json({ error: result.error });
  }
});

// 로그인
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '사용자명과 비밀번호를 입력해주세요.' });
  }

  const result = login(username, password);
  if (result.success) {
    return res.json({ token: result.token, user: result.user });
  } else {
    return res.status(401).json({ error: result.error });
  }
});

// 상담 요청 (로그인 필요)
app.post('/api/consult', verifyToken, (req, res) => {
  const { type, question } = req.body;

  if (!type || !question) {
    return res.status(400).json({ error: '상담 유형과 질문을 입력해주세요.' });
  }

  const answer = generateConsultation(type, question, req.user);
  const consultationId = saveConsultation(req.user.userId, type, question, answer);

  res.json({ consultationId, answer });
});

// 상담 이력 조회 (로그인 필요)
app.get('/api/history', verifyToken, (req, res) => {
  const history = getConsultationHistory(req.user.userId);
  res.json(history);
});

// 서버 상태 확인
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// localhost(127.0.0.1)에서만 접속 가능하도록 바인딩
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
  console.log('외부 접속 차단: localhost에서만 접근 가능');
});
