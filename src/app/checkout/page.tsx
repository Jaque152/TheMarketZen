"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShoppingBag,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Fields = {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  direccion: string;
  ciudad: string;
  cp: string;
  countryIdx: string;
  card: string;
  exp: string;
  cvc: string;
  cardName: string;
};

const initial: Fields = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  direccion: "",
  ciudad: "",
  cp: "",
  countryIdx: "0",
  card: "",
  exp: "",
  cvc: "",
  cardName: "",
};

export default function CheckoutPage() {
  const { detailedLines, subtotal, iva, total, clearCart, itemCount } = useCart();
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function update(key: keyof Fields, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    if (apiError) setApiError(null);
  }

  function formatCard(v: string) {
    return v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExp(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!form.nombre.trim()) next.nombre = t.checkout.required;
    if (!form.email.trim()) next.email = t.checkout.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t.checkout.invalidEmail;
    if (!form.direccion.trim()) next.direccion = t.checkout.required;
    if (!form.ciudad.trim()) next.ciudad = t.checkout.required;
    if (!form.cp.trim()) next.cp = t.checkout.required;
    if (form.card.replace(/\s/g, "").length < 16)
      next.card = t.checkout.digits16;
    if (form.exp.length < 5) next.exp = t.checkout.expFmt;
    if (form.cvc.length < 3) next.cvc = t.checkout.cvc3;
    if (!form.cardName.trim()) next.cardName = t.checkout.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          items: detailedLines,
          subtotal,
          iva,
          total,
          lang,
        }),
      });

      const data = await res.json();

      // Diagnóstico para que veas en consola si el email se envió o falló
      console.log("[Resend Email Status Report]", data.emailStatus);

      if (!res.ok || !data.success) {
        setApiError(data.error || (lang === "en" ? "Payment processing failed. Please try again." : "Ocurrió un error al procesar el pago. Intenta nuevamente."));
        setIsSubmitting(false);
        return;
      }

      setOrderId(data.orderId);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[Payment Submit Error]", err);
      setApiError(lang === "en" ? "Network error. Please check your connection and try again." : "Error de red. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <div className="section-x mx-auto max-w-2xl pb-32 pt-40 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-cream">
          <Check className="h-9 w-9" />
        </div>
        <h1 className="mt-8 font-display text-5xl font-medium leading-none">
          {t.checkout.successTitle}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {t.checkout.successSub}
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/servicios">{t.checkout.successCta1}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">{t.checkout.successCta2}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="section-x mx-auto max-w-2xl pb-32 pt-40 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-8 font-display text-4xl font-medium">
          {t.checkout.emptyTitle}
        </h1>
        <p className="mt-4 text-muted-foreground">{t.checkout.emptySub}</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/servicios">
            {t.checkout.emptyCta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-x mx-auto max-w-[1500px] pb-28 pt-32 lg:pt-40">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t.checkout.back}
      </Link>
      <h1 className="mt-6 font-display text-5xl font-medium leading-none sm:text-6xl">
        {t.checkout.title}
      </h1>

      {apiError && (
        <div className="mt-8 flex items-center gap-3 rounded-[3px] border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16"
        noValidate
      >
        <div className="space-y-14">
          <Section step="01" title={t.checkout.stepContact}>
            <Field
              id="nombre"
              label={t.checkout.fullName}
              required
              disabled={isSubmitting}
              value={form.nombre}
              error={errors.nombre}
              onChange={(v) => update("nombre", v)}
            />
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field
                id="email"
                label={t.checkout.email}
                type="email"
                required
                disabled={isSubmitting}
                value={form.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
              />
              <Field
                id="telefono"
                label={t.checkout.phone}
                type="tel"
                disabled={isSubmitting}
                value={form.telefono}
                onChange={(v) => update("telefono", v)}
              />
            </div>
          </Section>

          <Section step="02" title={t.checkout.stepBilling}>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field
                id="empresa"
                label={t.checkout.company}
                disabled={isSubmitting}
                value={form.empresa}
                onChange={(v) => update("empresa", v)}
              />
              <div className="grid gap-2">
                <Label className="eyebrow text-muted-foreground">
                  {t.checkout.country}
                </Label>
                <Select
                  disabled={isSubmitting}
                  value={form.countryIdx}
                  onValueChange={(v) => update("countryIdx", v)}
                >
                  <SelectTrigger className="h-12 rounded-none border-0 border-b border-foreground/25 px-0 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {t.checkout.countries.map((country, i) => (
                      <SelectItem key={country} value={String(i)}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Field
              id="direccion"
              label={t.checkout.address}
              required
              disabled={isSubmitting}
              value={form.direccion}
              error={errors.direccion}
              onChange={(v) => update("direccion", v)}
            />
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field
                id="ciudad"
                label={t.checkout.city}
                required
                disabled={isSubmitting}
                value={form.ciudad}
                error={errors.ciudad}
                onChange={(v) => update("ciudad", v)}
              />
              <Field
                id="cp"
                label={t.checkout.zip}
                required
                disabled={isSubmitting}
                value={form.cp}
                error={errors.cp}
                onChange={(v) => update("cp", v)}
              />
            </div>
          </Section>

          <Section step="03" title={t.checkout.stepPayment} icon>
            {/* Banner y Logo de Keycop Solutions */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-foreground/10 bg-foreground/[0.03] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                  {lang === "en" ? "Processed securely by" : "Procesado seguro por"}
                </span>
                {/* Asume que tienes tu imagen en /public/logo-keycop-2.png. Si no, muestra el texto con estilo */}
                <img
                  src="/logo-keycop-2.png"
                  alt="Keycop Solutions"
                  className="h-6 w-auto object-contain dark:invert"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
                <span className="font-display text-lg font-bold tracking-tight text-foreground">
                  keycop<span className="text-primary">.</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-primary">
                <Lock className="h-3.5 w-3.5" /> PCI DSS Compliant
              </div>
            </div>

            <Field
              id="cardName"
              label={t.checkout.cardName}
              required
              disabled={isSubmitting}
              value={form.cardName}
              error={errors.cardName}
              onChange={(v) => update("cardName", v)}
            />
            <Field
              id="card"
              label={t.checkout.cardNumber}
              required
              disabled={isSubmitting}
              placeholder="0000 0000 0000 0000"
              value={form.card}
              error={errors.card}
              onChange={(v) => update("card", formatCard(v))}
            />
            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              <Field
                id="exp"
                label={t.checkout.exp}
                required
                disabled={isSubmitting}
                placeholder={t.checkout.expFmt}
                value={form.exp}
                error={errors.exp}
                onChange={(v) => update("exp", formatExp(v))}
              />
              {/* CAMBIO AQUÍ: type="password" para ocultar los números del CVV */}
              <Field
                id="cvc"
                label={t.checkout.cvc}
                required
                disabled={isSubmitting}
                placeholder="•••"
                type="password"
                value={form.cvc}
                error={errors.cvc}
                onChange={(v) =>
                  update("cvc", v.replace(/\D/g, "").slice(0, 4))
                }
              />
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> {t.checkout.secureNote}
            </p>
          </Section>
        </div>

        {/* Summary */}
        <div>
          <div className="lg:sticky lg:top-28">
            <div className="rounded-[3px] border border-foreground/10 bg-card p-8">
              <h2 className="font-display text-2xl">{t.checkout.orderTitle}</h2>
              <ul className="mt-6 divide-y divide-foreground/10">
                {detailedLines.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display text-base">
                        {product.content[lang].name}
                      </p>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {t.checkout.qty} {quantity}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-sm">
                      {formatMXN(product.price * quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-3 border-t border-foreground/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.cart.subtotal}</dt>
                  <dd className="font-mono">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.cart.iva}</dt>
                  <dd className="font-mono">{formatMXN(iva)}</dd>
                </div>
                <div className="flex items-end justify-between border-t border-foreground/10 pt-4">
                  <dt className="font-display text-lg">{t.cart.total}</dt>
                  <dd className="font-display text-3xl">{formatMXN(total)}</dd>
                </div>
              </dl>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-7 w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {lang === "en" ? "Processing..." : "Procesando pago..."}
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" /> {t.checkout.pay}{" "}
                    {formatMXN(total)}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({
  step,
  title,
  icon,
  children,
}: {
  step: string;
  title: string;
  icon?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-7">
      <div className="flex items-center gap-4 border-b border-foreground/15 pb-4">
        <span className="font-mono text-sm text-primary">{step}</span>
        <h2 className="font-display text-2xl">{title}</h2>
        {icon && <CreditCard className="ml-auto h-5 w-5 text-muted-foreground" />}
      </div>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="eyebrow text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cn(error && "border-destructive")}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}