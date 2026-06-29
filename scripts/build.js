const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");

const appVersion = process.env.APP_VERSION || `local-${new Date().toISOString().slice(0, 10)}`;
const releaseChannel = process.env.RELEASE_CHANNEL || "local";
const buildTime = new Date().toISOString();

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

let html = fs.readFileSync(path.join(srcDir, "index.html"), "utf8");
html = html
  .replaceAll("__APP_VERSION__", appVersion)
  .replaceAll("__RELEASE_CHANNEL__", releaseChannel)
  .replaceAll("__BUILD_TIME__", buildTime);

fs.writeFileSync(path.join(distDir, "index.html"), html, "utf8");
fs.copyFileSync(path.join(srcDir, "style.css"), path.join(distDir, "style.css"));

const release = {
  app: "deployment-release-labor",
  version: appVersion,
  channel: releaseChannel,
  builtAt: buildTime
};

fs.writeFileSync(path.join(distDir, "release.json"), JSON.stringify(release, null, 2), "utf8");

console.log(`Build abgeschlossen: ${release.version} (${release.channel})`);
