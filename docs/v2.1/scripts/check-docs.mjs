import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';

const project = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(project, 'docs/src');
const markdown = await createMarkdownRenderer(source);
let examples = 0;
const failures = [];
const configHeadings = new Set();
const renderedPages = new Map();

function collectLinks(tokens) {
  return tokens.flatMap(token => [
    ...(token.type === 'link_open' ? [token.attrGet('href')] : []),
    ...(token.children ? collectLinks(token.children) : []),
  ]).filter(Boolean);
}

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'public') continue;
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(name));
    else if (name.endsWith('.md')) files.push(name);
  }
  return files;
}

const pages = await walk(source);
for (const filename of pages) {
  const text = await fs.readFile(filename, 'utf8');
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  const tokens = markdown.parse(body, {});
  const html = markdown.render(body);
  renderedPages.set(filename, {
    ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])),
    links: collectLinks(tokens),
  });
  for (const match of text.matchAll(/^## (\w+) - /gm)) configHeadings.add(match[1]);
  for (const token of tokens) {
    if (token.type !== 'fence') continue;
    const language = token.info.trim().split(/[\s{]/)[0];
    const line = (token.map?.[0] ?? 0) + 1;
    let scripts = [];
    if (['javascript', 'js'].includes(language)) scripts = [token.content];
    if (['json', 'json5'].includes(language)) scripts = [`(${token.content})`];
    if (language === 'html') {
      scripts = [...token.content.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
        .map(match => match[1]).filter(script => script.trim());
    }
    for (const script of scripts) {
      examples++;
      try {
        new vm.Script(script, { filename: `${path.relative(project, filename)}:${line}` });
      } catch (error) {
        failures.push(`${path.relative(project, filename)}:${line}: ${error.message}`);
      }
    }
  }
  // Check assets in Markdown images and HTML embeds. Page routes are checked by VitePress.
  for (const match of text.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)|\bsrc="(\/images\/[^"#?]+)"/g)) {
    const url = (match[1] || match[2]).split(/[?#]/)[0];
    try {
      await fs.access(path.join(source, 'public', decodeURIComponent(url)));
    } catch {
      failures.push(`${path.relative(project, filename)}: missing asset ${url}`);
    }
  }
}

for (const [filename, page] of renderedPages) {
  for (const href of page.links) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    const [route, fragment] = href.split('#');
    let target = route
      ? path.resolve(route.startsWith('/') ? source : path.dirname(filename), decodeURIComponent(route).replace(/^\//, '').split('?')[0])
      : filename;
    if (target.endsWith('.html')) target = target.slice(0, -5) + '.md';
    if (!target.endsWith('.md')) {
      target = renderedPages.has(`${target}.md`) ? `${target}.md` : path.join(target, 'index.md');
    }
    const destination = renderedPages.get(target);
    if (!destination) {
      failures.push(`${path.relative(project, filename)}: missing page ${href}`);
    } else if (fragment && !destination.ids.has(decodeURIComponent(fragment))) {
      failures.push(`${path.relative(project, filename)}: missing anchor ${href}`);
    }
  }
}

// Parse the JSON5 object as a JavaScript expression; it contains only static defaults.
const defaultsText = await fs.readFile(path.join(project, '../../src/components/config/config.json5'), 'utf8');
const defaults = vm.runInNewContext(`(${defaultsText})`, {}, { timeout: 1000 });
const dedicatedPages = new Set(['bookList', 'hooks']);
const deprecated = new Set(['cnzz']);
for (const key of Object.keys(defaults)) {
  if (!configHeadings.has(key) && !dedicatedPages.has(key) && !deprecated.has(key)) {
    failures.push(`Missing top-level configuration documentation: ${key}`);
  }
}

// Both published friend-link examples must match the grouped data consumed by the plugin.
let friendLinkExamples = 0;
for (const relative of ['reference/links.md', 'reference/config/appearance.md']) {
  const text = await fs.readFile(path.join(source, relative), 'utf8');
  for (const token of markdown.parse(text, {})) {
    if (token.type !== 'fence' || !['javascript', 'js'].includes(token.info.trim())) continue;
    if (!token.content.includes('links:') || !token.content.includes('page:')) continue;
    friendLinkExamples++;
    try {
      const sandbox = { window: {} };
      vm.runInNewContext(token.content, sandbox, { timeout: 1000 });
      const groups = sandbox.window.cnblogsConfig.links.page;
      assert.ok(Array.isArray(groups) && groups.length > 0);
      for (const group of groups) assert.ok(Array.isArray(group.links), 'Each group needs a links array');
    } catch (error) {
      failures.push(`${relative}: invalid friend-link example: ${error.message}`);
    }
  }
}
assert.equal(friendLinkExamples, 2, 'Check both friend-link configuration examples');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} pages, ${examples} examples, internal links and anchors, image paths, configuration coverage and friend-link data.`);
}
