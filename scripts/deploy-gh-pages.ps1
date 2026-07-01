# Build and deploy static site to gh-pages branch
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$env:GITHUB_PAGES = "true"
npm run build

Push-Location out
if (Test-Path .git) { Remove-Item -Recurse -Force .git }
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy Symbiotic Catalyst 2030 site"
git remote remove origin 2>$null
git remote add origin https://github.com/Bachhhhhhhhhhhhhh/ibssss.git
git push -f origin gh-pages
Pop-Location

Write-Host "Deployed! Triggering Pages rebuild..."
gh api repos/Bachhhhhhhhhhhhhh/ibssss/pages/builds -X POST | Out-Null
Write-Host "Live: https://bachhhhhhhhhhhhhh.github.io/ibssss/"