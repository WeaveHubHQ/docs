# HealthSync: n8n (in development)

Triggers n8n workflows via webhook with raw or aggregated batches to handle bursty data.

## Configure

1. Paste the Production URL from your n8n Webhook node into the **n8n** integration.
2. Optional: add an auth header for your workflow.
3. Choose delivery mode (realtime or batched), batch interval, and payload mode (raw or aggregated).

## Payload options

- Realtime: sends samples as they arrive.
- Batched: includes `batch_id`, window, and aggregated metrics for high-volume bursts.
