export type AuthorConfig = {
  name: string;
  legalName: string;
};

export type User = {
  _id: string;
  name: string;
  typ: string;
  roles: string[];
};

export type Mode = 'dark' | 'light' | '';

export type StateChild = {
  id: string;
  name: string;
  type: string;
};

export type State = StateChild[];

export type ZodParseResponse<T = any> = {
  validationError: ValidationErrors | null;
  result: T | null; // T represents the expected output type
};

export type ParseResult = {
  path: string;
  message: string;
};
export type ValidationError = {
  value: ParseResult;
};

export type ValidationErrors = ValidationError[];

export type FilterConditions = 'equal' | 'not equal';
export type FilterConditionsNumeric = 'greater than' | 'less than';

export type ColumnFilter = {
  id: string;
  filters: ColumnFilterValue[];
};

export type ColumnFilterValue = {
  condition: FilterConditions | FilterConditionsNumeric;
  value: string | number;
};

export type InsertedResult = {
  insertedId: {
    $oid: string;
  };
};

export type TargetAssignment = {
  _id: string;
  name: string;
  interfaceOption?: string;
};

export type RunHistory = {
  id: string;
  dt: Date;
};

export type StageHistory = {
  nodes: Array<RunHistory>;
  edges: Array<RunHistory>;
};

export type CreateNewRuntimeResponse = {
  commited: boolean;
  purge: boolean;
  error?: string;
  logic_id?: string;
  processing_time?: string;
  stage_id?: string;
  stage_type?: string;
  target_assignment: TargetAssignment;
  _id: string;
};

export type Runtime = {
  _id?: string;
  logicId: string;
  logicName: string;
  error: string | null;
  version: string;
  runtimeSequenceId: string;
  subProcessTriggerId?: string | null;
  subProcessId?: string | null;
  parentId?: string | null;
  stageId?: string;
  nextStageId?: string;
  status?: string;
  parentProcessId?: string;
  stageType?: string;
  nextStageType?: string;
  context: any;
  targetAssignment?: TargetAssignment;
  stageHistory: Array<StageHistory>;
  createdBy: string;
  createdData: Date;
  updatedBy: string;
  updatedDate: Date;
  end_time?: number;
  start_time?: number;
  forcedState?: null | boolean;
  lock: null | string;
  runtimeHistory: StageHistory;
  triggerItems: null;
};

export type Task = {
  _id: string;
  start_time: null;
  end_time: number | null;
  lock: boolean | null;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
  error: string | null;
  version: string;
  logicId: string;
  logicName: string | null;
  runtimeSequenceId: string;
  stageId?: string;
  status?: string;
  stageType?: string;
  context: any;
  targetAssignment?: TargetAssignment;
  triggerItems: null;
};

export type Comment = {
  id: string;
  date: Date;
  decision: string;
  name: string;
  step: string;
  comment: string;
  type: string;
};

export type Ref = {
  _id?: string;
  name?: string;
};

export type StepInfoSidebar = { id: string; label: string };

export type StageInfoSidebar = {
  id: string;
  label: string;
  current?: boolean;
  executed?: boolean;
  steps: StepInfoSidebar[];
};
