# task-mcp-server

Deployment wrapper for @prmichaelsen/task-mcp MCP server. Provides Docker configuration, Cloud Run setup, and deployment automation for running the MCP server in production with mcp-auth wrapper.

## Overview

task-mcp-server handles the deployment of the task-mcp MCP server to Google Cloud Run. It uses @prmichaelsen/task-mcp library and integrates with mcp-auth for multi-tenant authentication.

## Features

- ✅ Docker containerization
- ✅ Cloud Run deployment configuration
- ✅ mcp-auth integration for multi-tenant support
- ✅ Environment variable management
- ✅ Automated deployment via Cloud Build
- ✅ Health check endpoint
- ✅ TypeScript with strict type checking

## Architecture

```
┌─────────────────────────────────────┐
│      task-mcp-server (Cloud Run)    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │       mcp-auth wrapper        │ │
│  │   (multi-tenant auth)         │ │
│  └───────────────────────────────┘ │
│              │                      │
│              ▼                      │
│  ┌───────────────────────────────┐ │
│  │  @prmichaelsen/task-mcp       │ │
│  │  (MCP server library)         │ │
│  └───────────────────────────────┘ │
│              │                      │
└──────────────┼──────────────────────┘
               │
               ▼
        ┌─────────────┐
        │  Firestore  │
        └─────────────┘
```

## Prerequisites

- Node.js 20+
- Docker (for containerization)
- Google Cloud account
- Firebase project with Firestore
- gcloud CLI (for deployment)

## Installation

```bash
# Clone repository
git clone https://github.com/prmichaelsen/task-mcp-server.git
cd task-mcp-server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
```

## Environment Variables

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Server Configuration
NODE_ENV=production
LOG_LEVEL=info
PORT=8080

# mcp-auth Configuration (optional)
PLATFORM_URL=https://agentbase.me
PLATFORM_SERVICE_TOKEN=your-service-token
CORS_ORIGIN=https://agentbase.me
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Run production build
npm start
```

## Deployment

### Local Docker Testing

```bash
# Build Docker image
docker build -t task-mcp-server .

# Run container
docker run -p 8080:8080 --env-file .env task-mcp-server

# Test health check
curl http://localhost:8080/mcp/health
```

### Deploy to Cloud Run

```bash
# Using Cloud Build (recommended)
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly
gcloud run deploy task-mcp-server \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

## Project Structure

```
task-mcp-server/
├── src/
│   └── index.ts          # Main server entry point
├── agent/                # ACP documentation
│   ├── design/           # Design documents
│   ├── milestones/       # Project milestones
│   ├── tasks/            # Task breakdowns
│   └── progress.yaml     # Progress tracking
├── dist/                 # Compiled JavaScript
├── Dockerfile            # Container configuration
├── cloudbuild.yaml       # Cloud Build config
├── package.json          # Project manifest
├── tsconfig.json         # TypeScript config
├── .env.example          # Environment template
└── README.md             # This file
```

## Documentation

See [`agent/`](agent/) directory for:
- Design documents
- Milestones and tasks
- Progress tracking
- Development patterns

## Health Check

The server provides a health check endpoint at `/mcp/health`:

```bash
curl http://localhost:8080/mcp/health
# Response: {"status":"healthy"}
```

## License

MIT

## Related Projects

- [@prmichaelsen/task-mcp](https://github.com/prmichaelsen/task-mcp) - Core MCP server library
- [@prmichaelsen/mcp-auth](https://github.com/prmichaelsen/mcp-auth) - Authentication wrapper
- [remember-mcp-server](https://github.com/prmichaelsen/remember-mcp-server) - Similar deployment wrapper
