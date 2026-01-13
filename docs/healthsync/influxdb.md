# HealthSync: InfluxDB

Writes line protocol points to InfluxDB 2.x (Cloud or OSS) with metric, unit, and device tags.

## Prereqs

- Base URL reachable (e.g., `https://us-east-1-1.aws.cloud2.influxdata.com` or `https://influx.example.com:8086`).
- Org, bucket, and token with write scope.

## Configure in HealthSync

1. Integrations → **InfluxDB** → Configure.
2. Enter Base URL (no `/api/v2/write`), Org, Bucket, Token.
3. Optional: Measurement (`healthsync` default) and Precision (`ns`, `us`, `ms`, `s`).
4. Save Configuration → **Test Connection** (calls `/health` on the base URL).

## Payload shape

- Endpoint: `/api/v2/write?org=<org>&bucket=<bucket>&precision=<precision>`
- Example:  
  `healthsync,metric=heart_rate,unit=bpm,device=iPhone value=72 1705080000000000000` (precision `ns`)
- Tags: `metric`, `unit`, `device`; field: `value`; timestamp uses chosen precision.

## Troubleshooting

- 401/403: token lacks write scope for the bucket/org.
- 404/400 “not found”: org or bucket mismatch.
- 400 “parse error”: precision mismatch or non-numeric values—align precision with server.
- Query check: `from(bucket:"<bucket>") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "healthsync")`
