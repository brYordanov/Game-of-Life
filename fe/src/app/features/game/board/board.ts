import { Component, HostListener, inject } from '@angular/core';
import { GameService } from '../game.service';
import { ControllKeys } from './board.types';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  readonly game = inject(GameService);

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key in ControllKeys) {
      e.preventDefault();
    }

    if (e.key === ControllKeys.ArrowUp || e.key === ControllKeys.w) {
      this.game.moveCursor('up');
    } else if (e.key === ControllKeys.ArrowDown || e.key === ControllKeys.s) {
      this.game.moveCursor('down');
    } else if (e.key === ControllKeys.ArrowLeft || e.key === ControllKeys.a) {
      this.game.moveCursor('left');
    } else if (e.key === ControllKeys.ArrowRight || e.key === ControllKeys.d) {
      this.game.moveCursor('right');
    } else if (e.key === ControllKeys.Space || e.key === ControllKeys.Enter) {
      this.game.toggleCursor();
    }
  }
}
