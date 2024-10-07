FROM bellsoft/liberica-openjdk-alpine:21

CMD ["./gradlew", "clean", "build"]
# or Maven
# CMD ["./mvnw", "clean", "package"]

VOLUME /tmp

ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} /app/backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENV spring.jwt.secret=s5GFED7YjUOFHe3K6jvVk2CalMUU//B2iOBpzSn/WqA=


ENTRYPOINT ["java", "-jar", "/app/backend-0.0.1-SNAPSHOT.jar"]