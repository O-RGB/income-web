export class IncomeTypesModel implements IIncomeTypes {
  typeId: string;
  name: string;
  relationship?: string[] | undefined;

  public constructor(
    typeId: string,
    name: string,
    relationship: string[] | undefined
  ) {
    this.typeId = typeId;
    this.relationship = relationship;
    this.name = name;
  }

  public getTypes(): IIncomeTypes {
    return {
      name: this.name,
      typeId: this.typeId,
      relationship: this.relationship,
    };
  }
}
