#!/bin/bash

# WordPress 데이터베이스 및 파일 백업 스크립트

set -e

# 색상 출력
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUP_DIR="$PROJECT_ROOT/cms/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}=== 백업 시작 ===${NC}"

# 1. 데이터베이스 백업
echo -e "${YELLOW}[1/3] 데이터베이스 백업...${NC}"
cd "$PROJECT_ROOT/cms"

# 환경 변수 로드
if [ -f ".env.production" ]; then
    source .env.production
fi

DB_NAME="${MYSQL_DATABASE:-wordpress}"
DB_USER="${MYSQL_USER:-wpuser}"
DB_PASSWORD="${MYSQL_PASSWORD}"

docker-compose -f docker-compose.prod.yml exec -T db \
    mysqldump -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" \
    > "$BACKUP_DIR/db_backup_$DATE.sql"

# 압축
gzip "$BACKUP_DIR/db_backup_$DATE.sql"

echo -e "${GREEN}✓ 데이터베이스 백업 완료: db_backup_$DATE.sql.gz${NC}"

# 2. WordPress 업로드 파일 백업
echo -e "${YELLOW}[2/3] 업로드 파일 백업...${NC}"
if [ -d "wp/wp-content/uploads" ]; then
    tar -czf "$BACKUP_DIR/uploads_backup_$DATE.tar.gz" \
        -C "$PROJECT_ROOT/cms/wp/wp-content" uploads
    echo -e "${GREEN}✓ 업로드 파일 백업 완료: uploads_backup_$DATE.tar.gz${NC}"
else
    echo -e "${YELLOW}업로드 디렉토리가 없습니다.${NC}"
fi

# 3. 오래된 백업 파일 삭제 (30일 이상)
echo -e "${YELLOW}[3/3] 오래된 백업 정리...${NC}"
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +30 -delete
find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +30 -delete

echo -e "${GREEN}✓ 백업 완료!${NC}"
echo "백업 위치: $BACKUP_DIR"
