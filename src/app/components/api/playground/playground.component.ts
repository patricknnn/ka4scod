import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CodApiPlatform, CodApiGame, CodApiGameType, CodApiPlayer, NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  resultTitle?: string;
  resultContent?: any;
  appearance: MatFormFieldAppearance = 'standard';
  color: string = 'primary';
  platform: CodApiPlatform = 'battle';
  platforms: CodApiPlatform[];
  game: CodApiGame = 'mw';
  games: CodApiGame[];
  gameType: CodApiGameType = 'mp';
  gameTypes: CodApiGameType[];
  player: CodApiPlayer;
  players: CodApiPlayer[];
  season: number = 3;

  constructor(private api: NodeRestApiService) {
    this.players = this.api.getPlayers();
    this.player = this.api.getPlayers()[0];
    this.platforms = this.api.getPlatforms();
    this.games = this.api.getGames();
    this.gameTypes = this.api.getGameTypes();
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.api.isLoggedIn;
  }

  getLifetimeStats(): void {
    this.api.getLifetimeStats(this.gameType, this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Lifetime stats';
  }

  getWarzoneStats(): void {
    this.api.getWarzoneStats(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Battle Royale Stats';
  }

  getWeeklyStats(): void {
    this.api.getWeeklyStats(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Weekly Stats';
  }

  getRecentMatches(): void {
    this.api.getRecentMatches(this.gameType, this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Recent Matches';
  }

  getAnalysis(): void {
    this.api.getAnalysis(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Match Analysis';
  }

  getMaps(): void {
    this.api.getMaps().then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Maps';
  }

  getBattlePassLoot(): void {
    this.api.getBattlePassLoot(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Battlepass Loot';
  }

  getBattlePassTiers(): void {
    this.api.getBattlePassTiers(this.season, this.player.platform).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Battlepass Tiers';
  }

  getCodPoints(): void {
    this.api.getCodPoints(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Cod Points';
  }

  getUserinfo(): void {
    this.api.getUserinfo().then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'User Info';
  }

  getEvents(): void {
    this.api.getEvents().then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Events';
  }

  getAccounts(): void {
    this.api.getAccounts(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Accounts';
  }

  getIdentities(): void {
    this.api.getIdentities().then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Identities';
  }

  getSettings(): void {
    this.api.getSettings(this.player).then(result => this.resultContent = JSON.stringify(result));
    this.resultTitle = 'Settings';
  }
}
