# Task 10: Create Cloud Build Configuration

**Milestone**: Milestone 3 - Deployment Configuration
**Estimated Time**: 0.75 hours
**Dependencies**: Task 9
**Status**: Not Started

---

## Objective

Create cloudbuild.yaml for automated builds and deployments to Cloud Run via Google Cloud Build.

## Steps

### 1. Review remember-mcp-server Cloud Build Config

```bash
cat /home/prmichaelsen/remember-mcp-server/cloudbuild.yaml
```

Study the build steps, secret management, and Cloud Run deployment configuration.

### 2. Create cloudbuild.yaml

Create `cloudbuild.yaml` in project root:

```yaml
steps:
  # Build Docker image using Dockerfile
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/task-mcp-server:$COMMIT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/task-mcp-server:latest'
      - '.'
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/task-mcp-server:$COMMIT_SHA'
  
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/task-mcp-server:latest'
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'task-mcp-server'
      - '--image=gcr.io/$PROJECT_ID/task-mcp-server:$COMMIT_SHA'
      - '--platform=managed'
      - '--region=us-central1'
      - '--allow-unauthenticated'
      - '--min-instances=0'
      - '--max-instances=10'
      - '--memory=512Mi'
      - '--cpu=1'
      - '--timeout=60s'
      - '--set-env-vars=NODE_ENV=production'
      - '--update-secrets=FIREBASE_PROJECT_ID=task-firebase-project-id:latest,FIREBASE_SERVICE_ACCOUNT_JSON=task-firebase-service-account-json:latest'

images:
  - 'gcr.io/$PROJECT_ID/task-mcp-server:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/task-mcp-server:latest'

options:
  machineType: 'E2_HIGHCPU_8'
  logging: CLOUD_LOGGING_ONLY
```

### 3. Verify YAML Syntax

```bash
# Check YAML syntax
python3 -c "import yaml; yaml.safe_load(open('cloudbuild.yaml'))"

# Or use yamllint if available
yamllint cloudbuild.yaml
```

### 4. Document Required Secrets

Create a note about required secrets in Secret Manager:

**Required Secrets:**
- `task-firebase-project-id` - Firebase project ID
- `task-firebase-service-account-json` - Firebase service account JSON

## Verification

- [ ] cloudbuild.yaml created
- [ ] Build step configured
- [ ] Push to Container Registry configured
- [ ] Deploy to Cloud Run configured
- [ ] Image tags include COMMIT_SHA and latest
- [ ] Cloud Run configuration complete:
  - [ ] Region: us-central1
  - [ ] Memory: 512Mi
  - [ ] CPU: 1
  - [ ] Min instances: 0
  - [ ] Max instances: 10
  - [ ] Timeout: 60s
- [ ] Environment variables configured
- [ ] Secrets mapped correctly
- [ ] Machine type optimized (E2_HIGHCPU_8)
- [ ] YAML syntax is valid

## Expected Output

```bash
$ python3 -c "import yaml; yaml.safe_load(open('cloudbuild.yaml'))"
# No output = valid YAML
```

## Cloud Build Steps

1. **Build**: Creates Docker image with commit SHA tag
2. **Push**: Uploads image to Container Registry
3. **Deploy**: Deploys to Cloud Run with configuration

## Secret Management

Secrets must be created in Google Cloud Secret Manager before deployment:

```bash
# Create secrets (example)
echo -n "your-project-id" | gcloud secrets create task-firebase-project-id --data-file=-
echo -n '{"type":"service_account",...}' | gcloud secrets create task-firebase-service-account-json --data-file=-
```

## Notes

- Based on remember-mcp-server cloudbuild.yaml
- Secrets prefixed with `task-` to avoid conflicts
- Uses commit SHA for image versioning
- E2_HIGHCPU_8 machine for faster builds
- Cloud logging only (no legacy logging)
- Auto-scaling from 0 to 10 instances

## Troubleshooting

### Issue: YAML syntax error

**Solution**: Use a YAML validator or check indentation (use spaces, not tabs).

### Issue: Secrets not found during deployment

**Solution**: Create secrets in Secret Manager first:
```bash
gcloud secrets list
```

---

**Previous Task**: [Task 9: Create Dockerfile](task-9-dockerfile.md)
**Next Task**: [Task 11: Test Docker Locally](task-11-test-docker.md)
