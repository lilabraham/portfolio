// convert-images.mjs — Run from project root: node convert-images.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const dir = "./public/images/projects";
const files = await readdir(dir);

console.log("Converting PNG → WebP...\n");

for (const file of files) {
  if (extname(file) !== ".png") continue;
  const input = join(dir, file);
  const output = join(dir, basename(file, ".png") + ".webp");

  const inputStat = await stat(input);
  const info = await sharp(input).webp({ quality: 80 }).toFile(output);
  const savings = ((1 - info.size / inputStat.size) * 100).toFixed(1);

  console.log(
    `✓ ${file} (${(inputStat.size / 1024).toFixed(0)}KB) → ${basename(output)} (${(info.size / 1024).toFixed(0)}KB) — ${savings}% smaller`
  );
}

console.log("\nDone! You can now delete the original .png files:");
console.log("  rm public/images/projects/*.png");
