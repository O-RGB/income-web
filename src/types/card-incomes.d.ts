type ICardSize = "default" | "small";

interface ICardIncomes
  extends Partial<IClientEventIncomes>,
    ICardDetailOptions {
  onCommentChange?: (income: IIncome, index: number) => void;
  onFocusChange?: (income: IIncome, focus: boolean) => void;
  closeExpanded: () => void;
}

interface ICardIncomesConfigs {
  focus?: boolean;
  moving?: boolean;
  disabled?: boolean;
  expanded: boolean;
  size?: ICardSize;
}

interface ICardDetailOptions {
  onClickEdit: (index: IClientIndex, income: IIncome) => void;
  onClickDelete: (index: IClientIndex, on: IClientOn) => void;
}

interface ICardIncomeListProps extends ICardIncomes, ICardIncomesConfigs {
  income: IIncome;
  itemIndex: number;
  lockAction: boolean;
  master: IMasterDataImcomes;
  icons?: IconsModelList;
}
