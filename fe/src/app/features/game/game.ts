import { Component } from '@angular/core';
import { Board } from './board/board';
import { Controls } from './controls/controls';

@Component({
  selector: 'app-game',
  imports: [Board, Controls],
  template: `
    <app-board />
    <app-controls />
  `,
  styleUrl: './game.css',
})
export class Game {}
