# Task 4: Create Configuration Files

**Milestone**: Milestone 1 - Project Setup
**Estimated Time**: 0.5 hours
**Dependencies**: Task 3
**Status**: Not Started

---

## Objective

Create essential configuration files: .gitignore, .dockerignore, and .env.example for proper version control, Docker builds, and environment management.

## Steps

### 1. Create .gitignore

Create `.gitignore`:

```gitignore
# Dependencies
node_modules/

# Build output
dist/
*.tsbuildinfo

# Environment files
.env
.env.local
.env.*.local

# Service accounts and secrets
*.json
!package.json
!tsconfig.json
!cloudbuild.yaml

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
.cache/
```

### 2. Create .dockerignore

Create `.dockerignore`:

```dockerignore
# Version control
.git/
.gitignore

# Dependencies (will be installed in container)
node_modules/

# Build output (will be built in container)
dist/

# Environment files
.env
.env.local
.env.*.local

# Documentation
README.md
CHANGELOG.md
agent/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
.cache/
```

### 3. Create .env.example

Create `.env.example`:

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

# Task MCP Configuration
# User ID will be set by mcp-auth wrapper automatically
# TASK_MCP_USER_ID=will-be-set-by-mcp-auth
```

### 4. Verify Configuration Files

Check that all files are created and properly formatted:

```bash
ls -la | grep -E "^\.(gitignore|dockerignore|env\.example)"
```

## Verification

- [ ] .gitignore created
- [ ] .gitignore excludes node_modules/, dist/, .env files
- [ ] .gitignore allows package.json and tsconfig.json
- [ ] .dockerignore created
- [ ] .dockerignore excludes unnecessary files for Docker
- [ ] .env.example created
- [ ] .env.example documents all required environment variables
- [ ] .env.example has placeholder values (no real secrets)
- [ ] All files have proper line endings (LF, not CRLF)

## Expected Output

```bash
$ ls -la
-rw-r--r--  .dockerignore
-rw-r--r--  .env.example
-rw-r--r--  .gitignore
```

## Security Notes

- ⚠️ Never commit .env files with real secrets
- ⚠️ .gitignore excludes all .json files except config files
- ⚠️ Service account files must never be in version control
- ✅ .env.example is safe to commit (placeholder values only)

## Notes

- .gitignore based on remember-mcp-server
- .dockerignore optimizes Docker build context
- .env.example documents all environment variables
- Follows security best practices

---

**Previous Task**: [Task 3: Create Project Structure](task-3-project-structure.md)
**Next Task**: [Task 5: Create README Documentation](task-5-readme-documentation.md)
