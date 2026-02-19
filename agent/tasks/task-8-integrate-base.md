# Task 8: Integrate task-mcp Base Server

**Milestone**: Milestone 2 - Server Implementation
**Estimated Time**: 1 hour
**Dependencies**: Task 7
**Status**: Not Started

---

## Objective

Verify that @prmichaelsen/task-mcp is properly integrated and working. Test that the server factory creates per-user task servers correctly.

## Steps

### 1. Verify task-mcp Installation

```bash
npm list @prmichaelsen/task-mcp
```

Should show version 0.4.0 or higher.

### 2. Review task-mcp API

Check the task-mcp documentation or source to understand:
- `createServer(options)` function signature
- Required options (userId, firebaseConfig)
- Tool naming convention (task_ prefix)
- Per-user isolation mechanism

### 3. Test Server Creation

Start the server and verify it creates task-mcp instances:

```bash
# Set environment variables
export FIREBASE_PROJECT_ID=your-test-project
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'

# Start server
npm run dev
```

Look for log messages indicating task-mcp server creation:
```
Creating task-mcp server for user: test-user-123
```

### 4. Verify Tool Naming

The task-mcp server should expose tools with `task_` prefix:
- `task_create`
- `task_list`
- `task_update`
- `task_delete`
- etc.

### 5. Test Per-User Isolation

Verify that each user gets their own task-mcp server instance:

```typescript
// In src/index.ts, the createServer function is called per user:
createServer: (userId: string) => {
  console.log(`Creating task-mcp server for user: ${userId}`);
  
  return createServer({
    userId,  // Each user gets their own isolated server
    firebaseConfig,
  });
}
```

## Verification

- [ ] @prmichaelsen/task-mcp installed (v0.4.0+)
- [ ] createServer imported correctly
- [ ] Server factory accepts userId parameter
- [ ] Firebase config passed to createServer
- [ ] TypeScript compiles without errors
- [ ] Server starts without errors
- [ ] Log messages show server creation per user
- [ ] Tools have task_ prefix (verify in task-mcp docs)
- [ ] Per-user isolation implemented

## Expected Output

```bash
$ npm run dev
Starting task-mcp-server...
Configuration: { ... }
Server listening on port 8080
Health check available at http://localhost:8080/mcp/health

# When a user connects:
Creating task-mcp server for user: user-abc-123
```

## Notes

- task-mcp v0.4.0+ has built-in multi-tenant support
- Each userId gets isolated Firestore collections
- Tools are prefixed with `task_` by task-mcp library
- No custom authentication needed (handled by mcp-auth)
- Based on remember-mcp-server integration pattern

## Troubleshooting

### Issue: createServer not found

**Solution**: Verify import statement:
```typescript
import { createServer } from '@prmichaelsen/task-mcp';
```

### Issue: TypeScript errors

**Solution**: Check that @prmichaelsen/task-mcp has TypeScript definitions. May need to add type declarations if not included.

### Issue: Firebase connection errors

**Solution**: Verify FIREBASE_SERVICE_ACCOUNT_JSON is valid JSON and has correct permissions.

---

**Previous Task**: [Task 7: Add Health Check Endpoint](task-7-health-check.md)
**Next Task**: [Task 9: Create Dockerfile](task-9-dockerfile.md)
