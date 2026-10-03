#!/usr/bin/env python3
"""Export only public website files and the shared logo."""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parents[1]
output = root / '.local/site'
output.mkdir(parents=True, exist_ok=True)
for name in ('index.html', 'style.css', 'release.js'):
    shutil.copyfile(root / 'site' / name, output / name)
shutil.copyfile(root / 'branding/childgram-logo.svg', output / 'logo.svg')
(output / 'CNAME').write_text('childgram.org\n')
(output / '.nojekyll').touch()
print(output)
