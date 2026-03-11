import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { Dialog } from '../../../shared/components/dialog/dialog';
import { GameService } from '../game.service';
import { ControllKeys } from './board.types';

@Component({
  selector: 'app-board',
  imports: [Dialog],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements AfterViewInit {
  @ViewChild('boardEl') boardEl!: ElementRef;
  readonly game = inject(GameService);
  readonly showDialog = signal(sessionStorage.getItem('dialogAccepted') !== 'true');

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

  closeDialog() {
    this.showDialog.set(false);
    this.boardEl.nativeElement.focus();
  }

  acceptDialog() {
    sessionStorage.setItem('dialogAccepted', 'true');
    this.closeDialog();
  }

  ngAfterViewInit() {
    if (!this.showDialog()) {
      this.boardEl.nativeElement.focus();
    }
  }
}
