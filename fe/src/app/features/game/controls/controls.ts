import { Component, inject, signal } from '@angular/core';
import { GameService } from '../game.service';
import { PatternsDialog } from '../patterns-dialog/patterns-dialog';

@Component({
  selector: 'app-controls',
  imports: [PatternsDialog],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  readonly game = inject(GameService);
  readonly isOpen = signal(false);
  readonly isPatternsDialogOpen = signal(false);
}
