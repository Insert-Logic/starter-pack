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

export type InsertedResult = {
  insertedId: {
    $oid: string;
  };
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
