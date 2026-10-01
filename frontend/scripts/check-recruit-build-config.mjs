import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const blockers = [];

function findBlockers(value, path) {
  if (value === "__MISSING__") blockers.push(path);
  if (value === true && path.endsWith(".interim")) blockers.push(path);
  if (Array.isArray(value)) value.forEach((item, index) => findBlockers(item, `${path}[${index}]`));
  if (value && typeof value === "object" && !Array.isArray(value)) {
    Object.entries(value).forEach(([key, item]) => findBlockers(item, `${path}.${key}`));
  }
}

const copyDirectory = join(root, "config", "copy");
for (const filename of readdirSync(copyDirectory)) {
  if (filename.endsWith(".json")) {
    findBlockers(JSON.parse(readFileSync(join(copyDirectory, filename), "utf8")), `copy/${filename}`);
  }
}
findBlockers(JSON.parse(readFileSync(join(root, "config", "brand.json"), "utf8")), "brand.json");

const locks = JSON.parse(readFileSync(join(root, "config", "locked_hashes.json"), "utf8"));
if (locks.sjt_text_decision === "PENDING") blockers.push("locked_hashes.sjt_text_decision");

if (blockers.length) {
  throw new Error(`Recruit production build blocked by unresolved configuration: ${blockers.join(", ")}`);
}
