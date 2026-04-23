#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const CONFIG_PATH = path.join(__dirname, "config.json");
const TEMPLATE_PATH = path.join(__dirname, "templates", "app.template.js");
const OUTPUT_PATH = path.join(__dirname, "..", "app.js");

const GITHUB_API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN;

// ── CLI args ──
// Usage: node sync.js --local /path/to/repo-clone
const args = process.argv.slice(2);
const localIdx = args.indexOf("--local");
const LOCAL_ROOT = localIdx !== -1 ? args[localIdx + 1] : null;

if (!LOCAL_ROOT && !TOKEN) {
  console.error("Error: GITHUB_TOKEN environment variable is required (or use --local /path/to/repo).");
  process.exit(1);
}

if (LOCAL_ROOT && !fs.existsSync(LOCAL_ROOT)) {
  console.error(`Error: Local repo path does not exist: ${LOCAL_ROOT}`);
  process.exit(1);
}

// ── Verify token can access a repo ──
async function verifyRepoAccess(repo) {
  const url = `${GITHUB_API}/repos/${repo}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Cannot access ${repo} (HTTP ${res.status}).\n` +
      `  Response: ${body.slice(0, 200)}\n` +
      `  Make sure your token has the "repo" scope and your account is a member of the org.`
    );
  }
  const data = await res.json();
  console.log(`  ✓ Access verified (default branch: ${data.default_branch})\n`);
  return data.default_branch;
}

// ── Read a file from a local repo clone ──
function readLocalFile(filePath) {
  const fullPath = path.join(LOCAL_ROOT, filePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf-8");
}

// ── Fetch a file from GitHub API ──
async function fetchFile(repo, filePath, ref) {
  const url = `${GITHUB_API}/repos/${repo}/contents/${filePath}${ref ? `?ref=${ref}` : ""}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} for ${repo}/${filePath}: ${await res.text()}`);
  }
  return res.text();
}

// ── Parse .resx XML → { key: value } ──
function parseResx(xml) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const doc = parser.parse(xml);
  const entries = {};
  if (!doc.root || !doc.root.data) return entries;
  const dataArr = Array.isArray(doc.root.data) ? doc.root.data : [doc.root.data];
  for (const d of dataArr) {
    const name = d["@_name"];
    const value = d.value;
    if (name && value != null) {
      entries[name] = String(value);
    }
  }
  return entries;
}

// ── Fetch all .resx files for a source, build lookup ──
async function fetchSourceData(source, ref) {
  // lookup: { "key.name": { en: "text", ar: "نص", ku: "..." } }
  const lookup = {};

  for (const group of source.resxGroups) {
    const langData = {};

    // Fetch each language file
    for (const [lang, suffix] of Object.entries(group.suffixes)) {
      const filePath = group.basePath + suffix;
      console.log(`  ${LOCAL_ROOT ? "Reading" : "Fetching"} ${filePath}`);
      const xml = LOCAL_ROOT
        ? readLocalFile(filePath)
        : await fetchFile(source.repo, filePath, ref);
      if (!xml) {
        console.warn(`  ⚠ Not found: ${filePath}`);
        continue;
      }
      langData[lang] = parseResx(xml);
    }

    // Merge into lookup: normalize "ckb" → "ku"
    const allKeys = new Set();
    for (const entries of Object.values(langData)) {
      for (const k of Object.keys(entries)) allKeys.add(k);
    }

    for (const key of allKeys) {
      if (!lookup[key]) lookup[key] = {};
      if (langData.en && langData.en[key]) lookup[key].en = langData.en[key];
      if (langData.ar && langData.ar[key]) lookup[key].ar = langData.ar[key];
      // Kurdish: prefer "ku" file, fallback to "ckb"
      if (langData.ku && langData.ku[key]) {
        lookup[key].ku = langData.ku[key];
      } else if (langData.ckb && langData.ckb[key]) {
        lookup[key].ku = langData.ckb[key];
      }
    }
  }

  return lookup;
}

