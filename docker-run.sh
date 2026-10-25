#!/bin/sh
set -e

echo "========================================================="
echo "  RepoBlueprint AI — Production Docker Runner (Linux/macOS)"
echo "========================================================="
echo ""

if ! command -v docker >/dev/null 2>&1; then
    echo "[ERROR] Docker is not installed or not in PATH."
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    echo "[WARNING] Docker daemon is not running."
    echo "Please start Docker and try again."
    exit 1
fi

echo "[1/3] Building production image..."
docker compose build

echo "[2/3] Starting container in detached mode on port 80..."
docker compose up -d

echo "[3/3] Checking container status..."
docker compose ps

echo ""
echo "========================================================="
echo "  RepoBlueprint AI is now running in production mode!"
echo "  Open your browser at: http://localhost"
echo "========================================================="
echo ""
echo "View logs:   docker compose logs -f"
echo "Stop app:    docker compose down"
echo ""
