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

export interface Properties2 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    setBacks: number;
    scorePerMinute: number;
    stabs: number;
    deaths: number;
}

export interface Gun {
    properties: Properties2;
}

export interface Properties3 {
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
    properties: Properties3;
}

export interface Properties4 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    assists: number;
    scorePerMinute: number;
    deaths: number;
}

export interface War {
    properties: Properties4;
}

export interface Properties5 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    captures: number;
    defends: number;
    scorePerMinute: number;
    deaths: number;
}

export interface Hq {
    properties: Properties5;
}

export interface Properties6 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    captures: number;
    defends: number;
    scorePerMinute: number;
    deaths: number;
}

export interface HcDom {
    properties: Properties6;
}

export interface Properties7 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    confirms: number;
    scorePerMinute: number;
    denies: number;
    deaths: number;
}

export interface HcConf {
    properties: Properties7;
}

export interface Properties8 {
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
    properties: Properties8;
}

export interface Properties9 {
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
    properties: Properties9;
}

export interface Properties10 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    captures: number;
    defends: number;
    scorePerMinute: number;
    deaths: number;
}

export interface HcHq {
    properties: Properties10;
}

export interface Properties11 {
    kills: number;
    score: number;
    timePlayed: number;
    damage: number;
    kdRatio: number;
    assists: number;
    scorePerMinute: number;
    deaths: number;
}

export interface Arena {
    properties: Properties11;
}

export interface Properties12 {
    wins: number;
    kills: number;
    kdRatio: number;
    downs: number;
    topTwentyFive: number;
    topTen: number;
    contracts: number;
    revives: number;
    topFive: number;
    score: number;
    timePlayed: number;
    gamesPlayed: number;
    tokens: number;
    scorePerMinute: number;
    cash: number;
    deaths: number;
}

export interface BrDmz {
    properties: Properties12;
}

export interface Properties13 {
    wins: number;
    kills: number;
    kdRatio: number;
    downs: number;
    topTwentyFive: number;
    topTen: number;
    contracts: number;
    revives: number;
    topFive: number;
    score: number;
    timePlayed: number;
    gamesPlayed: number;
    tokens: number;
    scorePerMinute: number;
    cash: number;
    deaths: number;
}

export interface Br {
    properties: Properties13;
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

export interface Properties15 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    defends: number;
    objTime: number;
    scorePerMinute: number;
    deaths: number;
}

export interface Grnd {
    properties: Properties15;
}

export interface Properties16 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    plants: number;
    scorePerMinute: number;
    revives: number;
    deaths: number;
}

export interface Cyber {
    properties: Properties16;
}

export interface Properties17 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    assists: number;
    scorePerMinute: number;
    deaths: number;
}

export interface HcWar {
    properties: Properties17;
}

export interface Properties18 {
    wins: number;
    kills: number;
    kdRatio: number;
    downs: number;
    topTwentyFive: number;
    topTen: number;
    contracts: number;
    revives: number;
    topFive: number;
    score: number;
    timePlayed: number;
    gamesPlayed: number;
    tokens: number;
    scorePerMinute: number;
    cash: number;
    deaths: number;
}

export interface BrAll {
    properties: Properties18;
}

export interface Properties19 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    plants: number;
    scorePerMinute: number;
    defuses: number;
    deaths: number;
}

export interface HcSd {
    properties: Properties19;
}

export interface Properties20 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    captures: number;
    defends: number;
    scorePerMinute: number;
    deaths: number;
}

export interface Arm {
    properties: Properties20;
}

export interface Properties21 {
    kills: number;
    score: number;
    timePlayed: number;
    kdRatio: number;
    plants: number;
    scorePerMinute: number;
    revives: number;
    deaths: number;
}

export interface HcCyber {
    properties: Properties21;
}

export interface Properties22 {
    kills: number;
    score: number;
    infected: number;
    timePlayed: number;
    kdRatio: number;
    scorePerMinute: number;
    time: number;
    deaths: number;
}

export interface Infect {
    properties: Properties22;
}

export interface Mode {
    gun: Gun;
    dom: Dom;
    war: War;
    hq: Hq;
    hc_dom: HcDom;
    hc_conf: HcConf;
    koth: Koth;
    conf: Conf;
    hc_hq: HcHq;
    arena: Arena;
    br_dmz: BrDmz;
    br: Br;
    sd: Sd;
    grnd: Grnd;
    cyber: Cyber;
    hc_war: HcWar;
    br_all: BrAll;
    hc_sd: HcSd;
    arm: Arm;
    hc_cyber: HcCyber;
    infect: Infect;
}

