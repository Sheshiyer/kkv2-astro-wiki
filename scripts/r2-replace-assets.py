#!/usr/bin/env python3
"""Replace local asset paths with R2 public URLs in site-data.json and artifacts.json."""
import os
import json

R2_BASE = "https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev"

DATA_DIR = "src/data"
FILES = ["site-data.json", "artifacts.json"]

replacements = {
    '/images/brandmint/': f'{R2_BASE}/brand/images/brandmint/',
    '/notebooklm/': f'{R2_BASE}/artifacts/notebooklm/',
}

for filename in FILES:
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (not found)")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)

    if content == original:
        print(f"No changes in {filename}")
    else:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filename}")

# Also update any public HTML/JS that references local paths — skip for now (all paths come from JSON)
print()
print("Done. Local asset paths replaced with R2 URLs:")
print(f"  Brand images → {R2_BASE}/brand/images/brandmint/")
print(f"  Artifacts    → {R2_BASE}/artifacts/notebooklm/")
print()
print("Next: npx astro build  &&  vercel deploy --prod")
