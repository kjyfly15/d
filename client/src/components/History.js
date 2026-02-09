import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History({ token, onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const typeLabels = {
    saju: '사주 상담',
    worry: '고민 상담',
    tarot: '타로 상담',
    dream: '꿈 해몽',
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data);
    } catch (err) {
      setError('이력을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container history-container">
      <div className="header">
        <h1>상담 이력</h1>
        <p>지난 상담 내용을 확인하세요</p>
      </div>

      <button onClick={onBack} className="btn btn-secondary">
        돌아가기
      </button>

      {loading && <div className="loading">불러오는 중...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && history.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px', color: '#999' }}>
          아직 상담 이력이 없습니다.
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <span className="type">{typeLabels[item.type] || item.type}</span>
            <div className="question">Q: {item.question}</div>
            <div className="answer">A: {item.answer}</div>
            <div className="date">{formatDate(item.created_at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
