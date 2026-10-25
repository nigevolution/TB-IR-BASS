import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const storeJsPath = path.join(rootDir, "public", "js", "store.js");
const indexHtmlPath = path.join(rootDir, "index.html");

test("combos catalog is defined and contains exactly 10 combos with valid Cakto links", () => {
  const storeJs = fs.readFileSync(storeJsPath, "utf-8");

  // Check that combos array is declared
  assert.match(storeJs, /const\s+combos\s*=\s*\[/);

  // Extract combo names and links
  const comboLinks = [
    "https://pay.cakto.com.br/checkout/86j5ytj",
    "https://pay.cakto.com.br/checkout/3bnzfqk",
    "https://pay.cakto.com.br/checkout/39wkq4q",
    "https://pay.cakto.com.br/checkout/fzp235u",
    "https://pay.cakto.com.br/checkout/3c6kwki",
    "https://pay.cakto.com.br/checkout/3bvaz3t",
    "https://pay.cakto.com.br/checkout/9zqanv6",
    "https://pay.cakto.com.br/checkout/uanzm3v",
    "https://pay.cakto.com.br/checkout/dt2t9jy",
    "https://pay.cakto.com.br/checkout/desr77i"
  ];

  for (const link of comboLinks) {
    assert.ok(storeJs.includes(link), `store.js must contain combo link: ${link}`);
  }
});

test("index.html contains the dedicated combos section container", () => {
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
  assert.ok(
    indexHtml.includes('id="combos-vitrine"') || indexHtml.includes('id="combos"'),
    "index.html must have a dedicated combos section container"
  );
  assert.ok(indexHtml.includes("Combos") || indexHtml.includes("COMBOS"), "Must have section heading mentioning Combos");
});

test("store.js renders combos with openTrackedCheckout and badges", () => {
  const storeJs = fs.readFileSync(storeJsPath, "utf-8");
  assert.match(storeJs, /renderCombos|combos-grid/);
  assert.match(storeJs, /openTrackedCheckout/);
});
