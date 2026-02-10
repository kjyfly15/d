# 문제 해결 가이드 (Troubleshooting Guide)

## 회원가입이 안 될 때

### 1단계: 백엔드 서버 확인

```bash
# 서버가 실행 중인지 확인
lsof -ti:5000

# 서버 로그 확인
npm run server
```

서버가 "Server is running on port 5000" 메시지를 표시해야 합니다.

### 2단계: API 직접 테스트

#### 방법 1: 테스트 HTML 페이지 사용 (가장 쉬움)

```bash
# 백엔드 서버 실행
npm run server
```

그 다음 브라우저에서 `test-api.html` 파일을 열어서:
1. "서버 확인" 버튼 클릭
2. "회원가입" 버튼 클릭
3. "로그인" 버튼 클릭

#### 방법 2: curl 명령어 사용

```bash
# 회원가입 테스트
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"myuser","password":"1234"}'

# 예상 응답: {"message":"회원가입이 완료되었습니다."}
```

### 3단계: 프론트엔드 확인

```bash
# 프론트엔드 실행
cd client
npm start
```

브라우저 콘솔(F12)을 열어서 에러 메시지 확인:
- Chrome/Edge: F12 → Console 탭
- Firefox: F12 → 콘솔 탭

### 일반적인 문제와 해결책

#### 문제 1: "Cannot connect to server" 또는 네트워크 에러

**원인**: 백엔드 서버가 실행되지 않음

**해결책**:
```bash
# 포트 확인
lsof -ti:5000

# 서버 시작
npm run server
```

#### 문제 2: "이미 존재하는 사용자명입니다"

**원인**: 같은 사용자명으로 이미 가입됨

**해결책**: 다른 사용자명 사용 또는 데이터베이스 초기화
```bash
rm server/consultation.db
```

#### 문제 3: "비밀번호는 최소 4자 이상이어야 합니다"

**원인**: 비밀번호가 너무 짧음

**해결책**: 4자 이상의 비밀번호 입력

#### 문제 4: "비밀번호가 일치하지 않습니다"

**원인**: 비밀번호와 비밀번호 확인이 다름

**해결책**: 두 필드에 같은 비밀번호 입력

#### 문제 5: 프론트엔드에서 "Proxy error"

**원인**: 백엔드 서버가 실행되지 않거나 프록시 설정 문제

**해결책**:
```bash
# 백엔드 서버가 실행 중인지 확인
lsof -ti:5000

# 실행 중이 아니면 시작
npm run server
```

## 로그인이 안 될 때

### 확인 사항

1. **사용자명과 비밀번호가 정확한가요?**
   - 대소문자 구분됨
   - 공백 확인

2. **회원가입을 먼저 했나요?**
   - 로그인 전에 회원가입 필요

3. **백엔드 서버가 실행 중인가요?**
   ```bash
   lsof -ti:5000
   ```

### 로그인 테스트

```bash
# 먼저 회원가입
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'

# 로그인 테스트
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'

# 예상 응답: {"token":"...", "user":{"id":1,"username":"testuser"}}
```

## 상담 기능이 안 될 때

### 확인 사항

1. **로그인이 되어 있나요?**
   - 상담 기능은 로그인 필수

2. **토큰이 유효한가요?**
   - 7일 후 만료됨
   - 만료되면 다시 로그인 필요

## 완전 초기화

모든 것이 작동하지 않을 때:

```bash
# 1. 모든 프로세스 종료
lsof -ti:5000,3000 | xargs kill -9

# 2. 데이터베이스 삭제
rm server/consultation.db

# 3. 의존성 재설치
rm -rf node_modules client/node_modules
npm run install-all

# 4. 다시 시작
npm run dev
```

## 브라우저 개발자 도구 사용법

### Chrome/Edge

1. F12 또는 우클릭 → 검사
2. Console 탭에서 에러 메시지 확인
3. Network 탭에서 API 요청/응답 확인

### Firefox

1. F12 또는 우클릭 → 요소 검사
2. 콘솔 탭에서 에러 메시지 확인
3. 네트워크 탭에서 API 요청/응답 확인

### 확인할 내용

- 빨간색 에러 메시지
- Failed 상태의 네트워크 요청
- API 응답 내용

## 여전히 안 될 때

다음 정보를 확인하여 이슈 리포트:

1. 에러 메시지 (전체)
2. 브라우저 콘솔 로그
3. 서버 콘솔 로그
4. 사용 중인 운영체제
5. Node.js 버전 (`node --version`)
6. npm 버전 (`npm --version`)
