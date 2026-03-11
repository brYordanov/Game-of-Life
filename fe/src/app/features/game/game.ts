import { Component } from '@angular/core';
import { Board } from './board/board';
import { Controls } from './controls/controls';
import { Stats } from './stats/stats';

@Component({
  selector: 'app-game',
  imports: [Board, Controls, Stats],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {}
