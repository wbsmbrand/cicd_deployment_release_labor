# Projekt: Deployment Release-Labor

Dieses Praxisprojekt gehört zu Tag 6 und macht Deployment-Strategien sichtbar, ohne echte Produktionsserver zu benötigen.

Die Idee:

```text
Build -> Artefakt -> manuelles Deployment -> Deployment-Artefakt
```

## Lernziel

Die Teilnehmenden sollen erleben:

- Ein Build-Ergebnis kann in verschiedene Umgebungen ausgeliefert werden.
- Deployment kann bewusst manuell freigegeben werden.
- Blue-Green und Canary sind unterschiedliche Strategien.
- Rollback ist ein geplanter Rückweg, nicht Panik.

## Projekt lokal ausprobieren

Im Projektordner:

```bash
npm run lint
npm run build
npm test
```

Danach Deployment simulieren:

```bash
npm run deploy:staging
npm run deploy:blue
npm run deploy:green
npm run deploy:canary10
npm run rollback:blue
```

Ergebnisordner:

```text
dist/
deployments/
```

## Was entsteht?

| Ordner/Datei | Bedeutung |
|---|---|
| `dist/` | gebautes Release-Artefakt |
| `dist/release.json` | Build-Informationen |
| `deployments/staging/` | simuliertes Staging-Deployment |
| `deployments/blue/` | Blue-Umgebung |
| `deployments/green/` | Green-Umgebung |
| `deployments/canary-10/` | Canary mit 10 % neuer Version |
| `deployments/active-route.json` | simulierte aktive Route |

## Gemeinsamer Ablauf im Unterricht

### Schritt 1: Build starten

```bash
npm run build
```

Fragen an die Gruppe:

- Was wurde erzeugt?
- Ist das schon ein Deployment?
- Warum ist `dist/` ein Artefakt?

### Schritt 2: Staging deployen

```bash
npm run deploy:staging
```

Einordnung:

- Staging ist eine Prüf- oder Vorbereitungsumgebung.
- Noch keine echte Produktion.

### Schritt 3: Blue-Green zeigen

```bash
npm run deploy:blue
npm run deploy:green
```

Einordnung:

- Blue und Green stehen für zwei vollständige Umgebungen.
- Umschalten bedeutet: eine Umgebung ist aktiv, die andere wartet.

### Schritt 4: Canary zeigen

```bash
npm run deploy:canary10
```

Einordnung:

- Nur ein kleiner Teil würde die neue Version sehen.
- In echten Systemen würde man jetzt Metriken und Logs beobachten.

### Schritt 5: Rollback zeigen

```bash
npm run rollback:blue
```

Einordnung:

- Rollback heißt zurück auf eine bekannte gute Version.
- Es sollte geplant sein, bevor Produktion verändert wird.

## GitLab-Pipeline

Die Datei `.gitlab-ci.yml` enthält:

```text
lint -> build -> smoke_test -> manuelle Deploy-Jobs
```

Wichtige Jobs:

| Job | Bedeutung |
|---|---|
| `lint` | prüft Projektstruktur |
| `build` | erzeugt `dist/` |
| `smoke_test` | prüft das Build-Ergebnis |
| `deploy_staging` | manuelle Staging-Simulation |
| `deploy_blue` | manuelles Blue-Deployment |
| `deploy_green` | manuelles Green-Deployment |
| `canary_10` | manuelle Canary-Simulation |
| `rollback_blue` | manueller Rollback |

## Warum ist das für Tag 6 passend?

Das Projekt hält die Technik klein und macht den Prozess sichtbar:

- Build und Test bleiben aus Tag 5 bekannt.
- Deployment kommt als neuer Schritt dazu.
- Manuelle Jobs zeigen Continuous Delivery.
- Automatische Deployments wären Continuous Deployment.
- Strategien werden als Dateien und Artefakte greifbar.

## Prüfungsbezug

| Thema | Merksatz |
|---|---|
| Continuous Delivery | deploybar, aber Produktivschritt oft manuell |
| Continuous Deployment | erfolgreiche Änderung geht automatisch live |
| Blue-Green | zwei vollständige Umgebungen, Umschalten |
| Canary | kleiner Anteil zuerst, dann schrittweise erhöhen |
| Required Reviewers | manuelle Freigabe vor Produktion |
| Rollback | zurück zur letzten guten Version |
