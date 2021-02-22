FROM openjdk

ADD ./backend/build/libs/gitlabanalyzer.jar /app/gitlabanalyzer.jar
ADD ./frontend/build /app/public

EXPOSE 8080

ENTRYPOINT java -cp "/app/*:/app" org.springframework.boot.loader.JarLauncher