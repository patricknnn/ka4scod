export interface Properties {
  recordLongestWinStreak: number;
  recordXpInAMatch: number;
  accuracy: number;
  losses: number;
  totalGamesPlayed: number;
  score: number;
  winLossRatio: number;
  totalShots: number;
  bestScoreXp: number;
  gamesPlayed: number;
  bestSquardKills: number;
  bestSguardWave: number;
  bestConfirmed: number;
  deaths: number;
  wins: number;
  bestSquardCrates: number;
  kdRatio: number;
  bestAssists: number;
  bestFieldgoals: number;
  bestScore: number;
  recordDeathsInAMatch: number;
  scorePerGame: number;
  bestSPM: number;
  bestKillChains: number;
  recordKillsInAMatch: number;
  suicides: number;
  wlRatio: number;
  currentWinStreak: number;
  bestMatchBonusXp: number;
  bestMatchXp: number;
  bestSguardWeaponLevel: number;
  bestContracts: number;
  bestKD: number;
  kills: number;
  bestKillsAsInfected: number;
  bestReturns: number;
  bestStabs: number;
  bestKillsAsSurvivor: number;
  timePlayedTotal: number;
  bestDestructions: number;
  headshots: number;
  bestRescues: number;
  assists: number;
  ties: number;
  recordKillStreak: number;
  bestPlants: number;
  misses: number;
  bestDowns: number;
  bestDamage: number;
  bestSetbacks: number;
  bestTouchdowns: number;
  scorePerMinute: number;
  bestDeaths: number;
  bestMedalXp: number;
  bestDefends: number;
  bestSquardRevives: number;
  bestKills: number;
  bestDefuses: number;
  bestCaptures: number;
  hits: number;
  bestKillStreak: number;
  bestDenied: number;
}

export interface All {
  properties: Properties;
}

export interface Patrol {
  properties: Properties14;
}

export interface PatrolHc {
  properties: Properties14;
}

export interface Properties4 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  captures: number;
  defends: number;
  scorePerMinute: number;
  deaths: number;
}

export interface Dom {
  properties: Properties4;
}

export interface DmHc {
  properties: Properties14;
}

export interface ConfHc {
  properties: Properties14;
}

export interface Properties7 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  assists: number;
  scorePerMinute: number;
  deaths: number;
}

export interface War {
  properties: Properties7;
}

export interface Properties8 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  scorePerMinute: number;
  streak: number;
  deaths: number;
}

export interface Dm {
  properties: Properties8;
}

export interface Properties9 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  defends: number;
  objTime: number;
  scorePerMinute: number;
  deaths: number;
}

export interface Koth {
  properties: Properties9;
}

export interface Properties10 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  confirms: number;
  scorePerMinute: number;
  denies: number;
  deaths: number;
}

export interface Conf {
  properties: Properties10;
}

export interface SdHc {
  properties: Properties14;
}

export interface DomHc {
  properties: Properties14;
}

export interface WarHc {
  properties: Properties14;
}

export interface Properties14 {
  kills: number;
  score: number;
  timePlayed: number;
  kdRatio: number;
  plants: number;
  scorePerMinute: number;
  defuses: number;
  deaths: number;
}

export interface Sd {
  properties: Properties14;
}



export interface KothHc {
  properties: Properties14;
}



export interface BrAll {
  properties: Properties14;
}

export interface Mode {
  patrol: Patrol;
  patrol_hc: PatrolHc;
  dom: Dom;
  dm_hc: DmHc;
  conf_hc: ConfHc;
  war: War;
  dm: Dm;
  koth: Koth;
  conf: Conf;
  sd_hc: SdHc;
  dom_hc: DomHc;
  war_hc: WarHc;
  sd: Sd;
  koth_hc: KothHc;
  br_all: BrAll;
}

export interface Map { }

export interface Properties17 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrMoscar {
  properties: Properties17;
}

