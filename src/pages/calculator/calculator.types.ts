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

export const categories: { id: CategoryId; label: string; icon: string; basePrice: number }[] = [
  { id: "wardrobe", label: "Шкаф", icon: "Archive", basePrice: 65000 },
  { id: "kitchen", label: "Кухня", icon: "ChefHat", basePrice: 290000 },
  { id: "door", label: "Дверь", icon: "SquareDashedBottom", basePrice: 60000 },
  { id: "staircase", label: "Лестница", icon: "ArrowUpRight", basePrice: 300000 },
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
