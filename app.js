// ─── UTILITIES ───

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybe(arr, chance) {
  if (chance === undefined) chance = 0.5;
  return Math.random() < chance ? pick(arr) : null;
}

function pickUnique(arr, count) {
  var pool = arr.slice();
  var results = [];
  for (var i = 0; i < count && pool.length > 0; i++) {
    var idx = Math.floor(Math.random() * pool.length);
    results.push(pool.splice(idx, 1)[0]);
  }
  return results;
}

// ─── RANK RESOLUTION ───

var RANK_ORDER = ["F", "E", "D", "C", "B", "A", "S"];

var RANK_NAMES = {
  "F": "Civilian",
  "E": "Academy Student",
  "D": "Genin",
  "C": "Chūnin",
  "B": "Sp. Jōnin",
  "A": "Jōnin",
  "S": "Kage/Sannin"
};

function resolveRank(baseRank, offset) {
  var idx = RANK_ORDER.indexOf(baseRank);
  var newIdx = idx + offset;
  if (newIdx < 0) newIdx = 0;
  if (newIdx > RANK_ORDER.length - 1) newIdx = RANK_ORDER.length - 1;
  return RANK_ORDER[newIdx];
}

function resolveEntry(entry, baseRank) {
  var rank;
  if (entry.fixedRank) {
    rank = entry.fixedRank;
  } else {
    rank = resolveRank(baseRank, entry.rankOffset);
    if (entry.minRank) {
      var minIdx = RANK_ORDER.indexOf(entry.minRank);
      var curIdx = RANK_ORDER.indexOf(rank);
      if (curIdx < minIdx) rank = entry.minRank;
    }
  }
  return entry.count + " × " + rank + "-Rank (" + RANK_NAMES[rank] + ")";
}

function resolveThreatGroup(threatObj, baseRank) {
  var lines = [];
  for (var i = 0; i < threatObj.entries.length; i++) {
    lines.push(resolveEntry(threatObj.entries[i], baseRank));
  }
  return { name: threatObj.name, lines: lines };
}

function resolveTargetThreat(threatObj, baseRank) {
  var rank;
  if (threatObj.fixedRank) {
    rank = threatObj.fixedRank;
  } else {
    rank = resolveRank(baseRank, threatObj.rankOffset);
  }
  return threatObj.name + " — " + rank + "-Rank (" + RANK_NAMES[rank] + ")";
}

// ─── THREAT LOOKUP ───

function getThreat(guardStr, rank) {
  var pool;
  if (guardStr.indexOf("Unguarded") !== -1) {
    return { name: "None", lines: [] };
  } else if (guardStr.indexOf("Single") !== -1) {
    pool = DATA.singleThreat;
  } else if (guardStr.indexOf("Two") !== -1 || guardStr.indexOf("five") !== -1) {
    pool = DATA.smallThreat;
  } else if (guardStr.indexOf("squads") !== -1) {
    pool = DATA.squadThreat;
  } else if (guardStr.indexOf("army") !== -1) {
    pool = DATA.armyThreat;
  } else {
    return { name: "None", lines: [] };
  }
  return resolveThreatGroup(pick(pool), rank);
}

// ─── FIELD BUILDERS ───

function buildField(label, value) {
  return '<div class="field">' +
    '<span class="field-icon">◈</span>' +
    '<span class="field-label">' + label + ':</span> ' +
    '<span class="field-value">｢ ' + value + ' ｣</span>' +
    '</div>';
}

function buildThreatField(label, threatResult) {
  var html = '<div class="field">' +
    '<span class="field-icon">◈</span>' +
    '<span class="field-label">' + label + ':</span> ' +
    '<span class="field-value">｢ ' + threatResult.name + ' ｣</span>' +
    '</div>';
  if (threatResult.lines && threatResult.lines.length > 0) {
    html += '<div class="threat-breakdown">';
    for (var i = 0; i < threatResult.lines.length; i++) {
      html += '<div class="threat-line">' + threatResult.lines[i] + '</div>';
    }
    html += '</div>';
  }
  return html;
}

// ─── COMMON HELPERS ───

function getWeather(location) {
  var w = pick(DATA.weather);
  if (DATA.coldRegions.indexOf(location) !== -1 && DATA.coldWeather[w]) {
    w = DATA.coldWeather[w];
  }
  return w;
}

