# Task 15: Add Upload Secrets Utility Script

**Milestone**: Additional Tasks (Post-M3)
**Estimated Time**: 0.5 hours
**Dependencies**: Task 10
**Status**: Completed

---

## Objective

Add utility script for uploading secrets from .env file to Google Cloud Secret Manager, simplifying the deployment process.

## Steps

### 1. Copy Script from remember-mcp-server

```bash
mkdir -p scripts
cp /home/prmichaelsen/remember-mcp-server/scripts/upload-secrets.ts scripts/
cp /home/prmichaelsen/remember-mcp-server/scripts/README.md scripts/
```

### 2. Add npm Script

Update `package.json` to add script command:

```json
{
  "scripts": {
    "script": "tsx",
    "script:upload-secrets": "tsx scripts/upload-secrets.ts"
  }
}
```

### 3. Test Script

```bash
# Test script help
npm run script:upload-secrets -- --help

# Dry run (will fail without .env but shows usage)
npm run script:upload-secrets -- --service task
```

## Verification

- [ ] scripts/ directory created
- [ ] scripts/upload-secrets.ts copied
- [ ] scripts/README.md copied
- [ ] npm script added: script:upload-secrets
- [ ] Script is executable
- [ ] Script shows usage when run without args

## Features

The upload-secrets.ts script:
- Reads secrets from .env file
- Uploads to Google Cloud Secret Manager
- Prefixes secret names with service name (e.g., `task-`)
- Creates new secrets or updates existing ones
- Skips non-secret variables (NODE_ENV, PORT, etc.)
- Provides summary of uploaded secrets
- Shows Cloud Run deployment command with secrets

## Usage

```bash
# Upload all secrets from .env with 'task-' prefix
npm run script:upload-secrets -- --service task

# Use specific project
npm run script:upload-secrets -- --service task --project my-project-id

# Use different env file
npm run script:upload-secrets -- --service task --env-file .env.production
```

## Example Output

```bash
$ npm run script:upload-secrets -- --service task

Reading secrets from: .env
Using project from gcloud config: my-project-id

Found 3 secrets to upload:
  - FIREBASE_PROJECT_ID: my-project...
  - FIREBASE_SERVICE_ACCOUNT_JSON: {"type":"s...
  - PLATFORM_SERVICE_TOKEN: fWi93Xrqr...

Uploading to project: my-project-id
────────────────────────────────────────────────────────
🆕 Creating task-firebase-project-id...
✅ Created task-firebase-project-id
🆕 Creating task-firebase-service-account-json...
✅ Created task-firebase-service-account-json
🆕 Creating task-platform-service-token...
✅ Created task-platform-service-token
────────────────────────────────────────────────────────

📊 Summary:
   ✅ Success: 3
   ❌ Failed: 0
   📦 Total: 3
```

## Notes

- Based on remember-mcp-server utility script
- Simplifies secret management for Cloud Run
- Automatically handles secret name formatting
- Safe to run multiple times (updates existing secrets)
- Requires gcloud CLI and authentication

---

**Previous Task**: [Task 10: Create Cloud Build Configuration](task-10-cloudbuild.md)
**Next Task**: [Task 11: Test Docker Locally](task-11-test-docker.md)
**Completion Date**: 2026-02-19
