import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Zap, Flame } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

import { menuCategories, waterProduct } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/checkout-modal";

export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const allProducts = menuCategories.flatMap((c) => c.products);
  const product = allProducts.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Basic lang detection
  const isAr = typeof document !== "undefined" && document.dir === "rtl";
  const lang = isAr ? "ar" : "en";
  const currency = isAr ? "ر.س" : "SAR";

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-[#FDF9F3]">
        <h1 className="text-2xl font-black">{isAr ? "الوجبة غير متوفرة" : "Product not found"}</h1>
        <Button asChild className="mt-4 rounded-full bg-primary text-white">
          <Link to="/">{isAr ? "العودة للقائمة الرئيسية" : "Back to Menu"}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-foreground pb-20">
      <header className="sticky top-0 z-40 border-b border-[#EDE4D6] bg-[#FDF9F3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link to="/">
              {isAr ? <ArrowRight className="size-5" /> : <ArrowLeft className="size-5" />}
            </Link>
          </Button>
          <h1 className="font-display text-lg font-black">{isAr ? product.name : product.enName}</h1>
          <div className="size-10" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-[#EDE4D6] bg-white shadow-sm"
        >
          <div className="relative aspect-video max-h-56 bg-[#FFF9F2] p-4 flex items-center justify-center border-b border-border/50">
            {product.badge && (
              <span className="absolute start-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-black text-white">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain drop-shadow-md"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl sm:text-2xl font-black">
                {isAr ? product.name : product.enName}
              </h2>
              <span className="text-xl sm:text-2xl font-black text-primary">
                {product.price * quantity} <span className="text-xs font-bold">{currency}</span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                <Flame className="size-3.5 text-primary" />
                {product.calories} {isAr ? "سعرة حرارية" : "Calories"}
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isAr ? product.description : product.enDescription}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Stepper */}
              <div className="flex h-14 items-center rounded-2xl bg-muted/50 px-3 border border-border/60 justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="grid size-9 place-items-center rounded-full bg-white border border-border text-foreground hover:bg-muted transition-colors"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center text-lg font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="grid size-9 place-items-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              {/* Buy Now Button */}
              <Button
                onClick={() => setCheckoutOpen(true)}
                className="h-11 sm:h-13 flex-1 rounded-2xl text-sm font-black bg-primary text-white hover:bg-primary/90 shadow-md"
              >
                <Zap className="me-2 size-5" />
                {isAr ? "طلب فوري عبر واتساب" : "Order via WhatsApp"}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <h3 className="font-display text-lg font-black mb-4">
            {isAr ? "تفاصيل إضافية" : "Additional Info"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#EDE4D6] p-4 bg-white">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                {isAr ? "التوصيل" : "Delivery"}
              </p>
              <p className="mt-1 font-bold text-foreground">
                {isAr ? "توصيل سريع ومجاني" : "Fast & Free Delivery"}
              </p>
            </div>
            <div className="rounded-2xl border border-[#EDE4D6] p-4 bg-white">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                {isAr ? "التحضير" : "Preparation"}
              </p>
              <p className="mt-1 font-bold text-foreground">
                {isAr ? "مشوي طازج عند الطلب على اللهب" : "Flame-grilled fresh on order"}
              </p>
            </div>
          </div>
        </div>
      </main>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={[{ product, quantity }]}
        total={product.price * quantity}
        lang={lang}
      />
    </div>
  );
}
