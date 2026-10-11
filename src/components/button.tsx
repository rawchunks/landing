import type { CSSProperties, ReactNode } from 'react';

export interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  href?: string;
  target?: string;
}

export const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', style, disabled, href, target }: Props) => {
  const classes = `button button-${variant} button-${size} ${className}`;
  return href ? (
    <a className={classes} style={style} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{children}</a>
  ) : (
    <button type="button" className={classes} style={style} onClick={onClick} disabled={disabled}>{children}</button>
  );
};
