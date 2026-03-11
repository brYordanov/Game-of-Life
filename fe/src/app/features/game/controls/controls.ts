import { Component, inject, signal } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  readonly game = inject(GameService);
  readonly isOpen = signal(false);
}
