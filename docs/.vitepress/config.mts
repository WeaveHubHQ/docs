import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WeaveHub Documentation",
  description: "Guides and reference for WeaveHub apps, integrations, automations, and APIs.",
  themeConfig: {
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'HealthSync', link: '/healthsync/' },
      { text: 'Live Outage Dashboard', link: '/live-outage-dashboard' },
      { text: 'HACS Preflight', link: '/hacs-preflight' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [{ text: 'Welcome', link: '/' }]
      },
      {
        text: 'HealthSync',
        items: [
          { text: 'Overview', link: '/healthsync/' },
          { text: 'AI Insights', link: '/healthsync/ai-insights' },
          { text: 'CSV Export', link: '/healthsync/csv-export' },
          { text: 'Generic Webhook', link: '/healthsync/generic-webhook' },
          { text: 'Google Sheets', link: '/healthsync/google-sheets' },
          { text: 'Grafana Cloud', link: '/healthsync/grafana-cloud' },
          { text: 'Home Assistant', link: '/healthsync/home-assistant' },
          { text: 'InfluxDB', link: '/healthsync/influxdb' },
          { text: 'Libre', link: '/healthsync/libre' },
          { text: 'n8n', link: '/healthsync/n8n' },
          { text: 'Splunk', link: '/healthsync/splunk' }
        ]
      },
      {
        text: 'Home Assistant Integrations',
        items: [
          { text: 'U by Moen', link: '/u-by-moen' },
          { text: 'Tovala', link: '/tovala' },
          { text: 'Robinhood Crypto', link: '/robinhood-crypto' },
          { text: 'HACS Integration Preflight', link: '/hacs-preflight' }
        ]
      },
      {
        text: 'Other Integrations & Apps',
        items: [
          { text: 'Live Outage Dashboard', link: '/live-outage-dashboard' },
          { text: 'Vibe Badge', link: '/vibe-badge' },
          { text: 'EFT Terraforming', link: '/eft-terraforming' },
          { text: 'Globalscape EFT Provider', link: '/globalscape-eft-provider' },
          { text: "Scott's Guide", link: '/scotts-guide' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WeaveHubHQ' }
    ]
  }
})
