#!/bin/sh

# Name of the image
IMAGE_NAME="kaguya"

# File to store the timestamp of the last build
TIMESTAMP_FILE=".last_build_timestamp"

# Get the modification timestamp of Dockerfile
MOD_TIMESTAMP=$(date -r Dockerfile +%s)

# Check if the image already exists and if the timestamp has changed
if [ "$(docker images -q $IMAGE_NAME 2> /dev/null)" == "" ] || [ ! -f "$TIMESTAMP_FILE" ] || [ "$MOD_TIMESTAMP" != "$(cat $TIMESTAMP_FILE)" ]; then
  echo "Building the image..."
  # Build the Docker image
  docker build -t $IMAGE_NAME .
  # Store the modification timestamp of Dockerfile
  echo "$MOD_TIMESTAMP" > $TIMESTAMP_FILE
else
  echo "Image exists and is up to date. Starting container..."
fi

# Run the Docker container with the --rm flag (automatically remove container on exit)
docker run --shm-size=2g --rm -p 3000:3000 -v $(pwd):/kaguya -v /kaguya/node_modules $IMAGE_NAME
