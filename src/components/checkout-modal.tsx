import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, User, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/menu";

export type OrderItem = {
  product: Product;
  quantity: number;
};

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
  total: number;
  lang: "ar" | "en";
};

export function CheckoutModal({ open, onClose, items, total, lang }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError(isAr ? "خدمة تحديد الموقع غير مدعومة في جهازك" : "Geolocation is not supported by your device");
      return;
    }
    setIsLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setGeoCoords({ lat: latitude, lng: longitude });
        if (!address) {
          setAddress(isAr ? "موقعي الحالي (تم التحديد بنجاح عبر GPS)" : "Current Location (GPS Detected)");
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);
        setLocError(
          isAr
            ? "تعذر الوصول للموقع. يرجى إدخال العنوان يدوياً."
            : "Could not access location. Please enter your address manually."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleConfirmOrder = () => {
    if (!name.trim()) {
      alert(isAr ? "يرجى كتابة اسمك الكريم" : "Please enter your name");
      return;
    }

    const mapLink = geoCoords
      ? `https://maps.google.com/?q=${geoCoords.lat},${geoCoords.lng}`
      : null;

    let text = "";

    if (isAr) {
      text = `🍔 *طلب جديد - برجر مشوي*\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *الاسم:* ${name.trim()}\n`;
      text += `📍 *العنوان:* ${address.trim() || "غير محدد"}\n`;
      if (mapLink) text += `🗺️ *الموقع على الخريطة:*\n${mapLink}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🛒 *الوجبات والطلبات:*\n`;
      items.forEach((item) => {
        text += `• ${item.quantity}x ${item.product.name} — (${item.product.price * item.quantity} ${currency})\n`;
      });
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `💰 *المجموع:* ${total} ${currency}\n`;
      text += `🚚 *التوصيل:* مجاني\n`;
      text += `💳 *المبلغ الإجمالي:* ${total} ${currency}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `شكراً لاختياركم برجر مشوي! أرجو تأكيد الطلب.`;
    } else {
      text = `🍔 *New Order - Burger Mashwi*\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *Name:* ${name.trim()}\n`;
      text += `📍 *Address:* ${address.trim() || "Not specified"}\n`;
      if (mapLink) text += `🗺️ *Google Maps Location:*\n${mapLink}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🛒 *Order Items:*\n`;
      items.forEach((item) => {
        text += `• ${item.quantity}x ${item.product.enName} — (${item.product.price * item.quantity} ${currency})\n`;
      });
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `💰 *Subtotal:* ${total} ${currency}\n`;
      text += `🚚 *Delivery:* Free\n`;
      text += `💳 *Grand Total:* ${total} ${currency}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `Thank you for choosing Burger Mashwi! Please confirm my order.`;
    }

    const whatsappUrl = `https://wa.me/966505797694?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl border border-border bg-card px-4 pt-4 pb-5 sm:p-6 shadow-2xl z-10"
          >
            {/* Mobile handle */}
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/25 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-lg sm:text-2xl font-black text-foreground">
                  {isAr ? "بيانات التوصيل" : "Delivery Details"}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                  {isAr ? "أدخل اسمك وموقعك لإرسال الطلب عبر واتساب" : "Enter name & location to send order via WhatsApp"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="grid size-8 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form */}
            <div className="mt-3 space-y-3">
              {/* Name Field */}
              <div>
                <label className="block text-[10px] sm:text-xs font-black uppercase text-muted-foreground mb-1">
                  {isAr ? "الاسم الكريم *" : "Your Name *"}
                </label>
                <div className="relative">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? "مثال: عبد العزيز" : "e.g. John Doe"}
                    className="w-full rounded-xl border border-input bg-muted/40 ps-9 pe-4 py-2 text-xs sm:text-sm font-medium text-foreground outline-none transition focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] sm:text-xs font-black uppercase text-muted-foreground">
                    {isAr ? "عنوان التوصيل" : "Delivery Address"}
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    {isLocating ? (
                      <>
                        <Loader2 className="size-3 animate-spin" />
                        <span>{isAr ? "جاري التحديد..." : "Locating..."}</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="size-3" />
                        <span>{isAr ? "تحديد موقعي" : "Get Location"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <MapPin className="absolute start-3 top-2.5 size-3.5 text-muted-foreground" />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAr ? "الحي، الشارع أو علامة مميزة..." : "District, street or landmark..."}
                    className="w-full rounded-xl border border-input bg-muted/40 ps-9 pe-4 py-2 text-xs sm:text-sm font-medium text-foreground outline-none transition focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                {geoCoords && (
                  <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-[10px] sm:text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="size-3.5 shrink-0" />
                    <span>{isAr ? "تم تحديد موقعك بنجاح" : "GPS location detected successfully"}</span>
                  </div>
                )}

                {locError && (
                  <p className="mt-1 text-[10px] sm:text-xs text-destructive font-medium">{locError}</p>
                )}
              </div>

              {/* Order Snapshot */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-2.5 sm:p-3.5">
                <div className="flex items-center justify-between font-bold text-[10px] sm:text-xs text-muted-foreground border-b border-border/50 pb-1.5 mb-1.5">
                  <span>{isAr ? "الوجبات المختارة" : "Selected Items"} ({items.length})</span>
                  <span className="text-primary font-black">{total} {currency}</span>
                </div>
                <div className="max-h-20 overflow-y-auto space-y-0.5 text-[10px] sm:text-xs pe-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between py-0.5">
                      <span className="font-medium truncate max-w-[180px]">
                        {item.quantity}x {isAr ? item.product.name : item.product.enName}
                      </span>
                      <span className="font-bold text-muted-foreground shrink-0">
                        {item.product.price * item.quantity} {currency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                onClick={handleConfirmOrder}
                className="h-11 sm:h-13 w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm sm:text-base shadow-lg transition-all"
              >
                <MessageCircle className="me-2 size-4 sm:size-5" />
                {isAr ? "تأكيد وإرسال عبر واتساب" : "Confirm & Send via WhatsApp"}
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="py-1.5 text-[10px] sm:text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
