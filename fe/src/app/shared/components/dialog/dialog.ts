import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  @Output() accept = new EventEmitter();
  @Output() close = new EventEmitter();
}
