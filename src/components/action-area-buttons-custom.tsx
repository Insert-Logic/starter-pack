import { Button } from '@insertlogic/o8-lib';
import { cn } from 'util/index';

export interface ActionAreaButtons {
  isWithdrawPossible?: boolean;
  onWithdrawn?: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  className?: string;
}

export const ActionAreaButtons: React.FC<ActionAreaButtons> = ({
  onSubmit,
  onWithdrawn,
  onCancel,
  isWithdrawPossible,
  className,
}: ActionAreaButtons) => {
  return (
    <div
      className={cn(
        'bg-card flex flex-row items-center justify-end self-stretch rounded-xl border px-4 py-4 lg:px-6',
        className,
      )}>
      <div
        className={cn(isWithdrawPossible ? 'flex flex-1 items-start justify-between' : 'items-start justify-between')}>
        {isWithdrawPossible && (
          <div className="flex items-start">
            <Button variant="outline" type="submit" onClick={onWithdrawn} className="flex items-center rounded-lg p-4">
              Withdraw
            </Button>
          </div>
        )}
        <div className="flex items-start gap-3">
          <Button variant="outline" type="reset" className="flex items-center rounded-lg p-4" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="flex items-center rounded-lg p-4" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
