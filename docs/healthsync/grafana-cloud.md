# HealthSync: Grafana Cloud

Send OTLP/HTTP metrics from HealthSync to Grafana Cloud with full resource attributes and guardrails for validation.

## Prep in Grafana Cloud

1. Go to **Connections → Add new connection** and search for **OpenTelemetry**.
2. Instrumentation method: **OpenTelemetry SDK** → language **Other** → **Next**.
3. Infrastructure: **Other** → **Next** (and **Next** again on instrumentation method).
4. Create a token (metrics write scope) and copy the token + Endpoint. Keep the token safe.
5. Get your OTLP username from the Base64 header shown with the token. Example:

```bash
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic%20Z2xjX2V5SnZJam9pTVRZek9URXhPU0lzSW00aU9pSjBaWE4wSWl3aWF5STZJamcxV0ZoTWF6Qm9XTmdlVHpGaU0yWXdSV05hTnpGalV5SXNJbTBpT25zaWNpSTZJbkJ5YjJRdGRYTXRaV0Z6ZEMwd0luOTM6MjU5MjkzNQ=="
```

Decode to read `{apikey}:{username}`:

Windows:
  ```powershell
  powershell -command "[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('Z2xjX2V5SnZJam9pTVRZek9URXhPU0lzSW00aU9pSjBaWE4wSWl3aWF5STZJamcxV0ZoTWF6Qm9XTmdlVHpGaU0yWXdSV05hTnpGalV5SXNJbTBpT25zaWNpSTZJbkJ5YjJRdGRYTXRaV0Z6ZEMwd0luOTM6MjU5MjkzNQ=='))"
  ```
macOS:
  ```bash
  echo "Z2xjX2V5SnZJam9pTVRZek9URXhPU0lzSW00aU9pSjBaWE4wSWl3aWF5STZJamcxV0ZoTWF6Qm9XTmdlVHpGaU0yWXdSV05hTnpGalV5SXNJbTBpT25zaWNpSTZJbkJ5YjJRdGRYTXRaV0Z6ZEMwd0luOTM6MjU5MjkzNQ==" | base64 --decode
  ```

6. Click **Next**; the test connection in Grafana Cloud won’t pass because traces aren’t being sent. Use **Explore** later to verify metrics.

## What you need

- Grafana Cloud stack with OTLP HTTP enabled.
- Instance ID (username) and an API key with metrics write scope.
- OTLP metrics endpoint, e.g., `https://otlp-gateway-prod-us-east-2.grafana.net/otlp`.

## Configure in HealthSync

1. Integrations → **Grafana Cloud** → Configure.
2. Enter Gateway URL (include `/otlp`), Instance ID (OTLP username), API Key, optional Service name (`healthsync-ios` default), optional Environment (sets `deployment.environment`).
3. Tap **Save**, then **Test Connection**; expect HTTP 200 in logs.

## What gets sent

- Protocol: OTLP/HTTP JSON with Basic Auth.
- Gauge per health sample; metric name matches the HealthSync metric (e.g., `heart_rate`); units preserved; value as double.
- Data point attributes: `metric`, `unit`, `device`. Resource attributes: `service.name`, `telemetry.sdk.*`, and optional `deployment.environment`.
- Guardrails: samples older than ~24h or more than 1h in the future are skipped to satisfy Grafana Cloud/Mimir validation.

## Verify in Grafana

- Open **Explore → Metrics** and query the last hour for your metric names (e.g., `heart_rate`).
- If filtering, use `service.name=healthsync-ios` (or your custom value) and any `deployment.environment` you set.
- Traces are not sent—this integration is metrics-only.

## Common pitfalls

- Using the Prometheus `remote_write` URL instead of the OTLP URL results in 400 errors.
- API key missing metrics write scope causes 401/403.
- Filtering in Explore by the wrong `service.name` or environment can hide results.
