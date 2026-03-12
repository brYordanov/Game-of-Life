import { Component, EventEmitter, inject, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Dialog } from '../../../shared/components/dialog/dialog';
import { PatternsService } from '../patterns.service';

@Component({
  selector: 'app-patterns-dialog',
  imports: [Dialog],
  templateUrl: './patterns-dialog.html',
  styleUrl: './patterns-dialog.css',
})
export class PatternsDialog {
  private readonly patternsService = inject(PatternsService);

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();

  readonly patterns = toSignal(this.patternsService.getAll(), { initialValue: [] });
}
