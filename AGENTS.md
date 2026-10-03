# Childgram workspace

- The workspace root is a separate repository for shared project documentation,
  branding and development instructions. Keep shared documents under `doc/`.
  Its remote is `Childgram/childgram.org`; `main` publishes the website through
  GitHub Pages at `https://childgram.org`.
- Shared brand sources live in `branding/`, beside `android/`. Treat
  `branding/childgram-logo.svg` as the master; regenerate platform resources
  with `python3 branding/export.py`. Android builds use committed exports only.
- `android/` is an independent Git repository based on `DrKLO/Telegram`.
  It is ignored by the root repository, not a submodule. Preserve its upstream
  directory layout, Git history, staged changes and pinned submodule revisions.
- Read `android/AGENTS.md` and `android/dev/README.md` before Android work.
  Run Android Git commands with `git -C android ...` and build commands from
  `android/`, or invoke `./android/dev/build` from this directory.
- Android credentials, signing keys, AVD data and logs live in the ignored
  `android/.local/`. Never print, commit or move filled credentials into shared
  documentation. Never regenerate an existing release signing key.
- Check status separately in both repositories. Stage only the task's files;
  preserve unrelated work. Keep commits and pushes for the user's explicit request.
- Local code, a built APK and a published release are distinct states. Record
  verification evidence and remaining release work in `doc/release.md`.
- The public website lives in `site/`; run `node site/check.cjs` and
  `python3 site/build.py`. Publish only `.local/site/`, never the workspace root.
  The permanent Android feed is `https://update.childgram.org/android.json`.
  See `doc/updates.md` for release drafts, signing secrets and Pages setup.
- Do not create, rename, delete or publish remote repositories without a clear
  user request. Android `origin` is `https://github.com/Childgram/cg-android.git`,
  a verified GitHub fork of `DrKLO/Telegram`; `upstream` points to Telegram.
