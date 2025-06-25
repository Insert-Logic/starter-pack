interface NavigationLink extends React.ComponentProps<'a'> {
  children?: React.ReactNode;
  className?: string;
}

const NavigationLink = ({ href, children, className, ...props }: NavigationLink) => {
  return (
    <a href={href} {...props} className={className}>
      {children}
    </a>
  );
};
export default NavigationLink;
