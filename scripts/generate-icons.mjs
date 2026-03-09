import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" ry="96" fill="#0D1B2A"/>
  <text x="256" y="345" text-anchor="middle" font-family="Arial Black, Impact, Arial, sans-serif" font-weight="900" font-size="280" fill="#B8912A" letter-spacing="-10">SL</text>
</svg>`;

const svgBuf = Buffer.from(svg);

const sizes = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon.png', 64],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

async function generate() {
  for (const [name, size] of sizes) {
    await sharp(svgBuf).resize(size, size).png().toFile(join(PUBLIC, name));
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // favicon.ico — 48x48 PNG renamed (browsers accept PNG-based .ico)
  await sharp(svgBuf).resize(48, 48).png().toFile(join(PUBLIC, 'favicon.ico'));
  console.log('  ✓ favicon.ico (48x48)');

  console.log('\nAll icons generated in public/');
}

generate().catch(console.error);
