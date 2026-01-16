# HACS Integration Preflight

VS Code extension that validates Home Assistant custom integrations for HACS submission. It catches structure and metadata issues early and offers autofix commands.

## Validation coverage

- Repository structure: git remote present and `custom_components/<domain>/` laid out correctly.
- `manifest.json`: required keys, domain match, codeowners format, key ordering with autofix.
- `hacs.json`: repository name, country codes (ISO 3166-1), Home Assistant version format, zip settings.
- Translations: checks `translations/en.json`.
- CI/workflows: verifies `hacs/action` workflow with the correct category and can add/repair it.
- Branding: confirms icon and logo assets exist on `brands.home-assistant.io` for your domain.
- GitHub metadata: repo visibility, description, issues enabled, topics, and releases (with token).

## Commands

- `HACS: Run Integration Preflight Check` — run all validation checks and view results in the sidebar.
- `HACS: Autofix manifest.json ordering` — reorder manifest keys to HACS standard.
- `HACS: Add/Repair CI Workflows` — preview and apply the official `hacs/action` workflow file.
- `HACS: Check Home Assistant Brands status` — verify branding assets are submitted.

## Get started

[![Install from VS Marketplace](https://img.shields.io/badge/VS%20Code-Install-blue?logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=WeaveHub.hacs-integration-preflight)

1. Install “HACS Integration Preflight” from the VS Code Marketplace.
2. Open the project that contains `custom_components/<domain>/`.
3. Run `HACS: Run Integration Preflight Check` from the Command Palette or the HACS activity bar.
4. Click any issue to autofix or jump to the file, then re-run to confirm fixes.
5. Submit to HACS once checks pass.

## Settings

- `hacsPreflight.githubToken` — GitHub Personal Access Token for repo metadata and release checks (optional).
- `hacsPreflight.brandsCheck` — enable remote check against brands.home-assistant.io (default: true).
