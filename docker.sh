#!/bin/sh

PORT=3000

# Check if the port is already in use
if lsof -i :$PORT > /dev/null; then
    echo "Port $PORT is already in use."
    exit 1
fi

# Get Git user name and email from host machine
GIT_NAME=$(git config --get user.name)
GIT_EMAIL=$(git config --get user.email)

# Build the Docker image
docker build --build-arg GIT_NAME="$GIT_NAME" --build-arg GIT_EMAIL="$GIT_EMAIL" -t kaguya .

# Run the Docker container with the --rm flag (automatically remove container on exit)
docker run --shm-size=2g --rm -p 3000:3000 -v $(pwd):/kaguya -v /kaguya/node_modules kaguya
