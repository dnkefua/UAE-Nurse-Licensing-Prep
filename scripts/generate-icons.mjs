/**
 * Generates both ic_launcher.png AND ic_launcher_foreground.png for every
 * Android mipmap density, plus the splash images.
 *
 * ic_launcher_foreground is what the adaptive-icon XML actually uses on
 * Android 8+. Without it, Android ignores our PNG and shows the default icon.
 *
 * Run: node scripts/generate-icons.mjs
 */
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const resDir = join(root, 'android', 'app', 'src', 'main', 'res');

// ── The Centered Nurse Academy SVG (500×500 viewBox) ──────────────────────────
const CREST_SVG = (width, height, bgColor = 'none') => `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <radialGradient id="navy-grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
      <stop offset="0%" stop-color="#1a355e"/>
      <stop offset="70%" stop-color="#0d1b2e"/>
      <stop offset="100%" stop-color="#060c15"/>
    </radialGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f3e3b3"/>
      <stop offset="40%" stop-color="#dfba6b"/>
      <stop offset="75%" stop-color="#cca96a"/>
      <stop offset="100%" stop-color="#9a7b45"/>
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e4edf7"/>
      <stop offset="50%" stop-color="#b5c6d9"/>
      <stop offset="100%" stop-color="#899cb3"/>
    </linearGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  ${bgColor !== 'none' ? `<rect width="500" height="500" fill="${bgColor}"/>` : ''}

  <circle cx="250" cy="250" r="235" fill="none" stroke="url(#silver-grad)" stroke-width="12"/>
  <circle cx="250" cy="250" r="226" fill="none" stroke="#060c15" stroke-width="2"/>
  <circle cx="250" cy="250" r="224" fill="url(#navy-grad)"/>
  <circle cx="250" cy="250" r="172" fill="none" stroke="url(#gold-grad)" stroke-width="3" stroke-dasharray="6,4"/>
  <circle cx="250" cy="250" r="166" fill="none" stroke="url(#gold-grad)" stroke-width="2.5"/>

  <g stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.9">
    <line x1="250" y1="160" x2="250" y2="70" stroke-width="4"/>
    <polygon points="250,55 244,75 256,75" fill="url(#gold-grad)"/>
    <line x1="210" y1="120" x2="165" y2="85" stroke-width="2"/>
    <line x1="290" y1="120" x2="335" y2="85" stroke-width="2"/>
    <line x1="180" y1="160" x2="120" y2="130" stroke-width="1.5"/>
    <line x1="320" y1="160" x2="380" y2="130" stroke-width="1.5"/>
    <line x1="250" y1="160" x2="210" y2="90" stroke-width="1.5"/>
    <line x1="250" y1="160" x2="290" y2="90" stroke-width="1.5"/>
    <line x1="250" y1="160" x2="230" y2="80" stroke-width="1.5"/>
    <line x1="250" y1="160" x2="270" y2="80" stroke-width="1.5"/>
  </g>

  <g transform="translate(130,160)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))">
    <path d="M 0,110 Q 55,85 120,110 Q 185,85 240,110 L 240,20 Q 185,0 120,20 Q 55,0 0,20 Z" fill="url(#gold-grad)"/>
    <path d="M 12,22 Q 62,3 118,22 L 118,107 Q 62,88 12,107 Z" fill="url(#silver-grad)" stroke="#ffffff" stroke-width="1"/>
    <path d="M 122,22 Q 178,3 228,22 L 228,107 Q 178,88 122,107 Z" fill="url(#silver-grad)" stroke="#ffffff" stroke-width="1"/>
    <path d="M 25,35 Q 65,22 105,35 M 25,50 Q 65,37 105,50 M 25,65 Q 65,52 105,65 M 25,80 Q 65,67 105,80" stroke="#7ea4c4" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <path d="M 135,35 Q 175,22 215,35 M 135,50 Q 175,37 215,50 M 135,65 Q 175,52 215,65 M 135,80 Q 175,67 215,80" stroke="#7ea4c4" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>

  <g transform="translate(145,230) scale(-1,1)" fill="url(#gold-grad)">
    <path d="M 10,0 C 45,-25 95,-45 140,-50 C 120,-10 95,20 10,25 C 50,15 85,-5 120,-15 C 100,5 75,25 20,38 C 50,30 75,18 95,5 C 80,18 55,42 25,50 Z"/>
  </g>
  <g transform="translate(355,230)" fill="url(#gold-grad)">
    <path d="M 10,0 C 45,-25 95,-45 140,-50 C 120,-10 95,20 10,25 C 50,15 85,-5 120,-15 C 100,5 75,25 20,38 C 50,30 75,18 95,5 C 80,18 55,42 25,50 Z"/>
  </g>

  <g transform="translate(0,-10)">
    <rect x="246" y="105" width="8" height="230" rx="4" fill="url(#silver-grad)" stroke="#0d1b2e" stroke-width="1"/>
    <circle cx="250" cy="104" r="10" fill="url(#silver-grad)" stroke="url(#gold-grad)" stroke-width="2" filter="url(#glow)"/>
    <circle cx="250" cy="336" r="6" fill="url(#silver-grad)"/>
    <path d="M 235,310 Q 250,290 265,300 T 265,240 T 235,180 T 265,130" fill="none" stroke="url(#silver-grad)" stroke-width="5" stroke-linecap="round"/>
    <path d="M 265,310 Q 250,290 235,300 T 235,240 T 265,180 T 235,130" fill="none" stroke="url(#silver-grad)" stroke-width="5" stroke-linecap="round"/>
    <path d="M 262,126 Q 268,124 266,118 Q 260,118 262,126 Z" fill="url(#silver-grad)"/>
    <path d="M 238,126 Q 232,124 234,118 Q 240,118 238,126 Z" fill="url(#silver-grad)"/>
    <circle cx="264" cy="120" r="0.75" fill="#f43f5e"/>
    <circle cx="236" cy="120" r="0.75" fill="#f43f5e"/>
  </g>

  <path id="textPath" d="M 55,270 A 205,205 0 0,0 445,270" fill="none"/>
  <text fill="url(#gold-grad)" font-size="26.3" letter-spacing="5" font-family="serif" font-weight="bold">
    <textPath href="#textPath" startOffset="50%" text-anchor="middle">THE CENTERED NURSE ACADEMY</textPath>
  </text>

  <polygon points="120,290 123,293 126,290 123,287" fill="url(#gold-grad)"/>
  <polygon points="380,290 383,293 386,290 383,287" fill="url(#gold-grad)"/>
</svg>`;

