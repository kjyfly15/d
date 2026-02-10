# 보안 설정 가이드

## 외부 접속 차단 설정

기본적으로 이 애플리케이션은 **localhost에서만 접속 가능**하도록 설정되어 있습니다.

### 현재 설정 (외부 접속 차단)

```env
HOST=127.0.0.1
```

이 설정으로 서버는 `127.0.0.1:5000`에만 바인딩되어 **외부 네트워크에서 접근할 수 없습니다**.

### 접속 가능 범위

#### HOST=127.0.0.1 (기본값, 권장)
- ✅ `http://localhost:5000` - 접속 가능
- ✅ `http://127.0.0.1:5000` - 접속 가능
- ❌ `http://192.168.x.x:5000` - 접속 불가
- ❌ `http://공인IP:5000` - 접속 불가
- **보안 수준**: 높음 (로컬에서만 실행)

#### HOST=0.0.0.0 (모든 인터페이스)
- ✅ `http://localhost:5000` - 접속 가능
- ✅ `http://127.0.0.1:5000` - 접속 가능
- ✅ `http://192.168.x.x:5000` - 접속 가능 (같은 네트워크)
- ⚠️ `http://공인IP:5000` - 포트 포워딩 시 접속 가능
- **보안 수준**: 낮음 (외부 노출 가능)

## 외부 접속을 허용하려면?

⚠️ **주의**: 외부 접속을 허용하면 보안 위험이 증가합니다!

### 1. .env 파일 수정

```env
# 외부 접속 허용
HOST=0.0.0.0
```

### 2. 방화벽 설정 (필요시)

#### Linux (ufw)
```bash
sudo ufw allow 5000/tcp
```

#### macOS
```bash
# 시스템 환경설정 → 보안 및 개인정보보호 → 방화벽 옵션
```

### 3. 라우터 포트 포워딩 (외부 인터넷에서 접속하려면)

1. 라우터 관리 페이지 접속
2. 포트 포워딩 설정
3. 내부 IP: 서버 컴퓨터의 로컬 IP
4. 포트: 5000
5. 프로토콜: TCP

⚠️ **경고**: 인터넷에 직접 노출하면 매우 위험합니다!

## CORS 설정

### 현재 설정 (보안)

```javascript
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};
```

이 설정은 **localhost:3000**에서만 API 호출을 허용합니다.

### 외부 도메인 허용

`server/index.js` 파일 수정:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://yourdomain.com'  // 허용할 도메인 추가
  ],
  credentials: true,
};
```

## 보안 체크리스트

### 개발 환경 (현재 설정)
- ✅ HOST=127.0.0.1 (외부 접속 차단)
- ✅ CORS 제한 (localhost만 허용)
- ✅ JWT 인증
- ✅ 비밀번호 해시화 (bcrypt)

### 프로덕션 환경 (배포 시)
- [ ] JWT_SECRET 변경 (강력한 랜덤 문자열)
- [ ] HTTPS 사용 (SSL/TLS 인증서)
- [ ] 환경 변수로 민감 정보 관리
- [ ] Rate limiting 추가
- [ ] SQL Injection 방어 (현재 SQLite prepared statements 사용 중)
- [ ] XSS 방어
- [ ] 로그 관리
- [ ] 정기적인 의존성 업데이트

## 네트워크 테스트

### 로컬 접속만 가능한지 확인

```bash
# 로컬에서 테스트 (성공해야 함)
curl http://localhost:5000/api/health
curl http://127.0.0.1:5000/api/health

# 네트워크 IP로 테스트 (실패해야 함)
curl http://192.168.x.x:5000/api/health
# 예상 결과: Connection refused
```

### 포트 리스닝 확인

```bash
# Linux/Mac
netstat -an | grep 5000
# 또는
lsof -i :5000

# 출력 예시:
# tcp4  0  0  127.0.0.1.5000  *.*  LISTEN
# -> 127.0.0.1에만 바인딩됨 (외부 접속 차단)

# 만약 0.0.0.0이나 *.5000으로 표시되면 외부 접속 가능
```

## 추가 보안 강화

### 1. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // 최대 100개 요청
});

app.use('/api/', limiter);
```

### 2. Helmet (보안 헤더)

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 3. 환경별 설정 분리

개발 환경: `HOST=127.0.0.1` (외부 차단)
스테이징: `HOST=0.0.0.0` + 방화벽 (내부 네트워크만)
프로덕션: 리버스 프록시 (Nginx) + HTTPS

## 문의

보안 관련 질문이나 취약점 발견 시:
- GitHub Issues를 통해 보고 (민감한 정보 제외)
- 심각한 보안 이슈는 비공개로 연락
