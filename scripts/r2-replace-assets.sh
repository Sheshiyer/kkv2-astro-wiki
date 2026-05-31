# R2 URL Replacement Script for Klear Karma Wiki

R2_BASE="https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev"

# Replace local asset paths in data files with R2 URLs
# Usage: run from wiki-site root

R2_BRAND="${R2_BASE}/brand"
R2_ARTIFACTS="${R2_BASE}/artifacts"

# File 1: site-data.json
sed -i '' \
  -e "s|\\"/images/brandmint/|\\"${R2_BRAND}/images/brandmint/|g" \
  -e "s|\\"/notebooklm/|\\"${R2_ARTIFACTS}/notebooklm/|g" \
  src/data/site-data.json

# File 2: artifacts.json
sed -i '' \
  -e "s|\\"/images/brandmint/|\\"${R2_BRAND}/images/brandmint/|g" \
  -e "s|\\"/notebooklm/|\\"${R2_ARTIFACTS}/notebooklm/|g" \
  src/data/artifacts.json

echo "Done. Local asset paths replaced with R2 URLs:"
echo "  Brand images → ${R2_BRAND}/images/brandmint/"
echo "  Artifacts    → ${R2_ARTIFACTS}/notebooklm/"
echo ""
echo "Next: run 'npx astro build' then 'vercel deploy --prod'
