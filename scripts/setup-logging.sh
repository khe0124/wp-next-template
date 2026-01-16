#!/bin/bash

# 로깅 설정 스크립트

set -e

echo "=== 로깅 설정 ==="

# 로그 디렉토리 생성
mkdir -p /var/log/wp-next-template

# 로그 로테이션 설정
cat > /etc/logrotate.d/wp-next-template <<EOF
/var/log/wp-next-template/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload nextjs > /dev/null 2>&1 || true
    endscript
}
EOF

# Docker 로그 설정
cat > /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

systemctl restart docker

echo "=== 로깅 설정 완료 ==="
