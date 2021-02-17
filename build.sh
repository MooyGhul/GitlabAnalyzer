if [ ! -e ./backend/src/main/resources/public ]; then
  ln -s ../../../../frontend/build ./backend/src/main/resources/public
fi
docker rm gitlabanalyzer # ensure docker compose always use fresh build

set -e  # Allow stuff above to fail, stuff below should stop script on failure

cd frontend
npm run build
cd ../

./gradlew assemble

docker build -t gitlabanalyzer .

docker-compose up