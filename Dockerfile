# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Build the React + Vite Production Bundle
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Build arguments for build-time environment variables
ARG VITE_DEFAULT_PROVIDER=ollama
ARG VITE_GEMINI_API_KEY=""
ARG VITE_GEMINI_MODEL=gemini-2.5-flash
ARG VITE_OLLAMA_URL=http://localhost:11434
ARG VITE_OLLAMA_MODEL=llama3.2:3b
ARG VITE_CLOUDINARY_CLOUD_NAME=bgumuh2m
ARG VITE_CLOUDINARY_UPLOAD_PRESET=repo_blueprint
ARG VITE_CLOUDINARY_API_KEY=749746485129813
ARG VITE_CLOUDINARY_API_SECRET=vHBLCLMbDsdWOLR1Us4asZCGmVw
ARG VITE_CLOUDINARY_FOLDER=repo-blueprint

ENV VITE_DEFAULT_PROVIDER=$VITE_DEFAULT_PROVIDER \
    VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY \
    VITE_GEMINI_MODEL=$VITE_GEMINI_MODEL \
    VITE_OLLAMA_URL=$VITE_OLLAMA_URL \
    VITE_OLLAMA_MODEL=$VITE_OLLAMA_MODEL \
    VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME \
    VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET \
    VITE_CLOUDINARY_API_KEY=$VITE_CLOUDINARY_API_KEY \
    VITE_CLOUDINARY_API_SECRET=$VITE_CLOUDINARY_API_SECRET \
    VITE_CLOUDINARY_FOLDER=$VITE_CLOUDINARY_FOLDER \
    NODE_ENV=production

# Copy source files
COPY . .

# Build the production bundle into /app/dist
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Serve with Hardened, High-Performance Nginx
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Install curl for container healthcheck
RUN apk add --no-cache curl

# Remove default nginx configurations & static files
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom production nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy custom entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose HTTP port
EXPOSE 80

# Environment variables (configurable at container runtime)
ENV OLLAMA_HOST=host.docker.internal:11434

# Container Healthcheck (verifies /health endpoint returns 200 within 3s)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
