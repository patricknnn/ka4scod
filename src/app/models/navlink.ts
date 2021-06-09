export class Navlink {
  constructor(
    public text: string,
    public icon: string,
    public routerLink: string,
    public children?: Navlink[],
  ) { }
}