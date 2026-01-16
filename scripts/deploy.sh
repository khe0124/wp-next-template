#!/bin/bash

# Vultr VPS 배포 스크립트
# WordPress + Next.js 배포 자동화

set -e

# 색상 출력
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 변수 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DOMAIN_NAME="${DOMAIN_NAME:-yourdomain.com}"

echo -e "${GREEN}=== Vultr VPS 배포 시작 ===${NC}"

# 1. Docker 설치 확인
echo -e "${YELLOW}[1/10] Docker 설치 확인...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker가 설치되어 있지 않습니다.${NC}"
    echo "Docker 설치 중..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose 설치 중..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo -e "${GREEN}✓ Docker 설치 확인 완료${NC}"

# 2. 프로젝트 디렉토리로 이동
cd "$PROJECT_ROOT"

# 3. 환경 변수 파일 확인
echo -e "${YELLOW}[2/10] 환경 변수 파일 확인...${NC}"
if [ ! -f "cms/.env.production" ]; then
    echo -e "${RED}cms/.env.production 파일이 없습니다.${NC}"
    echo "cms/.env.production.example을 복사하여 설정하세요."
    exit 1
fi

if [ ! -f "frontend/.env.production" ]; then
    echo -e "${RED}frontend/.env.production 파일이 없습니다.${NC}"
    echo "frontend/.env.production.example을 복사하여 설정하세요."
    exit 1
fi

echo -e "${GREEN}✓ 환경 변수 파일 확인 완료${NC}"

# 4. WordPress Docker Compose 실행
echo -e "${YELLOW}[3/10] WordPress 컨테이너 시작...${NC}"
cd "$PROJECT_ROOT/cms"
docker-compose -f docker-compose.prod.yml up -d
echo -e "${GREEN}✓ WordPress 컨테이너 시작 완료${NC}"

# 5. WordPress 초기화 대기
echo -e "${YELLOW}[4/10] WordPress 초기화 대기...${NC}"
sleep 10
echo -e "${GREEN}✓ WordPress 준비 완료${NC}"

# 6. Next.js 빌드
echo -e "${YELLOW}[5/10] Next.js 빌드...${NC}"
cd "$PROJECT_ROOT/frontend"
if command -v pnpm &> /dev/null; then
    pnpm install
    pnpm build
else
    npm install
    npm run build
fi
echo -e "${GREEN}✓ Next.js 빌드 완료${NC}"

# 7. Nginx 설치 및 설정
echo -e "${YELLOW}[6/10] Nginx 설정...${NC}"
if ! command -v nginx &> /dev/null; then
    apt-get update
    apt-get install -y nginx
fi

# Nginx 설정 파일 복사
mkdir -p /etc/nginx/sites-available
cp "$PROJECT_ROOT/nginx/nginx.conf" /etc/nginx/sites-available/default

# 도메인 이름으로 치환
sed -i "s/\${DOMAIN_NAME}/$DOMAIN_NAME/g" /etc/nginx/sites-available/default

# Nginx 설정 테스트
nginx -t

echo -e "${GREEN}✓ Nginx 설정 완료${NC}"

# 8. Certbot 설치 및 SSL 인증서 발급
echo -e "${YELLOW}[7/10] SSL 인증서 발급...${NC}"
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
fi

# 인증서 발급 (도메인이 설정된 경우)
if [ "$DOMAIN_NAME" != "yourdomain.com" ]; then
    certbot --nginx -d "$DOMAIN_NAME" -d "www.$DOMAIN_NAME" -d "cms.$DOMAIN_NAME" \
        --non-interactive --agree-tos --email "admin@$DOMAIN_NAME" \
        --redirect || echo -e "${YELLOW}SSL 인증서 발급 실패 (도메인 DNS 설정 확인 필요)${NC}"
fi

echo -e "${GREEN}✓ SSL 설정 완료${NC}"

# 9. Next.js systemd 서비스 설정
echo -e "${YELLOW}[8/10] Next.js 서비스 설정...${NC}"
cat > /etc/systemd/system/nextjs.service <<EOF
[Unit]
Description=Next.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$PROJECT_ROOT/frontend
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/node $PROJECT_ROOT/frontend/.next/standalone/server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable nextjs
systemctl start nextjs

echo -e "${GREEN}✓ Next.js 서비스 시작 완료${NC}"

# 10. Nginx 재시작
echo -e "${YELLOW}[9/10] Nginx 재시작...${NC}"
systemctl restart nginx
systemctl enable nginx

echo -e "${GREEN}✓ Nginx 재시작 완료${NC}"

# 11. 방화벽 설정
echo -e "${YELLOW}[10/10] 방화벽 설정...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
fi

echo -e "${GREEN}✓ 방화벽 설정 완료${NC}"

echo -e "${GREEN}=== 배포 완료! ===${NC}"
echo ""
echo "다음 단계:"
echo "1. 도메인 DNS 설정: A 레코드를 서버 IP로 설정"
echo "2. WordPress 관리자 페이지 접속: https://cms.$DOMAIN_NAME/wp-admin"
echo "3. WPGraphQL 플러그인 설치 및 활성화"
echo "4. 사이트 확인: https://$DOMAIN_NAME"
