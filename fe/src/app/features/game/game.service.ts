import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly rows = 40;
  readonly cols = 60;
  readonly speedSteps = [0.25, 0.5, 1, 2, 4, 8];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly grid = signal(this.emptyGrid());
  readonly midIndex = computed(
    () => Math.floor(this.rows / 2) * this.cols + Math.floor(this.cols / 2),
  );
  readonly cursorIndex = signal(this.midIndex());
  readonly speedIndex = signal(2);

  readonly speedMultiplier = computed(() => this.speedSteps[this.speedIndex()]);
  readonly intervalMs = computed(() => 400 / this.speedMultiplier());

  readonly isRunning = signal(false);

  play() {
    if (this.isRunning()) return;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => this.tick(), this.intervalMs());
  }

  pause() {
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.pause();
    this.grid.set(this.emptyGrid());
    this.cursorIndex.set(this.midIndex());
  }

  tick() {
    this.grid.update((grid) => {
      return grid.map((_, i) => {
        const neightbors = this.countNeighbors(grid, i);
        const isCurrentElAlive = grid[i];

        if (isCurrentElAlive) {
          return neightbors === 2 || neightbors === 3;
        }
        return neightbors === 3;
      });
    });
  }

  toggleCell(index: number) {
    this.grid.update((g) => {
      const newGrid = [...g];
      newGrid[index] = !newGrid[index];
      return newGrid;
    });
    this.cursorIndex.set(index);
  }

  toggleCursor() {
    this.toggleCell(this.cursorIndex());
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

  cycleSpeedSetting() {
    this.speedIndex.update((i) => (i + 1) % this.speedSteps.length);
    if (this.isRunning()) {
      this.pause();
      this.play();
    }
  }

  private emptyGrid(): boolean[] {
    return new Array(this.rows * this.cols).fill(false);
  }

  private countNeighbors(grid: boolean[], index: number): number {
    const row = Math.floor(index / this.cols);
    const col = index % this.cols;
    let count = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const isTargetedEl = rowOffset === 0 && colOffset === 0;
        if (isTargetedEl) continue;

        const currentElRow = row + rowOffset;
        const currentElCol = col + colOffset;

        const isOutOfBounds =
          currentElCol < 0 ||
          currentElRow < 0 ||
          currentElRow > this.rows ||
          currentElCol > this.cols;

        if (isOutOfBounds) continue;

        const currentElFlatArrIndex = currentElRow * this.cols + currentElCol;
        if (grid[currentElFlatArrIndex]) count++;
      }
    }

    return count;
  }
}
