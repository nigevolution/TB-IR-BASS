import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const ROOT = path.resolve(import.meta.dirname, "..")
const FUNCTIONS_DIR = path.join(ROOT, "netlify", "functions")
const NETLIFY_TOML = path.join(ROOT, "netlify.toml")

test("security: insecure/vulnerable functions must not exist in netlify/functions", () => {
  const forbiddenFiles = [
    "cakto-auth.js",
    "painel.js",
    "test-cakto.js",
    "register.js",
    "generate.js",
    "import.js"
  ]

  for (const file of forbiddenFiles) {
    const fullPath = path.join(FUNCTIONS_DIR, file)
    assert.equal(
      fs.existsSync(fullPath),
      false,
      `Vulnerable file ${file} should have been removed from netlify/functions`
    )
  }
})

test("security: netlify.toml must define security defense headers", () => {
  const content = fs.readFileSync(NETLIFY_TOML, "utf-8")
  assert.match(content, /\[\[headers\]\]/, "netlify.toml must include a [[headers]] section")
  assert.match(content, /X-Frame-Options\s*=\s*"SAMEORIGIN"/, "Must include X-Frame-Options: SAMEORIGIN")
  assert.match(content, /X-Content-Type-Options\s*=\s*"nosniff"/, "Must include X-Content-Type-Options: nosniff")
  assert.match(content, /Referrer-Policy\s*=\s*"strict-origin-when-cross-origin"/, "Must include Referrer-Policy")
  assert.match(content, /Permissions-Policy/, "Must include Permissions-Policy")
})

test("security: production functions must pass syntax check", () => {
  const validProductionFunctions = [
    "cakto-webhook.js",
    "mp_webhook.js",
    "vault.mjs",
    "l.mjs"
  ]

  for (const file of validProductionFunctions) {
    const fullPath = path.join(FUNCTIONS_DIR, file)
    assert.equal(fs.existsSync(fullPath), true, `Production function ${file} must exist`)
    const check = spawnSync("node", ["--check", fullPath])
    assert.equal(check.status, 0, `Syntax error in ${file}: ${check.stderr.toString()}`)
  }
})
