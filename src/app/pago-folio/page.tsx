"use client";

import { useState } from "react";
import { ArrowRight, FileText, DollarSign, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FolioFields = {
  folio: string;
  monto: string;
  nombre: string;
};

export default function PagoFolioPage() {
  const { lang, t } = useLanguage();
  // El contexto del carrito suele exportar `addItem` o `addToCart`. Lo destructuramos de forma dinámica.
  const cartContext = useCart() as any; 
  const addToCartFn = cartContext.addItem || cartContext.addToCart; 
  const setIsOpen = cartContext.setIsOpen;

  const [form, setForm] = useState<FolioFields>({
    folio: "",
    monto: "",
    nombre: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FolioFields, string>>>({});

  function update(key: keyof FolioFields, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const next: Partial<Record<keyof FolioFields, string>> = {};
    if (!form.folio.trim()) next.folio = t.folio.errReq;
    if (!form.nombre.trim()) next.nombre = t.folio.errReq;
    
    const amountNum = Number(form.monto);
    if (!form.monto.trim() || isNaN(amountNum) || amountNum <= 0) {
      next.monto = t.folio.errAmount;
    }
    
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Generar el ID dinámico interceptable
    const dynamicId = `folio:::${form.folio.trim()}:::${form.monto.trim()}:::${encodeURIComponent(form.nombre.trim())}`;

    // Añadir al carrito y abrir el panel lateral
    if (addToCartFn) {
      addToCartFn(dynamicId, 1);
      if (setIsOpen) setIsOpen(true);
      
      // Limpiar el formulario
      setForm({ folio: "", monto: "", nombre: "" });
    } else {
      console.error("No se encontró la función para añadir al carrito en useCart()");
    }
  }

  return (
    <div className="section-x mx-auto max-w-[1500px] pb-28 pt-32 lg:pt-40">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-primary" />
        <span className="eyebrow text-primary">{t.folio.eyebrow}</span>
      </div>
      
      <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:items-start">
        {/* Lado izquierdo: Textos y contexto */}
        <div>
          <h1 className="font-display text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
            {lang === "en" ? "Pay your" : "Abona a tu"}{" "}
            <span className="italic text-primary">
              {lang === "en" ? "custom quote" : "folio asignado"}
            </span>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.folio.sub}
          </p>
          
          <div className="mt-10 rounded-[3px] border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <FileText className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl font-medium">
              {lang === "en" ? "How does it work?" : "¿Cómo funciona?"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {lang === "en" 
                ? "Enter the exact amount before taxes (VAT will be calculated automatically at checkout). Once added to your cart, you can proceed to the secure Keycop payment gateway just like any other catalog service."
                : "Ingresa el monto exacto antes de impuestos (el IVA se calculará automáticamente en el checkout). Al añadirlo al carrito, podrás proceder a la pasarela segura de Keycop igual que con cualquier otro servicio del catálogo."}
            </p>
          </div>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="rounded-[3px] border border-foreground/10 bg-card p-8 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} className="grid gap-7" noValidate>
            
            <div className="grid gap-2">
              <Label htmlFor="folio" className="eyebrow text-muted-foreground">
                {t.folio.folioLabel} <span className="text-primary">*</span>
              </Label>
              <Input
                id="folio"
                value={form.folio}
                onChange={(e) => update("folio", e.target.value)}
                placeholder={t.folio.folioPh}
                aria-invalid={!!errors.folio}
                className={cn("h-12", errors.folio && "border-destructive")}
              />
              {errors.folio && <p className="text-xs text-destructive">{errors.folio}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nombre" className="eyebrow text-muted-foreground">
                {t.folio.nameLabel} <span className="text-primary">*</span>
              </Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder={t.folio.namePh}
                aria-invalid={!!errors.nombre}
                className={cn("h-12", errors.nombre && "border-destructive")}
              />
              {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="monto" className="eyebrow text-muted-foreground">
                {t.folio.amountLabel} <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                </div>
                <Input
                  id="monto"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.monto}
                  onChange={(e) => update("monto", e.target.value)}
                  placeholder={t.folio.amountPh}
                  aria-invalid={!!errors.monto}
                  className={cn("h-12 pl-10", errors.monto && "border-destructive")}
                />
              </div>
              {errors.monto && <p className="text-xs text-destructive">{errors.monto}</p>}
            </div>

            <Button type="submit" size="lg" className="mt-4 w-full">
              {t.folio.submit} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
          </form>
        </div>
      </div>
    </div>
  );
}