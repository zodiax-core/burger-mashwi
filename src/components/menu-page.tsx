import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
  Phone,
  MapPin,
  Truck,
  Globe,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Flame,
  MessageCircle,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

import heroBurger from "@/assets/hero-burger.png";
import logo from "@/assets/logo.png";
import dealBanner from "@/assets/deal-banner.jpg";
import { Button } from "@/components/ui/button";
import {
  menuCategories,
  waterProduct,
  type MenuCategory,
  type Product,
} from "@/data/menu";
import { ProductModal } from "@/components/product-modal";
import { CheckoutModal, type OrderItem } from "@/components/checkout-modal";

type Cart = Record<string, number>;
type Language = "ar" | "en";

const spring = { type: "spring" as const, stiffness: 350, damping: 30 };

const translations = {
  ar: {
    home: "الرئيسية",
    menu: "قائمة الطعام",
    contact: "تواصل معنا",
    cart: "السلة",
    yourCart: "سلتك",
    emptyCart: "سلتك فارغة حالياً",
    addMore: "أضف المزيد من الوجبات",
    total: "المجموع",
    tax: "الضريبة (15% مشمولة)",
    deliveryFee: "رسوم التوصيل",
    free: "مجاناً",
    grandTotal: "المبلغ الإجمالي",
    checkout: "إتمام الطلب",
    viewCart: "عرض السلة",
    orderNow: "اطلب الآن",
    searchPlaceholder: "ابحث عن برجر، وجبة، أو مقبلات...",
    freshDaily: "طازج يومياً",
    grilledOnOrder: "مشوي طازج عند الطلب",
    heroTitle: "برجر مشوي\nعلى أصوله",
    heroDesc:
      "لحم طازج، نكهات جريئة، وخبز محمّص. كل وجبة نحضّرها لك لحظة طلبها بأعلى معايير الجودة.",
    currency: "ر.س",
    categories: "الأقسام",
    restaurantName: "برجر مشوي",
    location: "شارع محمد بن عبدالوهاب - حي الطيبة",
    deliveryInfo: "توصيل سريع لجميع الأحياء",
    workingHours: "يومياً: ١٢ ظهراً — ٢ بعد منتصف الليل",
    allRightsReserved: "جميع الحقوق محفوظة.",
    add: "أضف",
    calories: "سعرة",
    popularWithOrder: "مقترح مع طلبك",
    deliveryTimeEstimate: "سيتم توصيل طلبك خلال 35 - 45 دقيقة تقريباً",
    dealHype: "عروض برجر مشوي الحصرية وصلت!",
    dealSub: "وجبات دبل مشوية على اللهب بأسعار توفيرية لا تُقاوم",
    tryNow: "اطلب العرض الآن",
  },
  en: {
    home: "Home",
    menu: "Menu",
    contact: "Contact",
    cart: "Cart",
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    addMore: "+ Add more items",
    total: "Subtotal",
    tax: "VAT (15% included)",
    deliveryFee: "Delivery Fee",
    free: "Free",
    grandTotal: "Grand Total",
    checkout: "Checkout",
    viewCart: "View Cart",
    orderNow: "Order Now",
    searchPlaceholder: "Search for burgers, meals, sides...",
    freshDaily: "Fresh Daily",
    heroTitle: "Grilled Burger\nDone Right",
    heroDesc:
      "Fresh patties, bold flame flavors, and toasted artisanal buns. Prepared hot the moment you order.",
    currency: "SAR",
    categories: "Categories",
    restaurantName: "Burger Mashwi",
    location: "Mohammad Bin Abdulwahab St - Al Taiba District",
    deliveryInfo: "Fast delivery to all districts",
    workingHours: "Daily: 12 PM — 2 AM",
    allRightsReserved: "All rights reserved.",
    add: "Add",
    calories: "Cal",
    popularWithOrder: "Popular with your order",
    deliveryTimeEstimate: "Your order will be delivered in approx. 35 - 45 mins",
    dealHype: "THE HYPE FROM BURGER MASHWI IS FINALLY HERE!",
    dealSub: "Flame-grilled combo meals with crispy fries and drinks at unbeatable prices",
    tryNow: "TRY NOW",
  },
};

