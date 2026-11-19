import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: ação principal da tela (use 1 por área) · secondary: ação alternativa ·
   *  destructive: ações irreversíveis · ghost: ações de baixa ênfase · outline: ação secundária de
   *  configuração da tela (ex.: personalizar colunas), com borda neutra e sem cor da marca. */
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Só ícone, sem texto. Exige `aria-label` para ter nome acessível. */
  iconOnly?: boolean;
  /** Com `href` renderiza um link (`<a>`) com a aparência do botão. Use para navegação; ações usam `<button>`. */
  href?: string;
  /** Só com `href`. Com `_blank`, `rel="noopener noreferrer"` é aplicado. */
  target?: string;
  rel?: string;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  iconOnly = false,
  children,
  className,
  type = 'button',
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    iconOnly   ? styles.iconOnly  : '',
    iconLeft   ? styles.hasLeft   : '',
    iconRight  ? styles.hasRight  : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  if (href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disabled: _d, form: _f, formAction: _fa, formMethod: _fm, formEncType: _fe, formNoValidate: _fn, formTarget: _ft, ...linkProps } = props;
    return (
      <a
        {...(linkProps as unknown as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href} target={target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
      >
        {iconLeft && <span className={styles.icon} aria-hidden="true">{iconLeft}</span>}
        {!iconOnly && children}
        {iconRight && <span className={styles.icon} aria-hidden="true">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {iconLeft && <span className={styles.icon} aria-hidden="true">{iconLeft}</span>}
      {!iconOnly && children}
      {iconRight && <span className={styles.icon} aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
