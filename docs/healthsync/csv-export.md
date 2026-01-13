# HealthSync: CSV Export (in development)

Writes timestamped CSV files with metric, value, unit, and device for archival or BI tools.

## Configure

1. Enable **CSV Export** in HealthSync.
2. Choose a folder in Files when prompted and grant access.
3. The app creates/updates daily CSV files in that folder.

## File shape

- Columns: timestamp, metric, value, unit, device.
- One row per sample; new files are created per day.
