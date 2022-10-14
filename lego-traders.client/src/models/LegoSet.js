export class LegoSet {
  constructor(data) {
    this.id = data.id;
    this.ownerId = data.ownerId;
    this.set_num = data.set_num;
    this.num_parts = data.num_parts;
    this.name = data.name;
    this.year = data.year;
    this.theme_id = data.theme_id;
    this.set_img_url = data.set_img_url;
    this.isOwned = data.isOwned;
    this.isUpForTrade = data.isUpForTrade;
    this.owner = data.owner
  }
}
