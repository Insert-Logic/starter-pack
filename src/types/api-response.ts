type MongoId = {
  $oid: string;
};

export type TargetAssignment = {
  _id: string;
  name: string;
  interfaceOption?: string;
};

export type CreateNewRuntimeResponse = {
  commited: boolean;
  purge: boolean;
  error?: string;
  context?: any;
  logic_id?: string;
  processing_time?: string;
  stage_id?: string;
  stage_type?: string;
  target_assignment: TargetAssignment;
  _id: string;
};

export type TargetAssignmentRuntimeByState = { workQueue: string; interfaceOption: string };

export type RuntimeByStateResponse = {
  _id: MongoId;
  logicId: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  endTime: number | null;
  lock: string | null;
  runtimeSequenceId: string;
  startTime: number;
  status: string;
  targetAssignment?: TargetAssignmentRuntimeByState;
  trigger?: RuntimeTrigger;
  triggerItems?: Trigger[];
  context?: {};
};

export type RuntimeTriggerConfig = {
  triggerId: string;
  logicId: string;
  nodeId: string;
};

export type RuntimeTrigger = {
  [K in TriggerVariant]: { [P in K]: RuntimeTriggerConfig };
}[TriggerVariant];

export type TriggerVariant = 'parallel' | 'parent' | 'extension' | 'fireandforget' | 'race';

//Trigger collection
export type Trigger = {
  runtimeId: string;
  triggerRuntimeId: string;
  logicId: string;
  triggerLogicId: string;
  variant: TriggerVariant;
  status: string;
  stageType: string;
  workQueue: string | null;
};
