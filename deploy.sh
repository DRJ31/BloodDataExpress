#!/bin/bash

docker stop blood
docker rm blood
docker rmi dengrenjie31/blood
docker-compose up -d