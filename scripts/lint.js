const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "src/index.html",
  "src/style.css",
  "scripts/build.js",
  "scripts/deploy.js",
  "scripts/rollback.js",
  ".gitlab-ci.yml"
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Pflichtdatei fehlt: ${file}`);
  }
}

const html = fs.readFileSync(path.join(root, "src/index.html"), "utf8");

for (const marker of ["__APP_VERSION__", "__RELEASE_CHANNEL__", "__BUILD_TIME__"]) {
  if (!html.includes(marker)) {
    throw new Error(`Platzhalter fehlt in src/index.html: ${marker}`);
  }
}

console.log("Lint-Prüfung erfolgreich.");
