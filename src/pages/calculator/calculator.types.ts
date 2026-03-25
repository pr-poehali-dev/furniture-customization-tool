export type Step = 1 | 2 | 3 | 4;
export type CategoryId = "wardrobe" | "kitchen" | "door" | "staircase";

export type WardrobeParams = {
  width: string;
  height: string;
  depth: string;
  openType: string;
  filling: string[];
};

export type KitchenParams = {
  kitchenType: string;
  meters: string;
};

export type DoorParams = {
  width: string;
};

export type StaircaseParams = {
  staircaseType: string;
};

export type CategoryParams = WardrobeParams | KitchenParams | DoorParams | StaircaseParams;

export const categories: { id: CategoryId; label: string; icon: string }[] = [
  { id: "wardrobe", label: "Шкаф", icon: "Archive" },
  { id: "kitchen", label: "Кухня", icon: "ChefHat" },
  { id: "door", label: "Дверь", icon: "SquareDashedBottom" },
  { id: "staircase", label: "Лестница", icon: "ArrowUpRight" },
];

export const extras = [
  { id: "viz3d", label: "3D-визуализация", price: 8000, icon: "Eye" },
  { id: "measure", label: "Выезд замерщика", price: 0, icon: "Ruler" },
  { id: "install", label: "Монтаж и установка", price: 15000, icon: "Wrench" },
  { id: "handles", label: "Фурнитура премиум-класса", price: 12000, icon: "Star" },
  { id: "lighting", label: "Встроенная подсветка", price: 9000, icon: "Lightbulb" },
];

export const wardrobeWidths = ["80 см", "90 см", "100 см", "150 см", "200 см", "300 см"];
export const wardrobeHeights = ["200 см", "240 см", "270 см"];
export const wardrobeDepths = ["30 см", "40 см", "50 см"];
export const wardrobeOpenTypes = ["Распашной", "Купе"];
export const wardrobeFilling = ["Полки", "Ящики", "Штанги для вешалок"];

export const kitchenTypes = ["Прямая", "Угловая"];
export const kitchenMetersDirect = ["2 м.п.", "3 м.п.", "4 м.п."];
export const kitchenMetersCorner = ["3 м.п.", "4 м.п.", "5 м.п.", "6 м.п."];

export const doorWidths = ["60 см", "70 см", "80 см", "90 см"];

export const staircaseTypes = ["Деревянная", "Металлическая", "Бетонная"];

export const defaultParams: Record<CategoryId, CategoryParams> = {
  wardrobe: { width: "", height: "", depth: "", openType: "", filling: [] },
  kitchen: { kitchenType: "", meters: "" },
  door: { width: "" },
  staircase: { staircaseType: "" },
};

export function isParamsComplete(category: CategoryId, params: CategoryParams): boolean {
  if (category === "wardrobe") {
    const p = params as WardrobeParams;
    return !!(p.width && p.height && p.depth && p.openType && p.filling.length > 0);
  }
  if (category === "kitchen") {
    const p = params as KitchenParams;
    return !!(p.kitchenType && p.meters);
  }
  if (category === "door") {
    const p = params as DoorParams;
    return !!p.width;
  }
  if (category === "staircase") {
    const p = params as StaircaseParams;
    return !!p.staircaseType;
  }
  return false;
}

// Парсим строку вида "80 см" -> 0.8 (погонные метры)
function widthToPogon(width: string): number {
  const cm = parseInt(width);
  return cm / 100;
}

// Парсим строку вида "2 м.п." -> 2
function metersToNum(m: string): number {
  return parseFloat(m);
}

export function calcPrice(category: CategoryId, params: CategoryParams): number {
  if (category === "wardrobe") {
    const p = params as WardrobeParams;
    if (!p.width) return 0;
    const pogon = widthToPogon(p.width);
    let price = pogon * 25000;
    if (p.openType === "Купе") price += pogon * 10000;
    if (p.filling.includes("Полки")) price += 2000;
    if (p.filling.includes("Ящики")) price += 5000;
    return Math.round(price);
  }
  if (category === "kitchen") {
    const p = params as KitchenParams;
    if (!p.meters) return 0;
    const m = metersToNum(p.meters);
    const ratePerMeter = p.kitchenType === "Угловая" ? 36000 : 28000;
    return Math.round(m * ratePerMeter);
  }
  if (category === "door") {
    const p = params as DoorParams;
    const prices: Record<string, number> = {
      "60 см": 45000,
      "70 см": 50000,
      "80 см": 55000,
      "90 см": 60000,
    };
    return prices[p.width] ?? 0;
  }
  if (category === "staircase") {
    const p = params as StaircaseParams;
    const prices: Record<string, number> = {
      "Деревянная": 150000,
      "Металлическая": 100000,
      "Бетонная": 175000,
    };
    return prices[p.staircaseType] ?? 0;
  }
  return 0;
}

export function getParamsSummary(category: CategoryId, params: CategoryParams): { label: string; value: string }[] {
  if (category === "wardrobe") {
    const p = params as WardrobeParams;
    return [
      { label: "Ширина", value: p.width || "—" },
      { label: "Высота", value: p.height || "—" },
      { label: "Глубина", value: p.depth || "—" },
      { label: "Открывание", value: p.openType || "—" },
      { label: "Наполнение", value: p.filling.length ? p.filling.join(", ") : "—" },
    ];
  }
  if (category === "kitchen") {
    const p = params as KitchenParams;
    return [
      { label: "Тип", value: p.kitchenType || "—" },
      { label: "Погонных метров", value: p.meters || "—" },
    ];
  }
  if (category === "door") {
    const p = params as DoorParams;
    return [{ label: "Ширина", value: p.width || "—" }];
  }
  if (category === "staircase") {
    const p = params as StaircaseParams;
    return [{ label: "Тип лестницы", value: p.staircaseType || "—" }];
  }
  return [];
}