export interface Properties18 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrPtango41 {
  properties: Properties18;
}

export interface Properties19 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrGecho43 {
  properties: Properties19;
}

export interface Properties20 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrAromeo99 {
  properties: Properties20;
}

export interface Properties21 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrLecho {
  properties: Properties21;
}

export interface Properties22 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrKalpha98 {
  properties: Properties22;
}

export interface Properties23 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrSvictor40 {
  properties: Properties23;
}

export interface Properties24 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MrM1golf {
  properties: Properties24;
}

export interface WeaponSniper {
  s4_mr_moscar: S4MrMoscar;
  s4_mr_ptango41: S4MrPtango41;
  s4_mr_gecho43: S4MrGecho43;
  s4_mr_aromeo99: S4MrAromeo99;
  s4_mr_lecho: S4MrLecho;
  s4_mr_kalpha98: S4MrKalpha98;
  s4_mr_svictor40: S4MrSvictor40;
  s4_mr_m1golf: S4MrM1golf;
}

export interface Tacticals { }

export interface Lethals { }

export interface Properties25 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4LaPalpha {
  properties: Properties25;
}

export interface Properties26 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4LaM1bravo {
  properties: Properties26;
}

export interface Properties27 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4LaWalpha2 {
  properties: Properties27;
}

export interface Properties28 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4LaMkilo1 {
  properties: Properties28;
}

export interface Properties29 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4LaPalpha42 {
  properties: Properties29;
}

export interface WeaponLmg {
  s4_la_palpha: S4LaPalpha;
  s4_la_m1bravo: S4LaM1bravo;
  s4_la_walpha2: S4LaWalpha2;
  s4_la_mkilo1: S4LaMkilo1;
  s4_la_palpha42: S4LaPalpha42;
}

export interface Supers { }

export interface Properties30 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4PiTtango33 {
  properties: Properties30;
}

export interface Properties31 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4PiWecho {
  properties: Properties31;
}

export interface Properties32 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4PiMalpha96 {
  properties: Properties32;
}

export interface Properties33 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4PiLuniform08 {
  properties: Properties33;
}

export interface Properties34 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4PiMike1911 {
  properties: Properties34;
}

export interface WeaponPistol {
  s4_pi_ttango33: S4PiTtango33;
  s4_pi_wecho: S4PiWecho;
  s4_pi_malpha96: S4PiMalpha96;
  s4_pi_luniform08: S4PiLuniform08;
  s4_pi_mike1911: S4PiMike1911;
}

export interface Properties35 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArChotel15 {
  properties: Properties35;
}

export interface Properties36 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArBromeopg {
  properties: Properties36;
}

export interface Properties37 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArFecho {
  properties: Properties37;
}

export interface Properties38 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArBalpha {
  properties: Properties38;
}

export interface Properties39 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArHyankee44 {
  properties: Properties39;
}

export interface Properties40 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArChotel41 {
  properties: Properties40;
}

export interface Properties41 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArAsierra44 {
  properties: Properties41;
}

export interface Properties42 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArStango44 {
  properties: Properties42;
}

export interface Properties43 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ArVoscar {
  properties: Properties43;
}

export interface WeaponAssaultRifle {
  s4_ar_chotel15: S4ArChotel15;
  s4_ar_bromeopg: S4ArBromeopg;
  s4_ar_fecho: S4ArFecho;
  s4_ar_balpha: S4ArBalpha;
  s4_ar_hyankee44: S4ArHyankee44;
  s4_ar_chotel41: S4ArChotel41;
  s4_ar_asierra44: S4ArAsierra44;
  s4_ar_stango44: S4ArStango44;
  s4_ar_voscar: S4ArVoscar;
}

export interface Properties44 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ShLindia98 {
  properties: Properties44;
}

export interface Properties45 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ShMike97 {
  properties: Properties45;
}

export interface Properties46 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ShBromeo5 {
  properties: Properties46;
}

