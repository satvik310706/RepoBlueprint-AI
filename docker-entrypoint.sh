#!/bin/sh
set -e

# Default to host.docker.internal:11434 if OLLAMA_HOST is not provided
OLLAMA_TARGET="${OLLAMA_HOST:-host.docker.internal:11434}"

echo "🚀 [RepoBlueprint AI] Starting production Nginx server..."
echo "🔗 [RepoBlueprint AI] Routing /ollama/ -> http://${OLLAMA_TARGET}/"

# Substitute placeholder in nginx configuration
sed -i "s|__OLLAMA_UPSTREAM__|${OLLAMA_TARGET}|g" /etc/nginx/conf.d/default.conf

# Execute passed command (default: nginx -g "daemon off;")
exec "$@"
