export class HexagonPositioningService {
  private static HEXAGON_UPPER_PART_PER_TOTAL_HEIGHT = 140 / 561;
  private static HEXAGON_WIDTH_PER_HEIGHT = 480 / 561;

  public static getTilePositioning(x: number, y: number, tileWidth: number = 128, border: number = 4): [number, number] {
    const isEvenY = y % 2 == 0;
    const tileHeight = this.getHeight(tileWidth);

    const xPosition = y * (tileHeight + border - this.getUpperPartHeight(tileWidth));
    const yPosition = x * (tileWidth + border) + (isEvenY ? - 2 : tileWidth / 2);

    return [xPosition, yPosition];
  }

  public static getHitboxRectangleMetrics(tileWidth: number = 128): [number, number] {
    const w = tileWidth;
    const h = this.getHeight(tileWidth) * (1 - 2 * this.HEXAGON_UPPER_PART_PER_TOTAL_HEIGHT);

    return [w, h];
  }

  public static getUpperPartHeight(tileWidth: number = 128): number {
    return this.getHeight(tileWidth) * this.HEXAGON_UPPER_PART_PER_TOTAL_HEIGHT;
  }

  public static getHeight(tileWidth: number = 128): number {
    return tileWidth / this.HEXAGON_WIDTH_PER_HEIGHT;
  }

  public static getNeighbourHexagonsCoordinates(x: number, y: number): Array<{x: number, y: number}> {
    const unEvenOffset = y % 2 === 1 ? 1 : 0;

    return [
      { x: x - 1 + unEvenOffset, y: y - 1  },
      { x: x + unEvenOffset, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1 + unEvenOffset, y: y + 1 },
      { x: x + unEvenOffset, y: y + 1 }
    ]
  }
}