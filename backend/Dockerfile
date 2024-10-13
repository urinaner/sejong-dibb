# 1. OpenJDK 기반 이미지 설정
FROM bellsoft/liberica-openjdk-alpine:21

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. 프로젝트 소스 코드와 Gradle 파일 복사
COPY . .

# 4. Gradle을 이용해 JAR 파일 빌드
RUN ./gradlew clean build -x test  # 빌드 시 실행되는 명령

# 5. JAR 파일 경로 설정 (복사하지 않고 바로 사용)
EXPOSE 8080

# 6. 환경 변수 설정 (JWT 비밀키 설정)
ENV spring.jwt.secret=s5GFED7YjUOFHe3K6jvVk2CalMUU//B2iOBpzSn/WqA=

# 7. 컨테이너 실행 시 빌드된 JAR 파일 실행
ENTRYPOINT ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]