'use client';

import Icon from './icons';
import { useMode } from './provider/mode';
import { cn } from 'util/index';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@insertlogic/o8-lib';

const ThemeChanger = ({ color }: { color: string }) => {
  const { mode, setMode } = useMode();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center gap-2 px-1 py-1">
              <button
                type="button"
                className="cursor-pointer hover:bg-inherit"
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
                {mode === 'dark' ? (
                  <Icon name="Sun" className={cn('h-6 w-6', `text-${color}`)} />
                ) : (
                  <Icon name="Moon" className={cn('h-6 w-6', `text-${color}`)} />
                )}
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-primary">
            <p className="">Change theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ThemeChanger;
