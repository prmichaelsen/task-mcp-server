# Task 6: Implement Main Server

**Milestone**: Milestone 2 - Server Implementation
**Estimated Time**: 2 hours
**Dependencies**: Task 5
**Status**: Not Started

---

## Objective

Implement the main server entry point using mcp-auth wrapper with Platform JWT authentication and @prmichaelsen/task-mcp. Configure SSE transport, add validation, and implement graceful shutdown.

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

### 2. Create Platform JWT Provider

Create `src/auth/platform-jwt-provider.ts`:

```typescript
import type { AuthProvider, AuthResult, RequestContext } from '@prmichaelsen/mcp-auth';
import jwt from 'jsonwebtoken';

export interface PlatformJWTProviderConfig {
  serviceToken: string;
  issuer: string;
  audience: string;
  cacheResults?: boolean;
  cacheTtl?: number;
}

export class PlatformJWTProvider implements AuthProvider {
  private config: PlatformJWTProviderConfig;
  private authCache = new Map<string, { result: AuthResult; expiresAt: number }>();
  public jwtTokenCache = new Map<string, string>();
  
  constructor(config: PlatformJWTProviderConfig) {
    this.config = config;
  }
  
  async initialize(): Promise<void> {
    console.log('Platform JWT auth provider initialized');
  }
  
  async authenticate(context: RequestContext): Promise<AuthResult> {
    try {
      const authHeader = context.headers?.['authorization'];
      
      if (!authHeader || Array.isArray(authHeader)) {
        return { authenticated: false, error: 'No authorization header' };
      }
      
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return { authenticated: false, error: 'Invalid authorization format' };
      }
      
      const token = parts[1];
      
      // Check cache
      if (this.config.cacheResults) {
        const cached = this.authCache.get(token);
        if (cached && Date.now() < cached.expiresAt) {
          return cached.result;
        }
      }
      
      // Verify JWT
      const decoded = jwt.verify(token, this.config.serviceToken, {
        issuer: this.config.issuer,
        audience: this.config.audience
      }) as { userId: string; email?: string };
      
      // Store JWT for forwarding to credentials API
      this.jwtTokenCache.set(decoded.userId, token);
      
      const result: AuthResult = {
        authenticated: true,
        userId: decoded.userId,
        metadata: { email: decoded.email }
      };
      
      // Cache result
      if (this.config.cacheResults) {
        const ttl = this.config.cacheTtl || 60000;
        this.authCache.set(token, {
          result,
          expiresAt: Date.now() + ttl
        });
      }
      
      return result;
    } catch (error) {
      return {
        authenticated: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }
  
  async cleanup(): Promise<void> {
    this.authCache.clear();
    this.jwtTokenCache.clear();
  }
}
```

### 3. Implement src/index.ts

Create `src/index.ts`:

```typescript
#!/usr/bin/env node

import { wrapServer } from '@prmichaelsen/mcp-auth';
import { createServer as createTaskServer } from '@prmichaelsen/task-mcp/factory';
import { PlatformJWTProvider } from './auth/platform-jwt-provider.js';

// Configuration
const config = {
  platform: {
    url: process.env.PLATFORM_URL!,
    serviceToken: process.env.PLATFORM_SERVICE_TOKEN!
  },
  server: {
    port: parseInt(process.env.PORT || '8080')
  }
};

// Validate required configuration
if (!config.platform.serviceToken) {
  console.error('Error: PLATFORM_SERVICE_TOKEN environment variable is required');
  process.exit(1);
}

if (!config.platform.url) {
  console.error('Error: PLATFORM_URL environment variable is required');
  process.exit(1);
}

// Create auth provider
const authProvider = new PlatformJWTProvider({
  serviceToken: config.platform.serviceToken,
  issuer: 'agentbase.me',
  audience: 'mcp-server',
  cacheResults: true,
  cacheTtl: 60000 // 60 seconds
});

// Wrap server with authentication
const wrappedServer = wrapServer({
  serverFactory: async (accessToken: string, userId: string) => {
    // Note: No tokenResolver needed - this server uses static configuration
    return await createTaskServer(accessToken, userId, {
      name: 'task-mcp-server',
      version: '0.2.0',
    });
  },
  authProvider,
  resourceType: 'task',
  transport: {
    type: 'sse',
    port: config.server.port,
    host: '0.0.0.0',
    basePath: '/mcp',
    cors: true,
    corsOrigin: process.env.CORS_ORIGIN || 'https://agentbase.me'
  },
  middleware: {
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60 * 60 * 1000 // 1 hour
    },
    logging: {
      enabled: true,
      level: 'info'
    }
  }
});

// Start server
async function main() {
  try {
    await wrappedServer.start();
    console.log(`✅ Task MCP Server started successfully`);
    console.log(`📡 Listening on port ${config.server.port}`);
    console.log(`🔗 Endpoint: http://0.0.0.0:${config.server.port}/mcp`);
    console.log(`🏥 Health check: http://0.0.0.0:${config.server.port}/mcp/health`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

main();
```

### 4. Add jsonwebtoken Dependency

```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

### 5. Test TypeScript Compilation

```bash
npm run type-check
npm run build
```

### 6. Test Development Mode (Sample Call)

```bash
# Set required environment variables (use placeholder values for testing)
export PLATFORM_URL=https://agentbase.me
export PLATFORM_SERVICE_TOKEN=your-service-token-here
export PORT=8080
export CORS_ORIGIN=https://agentbase.me

# Run in development mode
npm run dev
```

**Expected console output:**
```
Platform JWT auth provider initialized
✅ Task MCP Server started successfully
📡 Listening on port 8080
🔗 Endpoint: http://0.0.0.0:8080/mcp
🏥 Health check: http://0.0.0.0:8080/mcp/health
```

## Verification

- [ ] src/auth/platform-jwt-provider.ts created
- [ ] PlatformJWTProvider implements AuthProvider interface
- [ ] JWT verification with issuer and audience checks
- [ ] Token caching implemented (60s TTL)
- [ ] src/index.ts created with complete implementation
- [ ] Environment variable validation implemented
- [ ] Platform JWT auth provider configured
- [ ] wrapServer() from mcp-auth used correctly
- [ ] createTaskServer() from task-mcp/factory used correctly
- [ ] SSE transport configured with CORS
- [ ] Rate limiting middleware enabled
- [ ] No tokenResolver passed (static server configuration)
- [ ] Graceful shutdown handlers added
- [ ] TypeScript compiles without errors
- [ ] Development mode starts without errors
- [ ] Server logs startup information

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

- Uses Platform JWT authentication instead of Firebase auth
- SSE transport for web-based MCP clients (not stdio)
- No tokenResolver needed - server uses static configuration
- JWT tokens verified using PLATFORM_SERVICE_TOKEN as secret
- Token caching improves performance (60s TTL)
- Rate limiting: 100 requests per hour per user
- CORS enabled for agentbase.me platform
- Health check provided by mcp-auth wrapper at /mcp/health
- Graceful shutdown ensures clean process termination

---

**Previous Task**: [Task 5: Create README Documentation](task-5-readme-documentation.md)
**Next Task**: [Task 7: Add Health Check Endpoint](task-7-health-check.md)