function getEnvironment(location, isVillage) {
  if (isVillage) return pick(DATA.envVillage);
  var envList = DATA.env[location];
  if (envList) return pick(envList);
  return "Capital";
}

function getTarget(location) {
  var land = DATA.landTargets[location];
  if (land && Math.random() < 0.5) return pick(land);
  return pick(DATA.genericTargets);
}

function getRules(type) {
  var pool = DATA.missionRules[type] || [];
  var count = Math.random() < 0.5 ? 2 : 1;
  var rules = pickUnique(pool, count);
  return rules.join(" · ");
}

// ─── GENERATORS ───

function generateSabotage(rank) {
  var loc = pick(DATA.locations);
  var tgt = getTarget(loc);
  var rules = getRules("sabotage");
  var extra = maybe(DATA.extraRules);
  var nc = pick(DATA.noncombatant);
  var gd = pick(DATA.guardMod);
  var threat = getThreat(gd, rank);
  var weather = getWeather(loc);
  var env = getEnvironment(loc, false);
  var poiVal = maybe(DATA.poi);
  var objPool = DATA.additionalObjectives.sabotage || [];
  var obj = maybe(objPool);

  var html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildThreatField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  if (obj) html += buildField("Additional Objective", obj);
  return { html: html, rank: rank, type: "sabotage", title: "Sabotage Mission" };
}

