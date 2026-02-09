import React, { useState } from 'react';
import axios from 'axios';

function Consultation({ token, user, onLogout, onViewHistory }) {
  const [type, setType] = useState('saju');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const consultationTypes = [
    { value: 'saju', label: '사주 상담' },
    { value: 'worry', label: '고민 상담' },
    { value: 'tarot', label: '타로 상담' },
    { value: 'dream', label: '꿈 해몽' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setAnswer('');

    try {
      const response = await axios.post(
        '/api/consult',
        { type, question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer(response.data.answer);
      setQuestion('');
    } catch (err) {
      setError(err.response?.data?.error || '상담 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="user-info">
        <span>{user?.username}님 환영합니다</span>
        <button onClick={onLogout} className="logout-btn">
          로그아웃
        </button>
      </div>

      <div className="header">
        <h1>AI 상담 서비스</h1>
        <p>무엇이든 물어보세요</p>
      </div>

      <div className="nav-buttons">
        <button onClick={onViewHistory} className="btn btn-secondary btn-small">
          상담 이력 보기
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>상담 유형</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {consultationTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>질문 또는 고민</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="상담받고 싶은 내용을 자세히 적어주세요..."
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '상담 중...' : '상담 받기'}
        </button>
      </form>

      {answer && (
        <div className="answer-box">
          <h3>상담 결과</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Consultation;
