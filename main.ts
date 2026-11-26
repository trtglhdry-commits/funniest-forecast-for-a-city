import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Funniest Forecast for a City That Isn't — Drizzlewick.
// One line, 109 characters, inside the 1-120 gate. Flat bulletin phrasing,
// then the break: the forecast itself caused the rain.
const LINE =
  "Forecast for Drizzlewick: 100% chance of rain, because the weatherman bet your umbrella on sunshine and lost.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate enforced in code: single line, 1-120 chars, not only whitespace,
// no trailing newline in the file.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 chars, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back check: the file on disk must be exactly the line, byte for byte,
// with no trailing newline added by the write.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the line exactly");
}