function generateAssassinate(rank) {
  var isVillage = Math.random() < 0.02;
  var loc = isVillage ? "Own Hidden Village" : pick(DATA.locations);
  var tgt = isVillage ? pick(DATA.villageTargets) : pick(DATA.personTargets);
  var rules = getRules("assassinate");
  var extra = maybe(DATA.extraRules);
  var tl = pick(DATA.targetLocation);
  var gd = pick(DATA.guardMod);
  var po = pick(DATA.populace);
  var tt = resolveTargetThreat(pick(DATA.targetThreat), rank);
  var threat = getThreat(gd, rank);
  var weatherLoc = isVillage ? "Land of Fire" : loc;
  var weather = getWeather(weatherLoc);
  var env = getEnvironment(isVillage ? "Land of Fire" : loc, isVillage);
  var setting = maybe(DATA.envGeneric);
  var poiVal = maybe(DATA.poi);

  var html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Target Threat", tt);
  html += buildField("Target Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Guards", gd);
  html += buildThreatField("Guard Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  return { html: html, rank: rank, type: "assassinate", title: "Assassination Mission" };
}

function generateBodyguard(rank) {
  var isVillage = Math.random() < 0.02;
  var loc = isVillage ? "A Hidden Village" : pick(DATA.locations);
  var tgt = pick(DATA.bodyguardTargets);
  var rules = getRules("bodyguard");
  var extra = maybe(DATA.extraRules);
  var tl = pick(DATA.targetLocation);
  var pe = pick(DATA.targetPersonality);
  var mv = pick(DATA.targetMovement);
  var am = pick(DATA.assassinMod);
  var po = pick(DATA.populace);
  var tt = resolveTargetThreat(pick(DATA.targetThreat), rank);
  var threat = getThreat(am, rank);
  var weatherLoc = isVillage ? "Land of Fire" : loc;
  var weather = getWeather(weatherLoc);
  var env = getEnvironment(isVillage ? "Land of Fire" : loc, isVillage);
  var setting = maybe(DATA.envGeneric);
  var poiVal = maybe(DATA.poi);

  var html = buildField("Location", loc);
  html += buildField("Client", tgt);
  html += buildField("Client Threat", tt);
  html += buildField("Personality", pe);
  html += buildField("Movement", mv);
  html += buildField("Client Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Attackers", am);
  html += buildThreatField("Attacker Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  return { html: html, rank: rank, type: "bodyguard", title: "Bodyguard Mission" };
}

function generateDefend(rank) {
  var loc = pick(DATA.locations);
  var tgt = getTarget(loc);
  var rules = getRules("defend");
  var extra = maybe(DATA.extraRules);
  var nc = pick(DATA.noncombatant);
  var am = pick(DATA.attackerMod);
  var threat = getThreat(am, rank);
  var weather = getWeather(loc);
  var env = getEnvironment(loc, false);
  var poiVal = maybe(DATA.poi);
  var objPool = DATA.additionalObjectives.defend || [];
  var obj = maybe(objPool);

  var html = buildField("Location", loc);
  html += buildField("Defend Target", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Attackers", am);
  html += buildThreatField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  if (obj) html += buildField("Additional Objective", obj);
  return { html: html, rank: rank, type: "defend", title: "Defense Mission" };
}

function generateRecon(rank) {
  var loc = pick(DATA.locations);
  var isPerson = Math.random() < 0.5;
  var tgt;
  if (isPerson) {
    tgt = pick(DATA.personTargets);
  } else {
    tgt = getTarget(loc);
  }
  var intelCount = Math.random() < 0.5 ? 2 : 1;
  var intel = pickUnique(DATA.reconIntel, intelCount).join(" · ");
  var rules = getRules("recon");
  var extra = maybe(DATA.extraRules);
  var nc = pick(DATA.noncombatant);
  var gd = pick(DATA.guardMod);
  var threat = getThreat(gd, rank);
  var weather = getWeather(loc);
  var env = getEnvironment(loc, false);
  var poiVal = maybe(DATA.poi);
  var objPool = DATA.additionalObjectives.recon || [];
  var obj = maybe(objPool);

  var html = buildField("Location", loc);
  html += buildField("Recon Target", tgt);
  html += buildField("Required Intel", intel);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildThreatField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  if (obj) html += buildField("Additional Objective", obj);
  return { html: html, rank: rank, type: "recon", title: "Reconnaissance Mission" };
}

function generateTheft(rank) {
  var isVillage = Math.random() < 0.02;
  var loc = isVillage ? "A Hidden Village" : pick(DATA.locations);
  var tgt = isVillage ? pick(DATA.theftVillage) : pick(DATA.theftGeneric);
  var rules = getRules("theft");
  var extra = maybe(DATA.extraRules);
  var nc = pick(DATA.noncombatant);
  var gd = pick(DATA.guardMod);
  var threat = getThreat(gd, rank);
  var weatherLoc = isVillage ? "Land of Fire" : loc;
  var weather = getWeather(weatherLoc);
  var env = getEnvironment(isVillage ? "Land of Fire" : loc, isVillage);
  var poiVal = maybe(DATA.poi);

  var html = buildField("Location", loc);
  html += buildField("Steal", tgt);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Non-Combatants", nc);
  html += buildField("Guards", gd);
  html += buildThreatField("Threat Level", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  return { html: html, rank: rank, type: "theft", title: "Theft Mission" };
}

function generateAcquire(rank) {
  var isVillage = Math.random() < 0.02;
  var loc = isVillage ? "Own Hidden Village" : pick(DATA.locations);
  var tgt = isVillage ? pick(DATA.villageTargets) : pick(DATA.acquireTargets);
  var mp = pick(DATA.acquireParams);
  var rules = getRules("acquire");
  var extra = maybe(DATA.extraRules);
  var tl = pick(DATA.targetLocation);
  var gd = pick(DATA.guardMod);
  var po = pick(DATA.populace);
  var tt = resolveTargetThreat(pick(DATA.targetThreat), rank);
  var threat = getThreat(gd, rank);
  var weatherLoc = isVillage ? "Land of Fire" : loc;
  var weather = getWeather(weatherLoc);
  var env = getEnvironment(isVillage ? "Land of Fire" : loc, isVillage);
  var setting = maybe(DATA.envGeneric);
  var mil = maybe(DATA.envMilitary);
  var poiVal = maybe(DATA.poi);

  var html = buildField("Location", loc);
  html += buildField("Target", tgt);
  html += buildField("Parameters", mp);
  html += buildField("Target Threat", tt);
  html += buildField("Target Location", tl);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildField("Local Populace", po);
  html += buildField("Guards", gd);
  html += buildThreatField("Guard Threat", threat);
  html += buildField("Weather", weather);
  html += buildField("Environment", env);
  if (setting) html += buildField("Setting", setting);
  if (mil) html += buildField("Military Setting", mil);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  return { html: html, rank: rank, type: "acquire", title: "Target Acquisition Mission" };
}

function generateCaravan(rank, origin) {
  if (!origin) origin = "Konohagakure";
  var pool = [];
  for (var i = 0; i < DATA.destinations.length; i++) {
    if (DATA.destinations[i] !== origin) pool.push(DATA.destinations[i]);
  }
  var dest = pick(pool);
  var ca = pick(DATA.caravanCargoAmount);
  var ct = pick(DATA.caravanCargoType);
  var tv = pick(DATA.caravanTravelers);
  var cs = pick(DATA.caravanSize);
  var rules = getRules("caravan");
  var extra = maybe(DATA.extraRules);
  var threatObj = resolveThreatGroup(pick(DATA.caravanThreats), rank);
  var weather = getWeather("Land of Fire");

  var oe = DATA.caravanEnv[origin] || ["Road"];
  var oen = pick(oe);

  var dl = dest.replace(" capital", "");
  var de = DATA.caravanEnvLands[dl] || DATA.caravanEnv[dest] || ["Road"];
  var den = pick(de);

  var poiVal = maybe(DATA.poi);

  var html = buildField("Origin", origin);
  html += buildField("Destination", dest);
  html += buildField("Cargo Amount", ca);
  html += buildField("Cargo Type", ct);
  html += buildField("Travelers", tv);
  html += buildField("Caravan Size", cs);
  html += buildField("Special Rules", rules);
  if (extra) html += buildField("Extra Modifier", extra);
  html += buildThreatField("Threat", threatObj);
  html += buildField("Weather", weather);
  html += buildField("Origin Terrain", oen);
  html += buildField("Destination Terrain", den);
  if (poiVal) html += buildField("Point of Interest", poiVal);
  return { html: html, rank: rank, type: "caravan", title: "Caravan Escort Mission" };
}

// ─── GENERATOR MAP ───

var generators = {
  sabotage: generateSabotage,
  assassinate: generateAssassinate,
  bodyguard: generateBodyguard,
  defend: generateDefend,
  recon: generateRecon,
  theft: generateTheft,
  acquire: generateAcquire,
  caravan: generateCaravan
};

// ─── UI ───

function generate() {
  var type = document.getElementById("missionType").value;
  var rank = document.getElementById("rank").value;
  var originSel = document.getElementById("origin");
  var origin = originSel ? originSel.value : "Konohagakure";

  var result;
  if (type === "caravan") {
    result = generateCaravan(rank, origin);
  } else {
    result = generators[type](rank);
  }

  var output = document.getElementById("output");
  var card = document.getElementById("missionCard");
  var titleEl = document.getElementById("missionTitle");
  var fieldsEl = document.getElementById("missionFields");
  var rankBadge = document.getElementById("rankBadge");

  card.style.borderColor = DATA.colors[type];
  titleEl.style.color = DATA.colors[type];
  titleEl.textContent = result.title;
  fieldsEl.innerHTML = result.html;
  rankBadge.textContent = "Player Rank: " + rank;
  rankBadge.style.background = DATA.colors[type];
  output.classList.remove("hidden");

  // Build copy text
  var copyText = "**" + result.title + "**\n";
  var allElements = fieldsEl.children;
  for (var i = 0; i < allElements.length; i++) {
    var el = allElements[i];
    if (el.classList.contains("field")) {
      var label = el.querySelector(".field-label").textContent;
      var value = el.querySelector(".field-value").textContent;
      copyText += "◈ " + label + " " + value + "\n";
    } else if (el.classList.contains("threat-breakdown")) {
      var lines = el.querySelectorAll(".threat-line");
      for (var j = 0; j < lines.length; j++) {
        copyText += "   ↳ " + lines[j].textContent + "\n";
      }
    }
  }
  copyText += "\nPlayer Rank: " + rank;
  document.getElementById("copyData").value = copyText;

  // Animate
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadeSlideIn 0.4s ease-out";
}

function copyToClipboard() {
  var copyData = document.getElementById("copyData");
  copyData.select();
  document.execCommand("copy");

  var btn = document.getElementById("copyBtn");
  var original = btn.textContent;
  btn.textContent = "Copied!";
  btn.classList.add("copied");
  setTimeout(function() {
    btn.textContent = original;
    btn.classList.remove("copied");
  }, 1500);
}

function toggleOrigin() {
  var type = document.getElementById("missionType").value;
  var originGroup = document.getElementById("originGroup");
  if (type === "caravan") {
    originGroup.classList.remove("hidden");
  } else {
    originGroup.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("missionType").addEventListener("change", toggleOrigin);
  toggleOrigin();
});