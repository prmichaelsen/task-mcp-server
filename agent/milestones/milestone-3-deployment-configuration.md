# Milestone 3: Deployment Configuration

**Goal**: Create Docker container and Cloud Build configuration
**Duration**: 2-3 hours
**Dependencies**: Milestone 2
**Status**: Not Started

---

## Overview

This milestone creates the deployment configuration for running task-mcp-server on Google Cloud Run. We'll create a multi-stage Dockerfile for optimized container images and configure Cloud Build for automated deployments.

## Deliverables

1. **Docker Container**
   - Multi-stage Dockerfile
   - Optimized image size
   - Health check configuration
   - Production-ready setup

2. **Cloud Build Configuration**
   - `cloudbuild.yaml` for automated builds
   - Container Registry integration
   - Cloud Run deployment automation
   - Secret management configuration

3. **Local Testing**
   - Docker image builds successfully
   - Container runs locally
   - Health check works in container
   - Environment variables configured

## Success Criteria

- [ ] Dockerfile builds successfully
- [ ] Docker image is optimized (< 200MB)
- [ ] Container starts without errors
- [ ] Health check works in container
- [ ] cloudbuild.yaml is valid
- [ ] Local testing passes
- [ ] Ready for Cloud Run deployment

## Key Files to Create

1. `Dockerfile` - Multi-stage container definition
2. `cloudbuild.yaml` - Cloud Build configuration
3. `.dockerignore` - Docker ignore patterns (if not already created)

## Tasks

This milestone consists of the following tasks:
1. [Task 9: Create Dockerfile](../tasks/task-9-dockerfile.md)
2. [Task 10: Create Cloud Build Configuration](../tasks/task-10-cloudbuild.md)
3. [Task 11: Test Docker Locally](../tasks/task-11-test-docker.md)

---

**Previous Milestone**: [Milestone 2: Server Implementation](milestone-2-server-implementation.md)
**Next Milestone**: [Milestone 4: Production Deployment](milestone-4-production-deployment.md)
**Blockers**: None
