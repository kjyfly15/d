#!/bin/bash

echo "백엔드 서버 테스트 중..."

cd /home/user/d
node server/index.js &
SERVER_PID=$!

sleep 2

echo ""
echo "서버 상태 확인 중..."
RESPONSE=$(curl -s http://localhost:5000/api/health)

if [ "$RESPONSE" == '{"status":"ok"}' ]; then
    echo "✓ 백엔드 서버가 정상적으로 작동합니다!"
    echo "✓ 응답: $RESPONSE"
else
    echo "✗ 서버 응답 실패"
    echo "응답: $RESPONSE"
fi

kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "테스트 완료"
