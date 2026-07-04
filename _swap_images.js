// One-off: swap placeholder resort images for real Soul Surfer photos.
// Overwrites image BYTES in place (same filenames + every responsive variant,
// regenerated to the exact same dimensions & format) so NO html/css changes are
// needed. Originals are backed up to _img_backup/ first (reversible).
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(process.cwd(), "public", "assets");
const BACKUP = path.join(process.cwd(), "_img_backup");
const REAL = "C:/Users/Administrator/Downloads/Soul Surfer Images (1)/Soul Surfer Images";

// Real source photos (chosen by looking at each one)
const S = {
  HERO:     path.join(REAL, "Hero-Section.jpg"),               // real beach/surf group shot
  EXTERIOR: path.join(REAL, "soul_camp", "2.jpg"),             // building exterior
  POOL:     path.join(REAL, "Aug 13th 2025 (1)", "7.jpg"),     // rooftop pool
  BAR:      path.join(REAL, "Aug 13th 2025 (1)", "9.jpg"),     // bar / social space
  BEDROOM:  path.join(REAL, "Aug 13th 2025 (1)", "16.jpg"),    // double bedroom
  LOUNGE:   path.join(REAL, "Aug 13th 2025 (1)", "12.jpg"),    // lounge / suite
};

// stem (relative to public/assets, without size/ext suffix) -> source photo.
// Every file whose name STARTS WITH the stem is regenerated (all webp widths etc).
const IN = "inline/";
const WP = "www.beyondsenses.de/wp-content/uploads/";
const MAP = [
  // --- HERO (desktop + mobile) ---
  [IN + "img-01-87586a34", S.HERO],
  [IN + "img-02-17464eee", S.HERO],
  [IN + "img-03-e75d08e6", S.HERO],
  [WP + "2026/05/home-header-banner-mobile", S.HERO],
  // --- Feature 1: exterior ---
  [IN + "img-11-254e8e7a", S.EXTERIOR],
  [IN + "img-12-ba0b24df", S.EXTERIOR],
  [IN + "img-09-aa8e51c2", S.EXTERIOR],
  [WP + "2026/02/vakkaru-maldives-header-banner-mobile", S.EXTERIOR],
  // --- Feature 2: rooftop pool ---
  [IN + "img-05-d86cdf08", S.POOL],
  [IN + "img-06-0a388b7d", S.POOL],
  [IN + "img-10-bb9bac83", S.POOL],
  [WP + "2026/02/soneva-fushi-header-banner-mobile", S.POOL],
  // --- Feature 3: bar ---
  [IN + "img-07-af2d38b4", S.BAR],
  [IN + "img-08-255fef5b", S.BAR],
  [IN + "img-04-7cb8971c", S.BAR],
  [WP + "2026/05/ayurveda-and-malediven-deluxe-tour-header-banner-mobile-image", S.BAR],
  // --- Homepage section / loop-grid backgrounds ---
  [WP + "2026/05/niyama-private-islands-maldives-the-crescent-2", S.POOL],
  [WP + "2026/03/banyan-tree-vabbinfaru-header-banner-image-desktop", S.EXTERIOR],
  [WP + "2026/01/milaidhoo-header-banner-mobile", S.EXTERIOR],
  [WP + "2026/05/guest-review-image-1", S.HERO],
  [WP + "2026/05/oblu-select-at-sangeli-gallery-image-4", S.BEDROOM],
  [WP + "2026/05/alphonse-island-resort-gallery-image-08", S.LOUNGE],
  [WP + "2026/02/jumeirah-olhahali-island-beach-villa-with-pool-5", S.POOL],
  [WP + "2026/02/milaidhoo", S.EXTERIOR],
  // --- Room galleries (/rooms + home "Featured Rooms") ---
  ["rooms/dorm-1",   path.join(REAL, "Aug 13th 2025 (1)", "19.jpg")],
  ["rooms/dorm-2",   path.join(REAL, "Aug 13th 2025 (1)", "20.jpg")],
  ["rooms/dorm-3",   path.join(REAL, "Aug 13th 2025 (1)", "23.jpg")],
  ["rooms/double-1", path.join(REAL, "Rooms and bathroom 31st August", "1.jpg")],
  ["rooms/double-2", path.join(REAL, "Rooms and bathroom 31st August", "0.jpg")],
  ["rooms/double-3", path.join(REAL, "soul_camp", "13.jpg")],
  ["rooms/single-1", path.join(REAL, "Rooms and bathroom 31st August", "3.jpg")],
  ["rooms/single-2", path.join(REAL, "soul_camp", "14.jpg")],
  ["rooms/single-3", path.join(REAL, "Aug 13th 2025 (1)", "15.jpg")],
  // --- Activities: only the beach slot has a real match ---
  ["activities/act-beach", S.HERO],
];

const IMG_EXT = /\.(jpe?g|png|webp)$/i;

function backup(abs) {
  const rel = path.relative(ASSETS, abs);
  const dest = path.join(BACKUP, rel);
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(abs, dest);
  }
}

(async () => {
  let count = 0;
  for (const [stem, src] of MAP) {
    if (!fs.existsSync(src)) { console.log("!! missing source:", src); continue; }
    const dir = path.join(ASSETS, path.dirname(stem));
    const prefix = path.basename(stem);
    if (!fs.existsSync(dir)) { console.log("!! missing dir:", dir); continue; }
    const files = fs.readdirSync(dir).filter(
      (f) => f.startsWith(prefix) && IMG_EXT.test(f)
    );
    if (!files.length) { console.log("!! no files for stem:", stem); continue; }
    for (const f of files) {
      const abs = path.join(dir, f);
      const meta = await sharp(fs.readFileSync(abs)).metadata(); // buffer: no file lock
      const w = meta.width, h = meta.height, fmt = meta.format;
      backup(abs);
      let pipe = sharp(src).resize(w, h, { fit: "cover", position: "centre" });
      if (fmt === "png") pipe = pipe.png();
      else if (fmt === "webp") pipe = pipe.webp({ quality: 82 });
      else pipe = pipe.jpeg({ quality: 86, mozjpeg: true });
      const buf = await pipe.toBuffer();
      fs.writeFileSync(abs, buf);
      count++;
    }
    console.log("ok:", stem, "->", path.basename(src), `(${files.length} file${files.length>1?"s":""})`);
  }
  console.log("\nDONE. Regenerated", count, "image files. Backup:", BACKUP);
})();
