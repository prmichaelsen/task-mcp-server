# Task 6: Implement Main Server

**Milestone**: Milestone 2 - Server Implementation
**Estimated Time**: 2 hours
**Dependencies**: Task 5
**Status**: Not Started

---

## Objective

Implement the main server entry point using mcp-auth wrapper and @prmichaelsen/task-mcp. Configure environment variables, add validation, and implement graceful shutdown.

## Steps

### 1. Read remember-mcp-server Implementation

Review the reference implementation:

```bash
cat /home/prmichaelsen/remember-mcp-server/src/index.ts
```

Study how it:
- Uses wrapServer() from mcp-auth
- Configures environment variables
- Implements server factory
- Handles graceful shutdown

### 2. Implement src/index.ts

Create `src/index.ts`:

```typescript
import { wrapServer } from '@prmichaelsen/mcp-auth';
import { createServer } from '@prmichaelsen/task-mcp';

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_SERVICE_ACCOUNT_JSON',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Parse Firebase service account JSON
let firebaseConfig;
try {
  firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
} catch (error) {
  console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', error);
  process.exit(1);
}

// Server configuration
const config = {
  serverName: 'task-mcp-server',
  serverVersion: '0.1.0',
  port: parseInt(process.env.PORT || '8080', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  platformUrl: process.env.PLATFORM_URL,
  platformServiceToken: process.env.PLATFORM_SERVICE_TOKEN,
};

console.log('Starting task-mcp-server...');
console.log('Configuration:', {
  ...config,
  platformServiceToken: config.platformServiceToken ? '***' : undefined,
});

// Wrap the task-mcp server with mcp-auth
const server = wrapServer({
  ...config,
  createServer: (userId: string) => {
    console.log(`Creating task-mcp server for user: ${userId}`);
    
    return createServer({
      userId,
      firebaseConfig,
    });
  },
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close();
  process.exit(0);
});

console.log(`Server listening on port ${config.port}`);
console.log(`Health check available at http://localhost:${config.port}/mcp/health`);
```

### 3. Test TypeScript Compilation

```bash
npm run type-check
npm run build
```

### 4. Test Development Mode

```bash
# Set required environment variables
export FIREBASE_PROJECT_ID=test-project
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"test"}'

# Run in development mode
npm run dev
```

## Verification

- [ ] src/index.ts created with complete implementation
- [ ] Environment variable validation implemented
- [ ] Firebase config parsing implemented
- [ ] wrapServer() from mcp-auth used correctly
- [ ] createServer() from task-mcp used correctly
- [ ] Graceful shutdown handlers added
- [ ] TypeScript compiles without errors
- [ ] Development mode starts without errors
- [ ] Server logs configuration on startup
- [ ] Health check endpoint mentioned in logs

## Expected Output

```bash
$ npm run dev
Starting task-mcp-server...
Configuration: {
  serverName: 'task-mcp-server',
  serverVersion: '0.1.0',
  port: 8080,
  corsOrigin: '*',
  platformUrl: undefined,
  platformServiceToken: undefined
}
Server listening on port 8080
Health check available at http://localhost:8080/mcp/health
```

## Notes

- Based on remember-mcp-server implementation
- mcp-auth handles authentication automatically
- task-mcp handles per-user task isolation
- Health check provided by mcp-auth wrapper
- Graceful shutdown ensures clean process termination

---

**Previous Task**: [Task 5: Create README Documentation](task-5-readme-documentation.md)
**Next Task**: [Task 7: Add Health Check Endpoint](task-7-health-check.md)
