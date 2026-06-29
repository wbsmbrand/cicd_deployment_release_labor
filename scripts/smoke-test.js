const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");
const releasePath = path.join(distDir, "release.json");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html fehlt. Wurde der Build ausgeführt?");
}

if (!fs.existsSync(releasePath)) {
  throw new Error("dist/release.json fehlt.");
}

const html = fs.readFileSync(indexPath, "utf8");

if (!html.includes("Release-Labor")) {
  throw new Error("Erwartete Überschrift fehlt im Build-Ergebnis.");
}

if (html.includes("__APP_VERSION__") || html.includes("__BUILD_TIME__")) {
  throw new Error("Nicht alle Build-Platzhalter wurden ersetzt.");
}

const release = JSON.parse(fs.readFileSync(releasePath, "utf8"));

if (!release.version || !release.builtAt) {
  throw new Error("release.json enthält keine vollständigen Release-Informationen.");
}

console.log("Smoke-Test erfolgreich.");