export interface Map {}

export interface Properties23 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8ArTango21 {
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

export interface Iw8ArMike4 {
    properties: Properties24;
}

export interface Properties25 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8ArValpha {
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

export interface Iw8ArFalpha {
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

export interface Iw8ArMcharlie {
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

export interface Iw8ArAkilo47 {
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

export interface Iw8ArAsierra12 {
    properties: Properties29;
}

export interface Properties30 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8ArGalima {
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

export interface Iw8ArSierra552 {
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

export interface Iw8ArFalima {
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

export interface Iw8ArAnovember94 {
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

export interface Iw8ArKilo433 {
    properties: Properties34;
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

export interface Iw8ArScharlie {
    properties: Properties35;
}

export interface WeaponAssaultRifle {
    iw8_ar_tango21: Iw8ArTango21;
    iw8_ar_mike4: Iw8ArMike4;
    iw8_ar_valpha: Iw8ArValpha;
    iw8_ar_falpha: Iw8ArFalpha;
    iw8_ar_mcharlie: Iw8ArMcharlie;
    iw8_ar_akilo47: Iw8ArAkilo47;
    iw8_ar_asierra12: Iw8ArAsierra12;
    iw8_ar_galima: Iw8ArGalima;
    iw8_ar_sierra552: Iw8ArSierra552;
    iw8_ar_falima: Iw8ArFalima;
    iw8_ar_anovember94: Iw8ArAnovember94;
    iw8_ar_kilo433: Iw8ArKilo433;
    iw8_ar_scharlie: Iw8ArScharlie;
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

export interface Iw8ShMike26 {
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

export interface Iw8ShCharlie725 {
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

export interface Iw8ShOscar12 {
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

export interface Iw8ShAalpha12 {
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

export interface Iw8ShRomeo870 {
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

export interface Iw8ShDpapa12 {
    properties: Properties41;
}

export interface WeaponShotgun {
    iw8_sh_mike26: Iw8ShMike26;
    iw8_sh_charlie725: Iw8ShCharlie725;
    iw8_sh_oscar12: Iw8ShOscar12;
    iw8_sh_aalpha12: Iw8ShAalpha12;
    iw8_sh_romeo870: Iw8ShRomeo870;
    iw8_sh_dpapa12: Iw8ShDpapa12;
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

export interface Iw8SnSbeta {
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

export interface Iw8SnCrossbow {
    properties: Properties43;
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

export interface Iw8SnRomeo700 {
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

export interface Iw8SnKilo98 {
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

export interface Iw8SnMike14 {
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

export interface Iw8SnSksierra {
    properties: Properties47;
}

export interface WeaponMarksman {
    iw8_sn_sbeta: Iw8SnSbeta;
    iw8_sn_crossbow: Iw8SnCrossbow;
    iw8_sn_romeo700: Iw8SnRomeo700;
    iw8_sn_kilo98: Iw8SnKilo98;
    iw8_sn_mike14: Iw8SnMike14;
    iw8_sn_sksierra: Iw8SnSksierra;
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

export interface Iw8SnAlpha50 {
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

export interface Iw8SnHdromeo {
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

export interface Iw8SnDelta {
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

export interface Iw8SnXmike109 {
    properties: Properties51;
}

export interface WeaponSniper {
    iw8_sn_alpha50: Iw8SnAlpha50;
    iw8_sn_hdromeo: Iw8SnHdromeo;
    iw8_sn_delta: Iw8SnDelta;
    iw8_sn_xmike109: Iw8SnXmike109;
}

export interface Properties52 {
    extraStat1: number;
    uses: number;
}

export interface EquipGasGrenade {
    properties: Properties52;
}

export interface Properties53 {
    extraStat1: number;
    uses: number;
}

export interface EquipSnapshotGrenade {
    properties: Properties53;
}

export interface Properties54 {
    extraStat1: number;
    uses: number;
}

export interface EquipDecoy {
    properties: Properties54;
}

export interface Properties55 {
    extraStat1: number;
    uses: number;
}

export interface EquipSmoke {
    properties: Properties55;
}

export interface Properties56 {
    extraStat1: number;
    uses: number;
}

export interface EquipConcussion {
    properties: Properties56;
}

export interface Properties57 {
    extraStat1: number;
    uses: number;
}

export interface EquipHbSensor {
    properties: Properties57;
}

export interface Properties58 {
    extraStat1: number;
    uses: number;
}

export interface EquipFlash {
    properties: Properties58;
}

export interface Properties59 {
    extraStat1: number;
    uses: number;
}

export interface EquipAdrenaline {
    properties: Properties59;
}

export interface Tacticals {
    equip_gas_grenade: EquipGasGrenade;
    equip_snapshot_grenade: EquipSnapshotGrenade;
    equip_decoy: EquipDecoy;
    equip_smoke: EquipSmoke;
    equip_concussion: EquipConcussion;
    equip_hb_sensor: EquipHbSensor;
    equip_flash: EquipFlash;
    equip_adrenaline: EquipAdrenaline;
}

export interface Properties60 {
    kills: number;
    uses: number;
}

export interface EquipFrag {
    properties: Properties60;
}

export interface Properties61 {
    kills: number;
    uses: number;
}

export interface EquipThermite {
    properties: Properties61;
}

export interface Properties62 {
    kills: number;
    uses: number;
}

export interface EquipSemtex {
    properties: Properties62;
}

export interface Properties63 {
    kills: number;
    uses: number;
}

export interface EquipClaymore {
    properties: Properties63;
}

export interface Properties64 {
    kills: number;
    uses: number;
}

export interface EquipC4 {
    properties: Properties64;
}

export interface Properties65 {
    kills: number;
    uses: number;
}

export interface EquipAtMine {
    properties: Properties65;
}

export interface Properties66 {
    kills: number;
    uses: number;
}

export interface EquipThrowingKnife {
    properties: Properties66;
}

export interface Properties67 {
    kills: number;
    uses: number;
}

export interface EquipMolotov {
    properties: Properties67;
}

export interface Lethals {
    equip_frag: EquipFrag;
    equip_thermite: EquipThermite;
    equip_semtex: EquipSemtex;
    equip_claymore: EquipClaymore;
    equip_c4: EquipC4;
    equip_at_mine: EquipAtMine;
    equip_throwing_knife: EquipThrowingKnife;
    equip_molotov: EquipMolotov;
}

export interface Properties68 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmKilo121 {
    properties: Properties68;
}

export interface Properties69 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmMkilo3 {
    properties: Properties69;
}

export interface Properties70 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmMgolf34 {
    properties: Properties70;
}

export interface Properties71 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmLima86 {
    properties: Properties71;
}

export interface Properties72 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmPkilo {
    properties: Properties72;
}

export interface Properties73 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmSierrax {
    properties: Properties73;
}

export interface Properties74 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LmMgolf36 {
    properties: Properties74;
}

export interface WeaponLmg {
    iw8_lm_kilo121: Iw8LmKilo121;
    iw8_lm_mkilo3: Iw8LmMkilo3;
    iw8_lm_mgolf34: Iw8LmMgolf34;
    iw8_lm_lima86: Iw8LmLima86;
    iw8_lm_pkilo: Iw8LmPkilo;
    iw8_lm_sierrax: Iw8LmSierrax;
    iw8_lm_mgolf36: Iw8LmMgolf36;
}

export interface Properties75 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LaGromeo {
    properties: Properties75;
}

export interface Properties76 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LaRpapa7 {
    properties: Properties76;
}

export interface Properties77 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LaJuliet {
    properties: Properties77;
}

export interface Properties78 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LaKgolf {
    properties: Properties78;
}

export interface Properties79 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8LaMike32 {
    properties: Properties79;
}

export interface WeaponLauncher {
    iw8_la_gromeo: Iw8LaGromeo;
    iw8_la_rpapa7: Iw8LaRpapa7;
    iw8_la_juliet: Iw8LaJuliet;
    iw8_la_kgolf: Iw8LaKgolf;
    iw8_la_mike32: Iw8LaMike32;
}

export interface Properties80 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperEmpDrone {
    properties: Properties80;
}

export interface Properties81 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperTrophy {
    properties: Properties81;
}

export interface Properties82 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperAmmoDrop {
    properties: Properties82;
}

export interface Properties83 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperWeaponDrop {
    properties: Properties83;
}

export interface Properties84 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperFulton {
    properties: Properties84;
}

export interface Properties85 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperArmorDrop {
    properties: Properties85;
}

export interface Properties86 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperSelect {
    properties: Properties86;
}

export interface Properties87 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperTacInsert {
    properties: Properties87;
}

export interface Properties88 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperReconDrone {
    properties: Properties88;
}

export interface Properties89 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperDeadsilence {
    properties: Properties89;
}

export interface Properties90 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperSupplyDrop {
    properties: Properties90;
}

export interface Properties91 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperTacCover {
    properties: Properties91;
}

export interface Properties92 {
    kills: number;
    misc1: number;
    misc2: number;
    uses: number;
}

export interface SuperSupportBox {
    properties: Properties92;
}

export interface Supers {
    super_emp_drone: SuperEmpDrone;
    super_trophy: SuperTrophy;
    super_ammo_drop: SuperAmmoDrop;
    super_weapon_drop: SuperWeaponDrop;
    super_fulton: SuperFulton;
    super_armor_drop: SuperArmorDrop;
    super_select: SuperSelect;
    super_tac_insert: SuperTacInsert;
    super_recon_drone: SuperReconDrone;
    super_deadsilence: SuperDeadsilence;
    super_supply_drop: SuperSupplyDrop;
    super_tac_cover: SuperTacCover;
    super_support_box: SuperSupportBox;
}

export interface Properties93 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiCpapa {
    properties: Properties93;
}

export interface Properties94 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiMike9 {
    properties: Properties94;
}

export interface Properties95 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiMike1911 {
    properties: Properties95;
}

export interface Properties96 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiGolf21 {
    properties: Properties96;
}

export interface Properties97 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiDecho {
    properties: Properties97;
}

export interface Properties98 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8PiPapa320 {
    properties: Properties98;
}

export interface WeaponPistol {
    iw8_pi_cpapa: Iw8PiCpapa;
    iw8_pi_mike9: Iw8PiMike9;
    iw8_pi_mike1911: Iw8PiMike1911;
    iw8_pi_golf21: Iw8PiGolf21;
    iw8_pi_decho: Iw8PiDecho;
    iw8_pi_papa320: Iw8PiPapa320;
}

export interface Properties99 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8MeRiotshield {
    properties: Properties99;
}

export interface WeaponOther {
    iw8_me_riotshield: Iw8MeRiotshield;
}

export interface Properties100 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmMpapa7 {
    properties: Properties100;
}

export interface Properties101 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmAugolf {
    properties: Properties101;
}

export interface Properties102 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmPapa90 {
    properties: Properties102;
}

export interface Properties103 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmCharlie9 {
    properties: Properties103;
}

export interface Properties104 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmMpapa5 {
    properties: Properties104;
}

export interface Properties105 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmSmgolf45 {
    properties: Properties105;
}

export interface Properties106 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmBeta {
    properties: Properties106;
}

export interface Properties107 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmVictor {
    properties: Properties107;
}

export interface Properties108 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8SmUzulu {
    properties: Properties108;
}

export interface WeaponSmg {
    iw8_sm_mpapa7: Iw8SmMpapa7;
    iw8_sm_augolf: Iw8SmAugolf;
    iw8_sm_papa90: Iw8SmPapa90;
    iw8_sm_charlie9: Iw8SmCharlie9;
    iw8_sm_mpapa5: Iw8SmMpapa5;
    iw8_sm_smgolf45: Iw8SmSmgolf45;
    iw8_sm_beta: Iw8SmBeta;
    iw8_sm_victor: Iw8SmVictor;
    iw8_sm_uzulu: Iw8SmUzulu;
}

export interface Properties109 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8MeAkimboblunt {
    properties: Properties109;
}

export interface Properties110 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8MeAkimboblades {
    properties: Properties110;
}

export interface Properties111 {
    hits: number;
    kills: number;
    kdRatio: number;
    headshots: number;
    accuracy: number;
    shots: number;
    deaths: number;
}

export interface Iw8Knife {
    properties: Properties111;
}

export interface WeaponMelee {
    iw8_me_akimboblunt: Iw8MeAkimboblunt;
    iw8_me_akimboblades: Iw8MeAkimboblades;
    iw8_knife: Iw8Knife;
}

export interface ItemData {
    weapon_assault_rifle: WeaponAssaultRifle;
    weapon_shotgun: WeaponShotgun;
    weapon_marksman: WeaponMarksman;
    weapon_sniper: WeaponSniper;
    tacticals: Tacticals;
    lethals: Lethals;
    weapon_lmg: WeaponLmg;
    weapon_launcher: WeaponLauncher;
    supers: Supers;
    weapon_pistol: WeaponPistol;
    weapon_other: WeaponOther;
    weapon_smg: WeaponSmg;
    weapon_melee: WeaponMelee;
}

export interface Properties112 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface PrecisionAirstrike {
    properties: Properties112;
}

export interface Properties113 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface CruisePredator {
    properties: Properties113;
}

export interface Properties114 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface ManualTurret {
    properties: Properties114;
}

export interface Properties115 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface WhitePhosphorus {
    properties: Properties115;
}

export interface Properties116 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface HoverJet {
    properties: Properties116;
}

export interface Properties117 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface ChopperGunner {
    properties: Properties117;
}

export interface Properties118 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Gunship {
    properties: Properties118;
}

export interface Properties119 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface SentryGun {
    properties: Properties119;
}

export interface Properties120 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface TomaStrike {
    properties: Properties120;
}

export interface Properties121 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Nuke {
    properties: Properties121;
}

export interface Properties122 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Juggernaut {
    properties: Properties122;
}

export interface Properties123 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface PacSentry {
    properties: Properties123;
}

export interface Properties124 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface ChopperSupport {
    properties: Properties124;
}

export interface Properties125 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Bradley {
    properties: Properties125;
}

export interface LethalScorestreakData {
    precision_airstrike: PrecisionAirstrike;
    cruise_predator: CruisePredator;
    manual_turret: ManualTurret;
    white_phosphorus: WhitePhosphorus;
    hover_jet: HoverJet;
    chopper_gunner: ChopperGunner;
    gunship: Gunship;
    sentry_gun: SentryGun;
    toma_strike: TomaStrike;
    nuke: Nuke;
    juggernaut: Juggernaut;
    pac_sentry: PacSentry;
    chopper_support: ChopperSupport;
    bradley: Bradley;
}

export interface Properties126 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Airdrop {
    properties: Properties126;
}

export interface Properties127 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface RadarDroneOverwatch {
    properties: Properties127;
}

export interface Properties128 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface ScramblerDroneGuard {
    properties: Properties128;
}

export interface Properties129 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface Uav {
    properties: Properties129;
}

export interface Properties130 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface AirdropMultiple {
    properties: Properties130;
}

export interface Properties131 {
    extraStat1: number;
    uses: number;
    awardedCount: number;
}

export interface DirectionalUav {
    properties: Properties131;
}

export interface SupportScorestreakData {
    airdrop: Airdrop;
    radar_drone_overwatch: RadarDroneOverwatch;
    scrambler_drone_guard: ScramblerDroneGuard;
    uav: Uav;
    airdrop_multiple: AirdropMultiple;
    directional_uav: DirectionalUav;
}

export interface ScorestreakData {
    lethalScorestreakData: LethalScorestreakData;
    supportScorestreakData: SupportScorestreakData;
}

export interface Properties132 {
    classChanges: number;
    highestAvgAltitude: number;
    killsFromBehind: number;
    lmgDeaths: number;
    riotShieldDamageAbsorbed: number;
    flashbangHits: number;
    meleeKills: number;
    tagsLargestBank: number;
    shotgunKills: number;
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
    molotovKills: number;
    gasHits: number;
    comebackKills: number;
    lmgHeadshots: number;
    smgDeaths: number;
    carrierKills: number;
    deployableCoverUsed: number;
    thermiteKills: number;
    arKills: number;
    c4Kills: number;
    suicides: number;
    clutch: number;
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
    killstreakGroundKills: number;
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
    launcherKills: number;
    spawnSelectVehicle: number;
    mostKillsLeastDeaths: number;
    mostKills: number;
    defends: number;
    timeSpentAsDriver: number;
    bombDetonated: number;
    arHeadshots: number;
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
    skippedKillcams: number;
    leastAssists: number;
    mostMultikills: number;
    highestRankedKills: number;
    killstreakAirstrikeKills: number;
    distanceTravelled: number;
    killstreakKills: number;
    semtexKills: number;
    penetrationKills: number;
    explosionsSurvived: number;
    highestMultikill: number;
    arDeaths: number;
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
    leastDeaths: number;
    killstreakSentryGunKills: number;
    longestTimeSpentOnWeapon: number;
    lowerRankedKills: number;
    trophySystemHits: number;
    clutchRevives: number;
    lowestAvgAltitude: number;
    pickups: number;
    pistolKills: number;
    reloads: number;
}

export interface AccoladeData {
    properties: Properties132;
}

export interface Lifetime {
    all: All;
    mode: Mode;
    map: Map;
    itemData: ItemData;
    scorestreakData: ScorestreakData;
    accoladeData: AccoladeData;
}

export interface Properties133 {
    kills: number;
    medalXp: number;
    objectivePlant: number;
    objectiveMedalModeSdDefuseScore: number;
    matchXp: number;
    averageSpeedDuringMatch: number;
    scoreXp: number;
    accuracy: number;
    losses: number;
    wallBangs: number;
    avgLifeTime: number;
    shotsLanded: number;
    objectiveMedalModeXDefendScore: number;
    objectiveMedalModeXAssaultScore: number;
    score: number;
    totalXp: number;
    headshots: number;
    assists: number;
    objectiveGainedGunRank: number;
    draws: number;
    rank: number;
    scorePerMinute: number;
    distanceTraveled: number;
    deaths: number;
    objectiveDestroyedEquipment: number;
    wins: number;
    kdRatio: number;
    shotsMissed: number;
    scorePerGame: number;
    timePlayed: number;
    headshotPercentage: number;
    executions: number;
    matchesPlayed: number;
    suicides: number;
    seasonRank: number;
    wlRatio: number;
    nearmisses: number;
    objectivePerkMarkedTarget: number;
    percentTimeMoving: number;
    miscXp: number;
    objectiveUavAssist: number;
    objectiveLastManKill: number;
    longestStreak: number;
    objectiveDroppedGunRank: number;
    damageDone: number;
    shotsFired: number;
    damageTaken: number;
}

export interface All2 {
    properties: Properties133;
}

export interface Properties134 {
    kills: number;
    medalXp: number;
    objectivePlant: number;
    objectiveMedalModeSdDefuseScore: number;
    matchXp: number;
    averageSpeedDuringMatch: number;
    scoreXp: number;
    accuracy: number;
    wallBangs: number;
    losses: number;
    avgLifeTime: number;
    shotsLanded: number;
    objectiveMedalModeXDefendScore: number;
    objectiveMedalModeXAssaultScore: number;
    score: number;
    totalXp: number;
    headshots: number;
    assists: number;
    rank: number;
    draws: number;
    scorePerMinute: number;
    distanceTraveled: number;
    deaths: number;
    objectiveDestroyedEquipment: number;
    wins: number;
    kdRatio: number;
    shotsMissed: number;
    scorePerGame: number;
    timePlayed: number;
    headshotPercentage: number;
    matchesPlayed: number;
    executions: number;
    suicides: number;
    seasonRank: number;
    wlRatio: number;
    nearmisses: number;
    objectivePerkMarkedTarget: number;
    percentTimeMoving: number;
    miscXp: number;
    objectiveUavAssist: number;
    objectiveLastManKill: number;
    longestStreak: number;
    damageDone: number;
    shotsFired: number;
    damageTaken: number;
}

export interface Sd2 {
    properties: Properties134;
}

export interface Properties135 {
    kills: number;
    medalXp: number;
    matchXp: number;
    averageSpeedDuringMatch: number;
    scoreXp: number;
    accuracy: number;
    wallBangs: number;
    losses: number;
    avgLifeTime: number;
    shotsLanded: number;
    score: number;
    totalXp: number;
    headshots: number;
    assists: number;
    objectiveGainedGunRank: number;
    rank: number;
    draws: number;
    scorePerMinute: number;
    distanceTraveled: number;
    deaths: number;
    wins: number;
    kdRatio: number;
    shotsMissed: number;
    scorePerGame: number;
    timePlayed: number;
    headshotPercentage: number;
    matchesPlayed: number;
    executions: number;
    suicides: number;
    seasonRank: number;
    wlRatio: number;
    nearmisses: number;
    percentTimeMoving: number;
    miscXp: number;
    longestStreak: number;
    objectiveDroppedGunRank: number;
    damageDone: number;
    shotsFired: number;
    damageTaken: number;
}

export interface Gun2 {
    properties: Properties135;
}

export interface Mode2 {
    sd: Sd2;
    gun: Gun2;
}

export interface Map2 {}

export interface Weekly {
    all: All2;
    mode: Mode2;
    map: Map2;
}

export interface LifetimeStats {
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
