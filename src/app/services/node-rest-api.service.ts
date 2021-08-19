import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LifetimeStats } from '../models/lifetime-stats';
import { WarzoneStats } from '../models/warzone-stats';
import { AuthService } from './firestore/auth.service';

export declare type CodApiPlayer = {
    name: string;
    gamertag: string;
    platform: CodApiPlatform;
};
export declare type CodApiPlatform =
    | 'battle'
    | 'steam'
    | 'psn'
    | 'xbl'
    | 'acti'
    | 'uno'
    | 'all';
export declare type CodApiGame = 'mw' | 'cw' | 'wwii' | 'bo4';
export declare type CodApiGameType = 'mp' | 'wz' | 'zm';

@Injectable({
    providedIn: 'root',
})
export class NodeRestApiService {
    isLoggedIn: boolean = false;
    apiURL: string = 'http://localhost:8000/api/';
    //apiURL: string = 'http://api.klapdekar.nl:8000/api/'
    requestRetries: number = 1;
    lifetimeCache: { name: string; data: any }[] = [];
    warzoneCache: { name: string; data: any }[] = [];
    weeklyCache: { name: string; data: any }[] = [];
    recentMatchesCache: { name: string; data: any }[] = [];

    /**
     * Initialize CodApiService
     * @param http HttpClient module
     */
    constructor(private http: HttpClient, private auth: AuthService) {}

    /**
     * Log in
     * @param sso SSO Token
     * @returns Promise<string>
     */
    login(sso: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const body = { sso: sso };
            // Login and fetch tokens
            this.postRequest(`${this.apiURL}login`, body)
                .toPromise()
                .then((result: any) => {
                    if (result.search('200') >= 0) {
                        resolve('succes');
                    } else {
                        reject(result);
                    }
                })
                .catch((error: any) => {
                    reject(typeof error === 'string' ? error : error.message);
                });
        });
    }

    getLifetimeStats(player: CodApiPlayer): Promise<LifetimeStats> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }

            this.lifetimeCache.forEach((entry) => {
                if (entry.name == player.name) {
                    resolve(entry.data);
                }
            });
            let type = 'mp';
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(
                `lifetime/${type}/${gamertag}/${platform}`
            );
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => {
                    this.lifetimeCache.push({ name: player.name, data: data });
                    resolve(data);
                })
                .catch((e) => reject(e));
        });
    }

    getWarzoneStats(player: CodApiPlayer): Promise<WarzoneStats> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }

            this.warzoneCache.forEach((entry) => {
                if (entry.name == player.name) {
                    resolve(entry.data);
                }
            });
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(
                `battleroyale/${gamertag}/${platform}`
            );
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => {
                    this.warzoneCache.push({ name: player.name, data: data });
                    resolve(data);
                })
                .catch((e) => reject(e));
        });
    }

    getWeeklyStats(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            this.warzoneCache.forEach((entry) => {
                if (entry.name == player.name) {
                    resolve(entry.data);
                }
            });
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`weekly/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => {
                    this.warzoneCache.push({ name: player.name, data: data });
                    resolve(data);
                })
                .catch((e) => reject(e));
        });
    }

    getRecentMatches(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            this.recentMatchesCache.forEach((entry) => {
                if (entry.name == player.name) {
                    resolve(entry.data);
                }
            });
            let type = 'mp';
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(
                `recentmatches/${type}/${gamertag}/${platform}`
            );
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => {
                    this.recentMatchesCache.push({
                        name: player.name,
                        data: data,
                    });
                    resolve(data);
                })
                .catch((e) => reject(e));
        });
    }

    getAnalysis(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`analysis/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getMaps(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let requestUrl = this.buildUrl(`maps`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getBattlePassLoot(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`loot/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getBattlePassTiers(season: number, platform: CodApiPlatform): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let requestUrl = this.buildUrl(`tiers/${season}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getCodPoints(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`points/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getUserinfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let requestUrl = this.buildUrl(`userinfo`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getEvents(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let requestUrl = this.buildUrl(`events`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getAccounts(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`accounts/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getIdentities(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let requestUrl = this.buildUrl(`identities`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getSettings(player: CodApiPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.loggedInUser?.ssoToken) {
                this.login(this.auth.loggedInUser.ssoToken);
            } else {
                reject('No SSO Token set');
            }
            
            let gamertag = encodeURIComponent(player.gamertag);
            let platform = player.platform;
            let requestUrl = this.buildUrl(`settings/${gamertag}/${platform}`);
            this.getRequest(requestUrl)
                .toPromise()
                .then((data: any) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    /**
     * Returnes platforms
     * @returns CodApiPlatform[]
     */
    getPlayers(): CodApiPlayer[] {
        return [
            {
                name: 'BENNIEMAN',
                gamertag: 'BENNIEMAN#21282',
                platform: 'battle',
            },
            { name: 'Kuberoal', gamertag: 'Lamberg1#2207', platform: 'battle' },
            {
                name: 'MARTINZIKI',
                gamertag: 'MARTINZIKI#2452',
                platform: 'battle',
            },
            {
                name: 'NanoHakuro',
                gamertag: 'NanoHakuro#2526',
                platform: 'battle',
            },
            {
                name: 'BlokTastic',
                gamertag: 'BlokTastic#2650',
                platform: 'battle',
            },
            { name: 'KraakYY', gamertag: 'kraakYY#2482', platform: 'battle' },
        ];
    }

    /**
     * Returnes platforms
     * @returns CodApiPlatform[]
     */
    getPlatforms(): CodApiPlatform[] {
        return ['battle', 'steam', 'psn', 'xbl', 'acti', 'uno', 'all'];
    }

    /**
     * Returnes games
     * @returns CodApiGame[]
     */
    getGames(): CodApiGame[] {
        return ['mw', 'cw', 'wwii', 'bo4'];
    }

    /**
     * Returnes game types
     * @returns CodApiGameType[]
     */
    getGameTypes(): CodApiGameType[] {
        return ['mp', 'wz', 'zm'];
    }

    /**
     * Perform a (typed) get request
     * @param url Request url
     * @returns Observable<T>
     */
    private getRequest(url: string): Observable<any> {
        return this.http
            .get(url)
            .pipe(retry(this.requestRetries), catchError(this.handleError));
    }
    /**
     * Perform a (typed) post request
     * @param url Request url
     * @param data Data to post
     * @param options Post options
     * @returns
     */
    private postRequest(url: string, body: any): Observable<any> {
        return this.http
            .post(url, body)
            .pipe(retry(this.requestRetries), catchError(this.handleError));
    }

    /**
     * Handle http error response
     * @param error HttpErrorResponse
     * @returns Observable<never>
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 0) {
            // Client-side or network error
            console.error('An error occurred:', error.error);
        } else {
            // Backend error code
            console.error(
                `Backend returned code ${error.status}, ` +
                    `url was ${error.url}, ` +
                    `type was ${error.type}, ` +
                    `body was: ${JSON.stringify(error.error.text)}`
            );
        }
        // Return error message
        return throwError('Request resulted in an error.');
    }

    /**
     * Adds string to url
     * @param str string to add
     * @returns url
     */
    private buildUrl(str: string) {
        return `${this.apiURL}${str}`;
    }
}
