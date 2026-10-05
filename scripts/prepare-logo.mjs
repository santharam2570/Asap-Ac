import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = process.argv[2];
if (!SRC) {
  console.error("Usage: node scripts/prepare-logo.mjs <logo.jpg>");
  process.exit(1);
}

mkdirSync("src/assets/brand", { recursive: true });

// Right diagonal edge of the "A" inside markRegion, used to cut off the adjacent "S".
const A_APEX = { x: 218, y: 20 };
const A_FOOT = { x: 421, y: 366 };
const outsideMark = (x, y) =>
  x > A_APEX.x + ((y - A_APEX.y) * (A_FOOT.x - A_APEX.x)) / (A_FOOT.y - A_APEX.y) + 2;

async function removeBackground(input, { invertDark = false, maskMark = false } = {}) {
  const { data, info } = await input
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const OPAQUE_AT = 120;
  const CLEAR_AT = 238;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);
    let a = (CLEAR_AT - min) / (CLEAR_AT - OPAQUE_AT);
    a = Math.max(0, Math.min(1, a));

    const px = (i / 4) % info.width;
    const py = Math.floor(i / 4 / info.width);
    if (maskMark && outsideMark(px, py)) a = 0;

    if (a === 0) {
      data[i + 3] = 0;
      continue;
    }

    // Remove the white matte so edges don't glow on dark backgrounds.
    let nr = Math.round((r - 255 * (1 - a)) / a);
    let ng = Math.round((g - 255 * (1 - a)) / a);
    let nb = Math.round((b - 255 * (1 - a)) / a);
    nr = Math.max(0, Math.min(255, nr));
    ng = Math.max(0, Math.min(255, ng));
    nb = Math.max(0, Math.min(255, nb));

    if (invertDark) {
      const max = Math.max(nr, ng, nb);
      const sat = max - Math.min(nr, ng, nb);
      if (sat < 60) {
        nr = ng = nb = 255;
      }
    }

    data[i] = nr;
    data[i + 1] = ng;
    data[i + 2] = nb;
    data[i + 3] = Math.round(a * 255);
  }

  return sharp(data, { raw: info }).png().trim();
}

const base = () => sharp(SRC);
const markRegion = { left: 0, top: 110, width: 440, height: 380 };

await (await removeBackground(base())).toFile("src/assets/brand/logo.png");
await (await removeBackground(base(), { invertDark: true })).toFile(
  "src/assets/brand/logo-light.png",
);
await (await removeBackground(base().extract(markRegion), { maskMark: true })).toFile(
  "src/assets/brand/logo-mark.png",
);
await (
  await removeBackground(base().extract(markRegion), { invertDark: true, maskMark: true })
).toFile("src/assets/brand/logo-mark-light.png");

const markBuf = await (
  await removeBackground(base().extract(markRegion), { maskMark: true })
).toBuffer();
async function squareIcon(size, padding, file) {
  const inner = await sharp(markBuf)
    .resize(size - padding * 2, size - padding * 2, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  await sharp(inner)
    .extend({ top: padding, bottom: padding, left: padding, right: padding, background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(file);
}

await squareIcon(512, 56, "src/app/icon.png");
await squareIcon(180, 20, "src/app/apple-icon.png");

console.log("Brand assets written to src/assets/brand and src/app");
