# Task 8: Integrate task-mcp Base Server

**Milestone**: Milestone 2 - Server Implementation
**Estimated Time**: 1 hour
**Dependencies**: Task 7
**Status**: Not Started

---

## Objective

Verify that @prmichaelsen/task-mcp is properly integrated and working. Test that the server factory creates per-user task servers correctly using the factory pattern without tokenResolver.

## Steps

### 1. Verify task-mcp Installation

```bash
npm list @prmichaelsen/task-mcp
```

Should show version 0.4.0 or higher.

### 2. Review task-mcp Factory API

Check the task-mcp documentation or source to understand:
- `createServer(accessToken, userId, options)` factory function signature
- Factory pattern: `@prmichaelsen/task-mcp/factory`
- Required parameters: accessToken (JWT), userId, options (name, version)
- No tokenResolver needed - server uses static configuration
- Tool naming convention (task_ prefix)
- Per-user isolation mechanism

### 3. Verify Factory Import

Ensure the correct import in `src/index.ts`:

```typescript
import { createServer as createTaskServer } from '@prmichaelsen/task-mcp/factory';
```

### 4. Test Server Creation

Start the server and verify it creates task-mcp instances:

```bash
# Set environment variables (sample call without real secrets)
export PLATFORM_URL=https://agentbase.me
export PLATFORM_SERVICE_TOKEN=your-service-token-here
export PORT=8080
export CORS_ORIGIN=https://agentbase.me

# Start server
npm run dev
```

Look for startup messages:
```
Platform JWT auth provider initialized
✅ Task MCP Server started successfully
📡 Listening on port 8080
🔗 Endpoint: http://0.0.0.0:8080/mcp
🏥 Health check: http://0.0.0.0:8080/mcp/health
```

### 5. Verify Tool Naming

The task-mcp server should expose tools with `task_` prefix:
- `task_create`
- `task_list`
- `task_update`
- `task_delete`
- etc.

### 6. Verify Server Factory Pattern

Confirm the serverFactory implementation in `src/index.ts`:

```typescript
serverFactory: async (accessToken: string, userId: string) => {
  // Note: No tokenResolver needed - this server uses static configuration
  return await createTaskServer(accessToken, userId, {
    name: 'task-mcp-server',
    version: '0.2.0',
  });
}
```

**Key points**:
- Uses factory pattern from `@prmichaelsen/task-mcp/factory`
- Passes JWT accessToken (from Platform JWT auth)
- Passes userId for per-user isolation
- No tokenResolver parameter (server is static)
- Each user gets their own isolated task server instance

## Verification

- [ ] @prmichaelsen/task-mcp installed (v0.4.0+)
- [ ] createServer imported from factory module correctly
- [ ] Server factory accepts accessToken and userId parameters
- [ ] No tokenResolver passed (static configuration)
- [ ] TypeScript compiles without errors
- [ ] Server starts without errors
- [ ] Startup messages show successful initialization
- [ ] Tools have task_ prefix (verify in task-mcp docs)
- [ ] Per-user isolation implemented via userId parameter

## Expected Output

```bash
$ npm run dev
Platform JWT auth provider initialized
✅ Task MCP Server started successfully
📡 Listening on port 8080
🔗 Endpoint: http://0.0.0.0:8080/mcp
🏥 Health check: http://0.0.0.0:8080/mcp/health
```

## Notes

- task-mcp v0.4.0+ has built-in multi-tenant support
- Uses factory pattern: `@prmichaelsen/task-mcp/factory`
- Each userId gets isolated Firestore collections
- Tools are prefixed with `task_` by task-mcp library
- No tokenResolver needed - server uses static configuration
- JWT accessToken passed from Platform JWT auth provider
- SSE transport instead of stdio for web-based clients

## Troubleshooting

### Issue: createServer not found

**Solution**: Verify import statement uses factory module:
```typescript
import { createServer as createTaskServer } from '@prmichaelsen/task-mcp/factory';
```

### Issue: TypeScript errors

**Solution**: Check that @prmichaelsen/task-mcp has TypeScript definitions. May need to add type declarations if not included.

### Issue: JWT authentication errors

**Solution**: Verify PLATFORM_SERVICE_TOKEN is set correctly and matches the token used to sign JWTs.

---

**Previous Task**: [Task 7: Add Health Check Endpoint](task-7-health-check.md)
**Next Task**: [Task 9: Create Dockerfile](task-9-dockerfile.md)
