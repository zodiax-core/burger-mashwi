import { AnimatePresence, motion } from "motion/react";
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
  ArrowRight,
  ArrowLeft,
  Flame,
  MessageCircle,
  HelpCircle,
  Headset,
} from "lucide-react";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.png";
import marketingBanner1 from "@/assets/Marketing-banner-deal-1-for-desktop.jpeg";
import marketingBanner2 from "@/assets/marketing-banner-deal-2.jpeg";
import { Button } from "@/components/ui/button";
import {
  menuCategories,
  popularProducts,
  waterProduct,
  type MenuCategory,
  type Product,
} from "@/data/menu";
import { ProductModal } from "@/components/product-modal";
import { CheckoutModal, type OrderItem } from "@/components/checkout-modal";
import { WelcomeModal } from "@/components/welcome-modal";

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
    workingHours: "يومياً: من 3:30 عصراً — 4:00 صباحاً",
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
    workingHours: "Daily: 3:30 PM (Noon) — 4:00 AM",
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

/* 1. Header with sleek height, phone number, and attractive styling */
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
    <header className="sticky top-0 z-40 border-b border-[#E8DEC8]/80 bg-[#FDF9F3]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(76,9,16,0.04)]">
      <div className="mx-auto flex h-13 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Burger Mashwi Home">
          <img
            src={logo}
            alt="Burger Mashwi Logo"
            className="h-8 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-bold text-muted-foreground md:flex">
          <a className="text-primary hover:text-primary transition-colors relative py-1" href="#top">
            {t.home}
          </a>
          <a className="hover:text-primary transition-colors relative py-1" href="#menu">
            {t.menu}
          </a>
          <a className="hover:text-primary transition-colors relative py-1" href="#contact">
            {t.contact}
          </a>
        </nav>

        {/* Actions: Phone Number, Lang toggle & Cart button */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Customer Support Call Button */}
          <a
            href="tel:+923284226009"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#4A3E3D] hover:text-primary transition-colors py-1 px-1"
            dir="ltr"
            title={lang === "ar" ? "خدمة العملاء: +92 328 4226009" : "Customer Support: +92 328 4226009"}
          >
            <Headset className="size-3.5 text-primary" />
            <span className="tracking-wide font-sans">+92 328 4226009</span>
          </a>

          <a
            href="tel:+923284226009"
            className="sm:hidden grid size-8 place-items-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Customer Support"
          >
            <Headset className="size-4 text-primary" />
          </a>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="inline-flex items-center gap-1 font-bold rounded-full border border-border/80 px-2 sm:px-3 hover:bg-muted h-8 sm:h-9 text-xs transition-colors"
          >
            <Globe className="size-3.5 text-primary" />
            <span className="text-[11px] sm:text-xs uppercase">{lang === "ar" ? "EN" : "AR"}</span>
          </Button>

          {/* Cart Button */}
          <Button
            onClick={onCart}
            className="relative rounded-full bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-white shadow-md hover:bg-primary/90 transition-transform active:scale-95 h-8 sm:h-9"
          >
            <ShoppingBag className="size-3.5 sm:size-4 sm:me-1.5" />
            <span className="hidden sm:inline text-xs font-black">
              {total > 0 ? `${total} ${t.currency}` : t.cart}
            </span>
            {count > 0 && (
              <span className="absolute -top-1.5 -start-1.5 grid size-5 place-items-center rounded-full bg-[#1E1A18] text-[10px] font-black text-white ring-2 ring-[#FDF9F3]">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

/* 2. Hero Carousel — margins on all sides, smoothed corners, no AI banner, uses real deal images */
const HERO_INTERVAL = 4000;

function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = [
    {
      id: "deal-1",
      src: marketingBanner1,
      alt: "Burger Mashwi Deal 1",
    },
    {
      id: "deal-2",
      src: marketingBanner2,
      alt: "Burger Mashwi Deal 2",
    },
  ];

  const next = useCallback(() => setIdx((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, HERO_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    setDragging(false);
    if (info.offset.x < -40) {
      next();
      resetTimer();
    } else if (info.offset.x > 40) {
      prev();
      resetTimer();
    }
  };

  const currentSlide = slides[idx]!;

  return (
    <section id="top" className="w-full px-3 sm:px-6 pt-3 sm:pt-4 pb-1 max-w-7xl mx-auto">
      <div
        className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#eedcca]/60 select-none bg-[#1a0003]"
        style={{ touchAction: "pan-y" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.alt}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!dragging) {
                  setIdx(i);
                  resetTimer();
                }
              }}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === idx ? "w-6 h-2 bg-white shadow-sm" : "w-2 h-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3. Sticky Category Nav with magic-pill animation */
function CategoryNav({
  lang,
  activeId,
  onSelect,
}: {
  lang: Language;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const isAr = lang === "ar";
  const navRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active pill into view
  useEffect(() => {
    const btn = navRef.current?.querySelector(`[data-cat="${activeId}"]`) as HTMLElement | null;
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <div className="sticky top-[52px] sm:top-[64px] z-30 bg-primary shadow-sm" dir="ltr">
      <div
        ref={navRef}
        className="flex overflow-x-auto gap-0.5 py-2 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => onSelect(cat.id)}
            className="relative flex-shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-colors"
          >
            {/* Magic white pill — travels between tabs */}
            {activeId === cat.id && (
              <motion.span
                layoutId="cat-pill"
                className="absolute inset-0 rounded-full bg-white"
                style={{ zIndex: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span
              className="relative z-10 transition-colors duration-150"
              style={{ color: activeId === cat.id ? "var(--color-primary)" : "white" }}
            >
              {isAr ? cat.title : cat.enTitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* 4. Search Bar */
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
    <div className="mx-auto max-w-xl px-4 py-3 sm:px-6">
      <div className="relative flex h-12 sm:h-14 items-center rounded-full border border-border bg-card px-2 ps-4 shadow-md">
        <Search className="size-4 shrink-0 text-muted-foreground me-2" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* User Guide — fixed bottom-left icon with ordering instructions */
function UserGuide({ lang, hasCart }: { lang: Language; hasCart?: boolean }) {
  const [open, setOpen] = useState(false);
  const isAr = lang === "ar";

  const steps = isAr
    ? [
        { n: "1", t: "اختر طلبك", d: "تصفح القائمة وأضف ما تريد للسلة" },
        { n: "2", t: "راجع السلة", d: "اضغط على أيقونة السلة وتحقق من طلبك" },
        { n: "3", t: "تأكيد الطلب", d: "أدخل عنوان التوصيل ورقم هاتفك" },
        { n: "4", t: "استمتع بوجبتك", d: "سيصل طلبك خلال 35-45 دقيقة" },
      ]
    : [
        { n: "1", t: "Pick Your Items", d: "Browse the menu and add to cart" },
        { n: "2", t: "Review Cart", d: "Tap the cart icon to check your order" },
        { n: "3", t: "Confirm Order", d: "Enter your delivery address and phone" },
        { n: "4", t: "Enjoy!", d: "Your order arrives in 35-45 minutes" },
      ];

  return (
    <>
      {/* Trigger button — in-line with cart on desktop, bottom-4 on mobile morphing up when cart arrives */}
      <button
        onClick={() => setOpen(true)}
        aria-label={isAr ? "دليل الطلب" : "How to order"}
        className={`fixed left-4 sm:left-6 bottom-4 sm:bottom-5 z-40 flex items-center gap-1.5 rounded-full bg-card border border-border shadow-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 will-change-transform ${
          hasCart ? "-translate-y-16 sm:translate-y-0" : "translate-y-0"
        }`}
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <HelpCircle className="size-4 text-primary" />
        <span className="hidden sm:inline">{isAr ? "كيف أطلب؟" : "How to order"}</span>
      </button>

      {/* Guide Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Sheet */}
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-2xl sm:rounded-3xl border border-border bg-card p-5 shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              dir={isAr ? "rtl" : "ltr"}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-black text-foreground">
                  {isAr ? "كيف تطلب من برجر مشوي؟" : "How to Place an Order"}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-7 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-border transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white text-xs font-black">
                      {step.n}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{step.t}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-5 w-full rounded-xl bg-primary py-2.5 text-sm font-black text-white hover:bg-primary/90 transition-colors active:scale-95"
              >
                {isAr ? "حسناً، فهمت!" : "Got it!"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Floating WhatsApp Button — in-line with cart on desktop, bottom-4 on mobile morphing up when cart arrives */
function WhatsAppButton({ lang, hasCart }: { lang: Language; hasCart?: boolean }) {
  const isAr = lang === "ar";
  return (
    <a
      href="https://wa.me/966505797694"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
      className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-5 z-40 flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 will-change-transform ${
        hasCart ? "-translate-y-16 sm:translate-y-0" : "translate-y-0"
      }`}
      dir="ltr"
    >
      <MessageCircle className="size-4 fill-white" />
      <span className="hidden sm:inline">{isAr ? "واتساب" : "WhatsApp"}</span>
    </a>
  );
}



/* 5. List-Style Product Card (matching Cluckin reference) — with prominent food images */
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
      className="group relative flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[#EDE3D4] bg-[#FEFCF8] p-3 sm:p-3.5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md min-h-[108px] sm:min-h-[124px]"
    >
      {/* Product Details (Left in LTR, Right in RTL) */}
      <div className="flex flex-1 flex-col justify-between self-stretch min-w-0 py-0.5">
        <div>
          <h3 className="font-display text-[13px] sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {isAr ? product.name : product.enName}
          </h3>

          {/* Description shown as short line-clamp — smaller font */}
          <p className="mt-1 line-clamp-2 text-[10px] sm:text-[11px] leading-snug text-muted-foreground">
            {isAr ? product.description : product.enDescription}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-xs sm:text-sm font-black text-primary">
            {currency} {product.price}
          </span>
          {product.badge && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8.5px] font-black text-primary leading-none">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Product Image + Floating Red Plus Button — more bigger food image */}
      <div className="relative shrink-0">
        <div className="flex size-[98px] sm:size-[116px] items-center justify-center overflow-visible rounded-2xl bg-[#FFF6ED] p-1 border border-border/40">
          <img
            src={product.image}
            alt={isAr ? product.name : product.enName}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-sm"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Red circular plus button — bottom-right corner */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(e);
          }}
          className="absolute -bottom-1.5 -end-1.5 grid size-7.5 sm:size-8 place-items-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90 hover:scale-110 active:scale-95 transition-transform z-10"
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
      {/* Cluckin style curved deep burgundy pill header with food image overlapping (overflow-visible & high z-index) */}
      <div className="relative mb-8 flex h-16 sm:h-20 items-center justify-between rounded-[1.5rem] bg-[#4C0910] px-5 sm:px-8 text-white shadow-md overflow-visible">
        <div className="z-10">
          <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
            {isAr ? category.eyebrow : category.enEyebrow}
          </span>
          <h2 className="font-display text-lg font-black uppercase sm:text-2xl tracking-wide text-white">
            {isAr ? category.title : category.enTitle}
          </h2>
        </div>

        {/* Overlapping food thumbnail — high z-index and overflow-visible so it is never cut off */}
        <div className="absolute end-2 sm:end-6 -bottom-3 sm:-bottom-5 pointer-events-none z-30">
          <img
            src={category.image}
            alt=""
            className="h-20 sm:h-32 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] select-none"
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

  const removeItem = (id: string) => {
    update(id, -(cart[id] ?? 1));
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={close}
            className="fixed inset-0 bg-[#120507]/65 backdrop-blur-md will-change-[opacity]"
          />

          {/* Drawer Sheet — enters from right in English, enters from left in Arabic */}
          <motion.aside
            initial={{ x: isAr ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? "-100%" : "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            dir={isAr ? "rtl" : "ltr"}
            className={`fixed inset-y-0 ${isAr ? "left-0" : "right-0"} z-50 flex w-full max-w-sm sm:max-w-md flex-col bg-[#FAF6EE] shadow-2xl will-change-[transform]`}
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
                                loading="lazy"
                                decoding="async"
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

                          {/* Controls: 1-Click Delete Button + Stepper with - and + */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Dedicated Delete Button (instant delete even with 99 items) */}
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="grid size-7 sm:size-8 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              aria-label="Remove item completely"
                              title={isAr ? "حذف المنتج بالكامل" : "Delete from cart"}
                            >
                              <Trash2 className="size-3.5 sm:size-4" />
                            </button>

                            {/* Stepper with - and + */}
                            <div className="flex items-center gap-1 rounded-full border border-border bg-[#FDFBF7] px-1.5 py-0.5 sm:py-1">
                              <button
                                type="button"
                                onClick={() => update(product.id, -1)}
                                className="grid size-5 sm:size-6 place-items-center rounded-full text-foreground hover:bg-muted transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-3 sm:size-3.5" />
                              </button>

                              <span className="w-5 text-center text-xs font-black text-foreground">
                                {qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => update(product.id, 1)}
                                className="grid size-5 sm:size-6 place-items-center rounded-full text-primary hover:bg-primary/10 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-3 sm:size-3.5" />
                              </button>
                            </div>
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

                  {/* Popular with your order - Water, Fries, Onion Rings */}
                  <div className="rounded-xl border border-border/80 bg-white p-2.5 sm:p-3">
                    <div className="flex items-center gap-1.5 text-xs font-black text-foreground mb-2 sm:mb-2.5">
                      <Flame className="size-3.5 text-primary fill-primary" />
                      <span>{t.popularWithOrder}</span>
                    </div>

                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      {popularProducts.map((item) => (
                        <div
                          key={item.id}
                          className="flex w-24 sm:w-28 shrink-0 flex-col items-center rounded-xl border border-border/60 bg-[#FAF7F0] p-1.5 sm:p-2 text-center"
                        >
                          <div className="relative size-12 sm:size-14">
                            <img
                              src={item.image}
                              alt={isAr ? item.name : item.enName}
                              className="h-full w-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                            <button
                              type="button"
                              onClick={() => update(item.id, 1)}
                              className="absolute -bottom-1 -end-1 grid size-5 sm:size-6 place-items-center rounded-full bg-primary text-white shadow-sm hover:scale-110 active:scale-95 transition-transform"
                              aria-label={`Add ${isAr ? item.name : item.enName}`}
                            >
                              <Plus className="size-3 stroke-[3]" />
                            </button>
                          </div>
                          <span className="mt-1 font-black text-xs text-primary">
                            {item.price} {currency}
                          </span>
                          <span
                            className="text-[10px] sm:text-[11px] font-medium text-foreground truncate w-full"
                            title={isAr ? item.name : item.enName}
                          >
                            {isAr ? item.name : item.enName}
                          </span>
                        </div>
                      ))}
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
                    {isAr ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
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

/* 8. Floating Cart Bar at bottom — smoothly morphs in/out from bottom */
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

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="floating-cart-bar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 sm:bottom-5 inset-x-4 z-40 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <div className="pointer-events-auto flex items-center gap-2 max-w-md w-full">
            {/* Floating Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex h-13 sm:h-14 flex-1 items-center justify-between rounded-2xl bg-primary px-4 text-white shadow-xl hover:bg-primary/95 transition-transform active:scale-95"
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
        </motion.div>
      )}
    </AnimatePresence>
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
              <Headset className="size-5 shrink-0 text-primary" />
              <a href="tel:+923284226009" dir="ltr" className="hover:text-primary transition-colors">
                +92 328 4226009
              </a>
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
  const [activeCatId, setActiveCatId] = useState(menuCategories[0]!.id);

  // Welcome modal (Language & upfront Location)
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    address: string;
    coords: { lat: number; lng: number } | null;
  }>({ address: "", coords: null });

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<OrderItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Scroll-spy: update active category as user scrolls
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    menuCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActiveCatId(cat.id);
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleCategorySelect = (id: string) => {
    setActiveCatId(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 95; // header + category nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleWelcomeClose = (
    chosenLang: Language,
    locationData?: { address: string; coords: { lat: number; lng: number } | null }
  ) => {
    setLang(chosenLang);
    if (locationData && (locationData.address || locationData.coords)) {
      setUserLocation(locationData);
    }
    setWelcomeOpen(false);
  };

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
        {/* Full-width Hero Image Carousel */}
        <HeroCarousel />

        {/* Sticky Category Nav with Magic Pill */}
        <CategoryNav
          lang={lang}
          activeId={activeCatId}
          onSelect={handleCategorySelect}
        />

        {/* Search Bar */}
        <SearchBar value={search} onChange={setSearch} lang={lang} />

        {/* Menu Sections */}
        <div id="menu" className="mx-auto max-w-7xl space-y-14 px-3 sm:px-6 pb-8">
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

      {/* User Guide — How to order (in-line on desktop, bottom on mobile morphing up when cart arrives) */}
      <UserGuide lang={lang} hasCart={count > 0} />

      {/* WhatsApp Button (in-line on desktop, bottom on mobile morphing up when cart arrives) */}
      <WhatsAppButton lang={lang} hasCart={count > 0} />

      {/* Floating View Cart Bar */}
      <FloatingCartBar
        count={count}
        total={total}
        onOpenCart={() => setCartOpen(true)}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        update={updateCart}
        onCheckout={handleCartCheckout}
        lang={lang}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => updateCart(product.id, qty)}
        onBuyNow={handleDirectBuyNow}
        lang={lang}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={checkoutItems}
        total={checkoutTotal}
        lang={lang}
        initialAddress={userLocation.address}
        initialCoords={userLocation.coords}
      />

      {/* Fast Welcome Pop-up for Language Selection & Location Pre-detection */}
      <WelcomeModal
        open={welcomeOpen}
        onClose={handleWelcomeClose}
        defaultLang={lang}
      />
    </div>
  );
}
