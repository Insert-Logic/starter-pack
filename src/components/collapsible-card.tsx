'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Card,Collapsible, CollapsibleContent, CollapsibleTrigger } from '@insertlogic/o8-lib';
import Icon from './icons';

type CollapsibleCard = {
  title: string;
  description?: string;
  children: ReactNode;
  startOpen?: boolean;
};

export const CollapsibleCard = ({ title, description, children, startOpen }: CollapsibleCard) => {
  const [open, setOpen] = useState(startOpen);

  return (
    <Card className="bg-card flex w-full flex-col">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex flex-row items-center justify-between border-b p-6">
          <div className="flex flex-col">
            <h1 className="text-header text-display-ml font-medium">{title}</h1>
            <p className="text-subtitle text-sm font-medium">{description}</p>
          </div>
          <CollapsibleTrigger asChild className="items-end">
            <button className="IconButton">{open ? <Icon name='ChevronUp' /> : <Icon name='ChevronDown' />}</button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
