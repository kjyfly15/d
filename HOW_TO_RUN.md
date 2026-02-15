# 실행 가이드

## 🚀 실행 방법

### 방법 1: 자동 정리 후 실행 (권장)

```bash
./start-clean.sh
```

이 스크립트는:
1. 기존에 실행 중인 프로세스를 모두 정리
2. 포트 5000, 3000 정리
3. 자동으로 백엔드 + 프론트엔드 실행

### 방법 2: npm 명령어로 실행

먼저 기존 프로세스 정리:
```bash
# 포트 정리
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
```

그 다음 실행:
```bash
npm run dev
```

### 방법 3: 개별 실행 (디버깅용)

#### 터미널 1 - 백엔드
```bash
# 먼저 포트 정리
lsof -ti:5000 | xargs kill -9 2>/dev/null

# 백엔드 실행
npm run server
```

예상 출력:
```
Server is running on 127.0.0.1:5000
외부 접속 차단: localhost에서만 접근 가능
```

#### 터미널 2 - 프론트엔드
```bash
# 먼저 포트 정리
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 프론트엔드 실행
npm run client
```

예상 출력:
```
Compiled successfully!
webpack compiled successfully
```

## 🌐 접속

실행 후 브라우저에서:
- **http://localhost:3000** ← 여기로 접속!

## ❌ 문제 해결

### "EADDRINUSE: address already in use" 오류

**원인**: 포트가 이미 사용 중

**해결**:
```bash
# 포트 5000 정리
lsof -ti:5000 | xargs kill -9

# 포트 3000 정리
lsof -ti:3000 | xargs kill -9

# 또는 모든 관련 프로세스 종료
pkill -f "node server"
pkill -f "react-scripts"
```

### 실행 중인 프로세스 확인

```bash
# 포트 5000 확인
lsof -ti:5000

# 포트 3000 확인
lsof -ti:3000

# Node 프로세스 확인
ps aux | grep node
```

### 완전히 재시작하기

```bash
# 1. 모든 프로세스 종료
pkill -f "node"
pkill -f "react-scripts"
lsof -ti:5000,3000 | xargs kill -9 2>/dev/null

# 2. 잠시 대기
sleep 2

# 3. 다시 시작
npm run dev
```

## 🔍 실행 확인

### 백엔드 확인
```bash
curl http://localhost:5000/api/health
# 예상 응답: {"status":"ok"}
```

### 로그 확인

실행 중 다음과 같은 로그가 보여야 합니다:

```
[0] Server is running on 127.0.0.1:5000
[0] 외부 접속 차단: localhost에서만 접근 가능
[1] Compiled successfully!
```

## 💡 팁

1. **Ctrl+C로 종료**: 터미널에서 Ctrl+C를 누르면 두 서버 모두 종료됩니다.

2. **백그라운드 실행**:
   ```bash
   npm run dev &
   ```
   하지만 종료가 어려울 수 있으니 비권장

3. **로그 저장**:
   ```bash
   npm run dev > app.log 2>&1
   ```

4. **브라우저 자동 열림**: React 개발 서버는 자동으로 브라우저를 열 수 있습니다.

## 📞 여전히 안 될 때

다음 정보를 확인하세요:

```bash
# Node 버전
node --version

# npm 버전
npm --version

# 의존성 확인
ls node_modules | wc -l
ls client/node_modules | wc -l

# 포트 사용 확인
lsof -ti:5000,3000
```
