# 1. Node.js 이미지 선택 (버전을 프로젝트에 맞게 선택)
FROM node:18

# 2. 컨테이너 안에서 작업할 디렉토리를 설정
WORKDIR /usr/src/app

# 3. package.json 및 package-lock.json을 복사하여 종속성 설치
COPY package*.json ./

# 4. 프로젝트에 필요한 모든 의존성 설치
RUN npm install

# 5. 나머지 모든 파일을 컨테이너에 복사
COPY . .

# 6. ESLint 및 Prettier 체크 (Optional, 빌드 전에 코드 스타일 확인)
RUN npm run lint && npm run prettier --check .

# 7. 애플리케이션을 빌드
RUN npm run build

# 8. 컨테이너 실행 시 개발 서버를 실행 (React의 기본 포트는 3000)
EXPOSE 3000

# 9. Docker 컨테이너가 실행되었을 때 앱을 시작하는 명령어
CMD ["npm", "start"]
