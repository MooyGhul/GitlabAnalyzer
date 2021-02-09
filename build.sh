ln -s ../../../../frontend/build/ ./backend/src/main/resources/public
docker rm gitlabanalyzer # ensure docker compose always use fresh build

set -e  # Allow stuff above to fail, stuff below should stop script on failure

./gradlew assemble

cd frontend
npm run build
cd ../

docker build -t gitlabanalyzer .

docker-compose up