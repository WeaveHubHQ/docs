# HealthSync: Grafana Cloud

Sends OTLP/HTTP metrics with attributes for metric, unit, device, and service metadata to your Grafana Cloud stack.

## Prep in Grafana Cloud

1. Add the **OpenTelemetry** connection.
2. Create a token with **metrics write** scope.
3. Note the OTLP endpoint (include `/otlp`) and the OTLP username (from the Base64 header shown with the token).

## Configure in HealthSync

1. Integrations → **Grafana Cloud** → Configure.
2. Enter Gateway URL (with `/otlp`), Instance ID (OTLP username), API Key, optional Service name (`healthsync-ios` default), optional Environment.
3. Save, then **Test Connection** (expects HTTP 200).

## What gets sent

- Protocol: OTLP/HTTP JSON with Basic Auth.
- Gauge per health sample; metric name matches the HealthSync metric; units preserved; value as double.
- Data point attributes: `metric`, `unit`, `device`. Resource attributes: `service.name`, `telemetry.sdk.*`, optional `deployment.environment`.
- Samples older than ~24h or >1h future are skipped for validation.

## Verify in Grafana

- Explore → Metrics; query for your metric names (e.g., `heart_rate`) with `service.name=healthsync-ios` (or your custom value) and any `deployment.environment` you set.
- Common pitfalls: using Prometheus `remote_write` URL, API key without metrics write scope, filtering on the wrong `service.name`/environment.
