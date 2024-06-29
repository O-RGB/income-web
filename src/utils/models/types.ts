export class IncomeTypesModel implements IIncomeTypes {
  rowIndex: number;
  typeId: string;
  name: string;
  color: string;
  icons: string;

  public constructor(
    rowIndex: number,
    typeId: string,
    name: string,
    color: string,
    icons: string
  ) {
    this.rowIndex = rowIndex;
    this.typeId = typeId;
    this.icons = icons;
    this.color = color;
    this.name = name;
  }

  public getTypes(): IIncomeTypes {
    return {
      rowIndex: this.rowIndex,
      typeId: this.typeId,
      name: this.name,
      color: this.color,
      icons: this.icons,
    };
  }
}
