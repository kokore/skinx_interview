#!/bin/bash

# Run MySQL and wait for it to be ready
echo "Running MySQL..."
cd backend
docker-compose up --build -d db
sleep 10

# Run backend
echo "Running backend..."
docker-compose up --build -d backend
cd ..

# Run frontend
echo "Running frontend..."
cd frontend
docker-compose up --build -d
cd ..
