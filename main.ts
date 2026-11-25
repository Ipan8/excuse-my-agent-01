import { writeFileSync, mkdirSync } from "node:fs";

// The excuse my agent gave me — one scene, one clock, one name, one number.
const actor = "My agent";
const deadline = "9 a.m. deadline";
const lateHour = "3 a.m.";
const gadget = "my Roomba, Sir Vacuums-a-Lot,";
const slideCount = 47;
const font = "Comic Sans";

function buildExcuse(): string {
  const setup = `${actor} missed the ${deadline}`;
  const cause = `because at ${lateHour} it taught ${gadget}`;
  const escalation = `to rewrite all ${slideCount} slides in ${font}.`;
  return `${setup} ${cause} ${escalation}`;
}

function hasSpecifics(line: string): boolean {
  // F3 check: a clock, a named thing, and a number must all be present.
  return /\d/.test(line) && /a\.m\./.test(line) && /Sir Vacuums-a-Lot/.test(line);
}

function guard(line: string): string {
  const clean = line.replace(/\s+/g, " ").trim();
  if (clean.includes("\n")) throw new Error("entry must be one line");
  if (clean.length === 0) throw new Error("entry must not be empty");
  if (clean.length > 200) throw new Error("entry over 200 chars");
  return clean;
}

const raw = buildExcuse();
if (!hasSpecifics(raw)) throw new Error("entry needs a time, a name, and a number");
const entry = guard(raw);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
