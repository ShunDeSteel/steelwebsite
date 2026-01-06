import {promises as fs} from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "public", "images", "products");

/** @type {{from: string, to: string}[]} */
const map = [
  {from: "热卷or黑带.png", to: "hot-rolled-coil-1.png"},
  {from: "镀锌带钢.png", to: "galvanized-strip-1.png"},
  {from: "架子管.png", to: "scaffold-tube-1.png"},
  {from: "架子管2.png", to: "scaffold-tube-2.png"},
  {from: "精密管.png", to: "precision-tube-1.png"},
  {from: "精密管2.png", to: "precision-tube-2.png"},
  {from: "盘扣.png", to: "ringlock-1.png"},
  {from: "盘扣2.png", to: "ringlock-2.png"},
  {from: "螺纹钢.png", to: "deformed-rebar-1.png"},
  {from: "螺纹钢2.png", to: "deformed-rebar-2.png"},
  {from: "角钢.png", to: "angle-steel-1.png"},
  {from: "角钢2.png", to: "angle-steel-2.png"},
  {from: "槽钢.png", to: "channel-steel-1.png"},
  {from: "槽钢2.png", to: "channel-steel-2.png"},
  {from: "工字钢.png", to: "i-beam-1.png"},
  {from: "工字钢2.png", to: "i-beam-2.png"},
  {from: "冷硬卷板.png", to: "cold-hard-strip-1.png"},
  {from: "冷硬卷板2.png", to: "cold-hard-strip-2.png"},
  {from: "退火带钢.png", to: "annealed-strip-1.png"},
  {from: "50锰钢.png", to: "manganese-spring-steel-1.png"},
  {from: "50锰钢2.png", to: "manganese-spring-steel-2.png"},
  {from: "上下拖.png", to: "screw-jack-1.png"},
  {from: "踏板.png", to: "steel-plank-1.png"},
  {from: "斜拉杆.png", to: "diagonal-brace-1.png"},
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

const missing = [];

for (const {from, to} of map) {
  const fromPath = path.join(srcDir, from);
  const toPath = path.join(srcDir, to);
  if (!(await exists(fromPath))) {
    missing.push(from);
    continue;
  }
  await fs.copyFile(fromPath, toPath);
}

if (missing.length) {
  console.log("Missing source images:");
  for (const m of missing) console.log("-", m);
}

console.log("Done. Normalized images created in:", srcDir);


