# Safe Roads Initiative — COS30045 / Data Visualisation Project

Interactive client-side visualisations of 2023 speeding fines across Australian jurisdictions. Built with D3 v7, the project provides multiple coordinated charts (line, stacked bar, bar, summary card) and a choropleth map to explore fines by state/territory and month.

## Table of Contents
- [Project Overview](#project-overview)
- [What’s Included](#whats-included)
- [Folder Structure](#folder-structure)
- [How to Run (Quick Start)](#how-to-run-quick-start)
- [Data](#data)
- [Development / Advanced Usage](#development--advanced-usage)
- [Troubleshooting](#troubleshooting)
- [License & Acknowledgements](#license--acknowledgements)

## Project Overview
This is a static web project that visualises speeding fine data for Australia (2023). The UI contains:
- Home page with project description
- Visualisation page with:
  - Small summary card (key metrics)
  - Line chart (monthly trends)
  - Stacked bar (composition by categories)
  - Bar chart (comparisons)
  - Choropleth map (geographic distribution)
- Interactive jurisdiction filter to select states/territories

## What’s Included
- src/index.html — main page and layout
- src/css/ — styling and layout files
- src/js/ — chart modules, filters, and data loaders
  - script.js (navigation + wiring)
  - filter.js (UI filter handling)
  - card.js, line-chart.js, stacked-bar.js, bar.js, map.js (visuals)
  - load-*.js (data loading for each visual)
- src/images/ — logo and team photos
- src/data/ — CSV/JSON data files referenced by loaders

## Folder Structure (recommended)
- README.md
- src/
  - index.html
  - css/
    - style.css
    - visualisation.css
    - layout-row1.css
    - layout-row2.css
    - layout-row3.css
    - home.css
  - js/
    - script.js
    - filter.js
    - card.js
    - line-chart.js
    - stacked-bar.js
    - bar.js
    - map.js
    - load-linechart-data.js
    - load-stacked-bar-data.js
    - load-map-data.js
    - load-card-data.js
    - load-bar-data.js
  - images/
    - anne.jpg
    - melvin.jpg
    - banh-mi-ram-ram.jpg
  - data/

## How to Run (Quick Start)
1. Open a terminal (PowerShell/CMD) on Windows.
2. Change to the project src directory.
3. Start a simple HTTP server (required because fetch() / XHR do not work reliably via file://):
   - Python 3:
     python -m http.server 8000
   - Node (npm):
     npx http-server -p 8000
   - Or use VS Code Live Server extension.
4. Open browser to:
   http://localhost:8000/index.html
5. Use the top navigation to go to Visualisations. Inspect browser console for errors if charts do not render.

## Data
- Loader scripts expect data files (CSV/JSON) under src/data/ by default. If your loader scripts use a different path, place the data accordingly or update the loader paths.
- Note: QLD data is aggregated yearly in the disclaimer — loaders may split it evenly across months for line charts.

## Development / Advanced Usage
- D3 is loaded from CDN in index.html (d3.v7). No build step required.
- Modify styles in src/css/ and visuals in src/js/.
- If adding new data files, update corresponding load-*.js and ensure file paths are correct.
- For debugging: open DevTools → Network / Console to see fetch errors (404/CORS).

## Troubleshooting
- Charts are blank:
  - Confirm data files exist in src/data/ and names match loader scripts.
  - Ensure you served the files over HTTP (not file://).
  - Check browser console for errors (fetch 404, JS exceptions).
- Map not rendering:
  - Verify topojson/geojson data file path used by load-map-data.js is correct.

## License & Acknowledgements
- Data source referenced in UI: Australian Government Open Data (BITRE) — see index.html footer link.
- Project created for COS30045 Data Visualisation coursework (2025).
- Acknowledge D3.js for visualization.