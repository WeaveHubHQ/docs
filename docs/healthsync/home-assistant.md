# HealthSync: Home Assistant

Creates webhook sensors in Home Assistant so you can drive automations with live Apple Health data.

## Home Assistant Setup

### HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=WeaveHubHQ&repository=healthsync-ha)

### Manual installation
1. In HACS → Integrations → Custom repositories, add `https://github.com/WeaveHubHQ/healthsync-ha` as type **Integration**.
2. Install the integration and choose the latest tagged release (e.g., `v0.1.3`).
3. Restart Home Assistant.

## Configure in HealthSync

1. Integrations → **Home Assistant** → Configure.
2. Enter HA base URL (e.g., `https://your-ha.com`) and the webhook ID.
3. Tap **Authorize & Start Sync**.

## What happens

- HealthSync POSTs to `/api/webhook/<id>`; HA creates sensors automatically.
- Use the sensors directly in automations and dashboards.
