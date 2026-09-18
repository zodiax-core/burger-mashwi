import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/menu";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  lang: "ar" | "en";
};

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  lang,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product?.id]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Bottom Sheet — 80% screen height */}
          <motion.div
            key="modal-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            dir={isAr ? "rtl" : "ltr"}
            className="relative z-10 flex h-[80vh] max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border-t border-border bg-card shadow-2xl mx-auto"
          >
          {/* Handle bar */}
          <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-muted-foreground/25" />

          {/* Close row */}
          <div className="flex items-center justify-between px-4 sm:px-6 pt-1.5 pb-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? "تفاصيل الوجبة" : "Product Details"}
            </span>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24">
            {/* Product Image */}
            <div className="relative mx-auto flex aspect-video max-h-48 sm:max-h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-[#FFF9F2] p-3 border border-border/50">
              {product.badge && (
                <span className="absolute start-3 top-3 z-10 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black text-white shadow-sm">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={isAr ? product.name : product.enName}
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>

            {/* Details */}
            <div className="mt-3 sm:mt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-black text-foreground sm:text-2xl leading-snug">
                    {isAr ? product.name : product.enName}
                  </h2>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] sm:text-xs font-bold text-muted-foreground">
                      <Flame className="size-3 text-primary" />
                      {product.calories} {isAr ? "سعرة" : "Cal"}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-600">
                      {isAr ? "محضّر طازج عند الطلب" : "Fresh on order"}
                    </span>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  <span className="font-display text-2xl sm:text-3xl font-black text-primary">
                    {product.price * quantity}
                  </span>
                  <span className="ms-1 text-xs font-bold text-primary">{currency}</span>
                </div>
              </div>

              <div className="mt-3 border-t border-border/60 pt-3">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground mb-1">
                  {isAr ? "الوصف" : "Description"}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {isAr ? product.description : product.enDescription}
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5 border border-border/60">
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {isAr ? "الكمية" : "Quantity"}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="grid size-8 place-items-center rounded-full bg-card border border-border text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center text-base font-black text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="grid size-8 place-items-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="absolute inset-x-0 bottom-0 border-t border-border bg-card/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
            <div className="mx-auto flex max-w-xl gap-2.5">
              <Button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                variant="outline"
                className="h-11 sm:h-13 flex-1 rounded-full border-2 border-primary text-primary hover:bg-primary/5 font-black text-sm sm:text-base transition-colors"
              >
                <ShoppingBag className="me-1.5 size-4" />
                {isAr ? "أضف للسلة" : "Add to Cart"}
              </Button>

              <Button
                onClick={() => {
                  onBuyNow(product, quantity);
                  onClose();
                }}
                className="h-11 sm:h-13 flex-1 rounded-full bg-primary hover:bg-primary/90 text-white font-black text-sm sm:text-base shadow-lg transition-all"
              >
                <Zap className="me-1.5 size-4" />
                {isAr ? "اشتري الآن" : "Buy Now"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
