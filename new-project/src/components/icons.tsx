import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof LucideIcons;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = LucideIcons[name] as React.FC<LucideProps>;

  if (!LucideIcon) {
    console.warn(`Lucide icon "${name}" does not exist.`);
    return null;
  }

  return <LucideIcon {...props} />;
};

export default Icon;
