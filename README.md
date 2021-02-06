# Sedna

# Starting Backend

1. Start up a Postgres database using Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=gitlabanalyzer -p 5432:5432 -d postgres`

2. Open IntelliJ IDEA Ultimate (free for students)

3. In terminal `cd backend/src/main/resources`, then `ln -s ../../../../frontend/build/ ./public` to let Spring pick up on frontend files when you build them

3. Go to the Application class, and click on the play button.

4. Application is now running at `localhost:8080`