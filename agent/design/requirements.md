# task-mcp-server Requirements

**Project**: task-mcp-server
**Created**: 2026-02-16
**Status**: Design Specification

---

## Overview

task-mcp-server is the deployment wrapper for @prmichaelsen/task-mcp MCP server. It provides Docker configuration, Cloud Run deployment scripts, and environment setup for running the MCP server in production with mcp-auth wrapper.

## Problem Statement

The @prmichaelsen/task-mcp library needs:
1. Deployment configuration for Cloud Run
2. Docker container setup
3. Environment variable management
4. Service account configuration
5. Deployment automation scripts
6. Integration with mcp-auth wrapper

These deployment concerns should be separate from the core library.

## Solution

Create a deployment wrapper project that:
1. Uses @prmichaelsen/task-mcp as a dependency
2. Provides Dockerfile for containerization
3. Provides Cloud Run configuration
4. Provides deployment scripts
5. Documents environment setup
6. Integrates with mcp-auth for authentication

---

## Goals and Objectives

### Primary Goals

1. **Docker Configuration**: Create Dockerfile for MCP server
2. **Cloud Run Setup**: Configure Cloud Run deployment
3. **Environment Management**: Document all environment variables
4. **Deployment Automation**: Create deployment scripts
5. **mcp-auth Integration**: Configure mcp-auth wrapper

---

## Functional Requirements

### Core Features

1. **Dockerfile**
   - Node.js 20 base image
   - Install @prmichaelsen/task-mcp
   - Install mcp-auth wrapper
   - Configure entrypoint
   - Optimize for production

2. **Cloud Run Configuration**
   - Service configuration (memory, CPU, scaling)
   - Environment variables
   - Service account setup
   - IAM permissions

3. **Deployment Scripts**
   - Build Docker image
   - Push to Container Registry
   - Deploy to Cloud Run
   - Configure secrets

4. **Environment Configuration**
   - Firebase service account
   - Project ID
   - mcp-auth configuration
   - Logging configuration

---

## Technical Requirements

### Technology Stack

- **Runtime**: Node.js 20
- **Container**: Docker
- **Platform**: Google Cloud Run
- **Library**: @prmichaelsen/task-mcp v0.4.0+
- **Auth**: mcp-auth wrapper

### Dependencies

- `@prmichaelsen/task-mcp` - MCP server library
- `mcp-auth` - Authentication wrapper

---

## Success Criteria

### MVP Success Criteria

- [ ] Dockerfile builds successfully
- [ ] Can deploy to Cloud Run
- [ ] Environment variables configured
- [ ] Service account working
- [ ] mcp-auth integration working
- [ ] MCP server accessible via stdio
- [ ] Documentation complete

---

## References

- [@prmichaelsen/task-mcp](https://github.com/prmichaelsen/task-mcp)
- [mcp-auth](https://github.com/prmichaelsen/mcp-auth)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Docker Documentation](https://docs.docker.com/)

---

**Status**: Design Specification
**Next Action**: Create Milestone 1 and task documents
