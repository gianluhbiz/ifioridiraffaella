import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState, type FormEvent } from 'react'
import { site } from '../data/site'
import { ease } from '../lib/ease'

const occasions = ['Un regalo', 'Compleanno', 'Laurea', 'Anniversario', 'Matrimonio', 'Evento', 'Altro']

type Errors = Partial<Record<'nome' | 'contatto' | 'messaggio', string>>

export default function OrderForm({ defaultOccasion = 'Un regalo' }: { defaultOccasion?: string }) {
  const id = useId()
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const v = (k: string) => String(data.get(k) ?? '').trim()

    const next: Errors = {}
    if (!v('nome')) next.nome = 'Scrivi il tuo nome.'
    if (!v('contatto')) next.contatto = 'Serve una mail o un numero per risponderti.'
    if (v('messaggio').length < 10) next.messaggio = 'Raccontaci in due righe cosa ti serve.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const body = [
      `Nome: ${v('nome')}`,
      `Contatto: ${v('contatto')}`,
      `Occasione: ${v('occasione')}`,
      `Per il giorno: ${v('data') || 'da decidere'}`,
      `Ritiro o consegna: ${v('modo')}`,
      '',
      v('messaggio'),
    ].join('\n')
    const subject = `Richiesta fiori: ${v('occasione')}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-2 flex items-center gap-1.5 text-[14px] text-[#a3341f]">
        <i className="ri-error-warning-line" /> {errors[k]}
      </p>
    ) : null

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-nome`} className="mb-2 block font-medium">
          Nome
        </label>
        <input
          id={`${id}-nome`}
          name="nome"
          autoComplete="name"
          className="field"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? `${id}-nome-err` : undefined}
        />
        {err('nome')}
      </div>
      <div>
        <label htmlFor={`${id}-contatto`} className="mb-2 block font-medium">
          Mail o telefono
        </label>
        <input
          id={`${id}-contatto`}
          name="contatto"
          autoComplete="email"
          className="field"
          aria-invalid={!!errors.contatto}
          aria-describedby={errors.contatto ? `${id}-contatto-err` : undefined}
        />
        {err('contatto')}
      </div>
      <div>
        <label htmlFor={`${id}-occasione`} className="mb-2 block font-medium">
          Occasione
        </label>
        <div className="relative">
          <select id={`${id}-occasione`} name="occasione" defaultValue={defaultOccasion} className="field appearance-none pr-10">
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[20px] text-muted" />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-data`} className="mb-2 block font-medium">
          Per il giorno
        </label>
        <input id={`${id}-data`} name="data" type="date" className="field" />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 font-medium">Ritiro o consegna</legend>
        <div className="flex flex-wrap gap-3">
          {['Ritiro in negozio', 'Consegna a domicilio'].map((m, i) => (
            <label
              key={m}
              className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border border-line px-4 transition-colors hover:border-muted has-checked:border-walnut has-checked:bg-surface"
            >
              <input type="radio" name="modo" value={m} defaultChecked={i === 0} className="accent-walnut" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-messaggio`} className="mb-2 block font-medium">
          Cosa ti serve
        </label>
        <textarea
          id={`${id}-messaggio`}
          name="messaggio"
          rows={4}
          placeholder="Colori, fiori che ami, budget, frase per il biglietto"
          className="field resize-y placeholder:text-muted/70"
          aria-invalid={!!errors.messaggio}
          aria-describedby={errors.messaggio ? `${id}-messaggio-err` : undefined}
        />
        {err('messaggio')}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn w-full sm:w-auto">
          Invia la richiesta <i className="ri-arrow-right-line" />
        </button>
        <AnimatePresence>
          {sent && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="text-[15px] text-muted"
            >
              Si è aperta la tua app di posta con la richiesta già scritta: premi invia e ti rispondiamo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
