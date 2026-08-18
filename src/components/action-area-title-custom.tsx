export type ActionAreaTitle = {
  title: string;
  caseId: string;
};

export const ActionAreaTitle: React.FC<ActionAreaTitle> = ({ caseId, title }: ActionAreaTitle) => {
  return (
    <div className="flex w-full flex-col items-start">
      <h1 className="text-display-sm font-medium">{title}</h1>
      <div className="flex flex-row">
        <p className="text-header pr-1">Task</p>
        <p className="text-primary font-semibold">{caseId}</p>
      </div>
    </div>
  );
};
