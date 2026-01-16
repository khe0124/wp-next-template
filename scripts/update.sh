#!/bin/bash

# 프로젝트 업데이트 스크립트
# 코드 업데이트, 빌드, 재배포

set -e

# 색상 출력
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${GREEN}=== 프로젝트 업데이트 시작 ===${NC}"

# 1. 데이터베이스 백업
echo -e "${YELLOW}[1/5] 데이터베이스 백업...${NC}"
"$SCRIPT_DIR/backup.sh"
echo -e "${GREEN}✓ 백업 완료${NC}"

# 2. 코드 업데이트 (Git pull)
echo -e "${YELLOW}[2/5] 코드 업데이트...${NC}"
cd "$PROJECT_ROOT"
if [ -d ".git" ]; then
    git pull origin main || git pull origin master
else
    echo -e "${YELLOW}Git 저장소가 아닙니다. 수동으로 코드를 업데이트하세요.${NC}"
fi
echo -e "${GREEN}✓ 코드 업데이트 완료${NC}"

# 3. WordPress 컨테이너 재시작
echo -e "${YELLOW}[3/5] WordPress 컨테이너 재시작...${NC}"
cd "$PROJECT_ROOT/cms"
docker-compose -f docker-compose.prod.yml restart
echo -e "${GREEN}✓ WordPress 재시작 완료${NC}"

# 4. Next.js 재빌드
echo -e "${YELLOW}[4/5] Next.js 재빌드...${NC}"
cd "$PROJECT_ROOT/frontend"
if command -v pnpm &> /dev/null; then
    pnpm install
    pnpm build
else
    npm install
    npm run build
fi
echo -e "${GREEN}✓ Next.js 빌드 완료${NC}"

# 5. Next.js 서비스 재시작
echo -e "${YELLOW}[5/5] Next.js 서비스 재시작...${NC}"
systemctl restart nextjs
echo -e "${GREEN}✓ Next.js 재시작 완료${NC}"

echo -e "${GREEN}=== 업데이트 완료! ===${NC}"
