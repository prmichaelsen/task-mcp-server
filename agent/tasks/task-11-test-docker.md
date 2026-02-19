# Task 11: Test Docker Locally

**Milestone**: Milestone 3 - Deployment Configuration
**Estimated Time**: 0.5 hours
**Dependencies**: Task 10
**Status**: Not Started

---

## Objective

Build and test the Docker container locally to verify it works before deploying to Cloud Run.

## Steps

### 1. Build Docker Image

```bash
docker build -t task-mcp-server:local .
```

### 2. Create .env File for Testing

Create `.env` file with test configuration:

```bash
# .env (for local testing only - DO NOT COMMIT)
FIREBASE_PROJECT_ID=your-test-project
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your-test-project",...}
NODE_ENV=production
PORT=8080
```

### 3. Run Container Locally

```bash
docker run -p 8080:8080 --env-file .env task-mcp-server:local
```

### 4. Test Health Check

In another terminal:

```bash
# Test health check endpoint
curl http://localhost:8080/mcp/health

# Expected response:
# {"status":"healthy"}
```

### 5. Check Container Logs

```bash
# View container logs
docker ps  # Get container ID
docker logs <container-id>
```

### 6. Verify Docker Health Check

```bash
# Check Docker health status
docker ps

# Look for "healthy" status in the output
```

### 7. Stop Container

```bash
# Stop the container
docker stop <container-id>

# Or use Ctrl+C if running in foreground
```

### 8. Check Image Size

```bash
docker images task-mcp-server:local
```

Expected size: ~150-200MB

## Verification

- [ ] Docker image builds successfully
- [ ] No build errors or warnings
- [ ] Container starts without errors
- [ ] Server logs appear in container output
- [ ] Health check endpoint responds
- [ ] Health check returns {"status":"healthy"}
- [ ] Docker health check shows "healthy" status
- [ ] Container can be stopped gracefully
- [ ] Image size is reasonable (~150-200MB)

## Expected Output

```bash
$ docker build -t task-mcp-server:local .
[+] Building 45.2s (16/16) FINISHED
...
=> => naming to docker.io/library/task-mcp-server:local

$ docker run -p 8080:8080 --env-file .env task-mcp-server:local
Starting task-mcp-server...
Configuration: {
  serverName: 'task-mcp-server',
  serverVersion: '0.1.0',
  port: 8080,
  ...
}
Server listening on port 8080
Health check available at http://localhost:8080/mcp/health

$ curl http://localhost:8080/mcp/health
{"status":"healthy"}

$ docker ps
CONTAINER ID   IMAGE                      STATUS                    PORTS
abc123def456   task-mcp-server:local      Up 2 minutes (healthy)    0.0.0.0:8080->8080/tcp

$ docker images task-mcp-server:local
REPOSITORY           TAG       IMAGE ID       CREATED         SIZE
task-mcp-server      local     abc123def456   2 minutes ago   178MB
```

## Notes

- Local testing ensures Docker configuration works before Cloud Run deployment
- .env file should never be committed (already in .gitignore)
- Health check takes ~5 seconds to start (start-period in Dockerfile)
- Container should start in < 10 seconds
- Based on remember-mcp-server testing process

## Troubleshooting

### Issue: Container fails to start

**Solution**: Check logs for errors:
```bash
docker logs <container-id>
```

### Issue: Health check fails

**Solution**: Verify server is listening on port 8080 and /mcp/health endpoint exists.

### Issue: Environment variables not loaded

**Solution**: Verify .env file exists and --env-file path is correct.

### Issue: Image size too large (> 300MB)

**Solution**: Check that multi-stage build is working correctly and only production dependencies are included.

---

**Previous Task**: [Task 10: Create Cloud Build Configuration](task-10-cloudbuild.md)
**Next Task**: [Task 12: Deploy to Cloud Run](task-12-deploy-cloudrun.md)
