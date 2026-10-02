export const RESTAURANT_LOCATION = {
  name: "Burger Al Mashwi برجر مشوی العقربية الخبر",
  address: "22 St, Al Aqrabiyah, Al Khobar 34217, Saudi Arabia",
  coords: {
    lat: 26.2886,
    lng: 50.1982,
  },
};

export const FREE_DELIVERY_RADIUS_KM = 10;

/**
 * Calculates straight-line distance in kilometers between two GPS coordinates using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type DeliveryStatus = {
  hasLocation: boolean;
  distanceKm: number | null;
  isFree: boolean;
  statusText: "Free" | "Paid";
  statusTextAr: "مجاني" | "مدفوع";
};

export function getDeliveryStatus(
  coords: { lat: number; lng: number } | null | undefined
): DeliveryStatus {
  if (!coords || typeof coords.lat !== "number" || typeof coords.lng !== "number") {
    return {
      hasLocation: false,
      distanceKm: null,
      isFree: true,
      statusText: "Free",
      statusTextAr: "مجاني",
    };
  }

  const distance = calculateDistanceKm(
    coords.lat,
    coords.lng,
    RESTAURANT_LOCATION.coords.lat,
    RESTAURANT_LOCATION.coords.lng
  );

  const isFree = distance <= FREE_DELIVERY_RADIUS_KM;

  return {
    hasLocation: true,
    distanceKm: Math.round(distance * 10) / 10,
    isFree,
    statusText: isFree ? "Free" : "Paid",
    statusTextAr: isFree ? "مجاني" : "مدفوع",
  };
}
