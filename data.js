const DATA = {

  locations: [
    "Land of Fire", "Land of Wind", "Land of Earth", "Land of Lightning",
    "Land of Water", "Land of Iron", "Land of Rivers", "Land of Grass",
    "Land of Rain", "Land of Waterfalls", "Land of Hot Water", "Land of Frost",
    "Land of Tea"
  ],

  ranks: ["F", "E", "D", "C", "B", "A", "S"],

  weather: ["Sunshine", "Overcast", "High Wind", "Rain", "Heavy Rain", "Thunderstorm", "Foggy"],

  coldWeather: {
    "Rain": "Snow",
    "Heavy Rain": "Blizzard",
    "Thunderstorm": "Sleet/Hail"
  },

  coldRegions: ["Land of Iron", "Land of Frost", "Land of Snow"],

  genericTargets: [
    "Bridge", "Major Roadway", "Resource Stockpile", "Store/Workshop",
    "Research Facility/Lab/School/Library", "Monument/Major Public Art Piece",
    "Farmland/Food Production Facility", "Mail Center", "Political Structure",
    "Structure in Military Base/Camp"
  ],

  landTargets: {
    "Land of Fire": ["Port", "Logging Company"],
    "Land of Wind": ["Trading Post", "Way Station", "Canal", "Irrigation System"],
    "Land of Earth": ["Tunnel Through A Mountain", "Mountain Pass", "Quarry"],
    "Land of Lightning": ["Cliffside Road", "Mountain Pass"],
    "Land of Water": ["Port", "Ship", "Lighthouse"],
    "Land of Iron": ["Forge/Smithy"],
    "Land of Rain": ["Dam", "Seawall/Retaining Wall"],
    "Land of Hot Water": ["Hot Springs Resort"],
    "Land of Frost": ["Way Station", "Glacial Pass"]
  },

  personTargets: [
    "Wealthy Merchant", "Shady Merchant", "Bandit Leader", "Gang Leader",
    "Minor Noble", "Suspected Foreign Spy", "Locally Influential Person",
    "Arms Dealer", "Political Rival", "Financial Rival", "Inheritor", "Rogue Ninja"
  ],

  villageTargets: [
    "Suspected Foreign Spy", "Shinobi Selling Classified Intel", "Seditious Agitator"
  ],

  bodyguardTargets: [
    "Wealthy Merchant", "Shady Merchant", "Local Politician", "Heir/Inheritor",
    "Minor Noble", "Specialist", "Locally Influential Person", "Arms Dealer",
    "Criminal Underground Leader", "Architect/Master Craftsman", "Undercover Noble",
    "Undercover Friendly Shinobi"
  ],

  acquireTargets: [
    "Wealthy Merchant", "Shady Merchant", "Informant", "Gang Leader",
    "Minor Noble", "Suspected Foreign Spy", "Locally Influential Person",
    "Arms Dealer", "Political Figure", "Financial Rival", "Inheritor", "Rogue Ninja"
  ],

  acquireParams: ["Kidnapping", "Rescue", "Extraction"],

  theftGeneric: [
    "Intel Report", "Heirloom", "Property Deed", "Invention", "Relic",
    "Statue", "Money", "Notable Weapon", "Noble's Crest or Seal", "Medical Records"
  ],

  theftVillage: ["Foreign Bingo Book", "Fuinjutsu Research", "Medical Research"],

  reconIntel: [
    "Troop Movements", "Local Force Composition", "Local Defenses",
    "Suspected Allegiances", "Suspected Criminal Ties", "Supply Cache Locations",
    "Weapon Cache Locations", "Critical Infrastructure", "True Identities",
    "False Identities", "Political/Financial Corruption", "Hidden Rogues",
    "Sabotage Target Analysis", "Location Suitability Analysis"
  ],

  noncombatant: [
    "No non-combatants", "Few non-combatants", "Frequented by non-combatants",
    "High traffic area for non-combatants", "Constantly occupied by non-combatants"
  ],

  guardMod: [
    "Unguarded", "Single guard", "Two to five guards",
    "Multiple squads of guards", "Small army of guards"
  ],

  attackerMod: [
    "Single attacker", "Two to five attackers",
    "Multiple squads of attackers", "Small army of attackers"
  ],

  assassinMod: [
    "Single assassin", "Two to five assassins",
    "Multiple squads of attackers", "Small army of attackers"
  ],

  targetLocation: [
    "Out in the open", "In transit", "Standard civilian-grade structure",
    "Fortified civilian-grade structure", "Secure/reinforced structure"
  ],

  targetPersonality: [
    "Paranoid", "Cautious", "Flippant/Naive", "Brash/Reckless",
    "Agreeable", "Combative", "Resolute"
  ],

  targetMovement: [
    "Stays put", "Routinely travels the same local route",
    "Restlessly travels random local routes",
    "Must make one or more public appearances",
    "Must be in public nearly constantly"
  ],

  populace: [
    "Don't know the target", "Hate the target", "Dislike the target",
    "Are neutral towards the target", "Like the target", "Love the target"
  ],

  singleThreat: [
    "Equivalent (Rank)", "Stronger (Rank+1)", "Much Stronger (Rank+2)"
  ],

  smallThreat: [
    "Mentor and Apprentice (1x Rank+1, 1x Rank-2)",
    "Perfect Pair (2x Rank+1)",
    "Good Ol' Team (3x Rank)",
    "Hired Hands (4x Rank-1)",
    "More Hired Hands (5x Rank-1)",
    "Mercenary Team (4x Rank-1, 1x Rank+1)"
  ],

  squadThreat: [
    "Local Garrison (6-12x Rank-3, 1-2x Rank-2)",
    "Militia (20x Rank-4 min E)",
    "Sorta Elite Team (4x Rank-1, 8-12x Rank-3)",
    "Champion (10-15x Rank-3, 1x Rank+1)",
    "Competent Force (6-10x Rank-1)"
  ],

  armyThreat: [
    "Riot (20x+ F Rank, 0-20x E Rank)",
    "Actual Army (40x+ Rank-3, 1-5x Rank-2 min E)",
    "Eclectic Mix (30x+ Rank-4, 10x Rank-3, 4x Rank-2, 1x Rank)",
    "Whole Damn Village (50x+ F Rank)",
    "Champion (20x+ Rank-4, 1-2x Rank+1)"
  ],

  targetThreat: [
    "F Rank", "E Rank", "Much Weaker (Rank-2)", "Weaker (Rank-1)",
    "Equivalent (Rank)", "Stronger (Rank+1)", "Much Stronger (Rank+2)"
  ],

  env: {
    "Land of Fire": ["Forest Clearing", "Forested Road", "Small Town", "Capital"],
    "Land of Wind": ["Sand Dunes", "Oasis", "Sandstorm", "Small Village", "Capital"],
    "Land of Earth": ["Dry Cave", "Rocky Canyon", "Small Town", "Capital"],
    "Land of Lightning": ["Cliffside Road", "Cave", "Secluded Valley", "Small Town", "Capital"],
    "Land of Water": ["Swamp", "Island", "Deep Mist", "Port Town", "Capital"],
    "Land of Iron": ["Frozen Bridge", "Snowy Mountain", "Icy Cave", "Chilly Village", "Capital"],
    "Land of Rivers": ["Bridge", "Riverside Fishing Village", "Capital"],
    "Land of Grass": ["Tall Grass Plains", "Small Village", "Capital"],
    "Land of Rain": ["Flooded Road", "Flooded Town", "Capital"],
    "Land of Waterfalls": ["Jungle Road", "Small Village", "Capital"],
    "Land of Hot Water": ["Hot Springs Resort", "Resort Town", "Capital"],
    "Land of Frost": ["Frozen Plain", "Blizzard", "Capital"],
    "Land of Tea": ["Cozy Inn", "Roadside Tea House", "Town Market"]
  },

  envGeneric: ["House", "Bunker", "Street", "Office Building", "Market"],

  envMilitary: ["Outpost", "Large Camp", "Hideout", "Main Base"],

  envVillage: [
    "Hidden Lab", "Apartment Building", "Training Grounds",
    "Administrative Building", "Village Outskirts"
  ],

  caravanEnv: {
    "Konohagakure": ["Deep forest with massive trees", "River ford crossing", "River bridge crossing", "Large forest clearing", "Light storm"],
    "Sunagakure": ["Endless dunes", "Desert oasis", "Cracked parched ground", "Dry riverbed", "Sandstorm"],
    "Iwagakure": ["Rocky mountain pass", "Arid plateau", "Deep canyon bridge crossing", "Travel through deep canyon", "Dust storm"],
    "Kumogakure": ["Coastal cliffs", "Rockslide-blocked mountain pass", "Mountain pass", "Tunnel through the mountain", "Severe thunderstorm"],
    "Kirigakure": ["Stormy sea-travel by boat", "Foggy coastal road", "Road through a marsh", "Pitstop at a small island dock", "High winds heavy rain"]
  },

  caravanEnvLands: {
    "Land of Iron": ["Frozen dirt road", "Long stone bridge crossing", "Cold mountain pass", "Samurai checkpoint", "Heavy snow"],
    "Land of Rivers": ["River ford crossing in forested valley", "River bridge crossing in forested valley", "Pass through fishing village"],
    "Land of Grass": ["Plain full of 7 foot tall grass", "Copse of trees surrounded by tall grass", "Wide stream hidden by grass"],
    "Land of Rain": ["Endless heavy rain", "Flooded dirt road", "Dangerously fast moving water at river crossing"],
    "Land of Waterfalls": ["Thick jungle", "Bug-filled swamp", "Path beneath a waterfall"],
    "Land of Hot Water": ["Pleasant grassland with light forest", "Minor rain shower", "Stop at a hot springs resort"],
    "Land of Frost": ["Avalanche-blocked road", "Four foot deep snow", "Hail"],
    "Land of Tea": ["Rolling hills", "Farmland", "Stop at a renowned tea-house"]
  },

  poi: [
    "Shack with a hidden ladder leading underground",
    "Underground smuggler hideout",
    "Waterfall cavern",
    "Hidden dock in underground river",
    "Arid plateau with sheer cliff edges",
    "Foothills of extremely loose gravel",
    "Crumbling sandstone cliffs",
    "Sandbars off the coast",
    "Fishing village on a river",
    "Town built around a noble fortress",
    "Archeological dig site",
    "Labyrinthine sewers beneath a city",
    "Village on the side of a steep mountain",
    "Shoulder-height field of crops",
    "Orchard of trees",
    "Roadside tavern",
    "Widespread bramble patch",
    "Narrow alleys",
    "Abandoned house in the forest",
    "Mudflats near a major river",
    "Salt flats that reflect like a mirror",
    "Quicksand bog",
    "Cenote with a village built inside",
    "Treehouse village in a forest",
    "Bare forest stripped by a storm",
    "Washed-out valley with deep mud",
    "Cracked earth revealing a large cavern",
    "Boulders balanced on one another",
    "Massive crater from a forgotten battle",
    "Scorched forest after a wildfire",
    "Rubble of a collapsed mountain face",
    "Ruins of a village never rebuilt",
    "Shanty town outside larger town walls",
    "Narrow pathway carved into a cliff",
    "Hollowed tree stump hiding a ladder",
    "Old wartime defensive line with traps",
    "Village buried under an avalanche",
    "Deeply flooded coastal village",
    "Flooded forest with treetops above water",
    "Whirlpool off the coast",
    "Crumbling stone arch into the ocean",
    "Iceberg floating in northern ocean",
    "Glacier looming over a village",
    "Pitch black lava tube",
    "Lava flow from a nearby volcano",
    "Methane-fire swamp",
    "Forest of rock pillars in arid valley",
    "Major casino in a town",
    "River ferryboat and pier",
    "Tense border posts facing each other"
  ],

  extraRules: [
    "Paranoia", "Training Arc", "Riders on the Storm", "Pulling on a Thread",
    "Prelude to Greater Things", "Insurance", "Detour", "Disaster Response",
    "Specialist", "Night Raid", "No Man's Land", "Wine and Dine", "Festival",
    "A Kindly Guide", "An Unkindly Guide", "Chakra Sensitivity", "Live Wire",
    "Blindsided", "Lightning Strike"
  ],

  missionRules: {
    sabotage: ["No Witnesses", "No Collateral Damage", "Framing", "Prime Time", "We Are The Distraction", "It's A Trap!", "Prepared Response", "Nature's Wrath", "Reinforced Structure", "Political Considerations"],
    assassinate: ["No Witnesses", "Leave No Trace", "No Collateral Damage", "Framing", "Make It Known", "Prime Time", "It's A Trap!", "Prepared Response", "Political Considerations"],
    bodyguard: ["No Collateral Damage", "Make It Known", "It's A Trap!", "Hostile Territory", "Tense Relations", "Political Considerations"],
    defend: ["No Collateral Damage", "Prime Time", "We Are The Distraction", "It's A Trap!", "Battle Lines", "Reinforced Structure", "Fragile Structure", "Political Considerations", "Scattered Defense", "Double Duty"],
    recon: ["No Witnesses", "No Collateral Damage", "Framing", "Prime Time", "It's A Trap!", "Prepared Response", "Political Considerations", "Lock Down"],
    theft: ["No Witnesses", "No Collateral Damage", "Framing", "Prime Time", "It's A Trap!", "Prepared Response", "Ghost", "Unknown Location", "Volatile Objective", "Heavy Objective", "Political Considerations", "Borrowed Time"],
    acquire: ["No Witnesses", "Leave No Trace", "No Collateral Damage", "Framing", "Make It Known", "Prime Time", "It's A Trap!", "Prepared Response", "Borrowed Time", "Political Considerations"],
    caravan: ["No Collateral Damage", "Prime Time", "It's A Trap!", "Political Considerations", "Traitor In Our Midst"]
  },

  additionalObjectives: {
    sabotage: ["Rescue Operation", "Kidnapping", "Theft", "Plant", "Infiltrate"],
    defend: ["Rescue Operation", "Kidnapping", "Extract", "Theft", "Plant", "Infiltrate", "Guard"],
    recon: ["Theft", "Plant", "Infiltrate"]
  },

  caravanCargoAmount: ["Only travelers (no cargo)", "Light cargo", "Medium cargo", "Heavy cargo"],

  caravanCargoType: [
    "Perishables", "Non-perishable food", "Construction materials",
    "Standard trade goods", "Valuable trade goods", "Spices teas and herbs", "Raw materials"
  ],

  caravanTravelers: [
    "One to three merchants", "Four to ten merchants",
    "One to three merchants with one disguised noble",
    "Four to ten merchants with one disguised noble"
  ],

  caravanSize: ["A single cart", "Two carts", "Three carts"],

  caravanThreats: [
    "A band of bandits block the road (5-10x Rank-2, 1x Rank-1)",
    "A few enemies block the road (3-4x Rank-1)",
    "A few enemies with a leader block the road (2x Rank-1, 1x Rank)",
    "A few strong enemies with a strong leader block the road (2x Rank, 1x Rank+1)",
    "A single dangerous enemy blocks the road (1x Rank+2)",
    "A band of bandits ambush the caravan (5-10x Rank-2, 1x Rank-1)",
    "A few enemies ambush the caravan (3-4x Rank-1)",
    "A few enemies with a leader ambush the caravan (2x Rank-1, 1x Rank)",
    "A few strong enemies with a strong leader ambush the caravan (2x Rank, 1x Rank+1)",
    "A band of bandits ambushes camp at night (5-10x Rank-2)",
    "A few enemies ambush camp at night (3x Rank-1)",
    "A few strong enemies ambush camp at night (3x Rank)"
  ],

  destinations: [
    "Konohagakure", "Sunagakure", "Iwagakure", "Kumogakure", "Kirigakure",
    "Land of Iron capital", "Land of Rivers capital", "Land of Grass capital",
    "Land of Rain capital", "Land of Waterfalls capital", "Land of Hot Water capital",
    "Land of Frost capital", "Land of Tea capital"
  ],

  villages: {
    "konoha": "Konohagakure",
    "suna": "Sunagakure",
    "iwa": "Iwagakure",
    "kumo": "Kumogakure",
    "kiri": "Kirigakure"
  },

  colors: {
    sabotage: "#E74C3C",
    assassinate: "#8B0000",
    bodyguard: "#3498DB",
    defend: "#2ECC71",
    recon: "#7B68EE",
    theft: "#DAA520",
    acquire: "#9B59B6",
    caravan: "#D2691E"
  }
};