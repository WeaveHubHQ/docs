# U by Moen Home Assistant Integration

Custom Home Assistant integration for U by Moen smart shower systems (Alexa/Android version, not HomeKit).

## Features

- Climate control: adjust shower temperature and power via climate entity.
- Preset activation: buttons for your configured presets (e.g., “Jason”, “Lauren”, “Fill The Tub”).
- Outlet control: switches per water outlet (shower head, hand shower, tub spout, body spray).
- Status monitoring: sensors for current/target temperature, active preset, timer, firmware, and more.
- Real-time updates: Pusher WebSocket planned (polling today; instant updates coming soon).

## Installation

### HACS (recommended)
1. Open **HACS → Integrations → ⋮ → Custom repositories**.
2. Add this repo as a custom integration: `https://github.com/InfoSecured/ha-u-by-moen` (category: Integration).
3. Install and restart Home Assistant.

### Manual
1. Copy `custom_components/u_by_moen` to your Home Assistant `config/custom_components/`.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services**.
2. **Add Integration** → search for **U by Moen**.
3. Enter your U by Moen email and password.
4. Submit; devices are auto-discovered and added.

## Entities created (per shower)

**Climate**
- `climate.<name>`: on/off and temperature control; shows current/target temperature.

**Switches**
- Power switch plus one per outlet (e.g., shower head, hand shower, tub spout, body spray).

**Buttons (presets)**
- Buttons for each preset (e.g., `button.master_bathroom_jason`, `..._lauren`, `..._fill_the_tub`).

**Sensors**
- Mode, current temperature, target temperature, active preset, time remaining, firmware version.

## Usage examples

Turn on shower at target temperature:
```yaml
automation:
  - alias: "Morning Shower Ready"
    trigger:
      - platform: time
        at: "06:30:00"
    action:
      - service: climate.set_temperature
        target:
          entity_id: climate.master_bathroom
        data:
          temperature: 102
          hvac_mode: heat
```

Activate a preset:
```yaml
automation:
  - alias: "Activate Jason's Shower"
    trigger:
      - platform: state
        entity_id: binary_sensor.jason_home
        to: "on"
    action:
      - service: button.press
        target:
          entity_id: button.master_bathroom_jason
```

Turn off after 15 minutes:
```yaml
automation:
  - alias: "Shower Timeout"
    trigger:
      - platform: state
        entity_id: climate.master_bathroom
        to: "heat"
        for:
          minutes: 15
    action:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.master_bathroom
        data:
          hvac_mode: "off"
```

Lovelace card examples:
```yaml
type: thermostat
entity: climate.master_bathroom
```
```yaml
type: entities
title: Master Bathroom Shower
entities:
  - entity: climate.master_bathroom
  - entity: sensor.master_bathroom_current_temperature
  - entity: sensor.master_bathroom_active_preset
  - type: divider
  - entity: button.master_bathroom_jason
  - entity: button.master_bathroom_lauren
  - entity: button.master_bathroom_fill_the_tub
  - type: divider
  - entity: switch.master_bathroom_shower_head
  - entity: switch.master_bathroom_hand_shower
  - entity: switch.master_bathroom_tub_spout
```

## Known limitations

- Pusher WebSocket control events are inferred and may need refinement; help by capturing event names if controls don’t work immediately.
- Status updates currently poll every 30 seconds; Pusher-based realtime is planned.

## Troubleshooting

- Integration not appearing: restart Home Assistant after install; check HA logs.
- Auth fails: verify credentials (Alexa/Android, not HomeKit).
- Controls not working: check logs; Pusher event names may need adjustment; open an issue with debug logs.
- Enable debug logging in `configuration.yaml`:
```yaml
logger:
  default: info
  logs:
    custom_components.u_by_moen: debug
```

## API info

- Base URL: `https://www.moen-iot.com`
- Auth: token-based (email/password)
- Realtime: Pusher WebSocket (app_key `dcc28ccb5296f18f8eae`, cluster `us2`)

## Contributing

- Clone, install requirements, and test against your HA instance.
- To improve WebSocket controls, capture `client-*` events from the Moen app (e.g., via Charles Proxy) and share findings.

## License & Disclaimer

- MIT License.
- Unofficial integration; not affiliated with or endorsed by Moen/Fortune Brands. Use at your own risk.
