# Task 7: Add Health Check Endpoint

**Milestone**: Milestone 2 - Server Implementation
**Estimated Time**: 0.25 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Verify that the health check endpoint is working correctly. The health check is provided automatically by mcp-auth wrapper at `/mcp/health`.

## Steps

### 1. Start the Server

```bash
# Set environment variables
export FIREBASE_PROJECT_ID=test-project
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"test"}'

# Start server
npm run dev
```

### 2. Test Health Check Endpoint

In another terminal:

```bash
# Test health check
curl http://localhost:8080/mcp/health

# Expected response:
# {"status":"healthy"}
```

### 3. Verify Health Check in Code

The health check is provided by mcp-auth wrapper automatically. No additional code needed in src/index.ts.

Verify the endpoint is mentioned in startup logs:

```typescript
console.log(`Health check available at http://localhost:${config.port}/mcp/health`);
```

## Verification

- [ ] Server starts successfully
- [ ] Health check endpoint responds at /mcp/health
- [ ] Response is {"status":"healthy"}
- [ ] No authentication required for health check
- [ ] Health check works in development mode
- [ ] Startup logs mention health check endpoint

## Expected Output

```bash
$ curl http://localhost:8080/mcp/health
{"status":"healthy"}

$ curl -v http://localhost:8080/mcp/health
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 21
<
{"status":"healthy"}
```

## Notes

- Health check provided by mcp-auth wrapper (no custom code needed)
- Available at `/mcp/health` endpoint
- Returns 200 OK with JSON response
- No authentication required
- Used by Docker HEALTHCHECK and Cloud Run health checks
- Based on remember-mcp-server pattern

---

**Previous Task**: [Task 6: Implement Main Server](task-6-main-server.md)
**Next Task**: [Task 8: Integrate task-mcp Base Server](task-8-integrate-base.md)
