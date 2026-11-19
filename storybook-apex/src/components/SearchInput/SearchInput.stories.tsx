import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Campo de busca padrão: lupa, botão de limpar quando há texto, Enter para buscar e Esc para limpar. Use no lugar de montar um `Input type="search"` à mão.' } },
  },
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = { args: { 'aria-label': 'Buscar evento', placeholder: 'Buscar evento' } };

export const WithValue: Story = { args: { 'aria-label': 'Buscar evento', defaultValue: 'Copa de kart' } };

export const WithLabel: Story = { args: { label: 'Buscar contato', placeholder: 'Nome ou e-mail' } };

export const Disabled: Story = { args: { 'aria-label': 'Buscar', defaultValue: 'Indisponível', disabled: true } };

/** Controlado: o valor fica no estado da tela e a busca roda ao pressionar Enter. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [last, setLast] = useState('');
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <SearchInput aria-label="Buscar evento" placeholder="Buscar evento" value={value} onChange={setValue} onSearch={setLast} onClear={() => setLast('')} />
        <small>Última busca: {last || '—'}</small>
      </div>
    );
  },
};