/* 1. Header with larger Logo, no 'Al-Rummanah' name */
function Header({
  count,
  total,
  onCart,
  lang,
  setLang,
}: {
  count: number;
  total: number;
  onCart: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}) {
  const t = translations[lang];
  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE0D2] bg-[#FDF9F3]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-20 max-w-6xl items-center justify-between px-3 sm:px-6">
        {/* Brand Logo Only - enlarged */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Burger Mashwi Home">
          <img
            src={logo}
            alt="Burger Mashwi Logo"
            className="h-9 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-bold text-muted-foreground md:flex">
          <a className="text-primary hover:text-primary transition-colors" href="#top">
            {t.home}
          </a>
          <a className="hover:text-primary transition-colors" href="#menu">
            {t.menu}
          </a>
          <a className="hover:text-primary transition-colors" href="#contact">
            {t.contact}
          </a>
        </nav>

        {/* Actions: Lang toggle & Cart button */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="inline-flex items-center gap-1 font-bold rounded-full border border-border/80 px-2 py-1 sm:px-3 hover:bg-muted h-8 sm:h-9"
          >
            <Globe className="size-3.5 sm:size-4 text-primary" />
            <span className="text-[11px] sm:text-xs uppercase">{lang === "ar" ? "EN" : "AR"}</span>
          </Button>

          <Button
            onClick={onCart}
            className="relative rounded-full bg-primary px-2.5 sm:px-4 py-1.5 sm:py-2 text-white shadow-md hover:bg-primary/90 transition-transform active:scale-95 h-8 sm:h-auto"
          >
            <ShoppingBag className="size-3.5 sm:size-4 sm:me-1.5" />
            <span className="hidden sm:inline text-xs font-black">
              {total > 0 ? `${total} ${t.currency}` : t.cart}
            </span>
            {count > 0 && (
              <span className="absolute -top-1.5 -start-1.5 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-black text-background ring-2 ring-card">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

/* 2. Hero Section: Burger on the right in English, on the left in Arabic, reduced mobile line-spacing & burger margin */
function Hero({ lang }: { lang: Language }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
      <motion.div
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#8A1117] via-[#A8151D] to-[#600B10] px-6 pb-6 pt-7 text-white sm:min-h-[420px] sm:px-12 sm:py-12 lg:min-h-[450px]"
      >
        {/* Background subtle flame pattern / depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

        <div
          className={`relative z-10 max-w-xl flex flex-col ${isAr ? "items-center sm:items-start text-center sm:text-start" : "items-center sm:items-start text-center sm:text-start"
            } h-full`}
        >
          {/* <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-black text-white/95 mb-2.5 sm:mb-3"
          >

          </motion.div> */}

          {/* Heading with reduced line-spacing on mobile */}
          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="font-display text-3xl font-black leading-tight sm:text-5xl lg:text-6xl sm:leading-[1.12] whitespace-pre-line text-white tracking-tight"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Reduced margin between heading and description on mobile */}
          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-2 sm:mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/90 sm:leading-6"
          >
            {t.heroDesc}
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, ...spring }}
            className="mt-5 sm:mt-8"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-8 font-black text-[#8A1117] shadow-xl hover:bg-white/90 transition-transform active:scale-95"
            >
              <a href="#menu">{t.orderNow}</a>
            </Button>
          </motion.div>
        </div>

        {/* Burger Image:
            - Desktop English (LTR): positioned on the RIGHT side (`sm:right-[-2rem] lg:right-4`)
            - Desktop Arabic (RTL): positioned on the LEFT side (`sm:left-[-2rem] lg:left-4`)
            - Phone UI: reduced top margin (`mt-2 sm:mt-0`)
        */}
        <motion.img
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, ...spring }}
          src={heroBurger}
          alt="Grilled Burger"
          className={`relative mx-auto mt-2 w-[270px] drop-shadow-2xl sm:absolute sm:-bottom-20 sm:w-[460px] lg:w-[520px] sm:mt-0 ${isAr
            ? "sm:left-[-2rem] lg:left-6 sm:right-auto"
            : "sm:right-[-2rem] lg:right-6 sm:left-auto"
            }`}
        />

        <div className="absolute bottom-4 end-6 hidden items-center gap-2 text-xs font-bold text-white/80 sm:flex">
          <span className="size-2 rounded-full bg-emerald-400" />
          {t.freshDaily}
        </div>
      </motion.div>
    </section>
  );
}

