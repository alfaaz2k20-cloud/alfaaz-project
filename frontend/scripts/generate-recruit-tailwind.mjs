import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { compile } from 'tailwindcss';

const root = resolve(import.meta.dirname, '..');
const sourceFiles = [join(root, 'recruit.html'), join(root, 'src', 'recruit.js')];

function collectJavaScriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectJavaScriptFiles(path);
    return entry.name.endsWith('.js') ? [path] : [];
  });
}

sourceFiles.push(...collectJavaScriptFiles(join(root, 'src', 'recruit_games')));

const candidates = new Set();
for (const sourceFile of sourceFiles) {
  const source = readFileSync(sourceFile, 'utf8');
  for (const candidate of source.matchAll(/[A-Za-z0-9_:/.[\]#()%,-]+/g)) {
    candidates.add(candidate[0]);
  }
}

const compiler = await compile('@tailwind utilities;');
writeFileSync(join(root, 'src', 'recruit-utilities.css'), `${compiler.build([...candidates]).trimEnd()}\n`, 'utf8');
