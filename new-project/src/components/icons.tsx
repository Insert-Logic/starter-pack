import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export const Icons = {
  add: icons.Plus,
  delete: icons.X,
  edit: icons.Pen,
};

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof Icons;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = Icons[name];
  return <LucideIcon {...props} />;
};
export default Icon;