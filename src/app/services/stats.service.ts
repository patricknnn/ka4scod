import { Injectable } from '@angular/core';
import { LifetimeStats } from '../models/lifetime-stats';
import { PlayerStatsLifetime } from '../models/player-stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  convertLifetimeStatsToPlayerStatsLifetime(lifetime: LifetimeStats): PlayerStatsLifetime {
    let playerstats: PlayerStatsLifetime = {
        recordLongestWinStreak: lifetime.lifetime.all.properties.recordLongestWinStreak,
        recordXpInAMatch: lifetime.lifetime.all.properties.recordXpInAMatch,
        accuracy: lifetime.lifetime.all.properties.accuracy,
        losses: lifetime.lifetime.all.properties.losses,
        totalGamesPlayed: lifetime.lifetime.all.properties.totalGamesPlayed,
        score: lifetime.lifetime.all.properties.score,
        winLossRatio: lifetime.lifetime.all.properties.winLossRatio,
        gamesPlayed: lifetime.lifetime.all.properties.gamesPlayed,
        deaths: lifetime.lifetime.all.properties.deaths,
        wins: lifetime.lifetime.all.properties.wins,
        kdRatio: lifetime.lifetime.all.properties.kdRatio,
        bestScore: lifetime.lifetime.all.properties.bestScore,
        recordDeathsInAMatch: lifetime.lifetime.all.properties.recordDeathsInAMatch,
        bestSPM: lifetime.lifetime.all.properties.bestSPM,
        recordKillsInAMatch: lifetime.lifetime.all.properties.recordKillsInAMatch,
        wlRatio: lifetime.lifetime.all.properties.wlRatio,
        currentWinStreak: lifetime.lifetime.all.properties.currentWinStreak,
        bestMatchXp: lifetime.lifetime.all.properties.bestMatchXp,
        bestKD: lifetime.lifetime.all.properties.bestKD,
        kills: lifetime.lifetime.all.properties.kills,
        timePlayedTotal: lifetime.lifetime.all.properties.timePlayedTotal,
        headshots: lifetime.lifetime.all.properties.headshots,
        recordKillStreak: lifetime.lifetime.all.properties.recordKillStreak,
        bestPlants: lifetime.lifetime.all.properties.bestPlants,
        misses: lifetime.lifetime.all.properties.misses,
        bestDamage: lifetime.lifetime.all.properties.bestDamage,
        scorePerMinute: lifetime.lifetime.all.properties.scorePerMinute,
        bestDeaths: lifetime.lifetime.all.properties.bestDeaths,
        bestKills: lifetime.lifetime.all.properties.bestKills,
        hits: lifetime.lifetime.all.properties.hits,
        bestKillStreak: lifetime.lifetime.all.properties.bestKillStreak,
        // shotty
        // AA12: number
        // C725: number
        // DP12: number
        // M26: number
        // Origin12: number
        // R870: number
        // // lmg
        // M91: number
        // SA87: number
        // MG34: number
        // Holger: number
        // MK3: number
        // PKM: number
        // SX: number
        // // pistol
        // CP: number
        // DE: number
        // G21: number
        // M1911: number
        // M9: number
        // P320: number
        // // launcher
        // GR: number
        // JL: number
        // KG: number
        // MGL32: number
        // RPG7: number
        // // melee
        // Knife: number
        // Kodachis: number
        // Kali: number
        // Riot: number
        // //smg
        // AUG: number
        // Bizon: number
        // CX9: number
        // MP5: number
        // MP7: number
        // P90: number
        // Striker: number
        // Uzi: number
        // Fennec: number
        // // marksman
        // Kar98k: number
        // SPR208: number
        // MK2Carbine: number
        // SKS: number
        // Crossbow: number
        // EBR14: number
        // // xniper
        // AX50: number
        // Dragunov: number
        // HDR: number
        // Rytec: number
        // //assualt
        // AK47: number
        // AN94: number
        // Oden: number
        // FAL: number
        // FR56: number
        // AMAX: number
        // Kilo: number
        // M13: number
        // M4A1: number
        // Scar: number
        // Grau: number
        // RAM7: number
        // ASVAL: number
        // // SD
        // SDHours?: string
        // SDKills?: number
        // SDDeath?: number
        // SDPlant?: number
        // SDDefuse?: number
        // SDKD?: number
        // SDScore?: number
        // SDScoreMin?: number
        // // Accolade
        // killsFromBehind: number
        // lmgDeaths: number
        // riotShieldDamageAbsorbed: number
        // flashbangHits: number
        // meleeKills: number
        // shotgunKills: number
        // sniperDeaths: number
        // timeProne: number
        // shortestLife: number
        // sniperHeadshots: number
        // smokesUsed: number
        // molotovKills: number
        // gasHits: number
        // lmgHeadshots: number
        // smgDeaths: number
        // thermiteKills: number
        // arKills: number
        // c4Kills: number
        // suicides: number
        // clutch: number
        // survivorKills: number
        // smgHeadshots: number
        // launcherDeaths: number
        // oneShotOneKills: number
        // ammoBoxUsed: number
        // distanceTraveledInVehicle: number
        // longestLife: number
        // stunHits: number
        // shotgunHeadshots: number
        // bombDefused: number
        // launcherKills: number
        // mostKills: number
        // defends: number
        // bombDetonated: number
        // arHeadshots: number
        // timeOnPoint: number
        // lmgKills: number
        // mostKillsLongestStreak: number
        // longestStreak: number
        // hipfireKills: number
        // stimDamageHealed: number
        // mostMultikills: number
        // distanceTravelled: number
        // killstreakKills: number
        // semtexKills: number
        // penetrationKills: number
        // highestMultikill: number
        // arDeaths: number
        // longshotKills: number
        // throwingKnifeKills: number
        // executionKills: number
        // deadSilenceKills: number
        // revengeKills: number
        // infectedKills: number
        // killEnemyTeam: number
        // sniperKills: number
        // meleeDeaths: number
        // noKillNoDeath: number
        // shotgunDeaths: number
        // shotsFired: number
        // stoppingPowerKills: number
        // pistolPeaths: number
        // timeCrouched: number
        // bombPlanted: number
        // smgKills: number
        // claymoreKills: number
        // pistolHeadshots: number
        // mostDeaths: number
        // adsKills: number
        // defenderKills: number
        // launcherHeadshots: number
        // assaults: number
        // fragKills: number
        // captures: number
        // noKill10Deaths: number
        // leastDeaths: number
        // longestTimeSpentOnWeapon: number
        // pistolKills: number
    
    };
    return playerstats;
  }
}
