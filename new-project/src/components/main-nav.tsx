'use client';

import NavigationLink from './navigation-link';
import Logo_dark from '../assets/logo_dark.svg';
import Logo_light from '../assets/logo_light.svg';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@insertlogic/o8-lib';
import Icon from './icons';
import ThemeChanger from './theme-changer';
import { useMode } from './provider/mode';

const SettingsMenuContent = () => {
  return (
    <DropdownMenuContent className="w-32">
      <DropdownMenuLabel>Settings</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Icon name="LogOut" className="mr-2 h-4 w-4" />
        <a href="/.auth/logout">Sign out</a>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex flex-row justify-between">
        <NavigationLink href="/api/redirect?target=o8" className="flex flex-row items-center">
          <Icon name="MoveRight" className="mr-2 size-4" />
          <span>Orchestr8</span>
        </NavigationLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

const MainNav = () => {
  const { mode } = useMode();

  return (
    <div className="my-2 flex h-10 w-full flex-row items-center self-stretch" id="navbar">
      <div className="flex w-full flex-row items-center gap-4 space-x-2">
        <NavigationLink href={'/'} className={''}>
          {mode === 'dark' ? (
            <img src={Logo_dark} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
          ) : (
            <img src={Logo_light} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
          )}
        </NavigationLink>
      </div>
      <div className="flex flex-row items-center gap-4">
        <ThemeChanger color="on-card" />
        <div data-orientation="vertical" role="none" className="bg-border h-6 w-[2px] shrink-0 py-2"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Icon name="Settings" size={20} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <SettingsMenuContent />
        </DropdownMenu>
      </div>
    </div>
  );
};

MainNav.displayName = 'MainNav';

export { MainNav };
