docker-compose stop

set -e  # Allow stuff above to fail, stuff below should stop script on failure

cd frontend
npm i
npm run build
cd ../

./gradlew assemble

docker build -t gitlabanalyzer .

docker-compose up -d