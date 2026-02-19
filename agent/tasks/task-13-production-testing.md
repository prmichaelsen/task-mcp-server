# Task 13: Production Testing

**Milestone**: Milestone 4 - Production Deployment
**Estimated Time**: 1 hour
**Dependencies**: Task 12
**Status**: Not Started

---

## Objective

Verify that the deployed task-mcp-server is working correctly in production on Cloud Run.

## Steps

### 1. Get Service URL

```bash
export SERVICE_URL=$(gcloud run services describe task-mcp-server \
  --region=us-central1 \
  --format='value(status.url)')

echo "Service URL: $SERVICE_URL"
```

### 2. Test Health Check

```bash
# Test health check endpoint
curl $SERVICE_URL/mcp/health

# Expected response:
# {"status":"healthy"}
```

### 3. Verify Service Status

```bash
# Check service details
gcloud run services describe task-mcp-server \
  --region=us-central1

# Check recent revisions
gcloud run revisions list \
  --service=task-mcp-server \
  --region=us-central1 \
  --limit=5
```

### 4. Check Logs

```bash
# View recent logs
gcloud run services logs read task-mcp-server \
  --region=us-central1 \
  --limit=50

# Follow logs in real-time
gcloud run services logs tail task-mcp-server \
  --region=us-central1
```

### 5. Test Auto-Scaling

```bash
# Make multiple requests to trigger scaling
for i in {1..10}; do
  curl $SERVICE_URL/mcp/health &
done
wait

# Check instance count
gcloud run services describe task-mcp-server \
  --region=us-central1 \
  --format='value(status.traffic[0].revisionName)'
```

### 6. Verify Cold Start Performance

```bash
# Wait for service to scale to zero (5-15 minutes)
sleep 900

# Test cold start
time curl $SERVICE_URL/mcp/health

# Should respond in < 10 seconds
```

### 7. Test MCP Server Functionality

If you have MCP client tools or can integrate with a platform:

```bash
# Test MCP server endpoint (requires authentication)
# This depends on your mcp-auth configuration
```

### 8. Monitor Metrics

```bash
# View metrics in Cloud Console
echo "View metrics at:"
echo "https://console.cloud.google.com/run/detail/us-central1/task-mcp-server/metrics"
```

## Verification

- [ ] Service URL obtained
- [ ] Health check responds with 200 OK
- [ ] Health check returns {"status":"healthy"}
- [ ] Service status is READY
- [ ] Logs show successful startup
- [ ] No error messages in logs
- [ ] Service auto-scales correctly
- [ ] Cold start completes in < 10 seconds
- [ ] Service scales to zero after idle period
- [ ] Metrics are being collected

## Expected Output

```bash
$ curl $SERVICE_URL/mcp/health
{"status":"healthy"}

$ gcloud run services describe task-mcp-server --region=us-central1
✔ Service task-mcp-server in region us-central1

URL:     https://task-mcp-server-abc123-uc.a.run.app
Status:  Ready
Traffic: 100% LATEST (currently task-mcp-server-00001-xyz)

$ gcloud run services logs read task-mcp-server --region=us-central1 --limit=10
2026-02-19 01:35:00.123 Starting task-mcp-server...
2026-02-19 01:35:00.456 Configuration: { serverName: 'task-mcp-server', ... }
2026-02-19 01:35:00.789 Server listening on port 8080
2026-02-19 01:35:01.012 Health check available at http://localhost:8080/mcp/health

$ time curl $SERVICE_URL/mcp/health
{"status":"healthy"}

real    0m0.234s
user    0m0.012s
sys     0m0.008s
```

## Performance Expectations

- **Health check response time**: < 500ms (warm)
- **Cold start time**: < 10 seconds
- **Memory usage**: < 200MB
- **CPU usage**: < 0.5 CPU (idle)
- **Scale to zero**: 5-15 minutes after last request

## Notes

- Based on remember-mcp-server testing process
- Health check should respond quickly (< 500ms)
- Cold starts are expected for serverless deployments
- Service automatically scales based on traffic
- Logs are available in Cloud Logging

## Troubleshooting

### Issue: Health check returns 503

**Solution**: Service may still be starting. Wait 30 seconds and try again.

### Issue: Logs show errors

**Solution**: Check for:
- Missing environment variables
- Invalid Firebase credentials
- Network connectivity issues

### Issue: Service won't scale to zero

**Solution**: Verify min-instances is set to 0 in cloudbuild.yaml.

### Issue: Cold start takes > 10 seconds

**Solution**: This is normal for first deployment. Subsequent cold starts should be faster.

---

**Previous Task**: [Task 12: Deploy to Cloud Run](task-12-deploy-cloudrun.md)
**Next Task**: [Task 14: Complete Documentation](task-14-documentation.md)
