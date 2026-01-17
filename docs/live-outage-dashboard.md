# Live Outage Dashboard

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/WeaveHubHQ/Live-Outage-Dashboard&branch=main)

Live Outage Dashboard is a status and incident board that sits on top of your existing monitors. It keeps ops teams aligned with live tiles, ownership, and publish-ready status views.

## Highlights

- Live outage tiles with region-aware grouping and change notes to isolate blast radius quickly.
- Incident-first design: fast labeling for degraded vs. outage, owners, and response state with mitigation notes.
- Ready-to-send comms: generates a status page view and embeds for leadership and support.
- Built to host anywhere: static app that can run at the edge or behind your own infrastructure.

## Signals and communication

- Supports HTTP and JSON checks, third-party status APIs, latency/error/saturation metrics, and change feeds.
- Communication workflows include audit trails, ownership handoffs, error budget and SLO guardrails, and reusable note templates.

## Workflow

1. Connect monitors (HTTP checks, JSON, Solarwinds, or custom webhooks).
2. Group services and regions, set owners, and define degraded vs. outage rules per tile.
3. Publish: share the live dashboard internally or ship the generated status page directly.

## Try it

- Demo: https://demo.outagedashboard.weavehub.app
- Source: https://github.com/WeaveHubHQ/Live-Outage-Dashboard
