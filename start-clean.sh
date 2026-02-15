#!/bin/bash

echo "🧹 기존 프로세스 정리 중..."

# 기존 프로세스 종료
pkill -f "node server/index.js" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "npm run" 2>/dev/null || true
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

sleep 1

echo "✅ 정리 완료!"
echo ""
echo "🚀 AI 상담 앱 시작 중..."
echo ""
echo "📍 백엔드 서버: http://127.0.0.1:5000"
echo "📍 프론트엔드: http://localhost:3000"
echo ""
echo "⚠️  종료하려면 Ctrl+C를 누르세요"
echo ""

cd /home/user/d

# npm run dev 실행
npm run dev
