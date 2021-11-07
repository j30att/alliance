export class User {
  constructor(
    public id: number = 0,
    public email: string = '',
    public phone: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public patronymic: string = '',
    public organization: string = '',
    public position: string = '',
    public avatar: string = '') {
  }

  public get formattedName(): string {
    let result = ''

    if (this.lastName.length > 0) {
      result += this.capitalizeFirstLetter(this.lastName)

      if (this.firstName.length > 0)
        result += ` ${this.firstName.charAt(0).toUpperCase()}. `

      if (this.patronymic.length > 0)
        result += ` ${this.patronymic.charAt(0).toUpperCase()}.`

      return result
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static fromJSON(d: Object): User {
    return Object.assign(new User(), d);
  }

}