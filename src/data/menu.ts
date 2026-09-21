// ─── Category Header Images ──────────────────────────────────────────────────
import burgersImage from "@/assets/category-burgers.png";
import friesImage from "@/assets/category-fries.png";
import sidesImage from "@/assets/category-sides.png";
import wrapImage from "@/assets/category-wrap.png";

// ─── Product Images ───────────────────────────────────────────────────────────
import waterImage from "@/assets/water-bottle.png";
import pepsiImg from "@/assets/pepsi.png";
import marindaImg from "@/assets/marinda.png";

// Burger singles
import chickenBurgerImg from "@/assets/chicken-burger.webp";
import chickenCheeseBurgerImg from "@/assets/chicken-chesse-burger.png";
import doubleChickenCheeseBurgerImg from "@/assets/double-chicken-chesse-burger.png";
import beefBurgerImg from "@/assets/beef-burger.png";
import beefCheeseBurgerImg from "@/assets/beef-chesse-burger.png";
import doubleBeefCheeseBurgerLargeImg from "@/assets/Double Beef Cheese Burger (Large).webp";
import doubleBeefCheeseBurgerClassicImg from "@/assets/Double Beef Cheese Burger Classic.png";
import zingerBurgerImg from "@/assets/zinger-burger.png";
import zingerCheeseBurgerImg from "@/assets/zinger-chesse-burger.png";
import doubleZingerBurgerImg from "@/assets/Double Zinger Burger.webp";
import nuggetBurgerImg from "@/assets/Nugget Burger.png";

// Meals / combos
import doubleChickenCheeseMealImg from "@/assets/double-chicken-chesse -burger-meal-with-fries-and-cold-drink.png";
import doubleBeefCheeseMealImg from "@/assets/double-beef-chesse -burger-meal-with-fries-and-cold-drink.png";
import doubleZingerSupremeMealImg from "@/assets/Double Zinger Supreme Meal.png";
import chickenCheeseBurgerMealImg from "@/assets/Chicken cheese burger served with fries and a cold drink.png";
import beefCheeseBurgerMealImg from "@/assets/Flame-grilled beef burger with cheese, fries, and beverage.png";
import zingerBurgerMealImg from "@/assets/Spicy zinger burger combo with crispy fries and drink.png";
import zingerCheeseBurgerMealImg from "@/assets/Zinger burger with cheese meal, includes fries and beverage.png";
import zingerRollMealImg from "@/assets/Delicious crispy zinger roll combo with golden fries and drink.png";
import tortillaMealImg from "@/assets/Flavorful chicken tortilla wrap served with fries and drink.png";

// Wraps
import zingerRollImg from "@/assets/Spicy zinger chicken tenders rolled in flatbread with special sauce.webp";

// Fries & Sides
import crispySpicyFriesImg from "@/assets/Crispy skin-on fries coated with signature hot chili spice.png";
import crispyFriesImg from "@/assets/Crispy Fries.png";
import cheeseFriesImg from "@/assets/Cheese Fries.png";
import friesLargeImg from "@/assets/Fries (Large).png";
import friesSmallImg from "@/assets/Fries (Small).png";
import cheeseNuggetsImg from "@/assets/Cheese Nuggets.png";
import regularNuggetsImg from "@/assets/Regular Chicken Nuggets.png";

export type Product = {
  id: string;
  name: string;
  enName: string;
  description: string;
  enDescription: string;
  price: number;
  calories: number;
  image: string;
  badge?: string;
  category?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  enTitle: string;
  eyebrow: string;
  enEyebrow: string;
  image: string;
  products: Product[];
};

export const waterProduct: Product = {
  id: "mineral-water",
  name: "مياه معدنية",
  enName: "Mineral Water",
  description: "مياه شرب نقية ومنعشة",
  enDescription: "Pure and refreshing mineral drinking water",
  price: 1,
  calories: 0,
  image: waterImage,
  badge: "بارد / Cold",
};

export const pepsiProduct: Product = {
  id: "pepsi",
  name: "بيبسي",
  enName: "Pepsi",
  description: "مشروب بيبسي غازي منعش وبارد",
  enDescription: "Refreshing ice-cold Pepsi can",
  price: 3,
  calories: 150,
  image: pepsiImg,
  badge: "بارد / Cold",
};

