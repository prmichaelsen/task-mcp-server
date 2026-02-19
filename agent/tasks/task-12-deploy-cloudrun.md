# Task 12: Deploy to Cloud Run

**Milestone**: Milestone 4 - Production Deployment
**Estimated Time**: 1 hour
**Dependencies**: Task 11
**Status**: Not Started

---

## Objective

Deploy task-mcp-server to Google Cloud Run using Cloud Build for automated builds and deployments.

## Steps

### 1. Create Required Secrets

Create secrets in Google Cloud Secret Manager:

```bash
# Set your project ID
export PROJECT_ID=your-project-id

# Create Firebase project ID secret
echo -n "your-firebase-project-id" | \
  gcloud secrets create task-firebase-project-id \
  --project=$PROJECT_ID \
  --data-file=-

# Create Firebase service account JSON secret
cat your-service-account.json | \
  gcloud secrets create task-firebase-service-account-json \
  --project=$PROJECT_ID \
  --data-file=-

# Verify secrets created
gcloud secrets list --project=$PROJECT_ID | grep task-
```

### 2. Grant Secret Access to Cloud Run

```bash
# Get Cloud Run service account
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export SERVICE_ACCOUNT="$PROJECT_NUMBER-compute@developer.gserviceaccount.com"

# Grant access to secrets
gcloud secrets add-iam-policy-binding task-firebase-project-id \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor" \
  --project=$PROJECT_ID

gcloud secrets add-iam-policy-binding task-firebase-service-account-json \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor" \
  --project=$PROJECT_ID
```

### 3. Enable Required APIs

```bash
# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com --project=$PROJECT_ID

# Enable Cloud Run API
gcloud services enable run.googleapis.com --project=$PROJECT_ID

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com --project=$PROJECT_ID

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com --project=$PROJECT_ID
```

### 4. Trigger Cloud Build

```bash
# Commit and push changes
git add .
git commit -m "feat: initial deployment configuration"
git push origin main

# Trigger Cloud Build manually
gcloud builds submit --config cloudbuild.yaml --project=$PROJECT_ID

# Or connect to GitHub for automatic builds
gcloud builds triggers create github \
  --repo-name=task-mcp-server \
  --repo-owner=prmichaelsen \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml \
  --project=$PROJECT_ID
```

### 5. Monitor Deployment

```bash
# Watch build progress
gcloud builds list --project=$PROJECT_ID --limit=1

# Get build logs
gcloud builds log <BUILD_ID> --project=$PROJECT_ID

# Check Cloud Run service status
gcloud run services describe task-mcp-server \
  --region=us-central1 \
  --project=$PROJECT_ID
```

### 6. Get Service URL

```bash
# Get the deployed service URL
gcloud run services describe task-mcp-server \
  --region=us-central1 \
  --project=$PROJECT_ID \
  --format='value(status.url)'
```

## Verification

- [ ] Secrets created in Secret Manager
- [ ] Secret access granted to Cloud Run service account
- [ ] Required APIs enabled
- [ ] Cloud Build triggered successfully
- [ ] Build completes without errors
- [ ] Docker image pushed to Container Registry
- [ ] Service deployed to Cloud Run
- [ ] Service status is READY
- [ ] Service URL obtained
- [ ] Health check accessible at <URL>/mcp/health

## Expected Output

```bash
$ gcloud builds submit --config cloudbuild.yaml
Creating temporary tarball archive of 15 file(s) totalling 25.3 KiB before compression.
Uploading tarball of [.] to [gs://...]
Created [https://cloudbuild.googleapis.com/v1/projects/.../builds/...].
Logs are available at [https://console.cloud.google.com/cloud-build/builds/...].

BUILD
ID                                    CREATE_TIME                DURATION  SOURCE   IMAGES   STATUS
abc123def456-7890-1234-5678-90abcdef  2026-02-19T01:30:00+00:00  1M45S     gs://... +2       SUCCESS

$ gcloud run services describe task-mcp-server --region=us-central1
✔ Service task-mcp-server in region us-central1

URL:     https://task-mcp-server-abc123-uc.a.run.app
Ingress: all
Traffic:
  100% LATEST (currently task-mcp-server-00001-xyz)

Last updated on 2026-02-19T01:32:00.000000Z by user@example.com:
  Revision task-mcp-server-00001-xyz
  Image:         gcr.io/your-project/task-mcp-server:abc123
  Port:          8080
  Memory:        512Mi
  CPU:           1
  Concurrency:   80
  Min instances: 0
  Max instances: 10
  Timeout:       60s
```

## Notes

- Based on remember-mcp-server deployment process
- Secrets prefixed with `task-` to avoid conflicts
- Cloud Build automatically builds and deploys on push
- Service scales to zero when not in use
- First deployment takes ~2-3 minutes
- Subsequent deployments take ~1-2 minutes

## Troubleshooting

### Issue: Build fails with "permission denied"

**Solution**: Grant Cloud Build service account necessary permissions:
```bash
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"
```

### Issue: Secrets not found

**Solution**: Verify secrets exist and service account has access:
```bash
gcloud secrets list
gcloud secrets get-iam-policy task-firebase-project-id
```

### Issue: Service fails to start

**Solution**: Check Cloud Run logs:
```bash
gcloud run services logs read task-mcp-server --region=us-central1
```

---

**Previous Task**: [Task 11: Test Docker Locally](task-11-test-docker.md)
**Next Task**: [Task 13: Production Testing](task-13-production-testing.md)
