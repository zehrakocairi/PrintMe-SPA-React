import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  alt?: string;
  style?: object;
  onClick?: () => void;
}

const Link = ({ href, children, className, title, style, onClick, ...props }: LinkProps) => {
  return (
    <RouterLink to={href} className={className} title={title ?? ""} style={style} {...props} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link;