export class DynamicTableButton {
  name: string;
  icon: string;
  color: "primary" | "accent" | "warn" | undefined;

  constructor(
    name: string,
    icon: string,
    color?: "primary" | "accent" | "warn"
  ) {
    this.name = name;
    this.icon = icon;
    this.color = color;
  }
}