import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Search, X } from '../../icons';
import { Input, InputProps } from '../Input/Input';
import { cx } from '../../utils/cx';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends Omit<InputProps, 'type' | 'iconLeft' | 'iconRight' | 'onIconRightClick' | 'iconRightLabel' | 'iconRightPressed' | 'defaultValue' | 'value' | 'onChange'> {
  /** Valor controlado. Sem `value`, o campo guarda o próprio texto. */
  value?: string;
  /** Valor inicial (modo não controlado). */
  defaultValue?: string;
  /** Chamado a cada mudança do texto (digitação ou limpeza). */
  onChange?: (value: string) => void;
  /** Chamado ao pressionar Enter, com o texto atual. Dentro de um `<form>`, o envio nativo continua funcionando. */
  onSearch?: (value: string) => void;
  /** Chamado ao limpar o campo pelo botão "x" ou pela tecla Esc. */
  onClear?: () => void;
  /** Nome acessível do botão de limpar (i18n). */
  clearLabel?: string;
}

/**
 * Campo de busca padrão: lupa à esquerda, botão para limpar quando há texto, Enter para buscar e Esc para limpar.
 * Sem `label`, usa `aria-label="Buscar"` (passe um `aria-label` mais específico, ex.: "Buscar evento").
 */
export function SearchInput({
  value, defaultValue = '', onChange, onSearch, onClear, clearLabel = 'Limpar busca', className, onKeyDown, label, placeholder = 'Buscar', ...props
}: SearchInputProps) {
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;

  const set = (next: string) => { if (value === undefined) setInner(next); onChange?.(next); };
  const clear = () => { set(''); onClear?.(); };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'Enter') onSearch?.(text);
    if (e.key === 'Escape' && text) { e.preventDefault(); clear(); }
  };

  const accessible = label ? {} : { 'aria-label': props['aria-label'] ?? 'Buscar' };

  return (
    <Input
      {...props}
      {...accessible}
      label={label}
      type="search"
      enterKeyHint="search"
      autoComplete={props.autoComplete ?? 'off'}
      placeholder={placeholder}
      className={cx(styles.root, className)}
      value={text}
      onChange={(e: ChangeEvent<HTMLInputElement>) => set(e.target.value)}
      onKeyDown={handleKeyDown}
      iconLeft={<Search size={20} />}
      {...(text ? { iconRight: <X size={18} />, onIconRightClick: clear, iconRightLabel: clearLabel } : {})}
    />
  );
}