function renderPng(svg, size) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  return resvg.render().asPng();
}

function write(filePath, buffer) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, buffer);
  console.log(`  ✅ ${filePath.replace(root + '\\', '').replace(root + '/', '')}`);
}

// ── Adaptive icon sizes (foreground layer = 108dp at each density) ─────────────
// The foreground is drawn at 108dp but content should be in center 72dp (safe zone)
// We render the full crest to fill that well.
const DENSITIES = [
  { name: 'mipmap-mdpi',    iconPx: 48,  fgPx: 108 },
  { name: 'mipmap-hdpi',    iconPx: 72,  fgPx: 162 },
  { name: 'mipmap-xhdpi',   iconPx: 96,  fgPx: 216 },
  { name: 'mipmap-xxhdpi',  iconPx: 144, fgPx: 324 },
  { name: 'mipmap-xxxhdpi', iconPx: 192, fgPx: 432 },
];

console.log('\nGenerating Android icons...\n');

for (const { name, iconPx, fgPx } of DENSITIES) {
  const dir = join(resDir, name);

  // ic_launcher.png — full icon with navy background (for legacy / splash use)
  write(join(dir, 'ic_launcher.png'), renderPng(CREST_SVG(iconPx, iconPx, '#0a1526'), iconPx));

  // ic_launcher_round.png — same but round clipping handled by OS
  write(join(dir, 'ic_launcher_round.png'), renderPng(CREST_SVG(iconPx, iconPx, '#0a1526'), iconPx));

  // ic_launcher_foreground.png — what adaptive-icon XML actually loads on Android 8+
  // Transparent background so the XML's @color/ic_launcher_background shows through
  write(join(dir, 'ic_launcher_foreground.png'), renderPng(CREST_SVG(fgPx, fgPx), fgPx));
}

// ── Source assets folder (for future capacitor-assets runs) ───────────────────
mkdirSync(join(root, 'assets'), { recursive: true });
write(join(root, 'assets', 'icon-only.png'), renderPng(CREST_SVG(1024, 1024, '#0a1526'), 1024));
write(join(root, 'assets', 'icon-foreground.png'), renderPng(CREST_SVG(1024, 1024), 1024));

// ── Splash (navy fill) ────────────────────────────────────────────────────────
const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732"><rect width="2732" height="2732" fill="#0a1526"/></svg>`;
const splashPng = renderPng(splashSvg, 2732);
write(join(root, 'assets', 'splash.png'), splashPng);

console.log('\nDone.\n');
