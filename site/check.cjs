const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/release.js', 'utf8');
const releases = 'https://github.com/Childgram/cg-android/releases';
const good = {schema_version: 1, available: true, package: 'org.childgram', version: '0.1.0-alpha.1', size: 10485760,
  file_url: releases + '/download/v0.1.0-alpha.1/childgram-0.1.0-alpha.1-arm64.apk'};
async function check(data, error) {
  const elements = {'release-status': {}, download: {href: releases}, 'release-notes': {href: releases}};
  const context = {document: {getElementById: id => elements[id]}, AbortController, setTimeout, clearTimeout,
    fetch: async () => {if (error) throw Error('offline'); return {ok:true, json:async () => data};}};
  await vm.runInNewContext(source, context);
  return elements;
}
(async () => {
  const ready = await check(good);
  assert.equal(ready.download.href, good.file_url);
  assert.match(ready['release-status'].textContent, /10.0\u00a0МБ/);
  assert.equal(ready['release-notes'].href, releases + '/tag/v0.1.0-alpha.1');
  const empty = await check({schema_version:1, available:false});
  assert.equal(empty.download.href, releases);
  assert.match(empty['release-status'].textContent, /Первый выпуск готовится/);
  for (const data of [{...good, file_url:'https://evil.example/app.apk'}, {...good, package:'org.telegram.messenger'},
    {...good, schema_version:2}, {...good, version:'<script>alert(1)</script>'}, {...good, size:Infinity}]) {
    assert.equal((await check(data)).download.href, releases);
  }
  assert.equal((await check(null, true)).download.href, releases);
  console.log('Website checks passed: published release, empty feed, offline fallback and invalid metadata.');
})().catch(error => {console.error(error); process.exitCode = 1;});
