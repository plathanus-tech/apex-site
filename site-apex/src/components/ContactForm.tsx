import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button, Feedback, Input, Textarea } from '@ds';
import styles from './ContactForm.module.css';

export interface Solution { value: string; title: string; icon: string }
interface Props { endpoint: string; solutions: Solution[]; defaultSolutions?: string[]; submitLabel?: string }

type Status = 'idle' | 'sending' | 'success' | 'error' | 'pending';
type Errors = Partial<Record<'solutions' | 'name' | 'email' | 'company' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm({ endpoint, solutions, defaultSolutions = [], submitLabel = 'Quero falar com o Apex' }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<string[]>(defaultSolutions);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  // Avisos de envio aparecem no meio do formulário por alguns segundos e saem sozinhos
  useEffect(() => {
    if (status !== 'pending' && status !== 'error') return;
    const t = window.setTimeout(() => setStatus('idle'), 6000);
    return () => window.clearTimeout(t);
  }, [status]);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!selected.length) e.solutions = 'Escolha pelo menos uma solução.';
    if (!String(data.get('name') ?? '').trim()) e.name = 'Informe o seu nome.';
    const email = String(data.get('email') ?? '').trim();
    if (!email) e.email = 'Informe o seu e-mail profissional.';
    else if (!EMAIL.test(email)) e.email = 'Informe um e-mail válido.';
    if (!String(data.get('company') ?? '').trim()) e.company = 'Informe a empresa ou o kartódromo.';
    if (!String(data.get('message') ?? '').trim()) e.message = 'Escreva a sua mensagem.';
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('idle');
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Sem integração configurada, nada é enviado: o visitante é avisado (não simulamos sucesso).
    if (!endpoint) { setStatus('pending'); return; }
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutions: selected,
          name: String(data.get('name')).trim(),
          email: String(data.get('email')).trim(),
          company: String(data.get('company')).trim(),
          phone: String(data.get('phone') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <Feedback type="success" title="Recebemos o seu contato" message="Em breve a equipe do Apex fala com você para apresentar a solução escolhida." />;
  }

  const sending = status === 'sending';
  return (
    <div className={styles.wrap}>
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <fieldset className={styles.fieldset} disabled={sending}>
        <legend className={styles.legend}>Tenho interesse em:</legend>
        <div className={styles.choices}>
          {solutions.map((s) => (
            <label key={s.value} className={`${styles.choice} ${selected.includes(s.value) ? styles.selected : ''}`}>
              <input
                type="checkbox" name="solutions" value={s.value} checked={selected.includes(s.value)}
                aria-invalid={errors.solutions ? true : undefined}
                onChange={(e) => {
                  setSelected((p) => (e.target.checked ? [...p, s.value] : p.filter((v) => v !== s.value)));
                  setErrors((p) => ({ ...p, solutions: undefined }));
                }}
              />
              <span className={styles.head}>
                <span className={`material-symbols-outlined ${styles.ico}`} aria-hidden="true">{s.icon}</span>
                <span className={styles.title}>{s.title}</span>
                <span className={styles.check} aria-hidden="true" />
              </span>
            </label>
          ))}
        </div>
        {errors.solutions && <p className={styles.error} role="alert">{errors.solutions}</p>}
      </fieldset>

      <Input name="name" label="Nome" autoComplete="name" required error={errors.name} disabled={sending} />
      <Input name="email" type="email" label="E-mail profissional" autoComplete="email" required error={errors.email} disabled={sending} />
      <Input name="company" label="Empresa / Kartódromo" autoComplete="organization" required error={errors.company} disabled={sending} />
      <Input name="phone" type="tel" label="Telefone / WhatsApp" autoComplete="tel" optional disabled={sending} />
      <Textarea name="message" label="Mensagem" rows={3} maxLength={1000} required error={errors.message} disabled={sending} />

      <div className={styles.actions}>
        <Button type="submit" size="md" disabled={sending}>{sending ? 'Enviando…' : submitLabel}</Button>
      </div>
    </form>
    {(status === 'pending' || status === 'error') && (
      <div className={styles.overlay}>
        <div className={styles.toast}>
          {status === 'pending' ? (
            <Feedback
              type="warning" title="Envio ainda não disponível" dismissible onDismiss={() => setStatus('idle')}
              message="Os dados estão válidos, mas o canal de contato comercial ainda não foi integrado. Nada foi enviado."
            />
          ) : (
            <Feedback type="error" title="Não foi possível enviar" message="Tente novamente em instantes." dismissible onDismiss={() => setStatus('idle')} />
          )}
        </div>
      </div>
    )}
    </div>
  );
}
