# AI 상담 서비스

사주, 고민 상담, 타로, 꿈 해몽 등 다양한 AI 상담 서비스를 제공하는 웹 애플리케이션입니다.

## 주요 기능

- 간편한 회원가입 및 로그인 (이메일 불필요)
- 4가지 상담 유형
  - 사주 상담
  - 고민 상담
  - 타로 상담
  - 꿈 해몽
- 상담 이력 저장 및 조회
- 직관적이고 아름다운 UI

## 기술 스택

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
- JWT 인증
- bcrypt 비밀번호 암호화

### Frontend
- React
- Axios
- CSS3

## 설치 및 실행

### 1. 의존성 설치

```bash
# 루트 디렉토리에서 백엔드 패키지 설치
npm install

# 클라이언트 디렉토리로 이동하여 프론트엔드 패키지 설치
cd client
npm install
cd ..
```

또는 한 번에 설치:

```bash
npm run install-all
```

### 2. 환경 변수 설정

`.env` 파일이 이미 생성되어 있습니다. 프로덕션 환경에서는 `JWT_SECRET`을 반드시 변경하세요.

```env
JWT_SECRET=your-secret-key-change-in-production-please
PORT=5000
```

### 3. 애플리케이션 실행

#### 개발 모드 (백엔드 + 프론트엔드 동시 실행)

```bash
npm run dev
```

#### 백엔드만 실행

```bash
npm run server
```

#### 프론트엔드만 실행

```bash
npm run client
```

### 4. 접속

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000

## 사용 방법

1. **회원가입**: 사용자명과 비밀번호만 입력하여 간편하게 가입
2. **로그인**: 가입한 계정으로 로그인
3. **상담 받기**:
   - 상담 유형 선택 (사주, 고민, 타로, 꿈)
   - 질문이나 고민 입력
   - AI 상담 결과 확인
4. **이력 확인**: 과거 상담 내용 조회

## API 엔드포인트

### 인증
- `POST /api/signup` - 회원가입
- `POST /api/login` - 로그인

### 상담
- `POST /api/consult` - 상담 요청 (인증 필요)
- `GET /api/history` - 상담 이력 조회 (인증 필요)

### 기타
- `GET /api/health` - 서버 상태 확인

## 프로젝트 구조

```
.
├── server/
│   ├── index.js          # Express 서버 메인
│   ├── database.js       # SQLite 데이터베이스 설정
│   ├── auth.js          # 인증 로직
│   └── consultation.js  # 상담 로직
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   ├── Consultation.js
│       │   └── History.js
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── package.json
├── .env
└── README.md
```

## 보안 고려사항

- 비밀번호는 bcrypt로 해시화되어 저장
- JWT 토큰 기반 인증
- CORS 설정
- 프로덕션 환경에서는 반드시 `JWT_SECRET` 변경 필요

## 향후 개선 사항

- 실제 AI API 통합 (OpenAI, Claude 등)
- 소셜 로그인 추가
- 결제 시스템 연동
- 더 다양한 상담 유형 추가
- 모바일 앱 버전 개발

## 라이센스

ISC
