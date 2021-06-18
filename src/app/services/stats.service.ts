import { Injectable } from '@angular/core';
import { LifetimeStats, Weekly } from '../models/lifetime-stats';
import { PlayerStatsLifetime } from '../models/player-stats';

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor() {}

    getEmptyWarzone(): any {
        return {
            wins: 0,
            kills: 0,
            kdRatio: 0,
            downs: 0,
            topTwentyFive: 0,
            topTen: 0,
            contracts: 0,
            revives: 0,
            topFive: 0,
            score: 0,
            timePlayed: 0,
            gamesPlayed: 0,
            tokens: 0,
            scorePerMinute: 0,
            cash: 0,
            deaths: 0,
        };
    }

    getEmptyWeekly(): any {
        return {
            kills: 0,
            medalXp: 0,
            objectivePlant: 0,
            objectiveMedalModeSdDefuseScore: 0,
            matchXp: 0,
            averageSpeedDuringMatch: 0,
            scoreXp: 0,
            accuracy: 0,
            losses: 0,
            wallBangs: 0,
            avgLifeTime: 0,
            shotsLanded: 0,
            objectiveMedalModeXDefendScore: 0,
            objectiveMedalModeXAssaultScore: 0,
            score: 0,
            totalXp: 0,
            headshots: 0,
            assists: 0,
            objectiveGainedGunRank: 0,
            draws: 0,
            rank: 0,
            scorePerMinute: 0,
            distanceTraveled: 0,
            deaths: 0,
            objectiveDestroyedEquipment: 0,
            wins: 0,
            kdRatio: 0,
            shotsMissed: 0,
            scorePerGame: 0,
            timePlayed: 0,
            headshotPercentage: 0,
            executions: 0,
            matchesPlayed: 0,
            suicides: 0,
            seasonRank: 0,
            wlRatio: 0,
            nearmisses: 0,
            objectivePerkMarkedTarget: 0,
            percentTimeMoving: 0,
            miscXp: 0,
            objectiveUavAssist: 0,
            objectiveLastManKill: 0,
            longestStreak: 0,
            objectiveDroppedGunRank: 0,
            damageDone: 0,
            shotsFired: 0,
            damageTaken: 0,
        };
    }

    convertLifetimeStatsToPlayerStatsLifetime(
        lifetime: LifetimeStats
    ): PlayerStatsLifetime {
        let playerstats: PlayerStatsLifetime = {
            recordLongestWinStreak:
                lifetime.lifetime?.all.properties.recordLongestWinStreak || 0,
            recordXpInAMatch:
                lifetime.lifetime?.all.properties.recordXpInAMatch || 0,
            accuracy: lifetime.lifetime?.all.properties.accuracy || 0,
            losses: lifetime.lifetime?.all.properties.losses || 0,
            totalGamesPlayed:
                lifetime.lifetime?.all.properties.totalGamesPlayed || 0,
            score: lifetime.lifetime?.all.properties.score || 0,
            winLossRatio: lifetime.lifetime?.all.properties.winLossRatio || 0,
            gamesPlayed: lifetime.lifetime?.all.properties.gamesPlayed || 0,
            deaths: lifetime.lifetime?.all.properties.deaths || 0,
            wins: lifetime.lifetime?.all.properties.wins || 0,
            kdRatio: lifetime.lifetime?.all.properties.kdRatio || 0,
            bestScore: lifetime.lifetime?.all.properties.bestScore || 0,
            recordDeathsInAMatch:
                lifetime.lifetime?.all.properties.recordDeathsInAMatch || 0,
            bestSPM: lifetime.lifetime?.all.properties.bestSPM || 0,
            recordKillsInAMatch:
                lifetime.lifetime?.all.properties.recordKillsInAMatch || 0,
            wlRatio: lifetime.lifetime?.all.properties.wlRatio || 0,
            currentWinStreak:
                lifetime.lifetime?.all.properties.currentWinStreak || 0,
            bestMatchXp: lifetime.lifetime?.all.properties.bestMatchXp || 0,
            bestKD: lifetime.lifetime?.all.properties.bestKD || 0,
            kills: lifetime.lifetime?.all.properties.kills || 0,
            timePlayedTotal:
                lifetime.lifetime?.all.properties.timePlayedTotal || 0,
            headshots: lifetime.lifetime?.all.properties.headshots || 0,
            recordKillStreak:
                lifetime.lifetime?.all.properties.recordKillStreak || 0,
            bestPlants: lifetime.lifetime?.all.properties.bestPlants || 0,
            misses: lifetime.lifetime?.all.properties.misses || 0,
            bestDamage: lifetime.lifetime?.all.properties.bestDamage || 0,
            scorePerMinute:
                lifetime.lifetime?.all.properties.scorePerMinute || 0,
            bestDeaths: lifetime.lifetime?.all.properties.bestDeaths || 0,
            bestKills: lifetime.lifetime?.all.properties.bestKills || 0,
            hits: lifetime.lifetime?.all.properties.hits || 0,
            bestKillStreak:
                lifetime.lifetime?.all.properties.bestKillStreak || 0,
            // shotty
            AA12:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_aalpha12
                    .properties.kills || 0,
            C725:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_charlie725
                    .properties.kills || 0,
            DP12:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_dpapa12
                    .properties.kills || 0,
            M26:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_mike26
                    .properties.kills || 0,
            Origin12:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_oscar12
                    .properties.kills || 0,
            R870:
                lifetime.lifetime?.itemData.weapon_shotgun.iw8_sh_romeo870
                    .properties.kills || 0,
            // // lmg
            M91:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_kilo121.properties
                    .kills || 0,
            SA87:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_lima86.properties
                    .kills || 0,
            MG34:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_mgolf34.properties
                    .kills || 0,
            Holger:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_mgolf36.properties
                    .kills || 0,
            MK3:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_mkilo3.properties
                    .kills || 0,
            PKM:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_pkilo.properties
                    .kills || 0,
            SX:
                lifetime.lifetime?.itemData.weapon_lmg.iw8_lm_sierrax.properties
                    .kills || 0,
            // // pistol
            CP:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_cpapa
                    .properties.kills || 0,
            DE:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_decho
                    .properties.kills || 0,
            G21:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_golf21
                    .properties.kills || 0,
            M1911:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_mike1911
                    .properties.kills || 0,
            M9:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_mike9
                    .properties.kills || 0,
            P320:
                lifetime.lifetime?.itemData.weapon_pistol.iw8_pi_papa320
                    .properties.kills || 0,
            // // launcher
            GR:
                lifetime.lifetime?.itemData.weapon_launcher.iw8_la_gromeo
                    .properties.kills || 0,
            JL:
                lifetime.lifetime?.itemData.weapon_launcher.iw8_la_juliet
                    .properties.kills || 0,
            KG:
                lifetime.lifetime?.itemData.weapon_launcher.iw8_la_kgolf
                    .properties.kills || 0,
            MGL32:
                lifetime.lifetime?.itemData.weapon_launcher.iw8_la_mike32
                    .properties.kills || 0,
            RPG7:
                lifetime.lifetime?.itemData.weapon_launcher.iw8_la_rpapa7
                    .properties.kills || 0,
            // melee
            Knife:
                lifetime.lifetime?.itemData.weapon_melee.iw8_knife.properties
                    .kills || 0,
            Kodachis:
                lifetime.lifetime?.itemData.weapon_melee.iw8_me_akimboblades
                    .properties.kills || 0,
            Kali:
                lifetime.lifetime?.itemData.weapon_melee.iw8_me_akimboblunt
                    .properties.kills || 0,
            Riot:
                lifetime.lifetime?.itemData.weapon_other.iw8_me_riotshield
                    .properties.kills || 0,
            // //smg
            AUG:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_augolf.properties
                    .kills || 0,
            Bizon:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_beta.properties
                    .kills || 0,
            CX9:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_charlie9
                    .properties.kills || 0,
            MP5:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_mpapa5.properties
                    .kills || 0,
            MP7:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_mpapa7.properties
                    .kills || 0,
            P90:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_papa90.properties
                    .kills || 0,
            Striker:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_smgolf45
                    .properties.kills || 0,
            Uzi:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_uzulu.properties
                    .kills || 0,
            Fennec:
                lifetime.lifetime?.itemData.weapon_smg.iw8_sm_victor.properties
                    .kills || 0,
            // // marksman
            Kar98k:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_kilo98
                    .properties.kills || 0,
            SPR208:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_romeo700
                    .properties.kills || 0,
            MK2Carbine:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_sbeta
                    .properties.kills || 0,
            SKS:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_sksierra
                    .properties.kills || 0,
            Crossbow:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_crossbow
                    .properties.kills || 0,
            EBR14:
                lifetime.lifetime?.itemData.weapon_marksman.iw8_sn_mike14
                    .properties.kills || 0,
            // // xniper
            AX50:
                lifetime.lifetime?.itemData.weapon_sniper.iw8_sn_alpha50
                    .properties.kills || 0,
            Dragunov:
                lifetime.lifetime?.itemData.weapon_sniper.iw8_sn_delta
                    .properties.kills || 0,
            HDR:
                lifetime.lifetime?.itemData.weapon_sniper.iw8_sn_hdromeo
                    .properties.kills || 0,
            Rytec:
                lifetime.lifetime?.itemData.weapon_sniper.iw8_sn_xmike109
                    .properties.kills || 0,
            // //assualt
            AK47:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_akilo47
                    .properties.kills || 0,
            AN94:
                lifetime.lifetime?.itemData.weapon_assault_rifle
                    .iw8_ar_anovember94.properties.kills || 0,
            Oden:
                lifetime.lifetime?.itemData.weapon_assault_rifle
                    .iw8_ar_asierra12.properties.kills || 0,
            FAL:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_falima
                    .properties.kills || 0,
            FR56:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_falpha
                    .properties.kills || 0,
            AMAX:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_galima
                    .properties.kills || 0,
            Kilo:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_kilo433
                    .properties.kills || 0,
            M13:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_mcharlie
                    .properties.kills || 0,
            M4A1:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_mike4
                    .properties.kills || 0,
            Scar:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_scharlie
                    .properties.kills || 0,
            Grau:
                lifetime.lifetime?.itemData.weapon_assault_rifle
                    .iw8_ar_sierra552.properties.kills || 0,
            RAM7:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_tango21
                    .properties.kills || 0,
            ASVAL:
                lifetime.lifetime?.itemData.weapon_assault_rifle.iw8_ar_valpha
                    .properties.kills || 0,
            // // SD
            SDKills: lifetime.lifetime?.mode.sd.properties.kills || 0,
            SDKD: lifetime.lifetime?.mode.sd.properties.kdRatio || 0,
            SDDeath: lifetime.lifetime?.mode.sd.properties.deaths || 0,
            SDHours: lifetime.lifetime?.mode.sd.properties.timePlayed || 0,
            SDPlant: lifetime.lifetime?.mode.sd.properties.plants || 0,
            SDDefuse: lifetime.lifetime?.mode.sd.properties.defuses || 0,
            SDScore: lifetime.lifetime?.mode.sd.properties.score || 0,
            SDScoreMin:
                lifetime.lifetime?.mode.sd.properties.scorePerMinute || 0,
            // // Accolade
            killsFromBehind:
                lifetime.lifetime?.accoladeData.properties.killsFromBehind || 0,
            lmgDeaths:
                lifetime.lifetime?.accoladeData.properties.lmgDeaths || 0,
            riotShieldDamageAbsorbed:
                lifetime.lifetime?.accoladeData.properties
                    .riotShieldDamageAbsorbed || 0,
            flashbangHits:
                lifetime.lifetime?.accoladeData.properties.flashbangHits || 0,
            meleeKills:
                lifetime.lifetime?.accoladeData.properties.meleeKills || 0,
            shotgunKills:
                lifetime.lifetime?.accoladeData.properties.shotgunKills || 0,
            sniperDeaths:
                lifetime.lifetime?.accoladeData.properties.sniperDeaths || 0,
            timeProne:
                lifetime.lifetime?.accoladeData.properties.timeProne || 0,
            shortestLife:
                lifetime.lifetime?.accoladeData.properties.shortestLife || 0,
            sniperHeadshots:
                lifetime.lifetime?.accoladeData.properties.sniperHeadshots || 0,
            smokesUsed:
                lifetime.lifetime?.accoladeData.properties.smokesUsed || 0,
            molotovKills:
                lifetime.lifetime?.accoladeData.properties.molotovKills || 0,
            gasHits: lifetime.lifetime?.accoladeData.properties.gasHits || 0,
            lmgHeadshots:
                lifetime.lifetime?.accoladeData.properties.lmgHeadshots || 0,
            smgDeaths:
                lifetime.lifetime?.accoladeData.properties.smgDeaths || 0,
            thermiteKills:
                lifetime.lifetime?.accoladeData.properties.thermiteKills || 0,
            arKills: lifetime.lifetime?.accoladeData.properties.arKills || 0,
            c4Kills: lifetime.lifetime?.accoladeData.properties.c4Kills || 0,
            suicides: lifetime.lifetime?.accoladeData.properties.suicides || 0,
            clutch: lifetime.lifetime?.accoladeData.properties.clutch || 0,
            survivorKills:
                lifetime.lifetime?.accoladeData.properties.survivorKills || 0,
            smgHeadshots:
                lifetime.lifetime?.accoladeData.properties.smgHeadshots || 0,
            launcherDeaths:
                lifetime.lifetime?.accoladeData.properties.launcherDeaths || 0,
            oneShotOneKills:
                lifetime.lifetime?.accoladeData.properties.oneShotOneKills || 0,
            ammoBoxUsed:
                lifetime.lifetime?.accoladeData.properties.ammoBoxUsed || 0,
            distanceTraveledInVehicle:
                lifetime.lifetime?.accoladeData.properties
                    .distanceTraveledInVehicle || 0,
            longestLife:
                lifetime.lifetime?.accoladeData.properties.longestLife || 0,
            stunHits: lifetime.lifetime?.accoladeData.properties.stunHits || 0,
            shotgunHeadshots:
                lifetime.lifetime?.accoladeData.properties.shotgunHeadshots ||
                0,
            bombDefused:
                lifetime.lifetime?.accoladeData.properties.bombDefused || 0,
            launcherKills:
                lifetime.lifetime?.accoladeData.properties.launcherKills || 0,
            mostKills:
                lifetime.lifetime?.accoladeData.properties.mostKills || 0,
            defends: lifetime.lifetime?.accoladeData.properties.defends || 0,
            bombDetonated:
                lifetime.lifetime?.accoladeData.properties.bombDetonated || 0,
            arHeadshots:
                lifetime.lifetime?.accoladeData.properties.arHeadshots || 0,
            timeOnPoint:
                lifetime.lifetime?.accoladeData.properties.timeOnPoint || 0,
            lmgKills: lifetime.lifetime?.accoladeData.properties.lmgKills || 0,
            mostKillsLongestStreak:
                lifetime.lifetime?.accoladeData.properties
                    .mostKillsLongestStreak || 0,
            longestStreak:
                lifetime.lifetime?.accoladeData.properties.longestStreak || 0,
            hipfireKills:
                lifetime.lifetime?.accoladeData.properties.hipfireKills || 0,
            stimDamageHealed:
                lifetime.lifetime?.accoladeData.properties.stimDamageHealed ||
                0,
            mostMultikills:
                lifetime.lifetime?.accoladeData.properties.mostMultikills || 0,
            distanceTravelled:
                lifetime.lifetime?.accoladeData.properties.distanceTravelled ||
                0,
            killstreakKills:
                lifetime.lifetime?.accoladeData.properties.killstreakKills || 0,
            semtexKills:
                lifetime.lifetime?.accoladeData.properties.semtexKills || 0,
            penetrationKills:
                lifetime.lifetime?.accoladeData.properties.penetrationKills ||
                0,
            highestMultikill:
                lifetime.lifetime?.accoladeData.properties.highestMultikill ||
                0,
            arDeaths: lifetime.lifetime?.accoladeData.properties.arDeaths || 0,
            longshotKills:
                lifetime.lifetime?.accoladeData.properties.longshotKills || 0,
            throwingKnifeKills:
                lifetime.lifetime?.accoladeData.properties.throwingKnifeKills ||
                0,
            executionKills:
                lifetime.lifetime?.accoladeData.properties.executionKills || 0,
            deadSilenceKills:
                lifetime.lifetime?.accoladeData.properties.deadSilenceKills ||
                0,
            revengeKills:
                lifetime.lifetime?.accoladeData.properties.revengeKills || 0,
            infectedKills:
                lifetime.lifetime?.accoladeData.properties.infectedKills || 0,
            killEnemyTeam:
                lifetime.lifetime?.accoladeData.properties.killEnemyTeam || 0,
            sniperKills:
                lifetime.lifetime?.accoladeData.properties.sniperKills || 0,
            meleeDeaths:
                lifetime.lifetime?.accoladeData.properties.meleeDeaths || 0,
            noKillNoDeath:
                lifetime.lifetime?.accoladeData.properties.noKillNoDeath || 0,
            shotgunDeaths:
                lifetime.lifetime?.accoladeData.properties.shotgunDeaths || 0,
            shotsFired:
                lifetime.lifetime?.accoladeData.properties.shotsFired || 0,
            stoppingPowerKills:
                lifetime.lifetime?.accoladeData.properties.stoppingPowerKills ||
                0,
            pistolPeaths:
                lifetime.lifetime?.accoladeData.properties.pistolPeaths || 0,
            timeCrouched:
                lifetime.lifetime?.accoladeData.properties.timeCrouched || 0,
            bombPlanted:
                lifetime.lifetime?.accoladeData.properties.bombPlanted || 0,
            smgKills: lifetime.lifetime?.accoladeData.properties.smgKills || 0,
            claymoreKills:
                lifetime.lifetime?.accoladeData.properties.claymoreKills || 0,
            pistolHeadshots:
                lifetime.lifetime?.accoladeData.properties.pistolHeadshots || 0,
            mostDeaths:
                lifetime.lifetime?.accoladeData.properties.mostDeaths || 0,
            adsKills: lifetime.lifetime?.accoladeData.properties.adsKills || 0,
            defenderKills:
                lifetime.lifetime?.accoladeData.properties.defenderKills || 0,
            launcherHeadshots:
                lifetime.lifetime?.accoladeData.properties.launcherHeadshots ||
                0,
            assaults: lifetime.lifetime?.accoladeData.properties.assaults || 0,
            fragKills:
                lifetime.lifetime?.accoladeData.properties.fragKills || 0,
            captures: lifetime.lifetime?.accoladeData.properties.captures || 0,
            noKill10Deaths:
                lifetime.lifetime?.accoladeData.properties.noKill10Deaths || 0,
            leastDeaths:
                lifetime.lifetime?.accoladeData.properties.leastDeaths || 0,
            longestTimeSpentOnWeapon:
                lifetime.lifetime?.accoladeData.properties
                    .longestTimeSpentOnWeapon || 0,
            pistolKills:
                lifetime.lifetime?.accoladeData.properties.pistolKills || 0,
        };
        return playerstats;
    }
}
