# Vultr VPS 배포 가이드

이 가이드는 Vultr VPS에 WordPress CMS와 Next.js 프론트엔드를 배포하는 방법을 설명합니다.

## 아키텍처

```
Internet
   ↓
Nginx (포트 80/443)
   ├─→ Next.js (포트 3000) - https://yourdomain.com
   └─→ WordPress (포트 8000) - https://cms.yourdomain.com
        └─→ MySQL (포트 3306)
```

## 사전 요구사항

1. Vultr 계정
2. 도메인 이름 (선택사항이지만 권장)
3. SSH 클라이언트

## 1단계: Vultr VPS 생성

### 1.1 VPS 인스턴스 생성

1. [Vultr 대시보드](https://my.vultr.com/)에 로그인
2. **Products** > **Deploy Server** 클릭
3. 설정 선택:
   - **Server Type**: Cloud Compute
   - **CPU & Storage**: 최소 2GB RAM, 1 vCPU (권장: 4GB RAM, 2 vCPU)
   - **Location**: 가장 가까운 지역 선택
   - **Operating System**: Ubuntu 22.04 LTS
   - **Server Hostname & Label**: 원하는 이름 설정
4. **Deploy Now** 클릭

### 1.2 서버 정보 확인

- **Server IP Address**: 서버 공인 IP
- **Root Password**: 초기 비밀번호 (이메일로 전송)

## 2단계: 서버 초기 설정

### 2.1 SSH 접속

```bash
ssh root@YOUR_SERVER_IP
```

### 2.2 시스템 업데이트

```bash
apt-get update
apt-get upgrade -y
```

### 2.3 필수 패키지 설치

```bash
apt-get install -y curl wget git ufw
```

## 3단계: 프로젝트 코드 업로드

### 3.1 Git을 사용하는 경우

```bash
cd /var/www
git clone YOUR_REPOSITORY_URL wp-next-template
cd wp-next-template
```

### 3.2 수동 업로드하는 경우

```bash
# 로컬에서 압축
tar -czf wp-next-template.tar.gz --exclude='node_modules' --exclude='.next' \
    --exclude='cms/wp/wp-content/uploads' wp-next-template/

# SCP로 업로드
scp wp-next-template.tar.gz root@YOUR_SERVER_IP:/var/www/

# 서버에서 압축 해제
ssh root@YOUR_SERVER_IP
cd /var/www
tar -xzf wp-next-template.tar.gz
```

## 4단계: 환경 변수 설정

### 4.1 WordPress 환경 변수

```bash
cd /var/www/wp-next-template/cms
cp .env.production.example .env.production
nano .env.production
```

다음 값들을 설정:

```env
MYSQL_ROOT_PASSWORD=강력한_비밀번호_생성
MYSQL_DATABASE=wordpress
MYSQL_USER=wpuser
MYSQL_PASSWORD=강력한_비밀번호_생성
WP_HOME=https://yourdomain.com
WP_SITEURL=https://cms.yourdomain.com
WP_DEBUG=0
```

**보안 키 생성**:

1. <https://api.wordpress.org/secret-key/1.1/salt/> 접속
2. 생성된 키를 `.env.production`에 복사

### 4.2 Next.js 환경 변수

```bash
cd /var/www/wp-next-template/frontend
cp .env.production.example .env.production
nano .env.production
```

다음 값들을 설정:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
WP_GRAPHQL_URL=https://cms.yourdomain.com/graphql
WP_IMAGE_DOMAIN=cms.yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
# ... 기타 설정
```

## 5단계: 배포 스크립트 실행

```bash
cd /var/www/wp-next-template
export DOMAIN_NAME=yourdomain.com  # 실제 도메인으로 변경
./scripts/deploy.sh
```

배포 스크립트가 자동으로:

1. Docker 설치
2. WordPress 컨테이너 시작
3. Next.js 빌드
4. Nginx 설정
5. SSL 인증서 발급
6. 서비스 시작

## 6단계: 도메인 DNS 설정

도메인이 있는 경우:

### 6.1 A 레코드 설정

도메인 DNS 설정에서 다음 A 레코드 추가:

```
yourdomain.com        A    YOUR_SERVER_IP
www.yourdomain.com    A    YOUR_SERVER_IP
cms.yourdomain.com    A    YOUR_SERVER_IP
```

### 6.2 DNS 전파 대기

DNS 변경사항이 전파되는데 보통 5분~24시간 소요됩니다.

확인 방법:

```bash
dig yourdomain.com
```

## 7단계: WordPress 초기 설정

### 7.1 WordPress 관리자 접속

1. 브라우저에서 `https://cms.yourdomain.com/wp-admin` 접속
2. WordPress 설치 마법사 완료
3. 관리자 계정 생성

### 7.2 필수 플러그인 설치

1. **WPGraphQL** 플러그인 설치 및 활성화
2. **Yoast SEO** 또는 **Rank Math** (SEO 최적화)
3. **WP Super Cache** (캐싱)

### 7.3 WPGraphQL 설정

1. WordPress 관리자 > GraphQL > Settings
2. GraphQL Endpoint 확인: `/graphql`
3. 테스트: `https://cms.yourdomain.com/graphql` 접속

## 8단계: 방화벽 설정

```bash
./scripts/setup-firewall.sh
```

또는 수동으로:

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## 9단계: 백업 설정

### 9.1 수동 백업

```bash
./scripts/backup.sh
```

### 9.2 자동 백업 (Cron)

```bash
crontab -e
```

다음 줄 추가 (매일 새벽 2시 백업):

```
0 2 * * * /var/www/wp-next-template/scripts/backup.sh
```

## 10단계: 모니터링 설정

### 10.1 로깅 설정

```bash
./scripts/setup-logging.sh
```

### 10.2 서비스 상태 확인

```bash
# Next.js 서비스 상태
systemctl status nextjs

# WordPress 컨테이너 상태
docker-compose -f /var/www/wp-next-template/cms/docker-compose.prod.yml ps

# Nginx 상태
systemctl status nginx
```

## 업데이트 방법

코드 업데이트 시:

```bash
cd /var/www/wp-next-template
./scripts/update.sh
```

## 문제 해결

### WordPress에 접속할 수 없음

1. 컨테이너 상태 확인:

```bash
cd /var/www/wp-next-template/cms
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs
```

1. 포트 확인:

```bash
netstat -tlnp | grep 8000
```

### Next.js가 작동하지 않음

1. 서비스 상태 확인:

```bash
systemctl status nextjs
journalctl -u nextjs -n 50
```

1. 빌드 확인:

```bash
cd /var/www/wp-next-template/frontend
ls -la .next/
```

### SSL 인증서 발급 실패

1. 도메인 DNS 설정 확인
2. 포트 80이 열려있는지 확인
3. 수동으로 인증서 발급:

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 데이터베이스 연결 오류

1. 환경 변수 확인:

```bash
cd /var/www/wp-next-template/cms
cat .env.production
```

1. 컨테이너 로그 확인:

```bash
docker-compose -f docker-compose.prod.yml logs db
```

## 보안 체크리스트

- [ ] 강력한 데이터베이스 비밀번호 사용
- [ ] WordPress 보안 키 생성
- [ ] 방화벽 설정 완료
- [ ] SSL 인증서 설치
- [ ] 정기 백업 설정
- [ ] WordPress 업데이트 정기 확인
- [ ] 불필요한 플러그인 제거
- [ ] 파일 권한 확인 (644, 755)

## 성능 최적화

### 1. WordPress 캐싱

- WP Super Cache 또는 W3 Total Cache 설치
- 객체 캐싱 활성화 (Redis 권장)

### 2. 이미지 최적화

- Smush 플러그인 설치
- WebP 포맷 사용

### 3. CDN 설정 (선택사항)

- Cloudflare 무료 플랜 사용
- 정적 파일 CDN 배포

## 비용 예상

- Vultr VPS (2GB RAM): $12/월
- Vultr VPS (4GB RAM): $24/월
- 도메인: $10-15/년
- **총 예상 비용**: $12-24/월

## 추가 리소스

- [Vultr 문서](https://www.vultr.com/docs/)
- [WordPress 보안 가이드](https://wordpress.org/support/article/hardening-wordpress/)
- [Next.js 배포 문서](https://nextjs.org/docs/deployment)
- [Nginx 문서](https://nginx.org/en/docs/)
