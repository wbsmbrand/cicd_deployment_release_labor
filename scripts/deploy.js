const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const deploymentsDir = path.join(root, "deployments");

const target = process.argv[2];
const percent = process.argv[3] || null;

if (!target) {
  throw new Error("Ziel fehlt. Beispiel: node scripts/deploy.js staging");
}

if (!fs.existsSync(distDir)) {
  throw new Error("dist/ fehlt. Bitte zuerst npm run build ausführen.");
}

const targetName = target === "canary" ? `canary-${percent || "10"}` : target;
const targetDir = path.join(deploymentsDir, targetName);

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(distDir, targetDir, { recursive: true });

const release = JSON.parse(fs.readFileSync(path.join(distDir, "release.json"), "utf8"));
const deployment = {
  target: targetName,
  strategy: strategyFor(target),
  trafficNewVersionPercent: target === "canary" ? Number(percent || 10) : 100,
  release,
  deployedAt: new Date().toISOString()
};

fs.writeFileSync(path.join(targetDir, "deployment.json"), JSON.stringify(deployment, null, 2), "utf8");
fs.mkdirSync(deploymentsDir, { recursive: true });
fs.writeFileSync(path.join(deploymentsDir, "active-route.json"), JSON.stringify(deployment, null, 2), "utf8");

console.log(`Deployment simuliert: ${targetName}`);
console.log(`Strategie: ${deployment.strategy}`);

function strategyFor(value) {
  if (value === "staging") return "staging";
  if (value === "blue" || value === "green") return "blue-green";
  if (value === "canary") return "canary";
  return "recreate";
}
