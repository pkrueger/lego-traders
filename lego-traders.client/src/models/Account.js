export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.nickname = data.nickname
    this.desc = data.desc
    this.userTheme = data.userTheme
    // TODO add additional properties if needed
  }
}
