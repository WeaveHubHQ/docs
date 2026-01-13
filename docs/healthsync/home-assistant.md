# HealthSync: Home Assistant

Creates webhook sensors in Home Assistant so you can drive automations with live Apple Health data.

## Prereqs

- Install the **HealthSync** custom component from `custom_components/healthsync_ha` or via HACS.
- Create a webhook ID in the integration config flow.

## Configure in HealthSync

1. Integrations → **Home Assistant** → Configure.
2. Enter HA base URL (e.g., `https://your-ha.com`) and the webhook ID.
3. Tap **Authorize & Start Sync**.

## What happens

- HealthSync POSTs to `/api/webhook/<id>`; HA creates sensors automatically.
- Use the sensors directly in automations and dashboards.
