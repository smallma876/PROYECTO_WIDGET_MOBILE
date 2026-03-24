import {
  addPointToPath,
  closePath,
  createEmptyPath,
  createSticker,
  Point,
} from '../../domain/entities/Sticker';

describe('Sticker Entity', () => {
  describe('createSticker', () => {
    it('should create a sticker with the given properties', () => {
      const sticker = createSticker({
        id: 'test-id',
        uri: '/path/to/sticker.png',
        thumbnailUri: '/path/to/thumb.png',
        width: 200,
        height: 300,
      });

      expect(sticker.id).toBe('test-id');
      expect(sticker.uri).toBe('/path/to/sticker.png');
      expect(sticker.thumbnailUri).toBe('/path/to/thumb.png');
      expect(sticker.width).toBe(200);
      expect(sticker.height).toBe(300);
      expect(sticker.createdAt).toBeInstanceOf(Date);
    });

    it('should set createdAt to current date', () => {
      const before = new Date();
      const sticker = createSticker({
        id: 'test-id',
        uri: '/path/to/sticker.png',
        thumbnailUri: '/path/to/thumb.png',
        width: 100,
        height: 100,
      });
      const after = new Date();

      expect(sticker.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(sticker.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});

describe('DrawingPath', () => {
  describe('createEmptyPath', () => {
    it('should create an empty path with no points', () => {
      const path = createEmptyPath();
      expect(path.points).toEqual([]);
      expect(path.isClosed).toBe(false);
    });
  });

  describe('addPointToPath', () => {
    it('should add a point to an empty path', () => {
      const path = createEmptyPath();
      const point: Point = { x: 10, y: 20 };
      const result = addPointToPath(path, point);

      expect(result.points).toHaveLength(1);
      expect(result.points[0]).toEqual({ x: 10, y: 20 });
      expect(result.isClosed).toBe(false);
    });

    it('should add multiple points sequentially', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });
      path = addPointToPath(path, { x: 10, y: 10 });

      expect(path.points).toHaveLength(3);
      expect(path.points[0]).toEqual({ x: 0, y: 0 });
      expect(path.points[1]).toEqual({ x: 10, y: 0 });
      expect(path.points[2]).toEqual({ x: 10, y: 10 });
    });

    it('should not add points to a closed path', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });
      path = addPointToPath(path, { x: 10, y: 10 });
      path = closePath(path);

      const result = addPointToPath(path, { x: 20, y: 20 });
      expect(result.points).toHaveLength(3);
      expect(result.isClosed).toBe(true);
    });

    it('should not mutate the original path', () => {
      const original = createEmptyPath();
      const modified = addPointToPath(original, { x: 5, y: 5 });

      expect(original.points).toHaveLength(0);
      expect(modified.points).toHaveLength(1);
    });
  });

  describe('closePath', () => {
    it('should close a path with 3 or more points', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });
      path = addPointToPath(path, { x: 10, y: 10 });

      const closed = closePath(path);
      expect(closed.isClosed).toBe(true);
      expect(closed.points).toHaveLength(3);
    });

    it('should not close a path with fewer than 3 points', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });

      const result = closePath(path);
      expect(result.isClosed).toBe(false);
    });

    it('should return the same path if already closed', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });
      path = addPointToPath(path, { x: 10, y: 10 });
      const closed = closePath(path);

      const result = closePath(closed);
      expect(result).toBe(closed);
    });

    it('should not close an empty path', () => {
      const path = createEmptyPath();
      const result = closePath(path);
      expect(result.isClosed).toBe(false);
    });

    it('should not mutate the original path', () => {
      let path = createEmptyPath();
      path = addPointToPath(path, { x: 0, y: 0 });
      path = addPointToPath(path, { x: 10, y: 0 });
      path = addPointToPath(path, { x: 10, y: 10 });

      const closed = closePath(path);
      expect(path.isClosed).toBe(false);
      expect(closed.isClosed).toBe(true);
    });
  });
});
