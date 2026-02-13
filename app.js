function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybe(arr, chance = 0.5) {
  return Math.random() < chance ? pick(arr) : null;
}

function pickUnique(arr, count) {
  const pool = [...arr];
  const results = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    results.push(pool.splice(idx, 1)[0]);
  }
  return results;
}

function getThreat(guardStr, rank) {
  let threat;
  if (guardStr.includes("Single")) {
    threat = pick(DATA.singleThreat);
  } else if (guardStr.includes("Two") || guardStr.includes("five")) {
    threat = pick(DATA.smallThreat);
  } else if (guardStr.includes("squads")) {
    threat = pick(DATA.squadThreat);
  } else if (guardStr.includes("army")) {
    threat = pick(DATA.armyThreat);
  } else {
    return "None";
  }
  return threat.replace(/Rank/g, rank);
}

function getWeather(location) {
  let w = pick(DATA.weather);
  if (DATA.coldRegions.includes(location) && DATA.coldWeather[w]) {
    w = DATA.coldWeather[w];
  }
  return w;
}

function getEnvironment(location, isVillage = false) {
  if (isVillage) return pick(DATA.envVillage);
  return pick(DATA.env[location] || ["Capital"]);
}

function getTarget(location) {
  const land = DATA.landTargets[location];
  if (land && Math.random() < 0.5) return pick(land);
  return pick(DATA.genericTargets);
}

function getRules(type) {
  const pool = DATA.missionRules[type] || [];
  const rules = pickUnique(pool, Math.random() < 0.5 ? 2 : 1);
  return rules.join(" · ");
}

function buildField(label, value, icon = "◈") {
  return `<div class="field"><span class="field-icon">${icon}</span><span class="field-label">${label}:</span> <span class="field-value">｢ ${value} ｣</span></div>`;
}

// ─── GENERATORS ───

function generateSabotage(rank) {
  const loc = pick(DATA.locations);
  const tgt = getTarget(loc);
  const rules = getRules("sabotage");
  const extra = maybe(DATA.extraRules);
  const nc = pick(DATA.noncombatant);
  const gd = pick(DATA.guardMod);
  const threat = getThreat(gd, rank);
  const weather = getWeather(loc);
  const env = getEnvironment(loc);
  const poi_val = maybe(DATA.poi);
  const obj = maybe(DATA.additionalObjectives.sabotage || []);

  let html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  if (obj) html += buildField("Additional Objective", obj);
  return { html, rank, type: "sabotage", title: "Sabotage Mission" };
}

