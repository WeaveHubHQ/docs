# Robinhood Crypto Home Assistant Integration

Surfacing Robinhood Crypto Trading API data in Home Assistant with signed requests that match Robinhood’s docs. Includes sensors for status, balances, holdings, prices, and admin services to place/cancel orders.

## Features

- Sensors: account status, buying power, holdings (quantity and available to trade), price sensors for configured pairs (midpoint of best bid/ask).
- Services: `robinhood_crypto.place_order` and `robinhood_crypto.cancel_order`.
- Requests are signed using your API key and Ed25519 private key per Robinhood’s crypto trading spec.

## Setup

### HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=WeaveHubHQ&repository=healthsync-ha)

### Manual Installation

1. Copy `custom_components/robinhood_crypto` to `config/custom_components/` and restart HA.

### Configuration

1. Add integration: **Settings → Devices & Services → Add Integration → Robinhood Crypto**.
2. Provide:
   - **API key**: from the Crypto Credentials portal.
   - **Private key (base64)**: base64-encoded Ed25519 private key seed generated per the docs.
   - **Symbols**: comma-separated pairs (e.g., `BTC-USD,ETH-USD`). Leave blank to fetch all.
3. Adjust polling and symbols later in **Options**.
4. To create/regenerate your API key and public/private key pair, visit the Crypto Account Settings page in a desktop browser, enter your base64 public key when creating credentials, and copy the API key into setup.

## Key generation (OpenSSL)

```sh
# Generate Ed25519 key
openssl genpkey -algorithm ED25519 -out ed25519-key.pem

# Base64 private (seed) – use this in the integration
openssl pkey -in ed25519-key.pem -outform DER | tail -c 32 | base64

# Base64 public – provide to Robinhood when creating API credentials
openssl pkey -in ed25519-key.pem -pubout -outform DER | tail -c 32 | base64
```

## Services

- `robinhood_crypto.place_order` (admin): place market, limit, stop_loss, or stop_limit orders.  
  Required: `symbol`, `side` (`buy`/`sell`), `order_type`.  
  Optional: `client_order_id` (UUID if omitted), `asset_quantity`, `quote_amount`, `limit_price`, `stop_price`, `time_in_force` (`gtc` default), `entry_id` when multiple accounts exist.

- `robinhood_crypto.cancel_order` (admin): cancel by `order_id` (optional `entry_id`).

## Notes and limits

- Headers are signed as `x-api-key + x-timestamp + path(+query) + method + body` using Ed25519 (via `cryptography`).
- Timestamps valid for 30 seconds on server.
- Default polling: account/holdings every 60s, prices every 30s. Options allow 15–600s and 5–300s to respect the API’s 100 rpm limit.
- New holdings discovered after setup require reloading the integration to add sensors.

## Development

- Requirements in `custom_components/robinhood_crypto/manifest.json` (PyNaCl for signing).
- Services defined in `custom_components/robinhood_crypto/services.yaml`.

## Example

See `assets/shib_example.png` for a SHIB price/value dashboard snippet.

## Contributions

PRs welcome. Unofficial integration; not affiliated with Robinhood. See repo for license.
