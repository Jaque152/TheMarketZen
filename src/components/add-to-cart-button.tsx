"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getProduct } from "@/lib/products";

type Props = ButtonProps & {
  productId: string;
  label?: string;
  quantity?: number;
  showIcon?: boolean;
};

export function AddToCartButton({
  productId,
  label,
  quantity = 1,
  showIcon = true,
  ...props
}: Props) {
  const { addItem } = useCart();
  const { lang, t } = useLanguage();
  const product = getProduct(productId);

  function handleAdd() {
    addItem(productId, quantity);
    if (product) {
      toast.success(t.toast.added, {
        description: product.content[lang].name,
      });
    }
  }

  return (
    <Button onClick={handleAdd} {...props}>
      {showIcon && <Plus className="h-4 w-4" />}
      {label ?? t.common.addToCart}
    </Button>
  );
}