function generateAssassinate(rank) {
  const isVillage = Math.random() < 0.02;
  const loc = isVillage ? "Own Hidden Village" : pick(DATA.locations);
  const tgt = isVillage ? pick(DATA.villageTargets) : pick(DATA.personTargets);
  const rules = getRules("assassinate");
  const extra = maybe(DATA.extraRules);
  const tl = pick(DATA.targetLocation);
  const gd = pick(DATA.guardMod);
  const po = pick(DATA.populace);
  const tt = pick(DATA.targetThreat).replace(/Rank/g, rank);
  const threat = getThreat(gd, rank);
  const weather = getWeather(loc === "Own Hidden Village" ? "Land of Fire" : loc);
  const env = getEnvironment(loc === "Own Hidden Village" ? "Land of Fire" : loc, isVillage);
  const setting = maybe(DATA.envGeneric);
  const poi_val = maybe(DATA.poi);

  let html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Target Threat", tt);
  html += buildField("Target Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Guards", gd);
  html += buildField("Guard Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  return { html, rank, type: "assassinate", title: "Assassination Mission" };
}

function generateBodyguard(rank) {
  const isVillage = Math.random() < 0.02;
  const loc = isVillage ? "A Hidden Village" : pick(DATA.locations);
  const tgt = pick(DATA.bodyguardTargets);
  const rules = getRules("bodyguard");
  const extra = maybe(DATA.extraRules);
  const tl = pick(DATA.targetLocation);
  const pe = pick(DATA.targetPersonality);
  const mv = pick(DATA.targetMovement);
  const am = pick(DATA.assassinMod);
  const po = pick(DATA.populace);
  const tt = pick(DATA.targetThreat).replace(/Rank/g, rank);
  const threat = getThreat(am, rank);
  const weather = getWeather(loc === "A Hidden Village" ? "Land of Fire" : loc);
  const env = getEnvironment(loc === "A Hidden Village" ? "Land of Fire" : loc, isVillage);
  const setting = maybe(DATA.envGeneric);
  const poi_val = maybe(DATA.poi);

  let html = buildField("Location", loc);
  html += buildField("Client", tgt);
  html += buildField("Client Threat", tt);
  html += buildField("Personality", pe);
  html += buildField("Movement", mv);
  html += buildField("Client Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Attackers", am);
  html += buildField("Attacker Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  return { html, rank, type: "bodyguard", title: "Bodyguard Mission" };
}

function generateDefend(rank) {
  const loc = pick(DATA.locations);
  const tgt = getTarget(loc);
  const rules = getRules("defend");
  const extra = maybe(DATA.extraRules);
  const nc = pick(DATA.noncombatant);
  const am = pick(DATA.attackerMod);
  const threat = getThreat(am, rank);
  const weather = getWeather(loc);
  const env = getEnvironment(loc);
  const poi_val = maybe(DATA.poi);
  const obj = maybe(DATA.additionalObjectives.defend || []);

  let html = buildField("Location", loc);
  html += buildField("Defend Target", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Attackers", am);
  html += buildField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  if (obj) html += buildField("Additional Objective", obj);
  return { html, rank, type: "defend", title: "Defense Mission" };
}

function generateRecon(rank) {
  const loc = pick(DATA.locations);
  const isPerson = Math.random() < 0.5;
  let tgt;
  if (isPerson) {
    tgt = pick(DATA.personTargets);
  } else {
    tgt = getTarget(loc);
  }
  const intel = pickUnique(DATA.reconIntel, Math.random() < 0.5 ? 2 : 1).join(" · ");
  const rules = getRules("recon");
  const extra = maybe(DATA.extraRules);
  const nc = pick(DATA.noncombatant);
  const gd = pick(DATA.guardMod);
  const threat = getThreat(gd, rank);
  const weather = getWeather(loc);
  const env = getEnvironment(loc);
  const poi_val = maybe(DATA.poi);
  const obj = maybe(DATA.additionalObjectives.recon || []);

  let html = buildField("Location", loc);
  html += buildField("Recon Target", tgt);
  html += buildField("Required Intel", intel);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  if (obj) html += buildField("Additional Objective", obj);
  return { html, rank, type: "recon", title: "Reconnaissance Mission" };
}

function generateTheft(rank) {
  const isVillage = Math.random() < 0.02;
  const loc = isVillage ? "A Hidden Village" : pick(DATA.locations);
  const tgt = isVillage ? pick(DATA.theftVillage) : pick(DATA.theftGeneric);
  const rules = getRules("theft");
  const extra = maybe(DATA.extraRules);
  const nc = pick(DATA.noncombatant);
  const gd = pick(DATA.guardMod);
  const threat = getThreat(gd, rank);
  const weather = getWeather(loc === "A Hidden Village" ? "Land of Fire" : loc);
  const env = getEnvironment(loc === "A Hidden Village" ? "Land of Fire" : loc, isVillage);
  const poi_val = maybe(DATA.poi);

  let html = buildField("Location", loc);
  html += buildField("Steal", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  return { html, rank, type: "theft", title: "Theft Mission" };
}

function generateAcquire(rank) {
  const isVillage = Math.random() < 0.02;
  const loc = isVillage ? "Own Hidden Village" : pick(DATA.locations);
  const tgt = isVillage ? pick(DATA.villageTargets) : pick(DATA.acquireTargets);
  const mp = pick(DATA.acquireParams);
  const rules = getRules("acquire");
  const extra = maybe(DATA.extraRules);
  const tl = pick(DATA.targetLocation);
  const gd = pick(DATA.guardMod);
  const po = pick(DATA.populace);
  const tt = pick(DATA.targetThreat).replace(/Rank/g, rank);
  const threat = getThreat(gd, rank);
  const weather = getWeather(loc === "Own Hidden Village" ? "Land of Fire" : loc);
  const env = getEnvironment(loc === "Own Hidden Village" ? "Land of Fire" : loc, isVillage);
  const setting = maybe(DATA.envGeneric);
  const mil = maybe(DATA.envMilitary);
  const poi_val = maybe(DATA.poi);

  let html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Parameters", mp);
  html += buildField("Target Threat", tt);
  html += buildField("Target Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Guards", gd);
  html += buildField("Guard Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (mil) html += buildField("Military Setting", mil);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  return { html, rank, type: "acquire", title: "Target Acquisition Mission" };
}

function generateCaravan(rank, origin = "Konohagakure") {
  const pool = DATA.destinations.filter(d => d !== origin);
  const dest = pick(pool);
  const ca = pick(DATA.caravanCargoAmount);
  const ct = pick(DATA.caravanCargoType);
  const tv = pick(DATA.caravanTravelers);
  const cs = pick(DATA.caravanSize);
  const rules = getRules("caravan");
  const extra = maybe(DATA.extraRules);
  const threat = pick(DATA.caravanThreats).replace(/Rank/g, rank);
  const weather = getWeather("Land of Fire");

  const oe = DATA.caravanEnv[origin] || ["Road"];
  const oen = pick(oe);

  const dl = dest.replace(" capital", "");
  const de = DATA.caravanEnvLands[dl] || DATA.caravanEnv[dest] || ["Capital"];
  const den = pick(de);

  const poi_val = maybe(DATA.poi);

  let html = buildField("Origin", origin);
  html += buildField("Destination", dest);
  html += buildField("Cargo Amount", ca);
  html += buildField("Cargo Type", ct);
  html += buildField("Travelers", tv);
  html += buildField("Caravan Size", cs);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Origin Terrain", oen);
  html += buildField("Destination Terrain", den);
  if (poi_val) html += buildField("Point of Interest", poi_val);
  return { html, rank, type: "caravan", title: "Caravan Escort Mission" };
}

// ─── UI ───

const generators = {
  sabotage: generateSabotage,
  assassinate: generateAssassinate,
  bodyguard: generateBodyguard,
  defend: generateDefend,
  recon: generateRecon,
  theft: generateTheft,
  acquire: generateAcquire,
  caravan: generateCaravan
};

function generate() {
  const type = document.getElementById("missionType").value;
  const rank = document.getElementById("rank").value;
  const originSel = document.getElementById("origin");
  const origin = originSel ? originSel.value : "Konohagakure";

  let result;
  if (type === "caravan") {
    result = generateCaravan(rank, origin);
  } else {
    result = generators[type](rank);
  }

  const output = document.getElementById("output");
  const card = document.getElementById("missionCard");
  const titleEl = document.getElementById("missionTitle");
  const fieldsEl = document.getElementById("missionFields");
  const rankBadge = document.getElementById("rankBadge");

  card.style.borderColor = DATA.colors[type];
  titleEl.style.color = DATA.colors[type];
  titleEl.textContent = result.title;
  fieldsEl.innerHTML = result.html;
  rankBadge.textContent = `Player Rank: ${rank}`;
  rankBadge.style.background = DATA.colors[type];
  output.classList.remove("hidden");

  // Build copy text
  let copyText = `**${result.title}**\n`;
  const fields = fieldsEl.querySelectorAll(".field");
  fields.forEach(f => {
    const label = f.querySelector(".field-label").textContent;
    const value = f.querySelector(".field-value").textContent;
    copyText += `◈ ${label} ${value}\n`;
  });
  copyText += `\nPlayer Rank: ${rank}`;
  document.getElementById("copyData").value = copyText;

  // Animate
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadeSlideIn 0.4s ease-out";
}

function copyToClipboard() {
  const copyData = document.getElementById("copyData");
  copyData.select();
  document.execCommand("copy");

  const btn = document.getElementById("copyBtn");
  const original = btn.textContent;
  btn.textContent = "Copied!";
  btn.classList.add("copied");
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove("copied");
  }, 1500);
}

function toggleOrigin() {
  const type = document.getElementById("missionType").value;
  const originGroup = document.getElementById("originGroup");
  if (type === "caravan") {
    originGroup.classList.remove("hidden");
  } else {
    originGroup.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("missionType").addEventListener("change", toggleOrigin);
  toggleOrigin();
});