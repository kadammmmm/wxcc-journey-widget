# journey-widget

A Customer Journey timeline viewer for the Webex Contact Center Agent Desktop. Reads events from the Cisco Customer Journey Data Service (CJDS) and renders them as a polished activity timeline directly in the agent's sidebar — no backend required.

## What it does

- Listens for contact events via the WxCC Desktop JS SDK
- Resolves the customer's identity (ANI or email) against the CJDS API
- Fetches up to 25 journey events and renders them as a live-updating timeline
- Polls every 15 seconds while a contact is active; freezes on contact end
- Supports light and dark mode via CSS custom properties

## Build

```bash
npm install
npm run build
# output: dist/journey-widget.iife.js
```

Watch mode for development:
```bash
npm run dev
```

## Dev harness

Open `dev.html` in a browser **after** building:

```bash
npm run build
# then open dev.html directly — no web server needed
```

The harness provides:
- A mock `window.Desktop` SDK that intercepts all API calls
- Buttons to fire `accepted`, `ended`, and `contactRefreshed` events
- 7 pre-built mock events across 2 days with varied source types
- Dark mode toggle
- Simulate API error toggle (tests error state and retry flow)
- Panel width slider (280px – 420px) to test sidebar sizing

All mock data is clearly grouped at the top of the `<script>` block in `dev.html` for easy editing.

## Register in Agent Desktop

Add this JSON to your WxCC Desktop Layout configuration:

```json
{
  "comp": "journey-widget",
  "script": "https://[username].github.io/[repo]/dist/journey-widget.iife.js",
  "properties": {
    "baseUrl": "https://api.wxcc-us1.cisco.com"
  }
}
```

## Region configuration

Set `baseUrl` to match your WxCC tenant's region:

| Region | Base URL |
|--------|----------|
| US1 (default) | `https://api.wxcc-us1.cisco.com` |
| US2 | `https://api.wxcc-us2.cisco.com` |
| EU  | `https://api.wxcc-eu1.cisco.com` |
| APJC | `https://api.wxcc-anz1.cisco.com` |

## Required token scopes

The widget uses the agent's live bearer token from the Desktop SDK (`Desktop.authorization.getToken()`). The token must include the `cjds:config_read` scope for CJDS API access. This is typically provisioned by your WxCC administrator.

## Author

Matt Kadas
