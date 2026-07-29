"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MAX = 180;

export function ContactForm({ className }: { className?: string }) {
  const languageContext = useLanguage();
  const { t } = languageContext;
  
  // Obtenemos el idioma actual de forma segura según la propiedad de tu context (lang o language)
  const lang = (languageContext as Record<string, unknown>).lang || (languageContext as Record<string, unknown>).language || "es";

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.nombre.trim()) next.nombre = t.form.errName;
    if (!form.email.trim()) {
      next.email = t.form.errEmailReq;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t.form.errEmailInvalid;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error(t.form.errCheck);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lang,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar el correo.");
      }

      setSent(true);
      toast.success(t.form.toastTitle, { description: t.form.toastDesc });
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error("[Contact Form Submit Error]", error);
      toast.error(
        lang === "en"
          ? "Could not send your message. Please try again."
          : "No se pudo enviar tu mensaje. Por favor intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        className={cn(
          "flex min-h-[420px] flex-col items-center justify-center rounded-[3px] border border-foreground/10 bg-card p-10 text-center",
          className
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-cream">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-3xl">{t.form.successTitle}</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          {t.form.successSub}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-7", className)}
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="nombre" className="eyebrow text-muted-foreground">
          {t.form.name} <span className="text-primary">{t.form.required}</span>
        </Label>
        <Input
          id="nombre"
          value={form.nombre}
          onChange={(e) => update("nombre", e.target.value)}
          placeholder={t.form.namePh}
          aria-invalid={!!errors.nombre}
          disabled={isSubmitting}
        />
        {errors.nombre && (
          <p className="text-xs text-destructive">{errors.nombre}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email" className="eyebrow text-muted-foreground">
          {t.form.email} <span className="text-primary">{t.form.required}</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder={t.form.emailPh}
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="telefono" className="eyebrow text-muted-foreground">
          {t.form.phone}
        </Label>
        <Input
          id="telefono"
          type="tel"
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          placeholder={t.form.phonePh}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="mensaje" className="eyebrow text-muted-foreground">
            {t.form.message}
          </Label>
          <span className="font-mono text-[0.65rem] text-muted-foreground">
            {form.mensaje.length} / {MAX}
          </span>
        </div>
        <Textarea
          id="mensaje"
          value={form.mensaje}
          maxLength={MAX}
          onChange={(e) => update("mensaje", e.target.value)}
          placeholder={t.form.messagePh}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" size="lg" className="justify-self-start" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {lang === "en" ? "Sending..." : "Enviando..."}
          </>
        ) : (
          <>
            {t.form.submit} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}