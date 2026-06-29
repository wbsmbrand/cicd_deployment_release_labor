const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const deploymentsDir = path.join(root, "deployments");
const target = process.argv[2];

if (!target) {
  throw new Error("Rollback-Ziel fehlt. Beispiel: node scripts/rollback.js blue");
}

const targetDir = path.join(deploymentsDir, target);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(
    path.join(targetDir, "hinweis.txt"),
    "Dieses Rollback-Ziel wurde für die Unterrichtssimulation angelegt.\n",
    "utf8"
  );
}

const rollback = {
  action: "rollback",
  activeTarget: target,
  reason: "Zurück auf bekannte gute Umgebung",
  rolledBackAt: new Date().toISOString()
};

fs.mkdirSync(deploymentsDir, { recursive: true });
fs.writeFileSync(path.join(deploymentsDir, "active-route.json"), JSON.stringify(rollback, null, 2), "utf8");

console.log(`Rollback simuliert: aktiv ist wieder ${target}`);
