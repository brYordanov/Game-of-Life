import { Component } from '@angular/core';
import { Board } from './board/board';
import { Controls } from './controls/controls';

@Component({
  selector: 'app-game',
  imports: [Board, Controls],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {}
