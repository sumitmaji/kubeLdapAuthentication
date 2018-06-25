#!/bin/bash
source config
source scripts/config
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

docker run -p 5004:5004 -d --name $CONTAINER_NAME $REGISTRY/$REPO_NAME
