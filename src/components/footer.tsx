'use client';

import { cn } from 'util/index';
import { useMode } from './provider/mode';
import type { AuthorConfig } from 'types/index';
import Logo_dark from '../assets/logo_dark.svg';
import Logo_light from '../assets/logo_light.svg';

const Footer = () => {
  const { mode } = useMode();

  return (
    <footer className={cn('flex flex-col items-center self-stretch py-4')} id="footer">
      <div className="flex h-10 items-center justify-between gap-4 self-stretch lg:flex-row">
        {mode === 'dark' ? (
          <img src={Logo_dark} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
        ) : (
          <img src={Logo_light} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
        )}
        <div className="flex h-10 flex-col justify-end gap-1 text-xs">
          <p className="text-body font-light">Powered by {authorConfig.legalName}</p>
          <p className="text-body font-light">Developed by Insert Logic AS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const authorConfig: AuthorConfig = {
  name: 'Insert Logic AS',
  legalName: 'Orchestr8',
};
