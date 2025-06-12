export type User = {
  _id: string;
  name: string;
  typ: string;
  roles: string[];
};

export type Mode = 'dark' | 'light' | '';

export type ZodParseResponse<T = any> = {
  validationError: ValidationErrors | null;
  result: T | null;
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