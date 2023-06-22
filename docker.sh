#!/bin/sh

# Build the Docker image
docker build -t kaguya .

# Run the Docker container with the --rm flag (automatically remove container on exit)
docker run --shm-size=2g --rm -p 3000:3000 -v $(pwd):/kaguya -v /kaguya/node_modules kaguya
