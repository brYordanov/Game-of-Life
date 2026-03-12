import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { Pattern } from './patterns.service';

describe('GameService', () => {
  let service: GameService;

  const ROWS = 40;
  const COLS = 60;

  const idx = (row: number, col: number) => row * COLS + col;

  function setAlive(...indices: number[]) {
    const grid = new Array<boolean>(ROWS * COLS).fill(false);
    indices.forEach((i) => (grid[i] = true));
    service.grid.set(grid);
    service.generationCount.set(0);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    vi.useFakeTimers();
  });

  afterEach(() => {
    service.pause();
    vi.useRealTimers();
  });

  // controll logic
  describe('play', () => {
    it('is idempotent — calling twice does not stack intervals', () => {
      service.play();
      service.play();
      vi.advanceTimersByTime(400);
      expect(service.generationCount()).toBe(1);
    });

    it('advances generations on each interval tick', () => {
      service.play();
      vi.advanceTimersByTime(800);
      expect(service.generationCount()).toBe(2);
    });
  });

  describe('pause', () => {
    it('stops the tick interval', () => {
      service.play();
      service.pause();
      vi.advanceTimersByTime(2000);
      expect(service.generationCount()).toBe(0);
    });
  });

  describe('reset', () => {
    it('clears grid, cursor, generation count and pauses', () => {
      service.play();
      service.setCell(0, true);
      service.moveCursor('right');
      service.tick();
      service.reset();
      expect(service.grid().every((c) => !c)).toBe(true);
      expect(service.cursorIndex()).toBe(service.midIndex());
      expect(service.generationCount()).toBe(0);
      expect(service.isRunning()).toBe(false);
    });
  });

  // game rules
  describe('tick', () => {
    it('dead cell with 3 neighbors becomes alive', () => {
      setAlive(idx(4, 4), idx(4, 5), idx(4, 6));
      service.tick();
      expect(service.grid()[idx(5, 5)]).toBe(true);
    });

    it('live cell with 2 or 3 neighbors survives', () => {
      const target = idx(5, 5);
      setAlive(target, idx(4, 4), idx(4, 5));
      service.tick();
      expect(service.grid()[target]).toBe(true);
    });

    it('live cell with fewer than 2 neighbors dies', () => {
      const target = idx(5, 5);
      setAlive(target, idx(4, 4));
      service.tick();
      expect(service.grid()[target]).toBe(false);
    });

    it('live cell with more than 3 neighbors dies', () => {
      const target = idx(5, 5);
      setAlive(target, idx(4, 4), idx(4, 5), idx(4, 6), idx(5, 4));
      service.tick();
      expect(service.grid()[target]).toBe(false);
    });

    it('blinker oscillates (vertical → horizontal → vertical)', () => {
      const top = idx(19, 30),
        mid = idx(20, 30),
        bot = idx(21, 30);
      setAlive(top, mid, bot);

      service.tick();
      expect(service.grid()[top]).toBe(false);
      expect(service.grid()[bot]).toBe(false);
      expect(service.grid()[idx(20, 29)]).toBe(true);
      expect(service.grid()[mid]).toBe(true);
      expect(service.grid()[idx(20, 31)]).toBe(true);

      service.tick();
      expect(service.grid()[top]).toBe(true);
      expect(service.grid()[mid]).toBe(true);
      expect(service.grid()[bot]).toBe(true);
    });
  });

  // cursor navigation logic
  describe('moveCursor', () => {
    it('wraps up from first row to last row', () => {
      service.cursorIndex.set(idx(0, 15));
      service.moveCursor('up');
      expect(service.cursorIndex()).toBe(idx(ROWS - 1, 15));
    });

    it('wraps down from last row to first row', () => {
      service.cursorIndex.set(idx(ROWS - 1, 15));
      service.moveCursor('down');
      expect(service.cursorIndex()).toBe(idx(0, 15));
    });

    it('wraps left from first column to last column', () => {
      service.cursorIndex.set(idx(10, 0));
      service.moveCursor('left');
      expect(service.cursorIndex()).toBe(idx(10, COLS - 1));
    });

    it('wraps right from last column to first column', () => {
      service.cursorIndex.set(idx(10, COLS - 1));
      service.moveCursor('right');
      expect(service.cursorIndex()).toBe(idx(10, 0));
    });
  });

  // cycle through speeds
  describe('cycleSpeedSetting', () => {
    it('increments speedIndex and wraps around', () => {
      service.cycleSpeedSetting();
      expect(service.speedIndex()).toBe(3);

      service.speedIndex.set(service.speedSteps.length - 1);
      service.cycleSpeedSetting();
      expect(service.speedIndex()).toBe(0);
    });

    it('restarts the interval at the new speed if running', () => {
      service.play();
      service.cycleSpeedSetting(); // 2→3 (2x), interval = 200ms
      vi.advanceTimersByTime(200);
      expect(service.generationCount()).toBe(1);
    });
  });

  // load preset pattern
  describe('loadPattern', () => {
    function makePattern(cells: boolean[], width: number, height: number): Pattern {
      return { _id: 'test', name: 'test', description: '', cells, width, height };
    }

    it('centers the pattern on the grid', () => {
      const cells = [true, false, true, false, true, false, true, false, true];
      service.loadPattern(makePattern(cells, 3, 3));
      const startRow = Math.floor((ROWS - 3) / 2); // 18
      const startCol = Math.floor((COLS - 3) / 2); // 28
      expect(service.grid()[idx(startRow, startCol)]).toBe(true); // top-left
      expect(service.grid()[idx(startRow, startCol + 1)]).toBe(false); // top-mid
      expect(service.grid()[idx(startRow + 1, startCol + 1)]).toBe(true); // center
      expect(service.livingCellCount()).toBe(5);
    });

    it('replaces previous grid, resets generation, pauses', () => {
      service.play();
      service.setCell(0, true);
      service.tick();
      service.loadPattern(makePattern([true], 1, 1));
      expect(service.grid()[0]).toBe(false);
      expect(service.generationCount()).toBe(0);
      expect(service.isRunning()).toBe(false);
    });
  });
});
