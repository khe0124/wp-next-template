#!/bin/bash

# UFW 방화벽 설정 스크립트

set -e

echo "=== UFW 방화벽 설정 ==="

# UFW 설치 확인
if ! command -v ufw &> /dev/null; then
    echo "UFW 설치 중..."
    apt-get update
    apt-get install -y ufw
fi

# 기본 정책 설정
ufw default deny incoming
ufw default allow outgoing

# 필요한 포트 개방
echo "포트 개방 중..."
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# 방화벽 활성화
echo "방화벽 활성화 중..."
ufw --force enable

# 상태 확인
ufw status verbose

echo "=== 방화벽 설정 완료 ==="
