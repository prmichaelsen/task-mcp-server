# Task 9: Create Dockerfile

**Milestone**: Milestone 3 - Deployment Configuration
**Estimated Time**: 1 hour
**Dependencies**: Task 8
**Status**: Not Started

---

## Objective

Create a multi-stage Dockerfile for building and running task-mcp-server in production. Optimize for image size and include health check configuration.

## Steps

### 1. Review remember-mcp-server Dockerfile

```bash
cat /home/prmichaelsen/remember-mcp-server/Dockerfile
```

Study the multi-stage build pattern and health check configuration.

### 2. Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear npm cache and install production dependencies only
RUN npm cache clean --force && npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:8080/mcp/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start server
CMD ["node", "dist/index.js"]
```

### 3. Verify Dockerfile Syntax

```bash
# Check Dockerfile syntax
docker build --no-cache -t task-mcp-server:test .
```

## Verification

- [ ] Dockerfile created
- [ ] Multi-stage build (builder + production)
- [ ] Builder stage installs all dependencies
- [ ] Builder stage compiles TypeScript
- [ ] Production stage uses node:20-alpine
- [ ] Production stage installs only production dependencies
- [ ] Built files copied from builder stage
- [ ] Port 8080 exposed
- [ ] Health check configured
- [ ] CMD starts the server
- [ ] Dockerfile syntax is valid

## Expected Output

```bash
$ docker build -t task-mcp-server:test .
[+] Building 45.2s (16/16) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 623B
 => [internal] load .dockerignore
 => [builder 1/6] FROM docker.io/library/node:20-alpine
 => [builder 2/6] WORKDIR /app
 => [builder 3/6] COPY package*.json ./
 => [builder 4/6] COPY tsconfig.json ./
 => [builder 5/6] RUN npm ci
 => [builder 6/6] COPY src ./src
 => [builder 7/6] RUN npm run build
 => [stage-1 2/5] WORKDIR /app
 => [stage-1 3/5] COPY package*.json ./
 => [stage-1 4/5] RUN npm cache clean --force && npm ci --omit=dev
 => [stage-1 5/5] COPY --from=builder /app/dist ./dist
 => exporting to image
 => => exporting layers
 => => writing image sha256:...
 => => naming to docker.io/library/task-mcp-server:test
```

## Image Size Optimization

Expected image size: ~150-200MB

- Base image (node:20-alpine): ~120MB
- Production dependencies: ~30-50MB
- Built application: ~1-5MB

## Notes

- Multi-stage build reduces final image size
- Builder stage has devDependencies for TypeScript compilation
- Production stage has only runtime dependencies
- Health check uses Node.js fetch API (available in Node 20+)
- Based on remember-mcp-server Dockerfile
- Alpine Linux for minimal image size

## Troubleshooting

### Issue: Build fails at npm ci

**Solution**: Ensure package.json and package-lock.json are in sync:
```bash
rm package-lock.json
npm install
```

### Issue: Health check fails

**Solution**: Verify server starts on port 8080 and /mcp/health endpoint works.

---

**Previous Task**: [Task 8: Integrate task-mcp Base Server](task-8-integrate-base.md)
**Next Task**: [Task 10: Create Cloud Build Configuration](task-10-cloudbuild.md)
