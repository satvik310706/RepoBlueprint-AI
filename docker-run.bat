@echo off
setlocal

echo =========================================================
echo   RepoBlueprint AI — Production Docker Runner (Windows)
echo =========================================================
echo.

:: Check if Docker is installed
where docker >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH.
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

:: Check if Docker daemon is running
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [WARNING] Docker daemon is not running!
    echo Please start Docker Desktop and run this script again.
    pause
    exit /b 1
)

echo [1/3] Building production image...
docker compose build

echo [2/3] Starting RepoBlueprint AI container on port 80...
docker compose up -d

echo [3/3] Checking container status...
docker compose ps

echo.
echo =========================================================
echo   RepoBlueprint AI is now running in production mode!
echo   Open your browser at: http://localhost
echo =========================================================
echo.
echo View logs with:    docker compose logs -f
echo Stop app with:     docker compose down
echo.

pause
