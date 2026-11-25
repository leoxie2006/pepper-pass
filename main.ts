import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const project = fileURLToPath(new URL('.', import.meta.url));
const target = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(target, { recursive: true });
for (const folder of ['game', 'screenshots']) {
  cpSync(resolve(project, folder), resolve(target, folder), { recursive: true });
}
const caps = {
  text_max_bytes: 160 * 1024,
  screenshots: { max: 4, max_bytes: 256 * 1024 },
  game_max_files: 993,
  game_max_bytes: 48 * 1024 * 1024,
  game_path_max_bytes: 1000
};
writeFileSync(resolve(target, 'dossier.json'), buildDossier(target, caps));