export interface Properties47 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4ShBecho {
  properties: Properties47;
}

export interface WeaponShotgun {
  s4_sh_lindia98: S4ShLindia98;
  s4_sh_mike97: S4ShMike97;
  s4_sh_bromeo5: S4ShBromeo5;
  s4_sh_becho: S4ShBecho;
}

export interface Properties48 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgMgolf42 {
  properties: Properties48;
}

export interface Properties49 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgStreak {
  properties: Properties49;
}

export interface Properties50 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgDpapa27 {
  properties: Properties50;
}

export interface Properties51 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgBromeo37 {
  properties: Properties51;
}

export interface Properties52 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgTyankee11 {
  properties: Properties52;
}

export interface Properties53 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MgJuniform {
  properties: Properties53;
}

export interface WeaponSmg {
  s4_mg_mgolf42: S4MgMgolf42;
  s4_mg_streak: S4MgStreak;
  s4_mg_dpapa27: S4MgDpapa27;
  s4_mg_bromeo37: S4MgBromeo37;
  s4_mg_tyankee11: S4MgTyankee11;
  s4_mg_juniform: S4MgJuniform;
}

export interface Properties54 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MeKnife {
  properties: Properties54;
}

export interface Properties55 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MeFists {
  properties: Properties55;
}

export interface Properties56 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MeKatana {
  properties: Properties56;
}

export interface Properties57 {
  hits: number;
  kills: number;
  kdRatio: number;
  headshots: number;
  accuracy: number;
  shots: number;
  deaths: number;
}

export interface S4MeRindigo {
  properties: Properties57;
}

export interface WeaponMelee {
  s4_me_knife: S4MeKnife;
  s4_me_fists: S4MeFists;
  s4_me_katana: S4MeKatana;
  s4_me_rindigo: S4MeRindigo;
}

export interface ItemData {
  weapon_sniper: WeaponSniper;
  tacticals: Tacticals;
  lethals: Lethals;
  weapon_lmg: WeaponLmg;
  supers: Supers;
  weapon_pistol: WeaponPistol;
  weapon_assault_rifle: WeaponAssaultRifle;
  weapon_shotgun: WeaponShotgun;
  weapon_smg: WeaponSmg;
  weapon_melee: WeaponMelee;
}

export interface Properties58 {
  hits: number;
  kills: number;
  shots: number;
  deaths: number;
  headShots: number;
}

export interface Fastreload {
  properties: Properties58;
}

export interface Properties59 {
  hits: number;
  kills: number;
  shots: number;
  deaths: number;
  headShots: number;
}

export interface Fmj {
  properties: Properties59;
}

export interface Properties60 {
  hits: number;
  kills: number;
  shots: number;
  deaths: number;
  headShots: number;
}

export interface Acog {
  properties: Properties60;
}

export interface Properties61 {
  hits: number;
  kills: number;
  shots: number;
  deaths: number;
  headShots: number;
}

export interface Holo {
  properties: Properties61;
}

export interface Properties62 {
  hits: number;
  kills: number;
  shots: number;
  deaths: number;
  headShots: number;
}

export interface Reflex {
  properties: Properties62;
}

export interface AttachmentData {
  fastreload: Fastreload;
  fmj: Fmj;
  acog: Acog;
  holo: Holo;
  reflex: Reflex;
}

export interface LethalScorestreakData { }

export interface Properties63 {
  extraStat1: number;
  uses: number;
  awardedCount: number;
}

export interface Uav {
  properties: Properties63;
}

export interface SupportScorestreakData {
  uav: Uav;
}

export interface ScorestreakData {
  lethalScorestreakData: LethalScorestreakData;
  supportScorestreakData: SupportScorestreakData;
}

