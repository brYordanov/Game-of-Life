import { Component, inject, signal } from '@angular/core';
import { GameService } from '../game.service';
import { PatternsDialog } from '../patterns-dialog/patterns-dialog';
import { PatternsService } from '../patterns.service';

@Component({
  selector: 'app-controls',
  imports: [PatternsDialog],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  readonly game = inject(GameService);
  private readonly patternsService = inject(PatternsService);
  readonly isOpen = signal(false);
  readonly isPatternsDialogOpen = signal(false);

  onPatternSelect(id: string) {
    this.patternsService.getById(id).subscribe((pattern) => {
      this.game.loadPattern(pattern);
      this.isPatternsDialogOpen.set(false);
    });
  }
}
