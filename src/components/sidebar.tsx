'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Badge,Collapsible, CollapsibleContent, CollapsibleTrigger,Label,Separator } from '@insertlogic/o8-lib';
import Icon from './icons';
import type { StageInfoSidebar } from 'types/index';
import { updateStages, cn } from 'util/index';

interface SidebarStatus {
  drawerOpen: boolean;
  interfaceOption: string;
  stages: StageInfoSidebar[];
}

interface SidebarStatusItem {
  stage: StageInfoSidebar;
  drawerOpen: boolean;
  index: number;
}

interface Sidebar {
  stages: StageInfoSidebar[];
  interfaceOption: string;
  DetailsComponent: React.ComponentType<{ data: any; drawerOpen: boolean }>;
  data: any;
  DetailsComponentMobile: React.ComponentType<{ data: any; drawerOpen: boolean }>;
}

type CollapseHandleProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarStatusItem = ({ drawerOpen, stage, index }: SidebarStatusItem) => {
  return (
    <div className={cn('flex flex-row items-center gap-2 self-stretch', !drawerOpen && 'justify-center')}>
      {stage.executed ? (
        <Badge variant="success" className="text-body h-7 w-7 items-center justify-center gap-2.5 p-1.5">
          <Icon name='Check' size={16} className="border-transparent" />
        </Badge>
      ) : (
        <Badge variant="secondary" className="h-7 w-7 items-center justify-center gap-2.5 p-1.5">
          <p className="text-body">{index}</p>
        </Badge>
      )}
      {drawerOpen && (
        <label
          className={cn(
            stage.executed ? 'text-ring italic' : null,
            stage.current ? 'bg-overlay10 w-full' : 'null',
            'py-1 pl-2',
          )}>
          {stage.label}
        </label>
      )}
    </div>
  );
};

const SidebarStatus = ({ drawerOpen, interfaceOption, stages}: SidebarStatus) => {
  const updatedStages = updateStages(interfaceOption, stages);

  return (
    <div className={cn('flex h-auto w-full grow flex-col items-start gap-5 self-stretch')}>
      {drawerOpen && (
        <div>
          <p className="text-sm leading-5 font-semibold">Stages</p>
        </div>
      )}
      {updatedStages.map((item, index) => (
        <SidebarStatusItem key={index} stage={item} index={index + 1} drawerOpen={drawerOpen} />
      ))}
    </div>
  );
};

const CollapseHandle = ({ drawerOpen, setDrawerOpen }: CollapseHandleProps) => {
  return (
    <button
      className="flex items-center justify-center gap-2 self-stretch"
      onClick={() => setDrawerOpen(open => !open)}>
      {drawerOpen ? (
        <Icon name='ChevronFirst' className="text-on-sidebar h-5 w-5" />
      ) : (
        <Icon name='ChevronLast' className="text-on-sidebar h-5 w-5" />
      )}
    </button>
  );
};

const Sidebar = ({ interfaceOption, DetailsComponent, DetailsComponentMobile, data,stages }: Sidebar) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'bg-sidebar hidden h-auto w-[100px] shrink-0 grow items-start gap-4 self-stretch p-6 lg:flex lg:flex-col',
          drawerOpen && 'w-[300px]',
        )}>
        <div className={cn('flex flex-row items-center justify-between self-stretch', !drawerOpen && 'justify-center')}>
          {drawerOpen && (
            <div className="flex flex-col">
              <Label className='font-bold text-lg leading-5'>Case Details</Label>
            </div>
          )}
          <CollapseHandle drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </div>
        <aside className={cn('flex w-full grow flex-col gap-4 self-stretch')}>
          <DetailsComponent drawerOpen={drawerOpen} data={data} />
          <Separator className={cn('')} />
          <SidebarStatus drawerOpen={drawerOpen} interfaceOption={interfaceOption} stages={stages} />
        </aside>
      </div>
      {/* Mobile Layout */}
      <div className="bg-sidebar fixed bottom-0 z-100 flex h-auto w-full shrink-0 grow flex-col rounded-lg px-6 py-4 lg:hidden">
        <Collapsible open={open} onOpenChange={setOpen} className="">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col">
              <h1 className="text-header text-display-ml font-medium">sidebar title</h1>{' '}
            </div>
            <CollapsibleTrigger asChild className="items-end">
              <button className="IconButton">{open ? <Icon name='ChevronDown' /> : <Icon name='ChevronUp' />}</button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex w-full flex-col gap-4 self-stretch border-t p-6">
            <DetailsComponentMobile drawerOpen={drawerOpen} data={data} />
            <Separator className={cn('my-6')} />
            <SidebarStatus drawerOpen={open} interfaceOption={interfaceOption} stages={stages} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

export default Sidebar;
