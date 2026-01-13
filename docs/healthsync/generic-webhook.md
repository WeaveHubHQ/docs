# HealthSync: Generic Webhook

Sends signed JSON payloads to any HTTPS endpoint with profiles, batching, retries, and a dead-letter queue.

## Configure

1. Create a profile with your HTTPS endpoint.
2. Pick delivery mode: realtime or scheduled.
3. Choose enabled metrics per profile and save.
4. Monitor delivery history and retry dead letters in-app.

## Payload basics

- For Webhook+, optionally add an HMAC shared secret.
- Signature headers are included when you set an HMAC secret.
- HTTPS POST with JSON body; supports per-profile filtering and batching.

