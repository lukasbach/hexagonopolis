export default class UrlRoutingService {
  public static setCampaign(id: string) {
    window.location.hash = `${id}`;
  }

  public static setLevel(levelId: string, campaignId?: string) {
    const capamignIdSure = campaignId || this.getCampaign() || '-';

    window.location.hash = `${capamignIdSure}/${levelId}`;
  }

  public static getCampaign() {
    if (window.location.hash !== '' && !!this.getPieces()[0] && this.getPieces()[0] !== '-') {
      return this.getPieces()[0];
    }
  }

  public static getLevel() {
    if (window.location.hash !== '' && !!this.getPieces()[1]) {
      return this.getPieces()[1];
    }
  }

  private static getPieces() {
    const pieces = window.location.hash.split('/');
    console.log(pieces);
    return pieces;
  }
}