# Vue 3 Cloud & Backend Portfolio

Vue 3 + Vite + JavaScript portfolio with responsive design, dark/light theme, scroll reveals, and project detail dialogs.

## Local development

```bash
npm install
npm run dev
```

## Customize

Edit `src/App.vue`:
- `profile`: name, email, GitHub, introduction
- `skillGroups`: technical skills
- `experiences`: work history
- `projects`: projects and details

The sample content is a starting point: review and update dates, employer names, accomplishments, and links before publishing. The status banner 'OPEN TO NEW OPPORTUNITIES' can be removed if not appropriate.

## Deploy to GitHub Pages

### Option A: GitHub Actions (recommended)
1. Create a GitHub repository and push these files.
2. In Settings → Pages → Build and deployment, select **GitHub Actions**.
3. The included workflow will build and deploy on pushes to `main`.

The workflow sets the correct Vite base URL automatically for project repositories (`username.github.io/repository/`) and root Pages repositories (`username.github.io`).

### Option B: gh-pages CLI

```bash
npm install
VITE_BASE=/YOUR_REPO_NAME/ npm run deploy
```

For Windows PowerShell:

```powershell
$env:VITE_BASE='/YOUR_REPO_NAME/'
npm run deploy
```

Then choose the `gh-pages` branch in GitHub Pages settings.
