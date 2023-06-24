#!/bin/sh

# Name of the image
IMAGE_NAME="kaguya"

# Check if the image already exists
if [ "$(docker images -q $IMAGE_NAME 2> /dev/null)" == "" ]; then
  echo "Image does not exist. Building..."
  # Build the Docker image
  docker build -t $IMAGE_NAME .
else
  echo "Image exists. Starting container..."
fi

# Run the Docker container with the --rm flag (automatically remove container on exit)
docker run --shm-size=2g --rm -p 3000:3000 -v $(pwd):/kaguya -v /kaguya/node_modules $IMAGE_NAME
