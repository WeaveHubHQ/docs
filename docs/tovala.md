# Tovala Smart Oven for Home Assistant

Home Assistant custom integration for Tovala Smart Ovens via their cloud API. Monitor cook status, meal details, history, and trigger automations. (Tovala has no public API; this is reverse-engineered from the mobile app.)

## Features

- Real-time cooking status and remaining time (polls every 10s).
- Meal details with name, image, ingredients for Tovala meals.
- Cooking history (last 10 sessions).
- Automation-ready events and attributes.
- Automatic oven discovery (no manual IDs).

## Installation

### HACS (recommended)
1. **HACS → Integrations → ⋮ → Custom repositories**.
2. Add `https://github.com/WeaveHubHQ/ha-tovala` (category: Integration).
3. Install, restart Home Assistant.
4. **Settings → Devices & Services → Add Integration** → search **Tovala Smart Oven** → sign in with Tovala credentials.

### Manual
1. Copy `custom_components/tovala/` to `config/custom_components/`.
2. Restart Home Assistant.
3. Add the integration from **Settings → Devices & Services**.

## Entities

### Sensors
- `sensor.tovala_time_remaining`: remaining cook time (s).  
  Attributes: `cooking_state` ("idle"/"cooking"), `barcode`, `meal_id`, `meal_title`, `meal_subtitle`, `meal_image`, `meal_ingredients`, `estimated_end_time`.
- `sensor.tovala_last_cook`: last cook summary.  
  Attributes: `last_cook_barcode`, `last_cook_meal_id`, `last_cook_start_time`, `last_cook_end_time`, `last_cook_status`, `recent_history` (last 10 sessions).

### Binary sensors
- `binary_sensor.tovala_timer_running`: on when actively cooking.

### Events
- `tovala_timer_finished`: fires when timer hits zero. Example payload:
```json
{
  "oven_id": "b3d64c11-96db-4ed2-9589-b52fbd0a15b1",
  "data": { "state": "idle", "meal": {...} }
}
```

## Automation examples

Notify with meal name and image (Telegram):
```yaml
automation:
  - alias: "Tovala Cooking Done"
    trigger:
      - platform: numeric_state
        entity_id: sensor.tovala_time_remaining
        below: 1
        above: -0.3
    action:
      - service: telegram_bot.send_photo
        data:
          url: "{{ state_attr('sensor.tovala_time_remaining', 'meal_image') }}"
          caption: >-
            {% set meal = state_attr('sensor.tovala_time_remaining', 'meal_title') %}
            {{ meal if meal else 'Your oven' }} is done cooking!
```

Notify via HA mobile app:
```yaml
automation:
  - alias: "Tovala Cooking Done - Mobile"
    trigger:
      - platform: state
        entity_id: binary_sensor.tovala_timer_running
        from: "on"
        to: "off"
    action:
      - service: notify.mobile_app_YOUR_DEVICE
        data:
          title: "Tovala Oven"
          message: "{{ state_attr('sensor.tovala_time_remaining', 'meal_title') }} is ready!"
          data:
            image: "{{ state_attr('sensor.tovala_time_remaining', 'meal_image') }}"
```

Alert when 1 minute remains:
```yaml
automation:
  - alias: "Tovala Almost Done"
    trigger:
      - platform: numeric_state
        entity_id: sensor.tovala_time_remaining
        below: 60
    action:
      - service: notify.notify
        data:
          message: "Your {{ state_attr('sensor.tovala_time_remaining', 'meal_title') }} has 1 minute left!"
```

## Dashboard example (Mushroom)
```yaml
type: custom:mushroom-template-card
primary: Tovala Oven
secondary: >-
  {% if state_attr('sensor.tovala_time_remaining', 'meal_title') %}
    {{ state_attr('sensor.tovala_time_remaining', 'meal_title') }}
  {% elif states('sensor.tovala_time_remaining') | int > 0 %}
    {{ states('sensor.tovala_time_remaining') | int // 60 }}m {{ states('sensor.tovala_time_remaining') | int % 60 }}s remaining
  {% else %}
    Idle
  {% endif %}
entity: sensor.tovala_time_remaining
icon: mdi:toaster-oven
icon_color: >-
  {% if is_state('binary_sensor.tovala_timer_running', 'on') %}
    orange
  {% else %}
    grey
  {% endif %}
tap_action:
  action: more-info
```

## Troubleshooting

Enable debug logging:
```yaml
logger:
  default: warning
  logs:
    custom_components.tovala: debug
```

`cannot_connect` error: check internet, verify credentials, test API:
```bash
curl -i -X POST "https://api.beta.tovala.com/v0/getToken" \
  -H "Content-Type: application/json" \
  -H "X-Tovala-AppID: MAPP" \
  -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD","type":"user"}'
```
- HTTP 200 → credentials valid; 401/403 → fix creds; connection errors → firewall/DNS.

`auth` error: credentials incorrect.

No meal details: only present for scanned Tovala meal barcodes, when meal exists in DB, and after reloading the integration.

## Roadmap

- WebSocket realtime updates (currently polls every 10s)
- Multi-oven support with UI selection
- Control capabilities (start/stop cooking)
- Configurable poll interval
- Device triggers for “Timer Started/Finished”

## Contributing

PRs welcome. See repo for license (MIT © 2025 Jason Lazerus). Unofficial integration; not affiliated with Tovala and may break if the API changes.
