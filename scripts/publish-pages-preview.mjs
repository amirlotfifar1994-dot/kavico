// Publishes the built public site (dist-public/) as a static preview on GitHub Pages.
//
// Why a separate repo: the site uses root-absolute links and path-based language
// switching (/en/...), so it only works at a domain root. GitHub Pages serves a
// *user site* repo (<user>.github.io) from the root, project repos from /<repo>/.
// The preview repo contains only built output -- no source, no admin code.
//
// Usage:  npm run publish:preview            (needs `gh` signed in and git)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const OWNER = process.env.PREVIEW_OWNER || 'amirlotfifar1994-dot';
const REPO = process.env.PREVIEW_REPO || `${OWNER}.github.io`;
const root = path.resolve(import.meta.dirname, '..');
const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', ...opts });
const out = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim();

console.log('1/4 building dist-public ...');
run('node', ['scripts/build-public-deploy.mjs'], { cwd: root });
const dist = path.join(root, 'dist-public');
if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('dist-public/index.html missing');
if (fs.existsSync(path.join(dist, 'kavico_v434_admin'))) throw new Error('admin folder found in dist-public -- refusing to publish');

console.log('2/4 preparing preview repo ...');
try { out('gh', ['repo', 'view', `${OWNER}/${REPO}`, '--json', 'name']); }
catch {
  run('gh', ['repo', 'create', `${OWNER}/${REPO}`, '--public', '--description', 'Static preview of kavico.ir (built output only)']);
}
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'kavico-preview-'));
run('gh', ['repo', 'clone', `${OWNER}/${REPO}`, work, '--', '-q']);

console.log('3/4 copying build output ...');
for (const e of fs.readdirSync(work)) if (e !== '.git') fs.rmSync(path.join(work, e), { recursive: true, force: true });
fs.cpSync(dist, work, { recursive: true });
fs.writeFileSync(path.join(work, '.nojekyll'), '');
// The real site is https://kavico.ir. Keep the preview out of search engines.
fs.writeFileSync(path.join(work, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(work, 'sitemap.xml'), { force: true });
fs.writeFileSync(path.join(work, 'README.md'), 'Static preview of https://kavico.ir (built output only; generated). Source is in a separate repository.\n');

console.log('4/4 pushing ...');
const git = (...a) => run('git', ['-C', work, ...a]);
git('config', 'core.autocrlf', 'false');
git('add', '-A');
if (!out('git', ['-C', work, 'status', '--porcelain'])) { console.log('No changes to publish.'); process.exit(0); }
const rev = out('git', ['-C', root, 'rev-parse', '--short', 'HEAD']);
git('-c', 'user.name=kavico-preview', '-c', 'user.email=noreply@users.noreply.github.com', 'commit', '-q', '-m', `Preview build from kavico@${rev}`);
git('push', '-q', 'origin', 'HEAD');
try { run('gh', ['api', '-X', 'POST', `repos/${OWNER}/${REPO}/pages`, '-f', 'source[branch]=main', '-f', 'source[path]=/'], { stdio: 'pipe' }); } catch { /* already enabled */ }
console.log(`Published: https://${OWNER}.github.io/ (Pages may take a minute to update)`);
