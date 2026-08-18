//@logic-context
export type GetContextByIds = {
  ids: string[];
  items?: { _id: MongoId; context: any }[];
};

type MongoId = {
  $oid: string;
};
