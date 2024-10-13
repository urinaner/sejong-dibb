# OpenJDK 기반 이미지 설정
FROM bellsoft/liberica-openjdk-alpine:21

# dos2unix 설치 및 bash 설치
RUN apk add --no-cache bash dos2unix

# 작업 디렉터리 설정
WORKDIR /app

# 프로젝트 소스 코드와 Gradle 파일 복사
COPY gradlew ./
COPY gradle/ ./gradle
COPY build.gradle settings.gradle ./
COPY src/ ./src

# 줄바꿈 형식 변경 및 Gradle 실행 권한 추가
RUN dos2unix gradlew
RUN chmod +x ./gradlew

# Gradle 빌드 실행
RUN bash ./gradlew clean build -x test

# 포트 노출
EXPOSE 8080

# 환경 변수 설정
ENV spring.jwt.secret=s5GFED7YjUOFHe3K6jvVk2CalMUU//B2iOBpzSn/WqA=

# 빌드된 JAR 파일 실행
ENTRYPOINT ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]
