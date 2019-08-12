import {AssetSize} from "../types";

export class AssetService {
  public static getTileUrl(assetName: string, size: AssetSize = AssetSize.x4) {
    return this.getUrl(assetName, 'tile', size);
  }

  public static getObjectUrl(assetName: string, size: AssetSize = AssetSize.x4) {
    return this.getUrl(assetName, 'object', size);
  }

  private static getUrl(assetName: string, tileOrObject: 'tile' | 'object', size: AssetSize) {
    return `./assets/${tileOrObject === 'tile' ? 'tiles' : 'objects'}/${this.getSizeText(size)}/`
      + `${assetName}${this.getSizeFileSuffix(size)}${this.getFileEnding(size)}`;
  }

  private static isSvg(size: AssetSize) {
    return size === AssetSize.svg;
  }

  private static getSizeText(size: AssetSize) {
    switch (size) {
      case AssetSize.x4:
        return '4x';
      case AssetSize.x3:
        return '3x';
      case AssetSize.x2:
        return '2x';
      case AssetSize.x1:
        return '1x';
      case AssetSize.x1dot5:
        return '1.5x';
      case AssetSize.x0dot75:
        return '0.75x';
      case AssetSize.x0dot5:
        return '0.5x';
      case AssetSize.svg:
        return 'SVG';
    }
  }

  private static getSizeFileSuffix(size: AssetSize) {
    return this.isSvg(size) ? '' : '@' + this.getSizeText(size);
  }

  private static getFileEnding(size: AssetSize) {
    return this.isSvg(size) ? '.svg' : '.png';
  }
}