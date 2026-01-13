# HealthSync: Splunk (in development)

Ships health metrics to Splunk HEC with retries, delivery history, and a dead-letter queue.

## Configure

1. Enter your Splunk HEC URL (e.g., `https://splunk:8088`) and HEC token in the **Splunk** integration.
2. Optional: set index and sourcetype (default `health_metrics`).
3. Test connection, then enable metrics to send.

## Notes

- Built-in retries and DLQ help recover failed sends.
- Keep HEC tokens secure; rotate if you see unauthorized errors.
