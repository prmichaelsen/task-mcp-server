import { wrapServer, EnvAuthProvider, SimpleTokenResolver } from '@prmichaelsen/mcp-auth';
import { createServer } from '@prmichaelsen/task-mcp/factory';

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

// Server configuration
const config = {
  serverName: 'task-mcp-server',
  serverVersion: '0.1.0',
  port: parseInt(process.env.PORT || '8080', 10),
};

console.log('Starting task-mcp-server...');
console.log('Configuration:', config);

// Wrap the task-mcp server with mcp-auth
const server = wrapServer({
  serverFactory: async (accessToken: string, userId: string) => {
    console.log(`Creating task-mcp server for user: ${userId}`);
    
    return createServer(accessToken, userId, {
      name: config.serverName,
      version: config.serverVersion,
    });
  },
  authProvider: new EnvAuthProvider({
    userIdEnvVar: 'TASK_MCP_USER_ID',
  }),
  tokenResolver: new SimpleTokenResolver({
    tokenEnvVar: 'TASK_MCP_ACCESS_TOKEN',
  }),
  resourceType: 'task',
  transport: {
    type: 'stdio',
  },
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start server
server.start().then(() => {
  console.log('Server started successfully');
  console.log(`Server: ${config.serverName} v${config.serverVersion}`);
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
