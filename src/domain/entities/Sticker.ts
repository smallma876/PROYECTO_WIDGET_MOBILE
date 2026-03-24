export interface Sticker {
  readonly id: string;
  readonly uri: string;
  readonly thumbnailUri: string;
  readonly createdAt: Date;
  readonly width: number;
  readonly height: number;
}

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface DrawingPath {
  readonly points: ReadonlyArray<Point>;
  readonly isClosed: boolean;
}

export interface FrameData {
  readonly uri: string;
  readonly width: number;
  readonly height: number;
}

export function createSticker(params: {
  id: string;
  uri: string;
  thumbnailUri: string;
  width: number;
  height: number;
}): Sticker {
  return {
    ...params,
    createdAt: new Date(),
  };
}

export function closePath(path: DrawingPath): DrawingPath {
  if (path.isClosed || path.points.length < 3) {
    return path;
  }
  return {
    points: path.points,
    isClosed: true,
  };
}

export function addPointToPath(path: DrawingPath, point: Point): DrawingPath {
  if (path.isClosed) {
    return path;
  }
  return {
    points: [...path.points, point],
    isClosed: false,
  };
}

export function createEmptyPath(): DrawingPath {
  return {
    points: [],
    isClosed: false,
  };
}
