import { Component, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  readonly game = inject(GameService);
}
