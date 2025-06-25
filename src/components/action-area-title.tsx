type ActionAreaTitle = {
  title: string;
  caseId: string;
  hasParent: boolean;
  parentInfo?: { id: string; interfaceOption: string; runtimeId: string };
};

export const ActionAreaTitle = ({ caseId, title, hasParent, parentInfo }: ActionAreaTitle) => {
  return (
    <div className="flex w-full flex-row justify-between pt-8">
      <div className="flex flex-col items-start">
        <h1 className="text-display-sm font-medium">{title}</h1>
        <div className="flex flex-row">
          <p className="text-header pr-1">Task</p>
          <p className="text-primary font-semibold">{caseId}</p>
          {hasParent && parentInfo !== undefined && (
            <p className="text-primary-120 pl-3 font-semibold">
              <a href={`/${parentInfo.interfaceOption}?id=${parentInfo?.id}`}>
                (Go to parent task {parentInfo.runtimeId + ' ' + parentInfo.interfaceOption})
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
