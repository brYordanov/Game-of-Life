import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly rows = 40;
  readonly cols = 60;

  readonly grid = signal(this.emptyGrid());

  toggle(index: number) {
    this.grid.update((g) => {
      const newGrid = [...g];
      newGrid[index] = !newGrid[index];
      return newGrid;
    });
  }

  private emptyGrid(): boolean[] {
    return new Array(this.rows * this.cols).fill(false);
  }
}
