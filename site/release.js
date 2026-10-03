/* The page remains useful without JavaScript or a reachable update server. */
(async () => {
  const status = document.getElementById('release-status');
  const download = document.getElementById('download');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('https://update.childgram.org/android.json', {cache: 'no-cache', signal: controller.signal});
    if (!response.ok) throw new Error('Feed unavailable');
    const data = await response.json();
    if (data.schema_version !== 1 || typeof data.available !== 'boolean') throw new Error('Invalid feed');
    if (!data.available) {
      status.textContent = 'Первый выпуск готовится · Android ARM64';
      return;
    }
    if (data.package !== 'org.childgram' || !/^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/.test(data.version)
        || !Number.isSafeInteger(data.size) || data.size <= 0 || data.size > 250 * 1024 * 1024) throw new Error('Invalid release');
    const release = `https://github.com/Childgram/cg-android/releases/download/v${data.version}/childgram-${data.version}-arm64.apk`;
    if (data.file_url !== release) throw new Error('Unexpected download URL');
    download.href = release;
    download.textContent = 'Скачать для Android ↓';
    document.getElementById('release-notes').href = `https://github.com/Childgram/cg-android/releases/tag/v${data.version}`;
    status.textContent = `${data.version} · ${(data.size / 1024 / 1024).toFixed(1)}\u00a0МБ · ARM64`;
  } catch (_) {
    status.textContent = 'Доступные APK и описание версий — на странице релизов.';
  } finally {
    clearTimeout(timeout);
  }
})();
