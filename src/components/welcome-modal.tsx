import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Check, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

type WelcomeModalProps = {
  open: boolean;
  onClose: (
    chosenLang: "ar" | "en",
    locationData?: { address: string; coords: { lat: number; lng: number } | null }
  ) => void;
  defaultLang?: "ar" | "en";
};

export function WelcomeModal({ open, onClose, defaultLang = "ar" }: WelcomeModalProps) {
  const [selectedLang, setSelectedLang] = useState<"ar" | "en">(defaultLang);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locSuccess, setLocSuccess] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const isAr = selectedLang === "ar";

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError(
        isAr
          ? "خدمة تحديد الموقع غير مدعومة في جهازك"
          : "Geolocation is not supported by your device"
      );
      return;
    }

    setIsLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocSuccess(true);
        const detectedLabel = isAr
          ? "موقعي الحالي (تم التحديد بنجاح عبر GPS)"
          : "Current Location (GPS Detected)";
        setAddress(detectedLabel);
      },
      (error) => {
        setIsLocating(false);
        console.error("Welcome geolocation error:", error);
        setLocError(
          isAr
            ? "تعذر الوصول للموقع تلقائياً، يمكنك إدخال العنوان يدوياً"
            : "Could not access location automatically, feel free to enter it manually"
        );
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleConfirm = () => {
    onClose(selectedLang, {
      address: address.trim(),
      coords: coords,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Smooth Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#120507]/65 backdrop-blur-md will-change-[opacity]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full max-w-[390px] sm:max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EDE3D4] bg-[#FEFCF8] p-4 sm:p-7 shadow-2xl z-10 will-change-[transform,opacity]"
          >
            {/* Top Logo & Header */}
            <div className="text-center">
              <div className="mx-auto inline-flex items-center justify-center size-12 sm:size-20 rounded-xl sm:rounded-2xl bg-[#FAF4EB] border border-[#EFE6D8] p-1.5 sm:p-2 shadow-sm">
                <img
                  src={logo}
                  alt="Burger Mashwi"
                  className="h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <h2 className="mt-2.5 sm:mt-3.5 font-display text-lg sm:text-2xl font-black text-foreground tracking-tight">
                {isAr ? "أهلاً بك في برجر مشوي" : "Welcome to Burger Mashwi"}
              </h2>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                {isAr
                  ? "برجر مشوي على أصوله، نكهات جريئة وطازجة يومياً"
                  : "Flame-grilled burgers done right, fresh daily"}
              </p>
            </div>

            {/* Language Selection Tiles */}
            <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2">
              <label className="text-[11px] sm:text-xs font-bold text-foreground block">
                {isAr ? "اختر لغتك / Select Language" : "Select Language / اختر لغتك"}
              </label>

              <div className="grid grid-cols-2 gap-2">
                {/* Arabic Option */}
                <button
                  type="button"
                  onClick={() => setSelectedLang("ar")}
                  className={`flex items-center justify-between rounded-xl sm:rounded-2xl border p-2 sm:p-3 text-start transition-all ${
                    selectedLang === "ar"
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-white text-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-sm font-bold">🇸🇦</span>
                    <div>
                      <p className="font-display text-xs sm:text-sm font-black leading-none">العربية</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Arabic</p>
                    </div>
                  </div>
                  {selectedLang === "ar" && (
                    <div className="grid size-4 sm:size-5 place-items-center rounded-full bg-primary text-white">
                      <Check className="size-2.5 sm:size-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* English Option */}
                <button
                  type="button"
                  onClick={() => setSelectedLang("en")}
                  className={`flex items-center justify-between rounded-xl sm:rounded-2xl border p-2 sm:p-3 text-start transition-all ${
                    selectedLang === "en"
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-white text-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-sm font-bold">🇬🇧</span>
                    <div>
                      <p className="font-display text-xs sm:text-sm font-black leading-none">English</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">الإنجليزية</p>
                    </div>
                  </div>
                  {selectedLang === "en" && (
                    <div className="grid size-4 sm:size-5 place-items-center rounded-full bg-primary text-white">
                      <Check className="size-2.5 sm:size-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Optional Location Pre-detection */}
            <div className="mt-2.5 sm:mt-4 rounded-xl sm:rounded-2xl border border-border/80 bg-[#FAF7F0] p-2.5 sm:p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-foreground">
                  <MapPin className="size-3 sm:size-3.5 text-primary" />
                  <span>{isAr ? "موقع التوصيل (اختياري)" : "Delivery Location (Optional)"}</span>
                </div>
              </div>

              {!locSuccess ? (
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white py-2 px-3 text-xs font-black text-primary hover:bg-primary/5 transition-colors active:scale-98 disabled:opacity-60 shadow-sm"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>{isAr ? "جاري تحديد الموقع عبر GPS..." : "Detecting GPS location..."}</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="size-3.5" />
                      <span>{isAr ? "تحديد موقعي الحالي الآن" : "Detect My Location Now"}</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <Check className="size-3.5 stroke-[3]" />
                    <span>{isAr ? "تم تحديد موقعك بنجاح" : "Location detected successfully"}</span>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAr ? "أضف تفاصيل إضافية للعنوان..." : "Add address details..."}
                    className="w-full rounded-xl border border-border bg-white px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                </div>
              )}

              {locError && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg leading-tight">
                  {locError}
                </p>
              )}
            </div>

            {/* Action / Continue Button */}
            <div className="mt-5">
              <Button
                type="button"
                onClick={handleConfirm}
                className="w-full rounded-2xl bg-primary py-5 sm:py-6 text-sm sm:text-base font-black text-white shadow-md hover:bg-primary/90 transition-transform active:scale-98"
              >
                <span>{isAr ? "متابعة لتصفح القائمة" : "Continue to Menu"}</span>
                {isAr ? <ArrowLeft className="size-4 ms-2" /> : <ArrowRight className="size-4 ms-2" />}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
