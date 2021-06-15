export interface Br {
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
    title: string;
}

export interface BrDmz {
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
    title: string;
}

export interface BrAll {
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
    title: string;
}

export interface WarzoneStats {
    br: Br;
    br_dmz: BrDmz;
    br_all: BrAll;
}