export interface Properties64 {
  classChanges: number;
  highestAvgAltitude: number;
  killsFromBehind: number;
  lmgDeaths: number;
  riotShieldDamageAbsorbed: number;
  flashbangHits: number;
  meleeKills: number;
  tagsLargestBank: number;
  shotgunKills: number;
  highestScore: number;
  sniperDeaths: number;
  timeProne: number;
  killstreakWhitePhosphorousKillsAssists: number;
  shortestLife: number;
  deathsFromBehind: number;
  higherRankedKills: number;
  mostAssists: number;
  leastKills: number;
  tagsDenied: number;
  killstreakWheelsonKills: number;
  sniperHeadshots: number;
  killstreakJuggernautKills: number;
  smokesUsed: number;
  avengerKills: number;
  decoyHits: number;
  killstreakCarePackageUsed: number;
  mostCaptures: number;
  molotovKills: number;
  mostMultiKills: number;
  gasHits: number;
  comebackKills: number;
  lmgHeadshots: number;
  smgDeaths: number;
  explosiveKills: number;
  carrierKills: number;
  deployableCoverUsed: number;
  thermiteKills: number;
  arKills: number;
  suicides: number;
  clutch: number;
  mostDefends: number;
  mostExplosiveEliminations: number;
  survivorKills: number;
  killstreakGunshipKills: number;
  timeSpentAsPassenger: number;
  returns: number;
  smgHeadshots: number;
  launcherDeaths: number;
  oneShotOneKills: number;
  ammoBoxUsed: number;
  spawnSelectSquad: number;
  weaponPickups: number;
  pointBlankKills: number;
  tagsCaptured: number;
  secondHighestScore: number;
  killstreakGroundKills: number;
  highestEDRatio: number;
  distanceTraveledInVehicle: number;
  longestLife: number;
  stunHits: number;
  spawnSelectFlag: number;
  shotgunHeadshots: number;
  bombDefused: number;
  snapshotHits: number;
  noKillsWithDeath: number;
  killstreakAUAVAssists: number;
  killstreakPersonalUAVKills: number;
  tacticalInsertionSpawns: number;
  mostKillstreaksDestroyed: number;
  launcherKills: number;
  spawnSelectVehicle: number;
  mostKillsLeastDeaths: number;
  mostHeadshotKills: number;
  defends: number;
  timeSpentAsDriver: number;
  bombDetonated: number;
  thirdHighestScore: number;
  arHeadshots: number;
  mostFinishingMoves: number;
  timeOnPoint: number;
  lmgKills: number;
  killstreakUAVAssists: number;
  carepackagesCaptured: number;
  mostKillsLongestStreak: number;
  killstreakCruiseMissileKills: number;
  longestStreak: number;
  destroyedKillstreaks: number;
  hipfireKills: number;
  stimDamageHealed: number;
  killstreaksUsed: number;
  skippedKillcams: number;
  leastAssists: number;
  mostMultikills: number;
  highestRankedKills: number;
  killstreakAirstrikeKills: number;
  distanceTravelled: number;
  munitionsBoxUsed: number;
  killstreakKills: number;
  semtexKills: number;
  penetrationKills: number;
  explosionsSurvived: number;
  highestMultikill: number;
  arDeaths: number;
  mostTimeNearAllies: number;
  longshotKills: number;
  proximityMineKills: number;
  tagsMegaBanked: number;
  mostKillsMostHeadshots: number;
  firstInfected: number;
  killstreakCUAVAssists: number;
  throwingKnifeKills: number;
  executionKills: number;
  lastSurvivor: number;
  reconDroneMarks: number;
  deadSilenceKills: number;
  mostTimeNearEnemies: number;
  revengeKills: number;
  infectedKills: number;
  killEnemyTeam: number;
  sniperKills: number;
  killstreakCluserStrikeKills: number;
  meleeDeaths: number;
  timeWatchingKillcams: number;
  killstreakTankKills: number;
  noKillNoDeath: number;
  shotgunDeaths: number;
  killstreakChopperGunnerKills: number;
  shotsFired: number;
  stoppingPowerKills: number;
  pistolPeaths: number;
  killstreakShieldTurretKills: number;
  timeCrouched: number;
  noDeathsFromBehind: number;
  bombPlanted: number;
  setbacks: number;
  smgKills: number;
  claymoreKills: number;
  kills10NoDeaths: number;
  pistolHeadshots: number;
  killstreakVTOLJetKills: number;
  headshots: number;
  mostDeaths: number;
  adsKills: number;
  empDroneHits: number;
  defenderKills: number;
  c4LethalKills: number;
  launcherHeadshots: number;
  timesSelectedAsSquadLeader: number;
  killstreakAirKills: number;
  assaults: number;
  fragKills: number;
  killstreakEmergencyAirdropUsed: number;
  captures: number;
  killstreakChopperSupportKills: number;
  spawnSelectBase: number;
  noKill10Deaths: number;
  mostMeleeKills: number;
  leastDeaths: number;
  killstreakSentryGunKills: number;
  longestTimeSpentOnWeapon: number;
  lowerRankedKills: number;
  mostEliminations: number;
  trophySystemHits: number;
  clutchRevives: number;
  lowestAvgAltitude: number;
  pickups: number;
  pistolKills: number;
  mostKillstreaksCalledIn: number;
  reloads: number;
}

