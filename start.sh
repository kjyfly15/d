#!/bin/bash

echo "AI 상담 앱 시작 중..."
echo ""
echo "백엔드 서버: http://localhost:5000"
echo "프론트엔드: http://localhost:3000"
echo ""
echo "종료하려면 Ctrl+C를 누르세요"
echo ""

# 백엔드 서버 시작
cd /home/user/d
node server/index.js &
BACKEND_PID=$!

# 잠시 대기
sleep 2

# 프론트엔드 시작
cd /home/user/d/client
PORT=3000 npm start &
FRONTEND_PID=$!

# 종료 시그널 처리
trap "echo '서버 종료 중...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# 대기
wait