/* 3. Search Bar */
function SearchBar({
  value,
  onChange,
  lang,
}: {
  value: string;
  onChange: (value: string) => void;
  lang: Language;
}) {
  const t = translations[lang];
  return (
    <div className="mx-auto -mt-5 max-w-xl px-5 sm:-mt-6">
      <div className="relative z-20 flex h-14 items-center rounded-full border border-border bg-card px-2 ps-5 shadow-md">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm hover:bg-primary/90 transition-colors"
          aria-label="Search"
        >
          <Search className="size-4" />
        </button>
      </div>
    </div>
  );
}


/* 5. List-Style Product Card (matching Cluckin reference) */
function ProductCard({
  product,
  onSelect,
  onQuickAdd,
  lang,
}: {
  product: Product;
  onSelect: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
  lang: Language;
}) {
  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  return (
    <div
      onClick={onSelect}
      className="group relative flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[#EDE3D4] bg-[#FEFCF8] p-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      {/* Product Details (Left in LTR, Right in RTL) */}
      <div className="flex flex-1 flex-col min-w-0">
        <h3 className="font-display text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug">
          {isAr ? product.name : product.enName}
        </h3>

        {/* Description shown as short line-clamp */}
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
          {isAr ? product.description : product.enDescription}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-sm font-black text-primary">
            {isAr ? "ر.س" : "SAR"} {product.price}
          </span>
          {product.badge && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-black text-primary leading-none">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Product Image + Floating Red Plus Button */}
      <div className="relative shrink-0">
        <div className="flex size-[72px] sm:size-20 items-center justify-center overflow-visible rounded-xl bg-[#FFF6ED] p-1 border border-border/40">
          <img
            src={product.image}
            alt={isAr ? product.name : product.enName}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
        </div>

        {/* Red circular plus button — bottom-right corner */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(e);
          }}
          className="absolute -bottom-2 -end-2 grid size-7 place-items-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90 hover:scale-110 active:scale-95 transition-transform z-10"
          aria-label="Add to cart"
        >
          <Plus className="size-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

/* 6. Category Section with Burgundy Banner Header */
function CategorySection({
  category,
  onSelectProduct,
  onQuickAdd,
  lang,
}: {
  category: MenuCategory;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  lang: Language;
}) {
  const isAr = lang === "ar";

  return (
    <section id={category.id} className="scroll-mt-24">
      {/* Cluckin style curved deep burgundy pill header with food image overlapping */}
      <div className="relative mb-6 flex h-16 sm:h-20 items-center justify-between overflow-hidden rounded-[1.5rem] bg-[#4C0910] px-5 sm:px-8 text-white shadow-md">
        <div className="z-10">
          <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
            {isAr ? category.eyebrow : category.enEyebrow}
          </span>
          <h2 className="font-display text-lg font-black uppercase sm:text-2xl tracking-wide text-white">
            {isAr ? category.title : category.enTitle}
          </h2>
        </div>

        {/* Overlapping food thumbnail — z-index above the bg gradient */}
        <div className="absolute end-3 -bottom-3 sm:end-6 sm:-bottom-5 pointer-events-none z-20">
          <img
            src={category.image}
            alt=""
            className="h-20 sm:h-28 w-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Grid of List-Style Product Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onSelectProduct(product)}
            onQuickAdd={() => onQuickAdd(product)}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

/* 7. Cart Drawer (Cluckin Style with Water Upsell) */
function CartDrawer({
  open,
  close,
  cart,
  update,
  onCheckout,
  lang,
}: {
  open: boolean;
  close: () => void;
  cart: Cart;
  update: (id: string, delta: number) => void;
  onCheckout: () => void;
  lang: Language;
}) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  const allProducts = useMemo(() => {
    const map = new Map<string, Product>();
    for (const cat of menuCategories) {
      for (const prod of cat.products) {
        map.set(prod.id, prod);
      }
    }
    return Array.from(map.values());
  }, []);
  const rows = allProducts.filter((p) => (cart[p.id] ?? 0) > 0);
  const total = rows.reduce((sum, p) => sum + p.price * (cart[p.id] ?? 0), 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Sheet */}
          <motion.aside
            initial={{ x: isAr ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? "100%" : "-100%" }}
            transition={spring}
            dir={isAr ? "rtl" : "ltr"}
            className="fixed inset-y-0 end-0 z-50 flex w-full max-w-sm sm:max-w-md flex-col bg-[#FAF6EE] shadow-2xl"
          >
            {/* Red Top Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 sm:px-5 sm:py-3.5 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-4.5" />
                <h2 className="font-display text-base sm:text-lg font-black">{t.yourCart}</h2>
              </div>
              <button
                onClick={close}
                className="grid size-7 sm:size-8 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <X className="size-3.5 sm:size-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3">
              {rows.length === 0 ? (
                <div className="flex h-56 flex-col items-center justify-center text-center text-muted-foreground">
                  <ShoppingBag className="size-12 opacity-20 mb-2" />
                  <p className="font-bold text-base text-foreground">{t.emptyCart}</p>
                  <p className="mt-1 text-xs">{t.addMore}</p>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {rows.map((product) => {
                      const qty = cart[product.id] ?? 0;
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-white p-2.5 sm:p-3 shadow-sm"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="size-11 sm:size-12 shrink-0 rounded-lg bg-muted/40 p-1 border border-border/40 flex items-center justify-center">
                              <img
                                src={product.image}
                                alt=""
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display text-xs sm:text-sm font-black text-foreground truncate">
                                {isAr ? product.name : product.enName}
                              </h4>
                              <p className="text-xs font-black text-primary mt-0.5">
                                {product.price * qty} {currency}
                              </p>
                            </div>
                          </div>

                          {/* Stepper with red trash can for 1 */}
                          <div className="flex items-center gap-1.5 rounded-full border border-border bg-[#FDFBF7] px-2 py-0.5 sm:py-1 shrink-0">
                            {qty === 1 ? (
                              <button
                                onClick={() => update(product.id, -1)}
                                className="grid size-5 sm:size-6 place-items-center rounded-full text-destructive hover:bg-destructive/10 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="size-3 sm:size-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => update(product.id, -1)}
                                className="grid size-5 sm:size-6 place-items-center rounded-full text-foreground hover:bg-muted transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-3 sm:size-3.5" />
                              </button>
                            )}

                            <span className="w-4 text-center text-xs font-black text-foreground">
                              {qty}
                            </span>

                            <button
                              onClick={() => update(product.id, 1)}
                              className="grid size-5 sm:size-6 place-items-center rounded-full text-primary hover:bg-primary/10 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3 sm:size-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add more items dashed button */}
                  <button
                    onClick={close}
                    className="w-full rounded-xl border-2 border-dashed border-primary/40 bg-white/60 py-2 sm:py-2.5 text-center text-xs font-black text-primary hover:bg-white transition-colors"
                  >
                    {t.addMore}
                  </button>

                  {/* Popular with your order - specifically includes WATER */}
                  <div className="rounded-xl border border-border/80 bg-white p-2.5 sm:p-3">
                    <div className="flex items-center gap-1.5 text-xs font-black text-foreground mb-2 sm:mb-2.5">
                      <Flame className="size-3.5 text-primary fill-primary" />
                      <span>{t.popularWithOrder}</span>
                    </div>

                    <div className="flex items-center gap-2.5 overflow-x-auto pb-0.5">
                      {/* Bottled Water Upsell Item */}
                      <div className="flex w-24 sm:w-28 shrink-0 flex-col items-center rounded-lg border border-border/60 bg-[#FAF7F0] p-1.5 sm:p-2 text-center">
                        <div className="relative size-12 sm:size-14">
                          <img
                            src={waterProduct.image}
                            alt="Water"
                            className="h-full w-full object-contain"
                          />
                          <button
                            onClick={() => update(waterProduct.id, 1)}
                            className="absolute -bottom-1 -end-1 grid size-5 sm:size-6 place-items-center rounded-full bg-primary text-white shadow-sm hover:scale-110 active:scale-95 transition-transform"
                            aria-label="Add water"
                          >
                            <Plus className="size-3 stroke-[3]" />
                          </button>
                        </div>
                        <span className="mt-1 font-black text-xs text-primary">
                          {waterProduct.price} {currency}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-medium text-foreground truncate w-full">
                          {isAr ? waterProduct.name : waterProduct.enName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Calculation Box */}
                  <div className="rounded-xl border border-border/80 bg-white p-3 sm:p-3.5 space-y-1.5 sm:space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t.total}</span>
                      <span className="font-bold text-foreground">
                        {total} {currency}
                      </span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>{t.deliveryFee}</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                        {t.free}
                      </span>
                    </div>

                    <div className="border-t border-border pt-1.5 flex justify-between text-xs sm:text-sm font-black text-foreground">
                      <span>{t.grandTotal}</span>
                      <span className="text-primary text-sm sm:text-base font-black">
                        {total} {currency}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Sticky Checkout Bar */}
            {rows.length > 0 && (
              <div className="border-t border-border bg-white p-3 sm:p-3.5 space-y-2">
                <Button
                  onClick={onCheckout}
                  className="h-11 sm:h-12 w-full rounded-xl bg-gradient-to-r from-[#B51219] to-[#D31D25] text-white font-black text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-between px-4 sm:px-5"
                >
                  <div className="text-start">
                    <span className="block text-[10px] font-normal text-white/80 leading-none">
                      {t.grandTotal}
                    </span>
                    <span className="font-display text-sm sm:text-base font-black">
                      {total} {currency}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <span>{t.checkout}</span>
                    {isAr ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
                  </div>
                </Button>

                <p className="text-center text-[10px] text-muted-foreground font-medium">
                  {t.deliveryTimeEstimate}
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

/* 8. Floating Cart Bar at bottom (Image 3) */
function FloatingCartBar({
  count,
  total,
  onOpenCart,
  lang,
}: {
  count: number;
  total: number;
  onOpenCart: () => void;
  lang: Language;
}) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  if (count <= 0) return null;

  return (
    <div className="fixed bottom-5 inset-x-4 z-40 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 max-w-md w-full">
        {/* Floating Cart Button (Image 3) */}
        <button
          onClick={onOpenCart}
          className="flex h-14 flex-1 items-center justify-between rounded-2xl bg-primary px-4 text-white shadow-xl hover:bg-primary/95 transition-transform active:scale-95"
        >
          {/* White circle with quantity */}
          <span className="grid size-8 place-items-center rounded-full bg-white text-sm font-black text-primary shadow-sm">
            {count}
          </span>

          <span className="font-display text-base font-black tracking-wide">
            {t.viewCart}
          </span>

          {/* Total Price and Arrow */}
          <span className="inline-flex items-center gap-1 font-display text-base font-black">
            <span>{total} {currency}</span>
            {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
          </span>
        </button>
      </div>
    </div>
  );
}

/* 9. Footer: Larger Logo, No 'Al-Rummanah' Name */
function Footer({ lang }: { lang: Language }) {
  const t = translations[lang];
  return (
    <footer id="contact" className="mt-24 border-t border-border bg-[#250B0F] text-[#FAF4EB]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3 sm:px-6">
        <div>
          {/* Footer Logo: noticeably bigger than navbar logo */}
          <Link to="/" className="inline-block group" aria-label="Burger Mashwi">
            <img
              src={logo}
              alt="Burger Mashwi Logo"
              className="h-20 sm:h-28 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-[#B8A8A2]">
            {t.heroDesc}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-base sm:text-lg text-white">{t.contact}</h3>
          <div className="space-y-3 text-xs sm:text-sm text-[#B8A8A2]">
            <div className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-primary" />
              <p>{t.location}</p>
            </div>
            <div className="flex gap-3">
              <Phone className="size-5 shrink-0 text-primary" />
              <p dir="ltr">0505797694 / 0563940877</p>
            </div>
            <div className="flex gap-3">
              <Truck className="size-5 shrink-0 text-primary" />
              <p>{t.deliveryInfo}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-black text-base sm:text-lg text-white mb-4">
            {lang === "ar" ? "أوقات العمل" : "Opening Hours"}
          </h3>
          <p className="text-xs sm:text-sm text-[#B8A8A2] leading-relaxed">
            {t.workingHours}
          </p>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-[#B8A8A2]">
              © {new Date().getFullYear()} {t.restaurantName}. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Main Component */
export function MenuPage() {
  const [cart, setCart] = useState<Cart>({});
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [lang, setLang] = useState<Language>("ar");

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<OrderItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const allProducts = useMemo(() => {
    const map = new Map<string, Product>();
    for (const cat of menuCategories) {
      for (const prod of cat.products) {
        map.set(prod.id, prod);
      }
    }
    return Array.from(map.values());
  }, []);

  const count = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const total = allProducts.reduce((sum, p) => sum + p.price * (cart[p.id] ?? 0), 0);

  const categories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return menuCategories;
    return menuCategories
      .map((cat) => ({
        ...cat,
        products: cat.products.filter((p) =>
          `${p.name} ${p.enName} ${p.description} ${p.enDescription}`
            .toLowerCase()
            .includes(q)
        ),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [search]);

  const updateCart = (id: string, delta: number) => {
    setCart((curr) => {
      const nextVal = (curr[id] ?? 0) + delta;
      if (nextVal <= 0) {
        const next = { ...curr };
        delete next[id];
        return next;
      }
      return { ...curr, [id]: nextVal };
    });
  };

  // Triggered by "Checkout" in Cart Drawer
  const handleCartCheckout = () => {
    const items: OrderItem[] = allProducts
      .filter((p) => (cart[p.id] ?? 0) > 0)
      .map((p) => ({ product: p, quantity: cart[p.id]! }));

    if (items.length === 0) return;

    setCheckoutItems(items);
    setCheckoutTotal(total);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Triggered by "Buy Now" on Product Modal
  const handleDirectBuyNow = (product: Product, quantity: number) => {
    setCheckoutItems([{ product, quantity }]);
    setCheckoutTotal(product.price * quantity);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1E1A18] selection:bg-primary/20">
      <Header
        count={count}
        total={total}
        onCart={() => setCartOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      <main>
        <Hero lang={lang} />
        <SearchBar value={search} onChange={setSearch} lang={lang} />

        {/* Deal Promo Banner */}

        <div id="menu" className="mx-auto mt-10 max-w-6xl space-y-14 px-4 sm:px-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                onSelectProduct={(product) => setSelectedProduct(product)}
                onQuickAdd={(product) => updateCart(product.id, 1)}
                lang={lang}
              />
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg font-black text-foreground">
                {lang === "ar" ? "لم نجد وجبات مطابقة للبحث" : "No matching meals found"}
              </p>
              <p className="mt-1 text-sm">
                {lang === "ar" ? "جرب البحث بكلمات أخرى" : "Try searching with different keywords"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />

      {/* Floating View Cart Bar (Image 3) */}
      <FloatingCartBar
        count={count}
        total={total}
        onOpenCart={() => setCartOpen(true)}
        lang={lang}
      />

      {/* Cart Drawer (Image 4) */}
      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        update={updateCart}
        onCheckout={handleCartCheckout}
        lang={lang}
      />

      {/* Product Detail Bottom Sheet Modal (80% screen height) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => updateCart(product.id, qty)}
        onBuyNow={handleDirectBuyNow}
        lang={lang}
      />

      {/* Checkout Name & Location Popup with Geolocation -> WhatsApp */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={checkoutItems}
        total={checkoutTotal}
        lang={lang}
      />
    </div>
  );
}
