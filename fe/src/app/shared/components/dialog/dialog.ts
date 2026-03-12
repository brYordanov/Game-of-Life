import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  @Input() showAccept = true;
  @Input() acceptLabel = '';
  @Output() accept = new EventEmitter();
  @Output() close = new EventEmitter();
}
