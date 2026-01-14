# HealthSync: Splunk

Ships health metrics to Splunk HEC with retries, delivery history, and a dead-letter queue.

## Splunk Setup

1. Click on Settings > Data Inputs.
2. Add a new HTTP Event Collector.
3. Name your new HTTP Event Collector, then click Next (Do not check Enable indexer acknowledgement).
4. Select your allowed indexes, then click Next.
5. Review your settings, then click Submit.
6. Your HEC token value will be displayed and will be required in the HealthSync integration configuration.

## HealthSync App Configuration

1. Enter your Splunk HEC URL (e.g., `https://splunk:8088`) and HEC token in the **Splunk** integration.
2. Optional: set index and sourcetype (default `health_metrics`).
3. Test connection, then enable metrics to send.

## Notes

- Built-in retries and DLQ help recover failed sends.
- Keep HEC tokens secure; rotate if you see unauthorized errors.
