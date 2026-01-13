# HealthSync: CSV Export

Writes timestamped CSV files with metric, value, unit, and device for archival or BI tools.

## Configure

1. Enable **CSV Export** in HealthSync.
2. Choose a folder in Files when prompted and grant access.
3. Choose whether to create a new daily csv file or to append a single csv file.
4. The app creates/updates daily CSV files in that folder.

## File shape

- Columns: timestamp, metric, value, unit, device.
- One row per sample; new files are created per day.
