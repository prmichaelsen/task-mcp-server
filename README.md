# task-mcp-server

Deployment wrapper for @prmichaelsen/task-mcp MCP server. Provides Docker configuration, Cloud Run setup, and deployment automation for running the MCP server in production with mcp-auth wrapper.

## Overview

task-mcp-server handles the deployment of the task-mcp MCP server to Google Cloud Run. It uses @prmichaelsen/task-mcp library and integrates with mcp-auth for multi-tenant authentication.

## Features

- ✅ Docker containerization
- ✅ Cloud Run deployment configuration
- ✅ mcp-auth integration
- ✅ Environment variable management
- ✅ Service account setup
- ✅ Automated deployment scripts

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

## Environment Variables

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Server Configuration
NODE_ENV=production
LOG_LEVEL=info

# mcp-auth Configuration
MCP_AUTH_ENABLED=true
```

## Deployment

### Prerequisites

- Google Cloud account
- Firebase project with Firestore
- Service account with Firestore permissions
- Docker installed
- gcloud CLI installed

### Deploy to Cloud Run

```bash
./scripts/deploy.sh
```

## Development

This project is deployment-only. For development of the MCP server itself, see [@prmichaelsen/task-mcp](https://github.com/prmichaelsen/task-mcp).

## Documentation

See [`agent/`](agent/) directory for:
- Design documents
- Milestones and tasks
- Progress tracking
- Deployment patterns

## License

MIT
