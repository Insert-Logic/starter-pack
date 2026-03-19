import { cn, useMode } from '@insertlogic/o8-lib';
import Logo_dark from '../assets/logo_dark_mode.svg';
import Logo_light from '../assets/logo_light_mode_full.png';

export const Footer = () => {
  const { mode } = useMode();

  return (
    <footer className={cn('flex flex-col items-center self-stretch py-4')} id="footer">
      <div className="flex h-10 items-center justify-between gap-4 self-stretch lg:flex-row">
        <img src={mode === 'dark' ? Logo_dark : Logo_light} alt="Logo" style={{ width: 'auto', height: '60px' }} />
        <div className="flex h-10 flex-col justify-end gap-1 text-xs">
          <p className="text-body font-light">Powered by Orchestr8</p>
          <p className="text-body font-light">Developed by Insert Logic AS</p>
        </div>
      </div>
    </footer>
  );
};
