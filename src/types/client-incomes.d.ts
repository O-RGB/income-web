// Main Interface
type IClientOn = "SERVER" | "CLIENT";

interface IClientToServer {
  dateSelect?: Date;
  server?: ICSet;
}

interface IClientAntdForm {
  headForm?: FormInstance<any>;
}

interface IClientIndex {
  sheetsIndex?: number;
  listIndex?: number;
}

interface IClientIncomeParams {
  income?: IIncome;
  incomes?: IIncome[];
}

// Generate Params Event Interface
interface IClientSelectEdit
  extends IClientAntdForm,
    Omit<IClientIncomeParams, "incomes"> {
  onSave?: boolean;
}

interface IClientSaveEdit
  extends Omit<IClientToServer, "dateSelect">,
    IClientAntdForm {}

interface IClientDelete extends IClientToServer {}

// Event
interface IClientEventIncomes {
  onSelectEdit: (index: IClientIndex, params?: IClientSelectEdit) => void;
  onSaveEdit: (index: IClientIndex) => void;
  onExitEdit: (index: IClientIndex) => void;
  onDelete: (index: IClientIndex) => void;
}

// Generate Params Handle Fucntion Interface
interface IClientAddDraft extends Omit<IClientToServer, "server"> {}

// Handle Fucntion
interface IClientHandle {
  handleFetchingDraft: () => Promise<IIncome[]>;
  handleClientDraft: (params: IClientAddDraft) => void;
}

// Generate Params Action to Server Interface
interface IClientToAddIncome
  extends Omit<IClientIncomeParams, "income">,
    IClientToServer {}
interface IClientToMoveIncome
  extends IClientToServer,
    Omit<IClientIncomeParams, "income"> {}

interface IClientToEditIncome extends IClientToServer, IClientAntdForm {}

// Action to server
interface IClientActionToServer {
  setServerEdit?: (index: IClientIndex, params: IClientToEditIncome) => void;
  setServerAdd: (params: IClientToAddIncome) => Promise<
    {
      index: number;
      result: boolean;
    }[]
  >;
  setServerMoveIndex: (params: IClientToMoveIncome) => Promise<void>;
  setServerDelete: (index: IClientIndex, params: IClientToServer) => void;
}

// Fuction Of Client
interface IClientActionIncomes {
  event: Partial<IClientEventIncomes>;
  handle: Partial<IClientHandle>;
  action: Partial<IClientActionToServer>;
}

//...
interface IClientValue {
  countDraft: number;
  firstIndexSheets: number;
  indexEditing: number[];
}
