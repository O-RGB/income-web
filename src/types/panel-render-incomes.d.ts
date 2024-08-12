interface IPanelIncomes
  extends IPanelAction,
    IPanelParams,
    IPanelMain,
    IPanelFilter,
    Omit<IPanelValue, "indexEditing" | "countDraft"> {
  incomesFilter?: IIncomeFilter[];
}
interface IPanelRender
  extends IPanelParams,
    IPanelMain,
    IPanelFilter,
    Omit<IPanelValue, "firstIndexSheets"> {
  functions?: IClientActionIncomes;
  headForm: FormInstance<any>;
  incomesLocal?: IIncome[];
  incomesFilter?: IIncomeFilter[];
}

type TMainProps = Omit<IPanelValue, "firstIndexSheets"> &
  Pick<IPanelMain, "loading"> &
  IPanelFilter;

type TCardIncome = Omit<
  ICardIncomeListProps,
  "disabled" | "lockAction" | "itemIndex" | "income"
>;

interface IPanelMoveProps extends TMainProps {
  cardIncome: TCardIncome;
  draggable: IPanelDraggable;
  removeDraggable?: boolean;
}

interface IPanelOptions
  extends IPanelValue,
    Omit<IPanelMain, "incomesLocal" | "version">,
    IPanelFilter {
  speedDialProps: SpeedDialProps;
  headForm?: FormInstance<any>;
  onMoving?: boolean;
  handle?: Partial<IClientHandle>;
  disabled?: boolean;
  onSaveItemMoveIndex?: () => void;
}

interface IPanelValue {
  countDraft: number;
  firstIndexSheets?: number;
  indexEditing: number[];
}

interface IPanelFilter {
  onFilterCategory?: boolean;
  onCalculator?: boolean;
  dateSelect: Date;
}

interface IPanelMain {
  incomes: IIncome[];
  loading: ILoading;
  incomesLocal: IIncome[];
  version?: string;
}

interface IPanelParams {
  master: IMasterDataImcomes;
  Set: ICSet;
}

interface IPanelAction {
  onSelectDate: (date: Date) => void;
  onClickSetting?: () => void;
  onClickCategory?: (typeId?: string) => void;
}

interface IPanelDraggable {
  incomes: IIncome[];
  className?: string;
  onMoving?: boolean;
  renderItem?: (node: IIncome, index: number) => React.ReactNode;
  onItemMoveing?: (incomeUpdate: IIncome[]) => void;
}