export interface AccoladeData {
  properties: Properties64;
}

export interface Lifetime {
  all: All;
  mode: Mode;
  map: Map;
  itemData: ItemData;
  attachmentData: AttachmentData;
  scorestreakData: ScorestreakData;
  accoladeData: AccoladeData;
}

export interface Properties65 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  executions: number;
  matchesPlayed: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface All2 {
  properties: Properties65;
}

export interface Properties66 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface Patrol2 {
  properties: Properties66;
}

export interface Properties67 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface Sd2 {
  properties: Properties67;
}

export interface Properties68 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface Dom2 {
  properties: Properties68;
}

export interface Properties69 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface ArenaEvo {
  properties: Properties69;
}

export interface Properties70 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface War2 {
  properties: Properties70;
}

export interface Properties71 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface Conf2 {
  properties: Properties71;
}

export interface Properties72 {
  kills: number;
  averageSpeedDuringMatch: number;
  accuracy: number;
  losses: number;
  avgLifeTime: number;
  shotsLanded: number;
  score: number;
  headshots: number;
  utcConnectTimeS: number;
  assists: number;
  draws: number;
  scorePerMinute: number;
  distanceTraveled: number;
  deaths: number;
  wins: number;
  shotsMissed: number;
  kdRatio: number;
  scorePerGame: number;
  prestigeAtEnd: number;
  hits: number;
  timePlayed: number;
  headshotPercentage: number;
  matchesPlayed: number;
  executions: number;
  suicides: number;
  wlRatio: number;
  percentTimeMoving: number;
  utcDisconnectTimeS: number;
  longestStreak: number;
  damageDone: number;
  shots: number;
  shotsFired: number;
  damageTaken: number;
}

export interface Koth2 {
  properties: Properties72;
}

export interface Mode2 {
  patrol: Patrol2;
  sd: Sd2;
  dom: Dom2;
  arena_evo: ArenaEvo;
  war: War2;
  conf: Conf2;
  koth: Koth2;
}

export interface Map2 { }

export interface Weekly {
  all: All2;
  mode: Mode2;
  map: Map2;
}

export interface VanguardLifetimeStats {
  title: string;
  platform: string;
  username: string;
  type: string;
  level: number;
  maxLevel: number;
  levelXpRemainder: number;
  levelXpGained: number;
  prestige: number;
  prestigeId: number;
  maxPrestige: number;
  totalXp: number;
  paragonRank: number;
  paragonId: number;
  s: number;
  p: number;
  lifetime: Lifetime;
  weekly: Weekly;
  engagement?: any;
}
