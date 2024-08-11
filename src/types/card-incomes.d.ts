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
}

interface ICardDetailOptions {
  onClickEdit: (index: IClientIndex, income: IIncome) => void;
  onClickDelete: (index: IClientIndex, on: IClientOn) => void;
}
