FROM openjdk

ADD ./backend/build /backend
ADD ./frontend/build /backend/resources/public

EXPOSE 8080

RUN java -jar ./backend/build