// ── Resolve a mapping entry against the lookup ──
function resolveMapping(entry, lookup) {
  const msg = { scenario: entry.scenario };

  if (entry.delay) msg.delay = true;
  if (entry.surfaces) msg.surfaces = entry.surfaces;

  if (entry.type === "combined") {
    // Title + Description format
    const titleData = lookup[entry.titleKey];
    const descData = entry.descKey ? lookup[entry.descKey] : null;

    if (!titleData) {
      console.warn(`  ⚠ Key not found: ${entry.titleKey} (scenario: ${entry.scenario})`);
      return null;
    }

    msg.title = {};
    if (titleData.en) msg.title.en = titleData.en;
    if (titleData.ar) msg.title.ar = titleData.ar;
    if (titleData.ku) msg.title.ku = titleData.ku;

    if (descData) {
      msg.desc = {};
      if (descData.en) msg.desc.en = descData.en;
      if (descData.ar) msg.desc.ar = descData.ar;
      if (descData.ku) msg.desc.ku = descData.ku;
    }
  } else {
    // Flat format
    const data = lookup[entry.key];
    if (!data) {
      console.warn(`  ⚠ Key not found: ${entry.key} (scenario: ${entry.scenario})`);
      return null;
    }
    if (data.en) msg.en = data.en;
    if (data.ar) msg.ar = data.ar;
    if (data.ku) msg.ku = data.ku;
  }

  return msg;
}

// ── Build the DATA object from mappings + lookup ──
function buildData(mappings, staticFallbacks, lookup) {
  const DATA = {};

  for (const [stageId, channels] of Object.entries(mappings)) {
    DATA[stageId] = {};

    for (const [channelId, channelData] of Object.entries(channels)) {
      // Static fallback channels (SMS from SQL, etc.)
      if (channelData === "__static__") {
        const fallback = staticFallbacks[stageId] && staticFallbacks[stageId][channelId];
        DATA[stageId][channelId] = fallback || [];
        continue;
      }

      // Empty array = no data for this channel
      if (Array.isArray(channelData) && channelData.length === 0) {
        DATA[stageId][channelId] = [];
        continue;
      }

      // In-app: object with surfaces (main, timeline, indicators, etc.)
      if (channelId === "inapp") {
        DATA[stageId].inapp = {};
        for (const [surfaceId, entries] of Object.entries(channelData)) {
          const resolved = entries
            .map((e) => resolveMapping(e, lookup))
            .filter(Boolean);
          if (resolved.length > 0) {
            DATA[stageId].inapp[surfaceId] = resolved;
          }
        }
        continue;
      }

      // Push, email: flat arrays of mapping entries
      if (Array.isArray(channelData)) {
        const resolved = channelData
          .map((e) => resolveMapping(e, lookup))
          .filter(Boolean);
        DATA[stageId][channelId] = resolved;
        continue;
      }
    }
  }

  return DATA;
}

// ── Main ──
async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // Fetch all source data
  if (LOCAL_ROOT) {
    console.log(`Reading .resx files from local clone: ${LOCAL_ROOT}\n`);
  } else {
    console.log("Fetching .resx files from source repos...\n");
  }
  let lookup = {};
  for (const source of config.sources) {
    console.log(`Source: ${source.repo}`);
    const ref = LOCAL_ROOT ? null : await verifyRepoAccess(source.repo);
    const data = await fetchSourceData(source, ref);
    Object.assign(lookup, data);
  }

  const keyCount = Object.keys(lookup).length;
  console.log(`\nLoaded ${keyCount} keys from .resx files.\n`);

  // Build DATA
  console.log("Building DATA object from mappings...");
  const DATA = buildData(config.mappings, config.staticFallbacks, lookup);

  // Count resolved messages
  let totalMessages = 0;
  for (const stage of Object.values(DATA)) {
    for (const channel of Object.values(stage)) {
      if (Array.isArray(channel)) {
        totalMessages += channel.length;
      } else if (typeof channel === "object") {
        for (const surface of Object.values(channel)) {
          if (Array.isArray(surface)) totalMessages += surface.length;
        }
      }
    }
  }
  console.log(`Resolved ${totalMessages} messages across all stages/channels.\n`);

  // Inject into template
  const dataBlock = `const DATA = ${JSON.stringify(DATA, null, 2)};`;
  const output = template.replace("/*__DATA__*/", dataBlock);

  fs.writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`✓ Written to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
