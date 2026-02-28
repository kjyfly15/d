import React, { useState } from 'react';
import axios from 'axios';
import History from './History';

function Consultation() {
  const [type, setType] = useState('saju');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

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
      console.log('상담 시도:', { type, question });
      const response = await axios.post('/api/consult', { type, question });
      console.log('상담 성공:', response.data);
      setAnswer(response.data.answer);
      setQuestion('');
    } catch (err) {
      console.error('상담 에러:', err);
      console.error('에러 상세:', err.response);
      const errorMessage = err.response?.data?.error || err.message || '상담 요청에 실패했습니다.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (showHistory) {
    return <History onBack={() => setShowHistory(false)} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>AI 상담 서비스</h1>
        <p>무엇이든 물어보세요</p>
      </div>

      <div className="nav-buttons">
        <button onClick={() => setShowHistory(true)} className="btn btn-secondary btn-small">
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
