# Command: deploy

> **🤖 Agent Directive**: If you are reading this file, the command `@local.deploy` has been invoked. Follow the steps below to execute this command.

**Namespace**: local
**Version**: 1.0.0
**Created**: 2026-02-19
**Last Updated**: 2026-02-19
**Status**: Active

---

**Purpose**: Update dependencies and deploy the task-mcp-server to Google Cloud Run
**Category**: Deployment
**Frequency**: As Needed

---

## What This Command Does

This command automates the deployment process for the task-mcp-server to Google Cloud Run. It updates the `@prmichaelsen/task-mcp` dependency to the latest version, commits the changes, and triggers a Cloud Build deployment using the project's `cloudbuild.yaml` configuration.

Use this command when you need to deploy updates to production, especially after the base task-mcp package has been updated. The command ensures you're always deploying with the latest dependencies and creates a traceable deployment linked to a specific git commit SHA.

This is a local deployment workflow that requires Google Cloud SDK (`gcloud`) to be installed and configured with appropriate permissions for the target project.

---

## Prerequisites

- [ ] Google Cloud SDK (`gcloud`) installed and configured
- [ ] Authenticated with Google Cloud (`gcloud auth login` completed)
- [ ] Project set to correct GCP project (`gcloud config set project PROJECT_ID`)
- [ ] Cloud Build API enabled in the GCP project
- [ ] Appropriate IAM permissions (Cloud Build Editor, Cloud Run Admin)
- [ ] Git repository initialized with clean working directory
- [ ] `cloudbuild.yaml` exists in project root
- [ ] All secrets configured in Google Secret Manager

---

## Steps

### 1. Update Task-MCP Dependency

Update the base task-mcp package to the latest version.

**Actions**:
- Run `npm install @prmichaelsen/task-mcp@latest` to update to latest version
- Verify the update in `package.json`
- Check for any breaking changes in the changelog
- Run `npm install` to update `package-lock.json`

**Expected Outcome**: `package.json` and `package-lock.json` updated with latest task-mcp version

**Example**:
```bash
npm install @prmichaelsen/task-mcp@latest
```

### 2. Verify Build Locally

Ensure the project builds successfully with the updated dependency.

**Actions**:
- Run `npm run type-check` to verify TypeScript compilation
- Run `npm run build` to compile the project
- Check for any compilation errors or warnings
- Review build output in `dist/` directory

**Expected Outcome**: Project builds without errors, `dist/` directory contains compiled JavaScript

**Example**:
```bash
npm run type-check
npm run build
```

### 3. Commit Dependency Update

Commit the dependency update to git repository.

**Actions**:
- Stage `package.json` and `package-lock.json`
- Create commit with descriptive message
- Include version number in commit message
- Push commit to remote repository (optional but recommended)

**Expected Outcome**: Changes committed to git with clear commit message

**Example**:
```bash
git add package.json package-lock.json
git commit -m "chore(deps): update @prmichaelsen/task-mcp to latest"
git push origin main
```

### 4. Get Current Git SHA

Retrieve the short commit SHA for the deployment tag.

**Actions**:
- Run `git rev-parse --short HEAD` to get short SHA
- Store the SHA value for use in deployment
- Verify SHA matches the latest commit

**Expected Outcome**: Short commit SHA obtained (e.g., `a1b2c3d`)

**Example**:
```bash
SHA=$(git rev-parse --short HEAD)
echo "Deploying commit: $SHA"
```

### 5. Trigger Cloud Build Deployment

Submit the build to Google Cloud Build with the commit SHA.

**Actions**:
- Run `gcloud builds submit` with `cloudbuild.yaml`
- Pass commit SHA as substitution variable
- Monitor build progress in console output
- Wait for build to complete successfully
- Verify Cloud Run service updated

**Expected Outcome**: Cloud Build completes successfully, new revision deployed to Cloud Run

**Example**:
```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse --short HEAD)
```

### 6. Verify Deployment

Confirm the deployment is successful and operational.

**Actions**:
- Check Cloud Run service status
- Test health check endpoint
- Verify new revision is serving traffic
- Check Cloud Run logs for startup errors
- Test a sample MCP request (optional)

**Expected Outcome**: Service is running, health check passes, no errors in logs

**Example**:
```bash
# Check health endpoint
curl https://task-mcp-server-xxx-uc.a.run.app/mcp/health

# Check Cloud Run service status
gcloud run services describe task-mcp-server --region=us-central1
```

### 7. Update Progress Tracking

Document the deployment in progress.yaml.

**Actions**:
- Update `agent/progress.yaml` with deployment details
- Add entry to `recent_work` section
- Update `deployment` section with new commit SHA and timestamp
- Note any issues or observations

**Expected Outcome**: Progress tracking reflects latest deployment

---

## Verification

- [ ] `@prmichaelsen/task-mcp` updated to latest version
- [ ] `package-lock.json` updated with new dependency tree
- [ ] Project builds successfully (`npm run build` completes)
- [ ] Changes committed to git repository
- [ ] Cloud Build job completed successfully
- [ ] New Cloud Run revision deployed
- [ ] Health check endpoint responds with 200 OK
- [ ] No errors in Cloud Run logs
- [ ] `agent/progress.yaml` updated with deployment info

---

## Expected Output

### Files Modified
- `package.json` - Updated `@prmichaelsen/task-mcp` version
- `package-lock.json` - Updated dependency tree
- `agent/progress.yaml` - Added deployment entry to recent_work

### Console Output
```
🔄 Updating dependencies...
✓ Updated @prmichaelsen/task-mcp to 0.5.0

🔨 Building project...
✓ Type check passed
✓ Build completed successfully

📝 Committing changes...
✓ Committed: chore(deps): update @prmichaelsen/task-mcp to 0.5.0

🚀 Deploying to Cloud Run...
✓ Build ID: a1b2c3d4-5678-90ef-ghij-klmnopqrstuv
✓ Commit SHA: a1b2c3d
✓ Build time: 65s
✓ Deployment successful

🏥 Verifying deployment...
✓ Health check: 200 OK
✓ Service status: READY
✓ Revision: task-mcp-server-00001-a1b2c3d

✅ Deployment complete!
Endpoint: https://task-mcp-server-xxx-uc.a.run.app
```

---

## Troubleshooting

### Issue 1: Cloud Build authentication error

**Symptom**: Error message "ERROR: (gcloud.builds.submit) User does not have permission to access project"

**Cause**: Not authenticated with Google Cloud or wrong project selected

**Solution**: Run `gcloud auth login` to authenticate, then `gcloud config set project PROJECT_ID` to set the correct project.

### Issue 2: Build fails with dependency resolution error

**Symptom**: npm install fails during Cloud Build with "Cannot resolve dependency"

**Cause**: Dependency version conflict or package not published

**Solution**: Check that `@prmichaelsen/task-mcp` is published to npm registry. Verify version exists with `npm view @prmichaelsen/task-mcp versions`.

### Issue 3: Deployment succeeds but health check fails

**Symptom**: Cloud Build completes but health check returns 503 or times out

**Cause**: Application startup error, missing environment variables, or secret configuration issue

**Solution**: Check Cloud Run logs with `gcloud run services logs read task-mcp-server --region=us-central1 --limit=50`.

---

**Namespace**: local
**Command**: deploy
**Version**: 1.0.0
**Created**: 2026-02-19
**Last Updated**: 2026-02-19
**Status**: Active
**Compatibility**: ACP 1.4.3+
**Author**: task-mcp-server project
