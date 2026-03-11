import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly rows = 40;
  readonly cols = 60;

  readonly grid = signal(this.emptyGrid());
  readonly midIndex = computed(
    () => Math.floor(this.rows / 2) * this.cols + Math.floor(this.cols / 2),
  );
  readonly cursorIndex = signal(this.midIndex());

  constructor() {
    console.log(this.midIndex());
  }

  toggle(index: number) {
    this.grid.update((g) => {
      const newGrid = [...g];
      newGrid[index] = !newGrid[index];
      return newGrid;
    });
    this.cursorIndex.set(index);
  }

  toggleCursor() {
    this.toggle(this.cursorIndex());
  }

  moveCursor(dir: 'up' | 'down' | 'left' | 'right') {
    const i = this.cursorIndex();
    const row = Math.floor(i / this.cols);
    const col = i % this.cols;

    let next = i;
    switch (dir) {
      case 'up':
        next = row > 0 ? i - this.cols : i + this.cols * (this.rows - 1);
        break;
      case 'down':
        next = row < this.rows - 1 ? i + this.cols : i - this.cols * (this.rows - 1);
        break;
      case 'left':
        next = col > 0 ? i - 1 : i + (this.cols - 1);
        break;
      case 'right':
        next = col < this.cols - 1 ? i + 1 : i - (this.cols - 1);
        break;
    }

    this.cursorIndex.set(next);
  }

  private emptyGrid(): boolean[] {
    return new Array(this.rows * this.cols).fill(false);
  }
}
