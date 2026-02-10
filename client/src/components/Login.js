import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('로그인 시도:', { username, password: '****' });
      const response = await axios.post('/api/login', { username, password });
      console.log('로그인 성공:', response.data);
      onLogin(response.data.token, response.data.user);
    } catch (err) {
      console.error('로그인 에러:', err);
      console.error('에러 상세:', err.response);
      const errorMessage = err.response?.data?.error || err.message || '로그인에 실패했습니다.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI 상담 서비스</h1>
        <p>로그인하여 시작하세요</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사용자명</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자명을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn btn-primary">
          로그인
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onSwitchToSignup} className="link-button">
          계정이 없으신가요? 회원가입하기
        </button>
      </div>
    </div>
  );
}

export default Login;