export const marindaProduct: Product = {
  id: "marinda",
  name: "ميريندا برتقال",
  enName: "Mirinda Orange",
  description: "مشروب ميريندا برتقال غازي منعش وبارد",
  enDescription: "Crisp and fruity ice-cold Mirinda orange can",
  price: 3,
  calories: 160,
  image: marindaImg,
  badge: "بارد / Cold",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "deals",
    title: "العروض الخاصة",
    enTitle: "Special Deals",
    eyebrow: "أفضل التوفير",
    enEyebrow: "Best Value",
    image: burgersImage,
    products: [
      {
        id: "double-chicken-cheese-burger-meal",
        name: "وجبة برجر دبل دجاج بالجبن",
        enName: "Double Chicken Cheese Burger Meal",
        description: "دبل دجاج مشوي مع الجبن، بطاطس مقلية ذهبية ومشروب منعش",
        enDescription: "Double grilled chicken with cheese, golden crispy fries, and refreshing drink",
        price: 18,
        calories: 850,
        image: doubleChickenCheeseMealImg,
        badge: "الأكثر طلباً",
      },
      {
        id: "double-beef-cheese-burger-meal",
        name: "وجبة برجر دبل لحم بالجبن",
        enName: "Double Beef Cheese Burger Meal",
        description: "دبل لحم طازج مشوي على اللهب مع الجبن، بطاطس ومشروب",
        enDescription: "Double flame-grilled beef with cheese, crispy fries, and drink",
        price: 18,
        calories: 880,
        image: doubleBeefCheeseMealImg,
        badge: "مميز",
      },
      {
        id: "double-zinger-burger-meal",
        name: "وجبة دبل زنجر سوبريم",
        enName: "Double Zinger Supreme Meal",
        description: "قطعتين دجاج زنجر مقرمش وحار مع بطاطس ومشروب",
        enDescription: "Two crispy spicy zinger chicken fillets with fries and drink",
        price: 22,
        calories: 1000,
        image: doubleZingerSupremeMealImg,
        badge: "عرض التوفير",
      },
    ],
  },
  {
    id: "burgers",
    title: "البرجر",
    enTitle: "Burgers",
    eyebrow: "مشوي على اللهب",
    enEyebrow: "Flame Grilled",
    image: burgersImage,
    products: [
      {
        id: "chicken-burger",
        name: "برجر دجاج",
        enName: "Chicken Burger",
        description: "برجر دجاج مشوي طازج بخلطتنا الخاصة",
        enDescription: "Fresh grilled chicken burger with special house seasoning",
        price: 9,
        calories: 225,
        image: chickenBurgerImg,
      },
      {
        id: "chicken-cheese-burger",
        name: "برجر دجاج بالجبن",
        enName: "Chicken Cheese Burger",
        description: "برجر دجاج مشوي مع شريحة جبنة ذائبة شهية",
        enDescription: "Grilled chicken burger topped with melted cheddar cheese",
        price: 10,
        calories: 300,
        image: chickenCheeseBurgerImg,
      },
      {
        id: "double-chicken-cheese-burger",
        name: "برجر دبل دجاج بالجبن",
        enName: "Double Chicken Cheese Burger",
        description: "شريحتين دجاج مشوي مع طبقات الجبن الشيدر",
        enDescription: "Two grilled chicken patties layered with rich cheddar cheese",
        price: 13,
        calories: 420,
        image: doubleChickenCheeseBurgerImg,
        badge: "دبل",
      },
      {
        id: "beef-burger",
        name: "برجر لحم",
        enName: "Beef Burger",
        description: "لحم بقري طازج مشوي على اللهب مع الخضار الطازجة",
        enDescription: "Fresh flame-grilled beef burger with crisp fresh toppings",
        price: 9,
        calories: 246,
        image: beefBurgerImg,
      },
      {
        id: "beef-cheese-burger",
        name: "برجر لحم بالجبن",
        enName: "Beef Cheese Burger",
        description: "برجر لحم مشوي طازج مع شريحة جبنة ذائبة",
        enDescription: "Fresh flame-grilled beef burger with melted cheese slice",
        price: 10,
        calories: 325,
        image: beefCheeseBurgerImg,
      },
      {
        id: "double-beef-cheese-burger-13",
        name: "برجر دبل لحم بالجبن (كبير)",
        enName: "Double Beef Cheese Burger (Large)",
        description: "شريحتين لحم طازج مشوي مع الجبن السويسري والشيدر",
        enDescription: "Two juicy beef patties grilled with melted cheese layers",
        price: 13,
        calories: 443,
        image: doubleBeefCheeseBurgerLargeImg,
        badge: "دبل",
      },
      {
        id: "double-beef-cheese-burger-10",
        name: "برجر دبل لحم بالجبن كلاسيك",
        enName: "Double Beef Cheese Burger Classic",
        description: "دبل لحم مشوي بالحجم الكلاسيكي مع الجبن",
        enDescription: "Double beef patties classic size with tasty melted cheese",
        price: 10,
        calories: 480,
        image: doubleBeefCheeseBurgerClassicImg,
      },
      {
        id: "zinger-burger",
        name: "برجر زنجر حار",
        enName: "Zinger Burger",
        description: "صدر دجاج كرسبي حار ومقرمش مع صوص خاص وخس طازج",
        enDescription: "Spicy crispy fried chicken breast with special sauce and lettuce",
        price: 10,
        calories: 550,
        image: zingerBurgerImg,
        badge: "حار / Spicy",
      },
      {
        id: "zinger-cheese-burger",
        name: "برجر زنجر بالجبن",
        enName: "Zinger Cheese Burger",
        description: "صدر دجاج زنجر مقرمش مع صوص الجبن الذائب",
        enDescription: "Crispy zinger chicken with rich melted cheese and secret sauce",
        price: 10,
        calories: 325,
        image: zingerCheeseBurgerImg,
        badge: "حار بالجبن",
      },
      {
        id: "double-zinger-burger",
        name: "برجر دبل زنجر",
        enName: "Double Zinger Burger",
        description: "شريحتين دجاج زنجر فائق القرمشة مع صوص حار",
        enDescription: "Double crispy spicy zinger chicken fillets stacked high",
        price: 18,
        calories: 880,
        image: doubleZingerBurgerImg,
        badge: "دبل حار",
      },
      {
        id: "nugget-burger",
        name: "ناجت برجر",
        enName: "Nugget Burger",
        description: "قطع ناجت دجاج مقرمشة داخل خبز برجر طازج وهش",
        enDescription: "Crispy golden chicken nuggets in a soft toasted burger bun",
        price: 10,
        calories: 735,
        image: nuggetBurgerImg,
      },
    ],
  },
  {
    id: "meals",
    title: "الوجبات الكاملة",
    enTitle: "Combos & Meals",
    eyebrow: "وجبات مع بطاطس ومشروب",
    enEyebrow: "Complete with Fries & Drink",
    image: burgersImage,
    products: [
      {
        id: "chicken-cheese-burger-meal",
        name: "وجبة برجر دجاج بالجبن",
        enName: "Chicken Cheese Burger Meal",
        description: "برجر دجاج بالجبن مع بطاطس ذهبية ومشروب منعش",
        enDescription: "Chicken cheese burger served with fries and a cold drink",
        price: 15,
        calories: 420,
        image: chickenCheeseBurgerMealImg,
      },
      {
        id: "beef-cheese-burger-meal",
        name: "وجبة برجر لحم بالجبن",
        enName: "Beef Cheese Burger Meal",
        description: "برجر لحم مشوي مع الجبن، بطاطس ومشروب",
        enDescription: "Flame-grilled beef burger with cheese, fries, and beverage",
        price: 15,
        calories: 780,
        image: beefCheeseBurgerMealImg,
      },
      {
        id: "zinger-burger-meal",
        name: "وجبة برجر زنجر",
        enName: "Zinger Burger Meal",
        description: "برجر زنجر المقرمش الحار مع بطاطس مقرمشة ومشروب",
        enDescription: "Spicy zinger burger combo with crispy fries and drink",
        price: 16,
        calories: 860,
        image: zingerBurgerMealImg,
      },
      {
        id: "zinger-cheese-burger-meal",
        name: "وجبة برجر زنجر بالجبن",
        enName: "Zinger Cheese Burger Meal",
        description: "وجبة زنجر شهية مع الجبن السائل وبطاطس ومشروب",
        enDescription: "Zinger burger with cheese meal, includes fries and beverage",
        price: 15,
        calories: 780,
        image: zingerCheeseBurgerMealImg,
      },
      {
        id: "zinger-roll-meal",
        name: "وجبة رول زنجر",
        enName: "Zinger Roll Meal",
        description: "رول زنجر ملفوف ومقرمش مع بطاطس ومشروب",
        enDescription: "Delicious crispy zinger roll combo with golden fries and drink",
        price: 16,
        calories: 720,
        image: zingerRollMealImg,
      },
      {
        id: "tortilla-meal",
        name: "وجبة تورتيلا",
        enName: "Tortilla Meal",
        description: "تورتيلا دجاج شهية مع بطاطس مقلية ومشروب",
        enDescription: "Flavorful chicken tortilla wrap served with fries and drink",
        price: 16,
        calories: 735,
        image: tortillaMealImg,
      },
    ],
  },
  {
    id: "wraps",
    title: "التورتيلا والرول",
    enTitle: "Wraps & Rolls",
    eyebrow: "خفيف وطازج",
    enEyebrow: "Light & Crispy",
    image: wrapImage,
    products: [
      {
        id: "zinger-roll",
        name: "رول زنجر",
        enName: "Zinger Roll",
        description: "دجاج زنجر حار مقرمش ملفوف مع صوص مميز وخضار",
        enDescription: "Spicy zinger chicken tenders rolled in flatbread with special sauce",
        price: 10,
        calories: 480,
        image: zingerRollImg,
        badge: "حار / Spicy",
      },
      {
        id: "regular-tortilla",
        name: "تورتيلا عادي",
        enName: "Regular Tortilla",
        description: "تورتيلا دجاج طازجة مشوية مع صوص كريمي لذيذ",
        enDescription: "Fresh chicken wrapped in toasted tortilla bread with creamy sauce",
        price: 10,
        calories: 618,
        image: wrapImage,
      },
    ],
  },
  {
    id: "fries-sides",
    title: "البطاطس والمقبلات",
    enTitle: "Fries & Sides",
    eyebrow: "مقرمشة وذهبية",
    enEyebrow: "Crispy & Golden",
    image: friesImage,
    products: [
      {
        id: "crispy-spicy-fries",
        name: "بطاطس كرسبي حار",
        enName: "Crispy Spicy Fries",
        description: "بطاطس مقرمشة متبلة ببهارات حارة خاصة ومميزة",
        enDescription: "Crispy skin-on fries coated with signature hot chili spice",
        price: 9,
        calories: 620,
        image: crispySpicyFriesImg,
        badge: "حار / Spicy",
      },
      {
        id: "cheese-fries",
        name: "بطاطس بالجبن",
        enName: "Cheese Fries",
        description: "بطاطس ذهبية مغطاة بصوص جبنة الشيدر الذائبة والشهية",
        enDescription: "Golden fries drizzled generously with warm rich cheddar cheese sauce",
        price: 9,
        calories: 410,
        image: cheeseFriesImg,
        badge: "الأكثر طلباً",
      },
      {
        id: "fries-large",
        name: "بطاطس مقلية (كبير)",
        enName: "Fries (Large)",
        description: "بطاطس مقلية طازجة بالحجم الكبير",
        enDescription: "Freshly cooked golden fries large serving",
        price: 6,
        calories: 280,
        image: friesLargeImg,
      },
      {
        id: "fries-small",
        name: "بطاطس مقلية (صغير)",
        enName: "Fries (Small)",
        description: "بطاطس مقلية طازجة بالحجم الصغير",
        enDescription: "Freshly cooked golden fries regular small serving",
        price: 4,
        calories: 160,
        image: friesSmallImg,
      },
      {
        id: "onion-rings",
        name: "حلقات بصل مقرمشة",
        enName: "Crispy Onion Rings",
        description: "حلقات بصل طازجة مقلية بطبقة بقسماط مقرمشة",
        enDescription: "Crispy battered and deep-fried savory golden onion rings",
        price: 6,
        calories: 340,
        image: sidesImage,
      },
      {
        id: "cheese-nuggets",
        name: "ناجت بالجبن",
        enName: "Cheese Nuggets",
        description: "قطع دجاج مقرمشة محشوة بالجبنة الذائبة الشهية",
        enDescription: "Crispy tender chicken nuggets stuffed with gooey melted cheese",
        price: 12,
        calories: 580,
        image: cheeseNuggetsImg,
        badge: "بالجبن",
      },
      {
        id: "regular-nuggets",
        name: "ناجت دجاج عادي",
        enName: "Regular Chicken Nuggets",
        description: "قطع دجاج ذهبية مقرمشة تقدم ساخنة",
        enDescription: "Classic crispy golden chicken nuggets served piping hot",
        price: 6,
        calories: 540,
        image: regularNuggetsImg,
      },
    ],
  },
  {
    id: "drinks",
    title: "المشروبات",
    enTitle: "Beverages",
    eyebrow: "انتعاش فوري",
    enEyebrow: "Instant Refreshment",
    image: pepsiImg,
    products: [pepsiProduct, marindaProduct, waterProduct],
  },
];

export const popularProducts: Product[] = [
  pepsiProduct,
  marindaProduct,
  waterProduct,
  {
    id: "fries-small",
    name: "بطاطس مقلية",
    enName: "Crispy Fries",
    description: "بطاطس مقلية طازجة وذهبية مقرمشة",
    enDescription: "Freshly cooked golden crispy fries",
    price: 4,
    calories: 160,
    image: friesSmallImg,
  },
  {
    id: "cheese-fries",
    name: "بطاطس بالجبن",
    enName: "Cheese Fries",
    description: "بطاطس ذهبية مغطاة بصوص جبنة الشيدر الذائبة والشهية",
    enDescription: "Golden fries drizzled generously with warm rich cheddar cheese sauce",
    price: 9,
    calories: 410,
    image: cheeseFriesImg,
    badge: "الأكثر طلباً",
  },
  {
    id: "onion-rings",
    name: "حلقات بصل مقرمشة",
    enName: "Crispy Onion Rings",
    description: "حلقات بصل طازجة مقلية بطبقة بقسماط مقرمشة",
    enDescription: "Crispy battered and deep-fried savory golden onion rings",
    price: 6,
    calories: 340,
    image: sidesImage,
  },
];
