'use client';

import { Button } from '@insertlogic/o8-lib';
import { cn } from 'util/index';

interface ActionAreaButtons {
  isWithdrawPossible?: boolean;
  onWithdrawn?: () => void;
  onsubmit: () => void;
  onCancel: () => void;
}

export const ActionAreaButtons = ({ onsubmit, onWithdrawn, onCancel, isWithdrawPossible }: ActionAreaButtons) => {
  return (
    <div className="bg-card flex flex-row items-center justify-end self-stretch rounded-xl border px-4 py-4 lg:px-6">
      <div
        className={cn(isWithdrawPossible ? 'flex flex-1 items-start justify-between' : 'items-start justify-between')}>
        {isWithdrawPossible && (
          <div className="flex items-start">
            <Button variant="outline" type="submit" onClick={onWithdrawn} className="flex items-start rounded-lg">
              Withdraw
            </Button>
          </div>
        )}
        <div className="flex items-start gap-3">
          <Button variant="outline" type="reset" className="flex items-start rounded-lg" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="flex items-start rounded-lg" onClick={onsubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
