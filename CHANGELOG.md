# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-02-19

### Added
- Platform JWT authentication provider for agentbase.me integration
- SSE transport with CORS support for web-based MCP clients
- Rate limiting middleware (100 requests per hour)
- Request logging middleware
- JWT token caching (60s TTL) for performance
- Platform service token secret management

### Changed
- Server transport from stdio to SSE for platform integration
- Environment configuration to include PLATFORM_URL and PLATFORM_SERVICE_TOKEN
- Cloud Build configuration to include platform service token secret
- Server now listens on HTTP endpoint at /mcp instead of stdio

### Implementation
- Created `src/auth/platform-jwt-provider.ts` with JWT validation
- Updated `src/index.ts` to use Platform JWT auth
- Added jsonwebtoken dependency for JWT verification
- Configured SSE transport on port 8080 with /mcp base path
- Added CORS configuration for agentbase.me

## [0.1.0] - 2026-02-19

### Added
- Initial project setup with TypeScript and Node.js 20
- Integration with @prmichaelsen/task-mcp v0.4.0
- Integration with @prmichaelsen/mcp-auth v7.0.4
- Multi-stage Dockerfile for optimized production builds
- Cloud Build configuration for automated deployment
- Comprehensive project documentation and task breakdown
- 4 milestones with 14 tasks following ACP methodology
- Health check endpoint at /mcp/health
- Environment variable management with .env.example
- Git repository with proper .gitignore and .dockerignore

### Features
- Multi-tenant task management via task-mcp
- Firebase/Firestore integration for data persistence
- Docker containerization with health checks
- Cloud Run deployment configuration
- Auto-scaling (0-10 instances)
- TypeScript with strict type checking
