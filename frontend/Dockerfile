# Node.js 이미지 선택
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# ESLint 및 Prettier 체크
RUN npm run lint && npm run prettier --check .

# 프로덕션 빌드
RUN npm run build

# 3000 포트 노출
EXPOSE 3000

# serve 패키지 설치하여 정적 파일 서빙
RUN npm install -g serve

# build 폴더의 내용을 서빙
CMD ["serve", "-s", "build", "-l", "3000"]
